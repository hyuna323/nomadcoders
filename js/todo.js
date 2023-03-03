const toDoForm = document.getElementById("todo-form");

/* toDoInput을 전체 document에서 전체 HTML을 찾아볼 수 있음
  또는 toDoInput을 toDoForm안에서만 찾아 볼 수도 있음*/
const toDoInput = toDoForm.querySelector("input");
// id가 todo-form인 form안에서 input을 찾는 것

const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

// 1. todo 저장하기
// newTodo 그려질때마다 텍스트를 array에 push하기
// const가 아닌 let으로 바꿔 업데이트가 가능하도록 만들음
// 항상 빈 array로 시작
let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  // JSON,stringify는 javascript object나 array 또는 어떤 javascript 코드건 간에 string으로 만들어줌
}

// 지우는 button 함수 만들어 주기 (eventListener에 들어갈 함수)
function deleteToDo(event){
  const li = event.target.parentElement;
  
  // 버튼 클릭시 지워진다
  li.remove();

  // 클릭한 li.id와 다른 toDo는 남겨두고 싶다는 의미
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

// localStorage
// 1. todo 저장  2. todo 불러오기

// todo 그리는 역할
// newTodo는 text가 됨
function paintToDo(newTodo){
  // li를 만듦
  // 변수 이름을 li라고 하지 않고 tomato라 고 적어도 됨 => html 태그의 이름으로 적을 필요는 없음
  const li = document.createElement("li");
  li.id = newTodo.id;
  
  // span을 만듦
  // span이 li 안에 있지 않음
  const span = document.createElement("span");

  // span 안에 넣은 새로운 텍스트는 사용자가 form에서 우리에게 준 newTodo 값임
  span.innerText = newTodo.text;
  
  // append 하기 전에 삭제하는 button 만들기
  // click 이벤트가 필요함
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo)

  // append는 항상 맨뒤에 있어야 함 
  // 만든 span을 li안에 넣어줌
  // span은 li 안에 있어야 해 li는 span이라는 자식을 갖게 됨
  li.appendChild(span);

  // 위의 button을 li에 만들고자 함
  li.appendChild(button);

  // handleToDoSubmit에서 온 newTodo텍스트가 됨
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();

  // 비우기 전에 값을 저장
  const newTodo = toDoInput.value;
  // input의 현재 value를 새로운 변수에 복사 하는 것 그 후 뭘 하든 newToDo변수와 아무 상관 없음
  
  // enter 누를 시 input이 비워짐
  // ""(빈칸)으로 저장하여 결과화면에 띄어쓰기가 있음
  toDoInput.value = "";

  // 데이터베이스에게 id를 저장하는 옵션 주기 => 삭제가능하다는 얘기
  const newTodoObj = {
    text:newTodo,
    
    // Date.now() = 숫자를 랜덤으로 가져옴
    // id가 있는 이유 : id로 각각의 title을 구별하고자 함
    id: Date.now(),
  };
  // newTodo를 toDos array에 push 하기
  toDos.push(newTodoObj);

  paintToDo(newTodo);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

// loading
const savedToDos = localStorage.getItem(TODOS_KEY);
// console.log(savedToDos);
// localStorage에서 가져온 string을 사용 가능한 Javascript object로 만들기 -> JSON.parse(savedToDos)로 => array로 반환됨
if(savedToDos !== null){
  const parsedToDos = JSON.parse(savedToDos);
  // localStroage에서 발견되는 이전의 todo들로 하고 싶음
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
// 삭제를 하기 위해선 paintToDo에서 어떤 일이 일어나는 지 이해해야 함

// filter 함수 : 지우고 싶은 item을 제외하고 새 array를 만든다


// delete시 local storage에 업데이트 하는 방법
// toDos array가 local storage와 같지 않음
// todo에 id 주기



// 첫번째 방법은 arrow function을 사용하는 방법 : (item) => console.log("this is the turn of", item)
// 두번째 방법은 sayHello function을 만드는 방법 : function sayHello(item){console.log("this is the turn of", item)}

// 이 방법처럼 해도 됨
// if(saveToDos){
//   const parsedToDos = JSON.parse(savedToDos);
// }

// console.log(savedToDos);
// null이 나옴 왜냐면 localStorage에 아무것도 없기 때문
