from fastapi import APIRouter
from model import Todo

todo_router = APIRouter()

todo_list = []

# 글로벌 id변수 도입
todo_id = 0

@todo_router.get("/todo")
async def todo_get() -> dict:
    return {
        "data": todo_list
    }

@todo_router.get("/todo/{id}")
async def todo_single_get(id: int) -> dict:
    for todo in todo_list:
        if todo.id == id:
            return {"data": todo}
    return {"msg": "no exist todo"}

@todo_router.post("/todo")
async def todo_post(todo: Todo) -> dict:
    global todo_id
    # 글로벌 id변수값으로 id 수정
    todo.id = todo_id
    # todo_id 값을 1 증가시킴
    todo_id += 1
    todo_list.append(todo)
    return {
        "msg": "success!"
    }

@todo_router.delete("/todo/{todo_id}")
async def todo_delete(todo_id: int) -> dict:
    for i in range(len(todo_list)):
        if todo_list[i].id == todo_id:
            del todo_list[i]
            return {"msg": f"{todo_id} deleted successfully"}
    return {"msg": f"{todo_id} not found"}