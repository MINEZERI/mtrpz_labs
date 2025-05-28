# Containerization

## 1. Python

**[Github repository](https://github.com/KPI-FICT-MTSD/lab-03-starter-project-python)**  

### 1. First image building

Building image with optimal Dockerfile.

Base image used: `python:3.10-buster`.

| *Building time:* | *Image size:* |
|------------------|---------------|
| 54.9s            | 1.41GB        |

### 2. Changes in code

After changes in the code (`build/index.html`). 

| *Building time:* | *Image size:* |
|------------------|---------------|
| 5.4s             | 1.41GB        |

Image building took much less time because of Docker layer caching.

### 3. Non-optimal Dockerfile

#### 1. Adding dependencies after copying the project code (non-optimal Dockerfile).

| *Building time:* | *Image size:* |
|------------------|---------------|
| 71.3s            | 1.41GB        |

Inefficient layer usage increases build time.

#### 2. After changes in the code (`build/index.html`) with non-optimal Dockerfile.

| *Building time:* | *Image size:* |
|------------------|---------------|
| 16.0s            | 1.41GB        |

### 4. Lighter base image

#### 1. Using lighter base image: `python:3.10-alpine` (non-optimal Dockerfile).

| *Building time:* | *Image size:* |
|------------------|---------------|
| 25.1s            | 188MB         |

Significantly reduced build time and image size compared to `python:3.10-buster`.

#### 2. Dockerfile is again optimal now.

| *Building time:* | *Image size:* |
|------------------|---------------|
| 16.8s            | 188MB         |

### 5. Numpy

#### 1. Adding new dependency: `numpy`. Using lighter base image: `python:3.10-alpine`.

| *Building time:* | *Image size:* |
|------------------|---------------|
| 28.7s            | 322MB         |

Build time and image size increased because of the `numpy` library's large footprint.

#### 2. Using `python:3.10-buster` base image.


| *Building time:* | *Image size:* |
|------------------|---------------|
| 35.9s            | 1.53GB        |

Now the image size increased again because of base image size.

## 2. Golang

**[Github repository](https://github.com/KPI-FICT-MTSD/lab-03-starter-project-golang)**

### 1. First image building

Building image using `golang:1.19-alpine`.  
**Dockerfile:**

```dockerfile
FROM golang:1.19-alpine

WORKDIR /app

COPY . .

RUN go build -o build/fizzbuzz

EXPOSE 8080

CMD ["./build/fizzbuzz", "serve"]
```

| *Building time:* | *Image size:* |
|------------------|---------------|
| 65.3s            | 567MB         |

### 2. Multi-stage build

Files such as `README.rst` and `go.sum` are unnecessary in the final image. So we're going to create `.dockerignore` file and implement multi-stage build.

**New Dockerfile** looks like:

```dockerfile
FROM golang:1.19-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o fizzbuzz

FROM scratch

WORKDIR /app

COPY --from=builder /app/fizzbuzz .

EXPOSE 8080

CMD ["./fizzbuzz", "serve"]
```

After trying to run image, error occurs:

> exec ./fizzbuzz: no such file or directory
 
The reason this error occurs is dynamic compilation to binary file. To resolve the problem, `CGO_ENABLED=0` flag is added before the `go build` command:

```dockerfile
RUN CGO_ENABLED=0 go build -o fizzbuzz
```

Now, after fixing the problem with CGO, new error appears:

> panic: open templates/index.html: no such file or directory

Telling us there is not enough files to run the app.

Solution for this problem will be copying `index.html` in scratch image too:

```dockerfile
COPY --from=builder /app/templates ./templates
```

The application now runs correctly.

This image is perfect for production due to it's extremely minimal size (`14.9MB`). But not convenient to perform any actions inside the container by the same reason. 

### 3. Distroless

Building final image using `gcr.io/distroless/base`. Image size is `49MB`.

Distroless is preferable to scratch - though slightly larger - as it facilitates debugging or performing any other actions inside the container.

## 3. Typescript

### 1. First image building

First, we will build simple Dockerfile:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
```

#### 1. First image build:
| *Building time:* | *Image size:* |
|------------------|---------------|
| 17.5s            | 280MB         |

#### 2. After changes in the code:

| *Building time:* | *Image size:* |
|------------------|---------------|
| 12.5s            | 280MB         |

Image used for DB: `postgres:15-alpine`. Image size: `391MB`.

This approach is somewhat brute-force. But we are going to improve it by using multi-stage building and lighter base images.

### 2. Better Dockerfile

Now we will use layers for efficient image building.

New Dockerfile:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
```

Here we copy dependencies before other project files. This will optimize image building when we change just code, but not dependencies.

#### 1. First image build:

| *Building time:* | *Image size:* |
|------------------|---------------|
| 17.8s            | 280MB         |

#### 2. After changes in the code:

| *Building time:* | *Image size:* |
|------------------|---------------|
| 4.7s             | 280MB         |

As we see, this approach optimized image building by using layers (caching dependencies).

### 3. Multi-stage build

We will now split the Dockerfile into stages to ensure the final image includes only runtime-essential files.

New Dockerfile:

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --production

FROM gcr.io/distroless/nodejs20-debian12

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/views ./views

EXPOSE 3000

CMD ["dist/app.js"]
```

Here we install dependencies and transpile source code on the first stage, afterwards deleting dev dependencies. On the second stage we use `gcr.io/distroless/nodejs20-debian12` to decrease image size and copy only necessary files.

#### 1. First image build:

| *Building time:* | *Image size:* |
|------------------|---------------|
| 17.0s            | 187MB         |
 
#### 2. After changes in the code:

| *Building time:* | *Image size:* |
|------------------|---------------|
| 4.7s             | 187MB         |

Now image size has been minimized and only files needed for the app to run have been copied. And this didn't affect building time a lot.

## Conclusion

Dockerfile optimization - through layered builds, multi-stage builds, and minimal base images - significantly improves image performance.  
Key takeaways:

- Layer caching accelerates rebuilds when only code changes.

- Multi-stage builds minimize production image size by excluding build-time dependencies (e.g., reducing a 280MB image to 187MB).

- Distroless/scratch images enhance security and efficiency for production.

For developers, these practices save time; for deployments, they reduce resource overhead.