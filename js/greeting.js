// 옵션 1
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginsubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
}

function paintGreetings(username){
  greeting.innerText = `Have a Good Day ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);

};

const savedUsername = localStorage.getItem(USERNAME_KEY);

// savedUsername값이 null일 경우 === local storage에 유저정보가 없을 때
if(savedUsername === null) {
  // form 보여줌
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginsubmit);
  } else {
    // greetings 보여줌
    paintGreetings(savedUsername);
}
