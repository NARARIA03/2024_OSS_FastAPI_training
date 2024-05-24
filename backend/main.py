from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from todo import todo_router
import uvicorn

app = FastAPI()
app.include_router(todo_router) # todo_router 연결

# CORS를 피하기 위해 FE 접속 경로를 등록
origins = [
    "https://127.0.0.1:5500", 
    "http://127.0.0.1:5500", 
    "https://44.220.221.72", 
    "http://44.220.221.72"
]

# app 객체에게 middleware 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.get("/")
async def welcome() -> dict:
    return {
        "msg": "hello world!",
    }

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
