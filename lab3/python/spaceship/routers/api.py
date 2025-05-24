from fastapi import APIRouter
import numpy as np

router = APIRouter()


@router.get('')
def hello_world() -> dict:
    return {'msg': 'Hello, World!'}

@router.get("/matrix")
def matrix():
    a = np.random.rand(10, 10)
    b = np.random.rand(10, 10)
    product = np.dot(a, b)
    return {
        "a": a.tolist(),
        "b": b.tolist(),
        "product": product.tolist(),
    }
