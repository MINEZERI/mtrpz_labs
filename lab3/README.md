# Containerization

## 1. Python

**[Github repository](https://github.com/KPI-FICT-MTSD/lab-03-starter-project-python)**  

### 1. First image building

Building image with ideal Dockerfile.

Base image: `python:3.10-buster`.

| *Building time:* | *Image size:* |
|------------------|---------------|
| 54.9s            | 1.41GB        |

### 2. Changes in code

After changes in the code (`build/index.html`).

| *Building time:* | *Image size:* |
|------------------|---------------|
| 5.4s             | 1.41GB        |

Image building took much less time because of Docker layer caching.

### 3. Not ideal Dockerfile

#### 1. Adding dependencies after adding project code (not ideal Dockerfile).

| *Building time:* | *Image size:* |
|------------------|---------------|
| 71.3s            | 1.41GB        |

Inefficient layers usage leads to increased building time.

#### 2. After changes in the code (`build/index.html`) with not ideal Dockerfile.

| *Building time:* | *Image size:* |
|------------------|---------------|
| 16.0s            | 1.41GB        |

### 4. Lighter base image

#### 1. Using lighter base image: `python:3.10-alpine` (not ideal Dockerfile).

| *Building time:* | *Image size:* |
|------------------|---------------|
| 25.1s            | 188MB         |

Much smaller building time and size comparing to `python:3.10-buster`.

#### 2. Dockerfile is again ideal now.

| *Building time:* | *Image size:* |
|------------------|---------------|
| 16.8s            | 188MB         |

### 5. Numpy

#### 1. Adding new dependency: `numpy`. Using lighter base image: `python:3.10-alpine`.

| *Building time:* | *Image size:* |
|------------------|---------------|
| 28.7s            | 322MB         |

Building time and size increased due to the large size of the`numpy` library.

#### 2. Using `python:3.10-buster` base image.


| *Building time:* | *Image size:* |
|------------------|---------------|
| 35.9s            | 1.53GB        |


Along with the size of packages, the size of base image has also grown.

## 2. Golang

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

Some files, like `README.rst` or `go.sum`, are unnecessary in final image. So we're going to create `.dockerignore` file and implement multi-stage build.

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

Now app is running perfectly.

This image is perfect for production due to it's extremely minimal size (`14.9MB`). But not convenient to perform any actions inside the container by the same reason. 

### 3. Distroless

Building final image using `gcr.io/distroless/base`. Image size is `49MB`.

Distroless is better than scratch, slightly heavier, but now it is more comfortably to debug or perform any actions inside the container.

