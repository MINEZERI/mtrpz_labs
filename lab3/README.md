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
