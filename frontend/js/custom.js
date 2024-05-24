const API_URL = "http://127.0.0.1:8000";

/**
 * @type {HTMLElement}
 */
const todoWrapper = document.querySelector(".todo-wrapper");

/**
 * @type {HTMLInputElement}
 */
const inputElement = document.querySelector(".container input");

/**
 * @description FastAPI의 /todo 엔드포인트에 get요청 수행 후 렌더링 함수를 호출하는 함수
 */
const getTodoList = () => {
  axios
    .get(`${API_URL}/todo`)
    .then((res) => {
      console.log(res.data.data);
      renderTodoItem(res.data.data);
    })
    .catch((err) => {
      console.log(`error: ${err}`);
    });
};

/**
 * @description FastAPI의 /todo 엔드포인트에 post요청 수행 후, 다시 get 함수를 호출
 * @param {string} todoText
 */
const postTodoList = (todoText) => {
  // 만약, 공백 상태에서 enter를 눌렀다면 실행 종료
  if (todoText === "") {
    return;
  }
  // 객체 만들기
  let todo = {
    id: 0,
    item: todoText,
  };
  axios
    .post(`${API_URL}/todo`, todo)
    .then((res) => {
      console.log(res.data.msg);
      getTodoList();
      // input 태그 내 값 초기화
      inputElement.value = "";
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * @description FastAPI의 /todo 엔드포인트에 delete요청 수행 후, 다시 get 함수를 호출
 * @param {number} todoId
 */
const deleteTodoItem = (todoId) => {
  axios
    .delete(`${API_URL}/todo/${todoId}`)
    .then((res) => {
      console.log(res.data.msg);
      getTodoList();
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * @description todoList를 받아 todo-rapper 하위 todo-item에 렌더링하는 함수
 * @param {object[]} todoList
 */
const renderTodoItem = (todoList) => {
  // todoWrapper 안의 모든 html 요소를 제거
  todoWrapper.innerHTML = "";
  todoList.forEach((todo) => {
    // div 생성
    let todoItem = document.createElement("div");
    // div에 todo-item 클래스 추가
    todoItem.classList.add("todo-item");
    // FastAPI에서 가져온 데이터 연결
    let todoP = document.createElement("p");
    todoP.textContent = todo.item;
    // todo-item div의 자식에 todoP 추가
    todoItem.appendChild(todoP);
    // delete 버튼 생성
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "X";
    // 클릭 이벤트 리스너 연결
    deleteBtn.addEventListener("click", (event) => {
      console.log(event);
      deleteTodoItem(todo.id);
    });
    // todo-item div의 자식에 deleteBtn 추가
    todoItem.appendChild(deleteBtn);
    // 완성된 todo-item을 todo-wrapper의 자식으로 추가
    todoWrapper.appendChild(todoItem);
  });
};

// DOM 구성 완료되면 실행되는 이벤트
window.addEventListener("DOMContentLoaded", (event) => {
  console.log(event);
  getTodoList();
});

// inputElement에 Enter를 입력하면 실행되는 이벤트
inputElement.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    postTodoList(inputElement.value.trim());
  }
});
