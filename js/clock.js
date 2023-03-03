const clock = document.querySelector("h2#clock");

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2,"0");
  const minutes = String(date.getMinutes()).padStart(2,"0");
  const seconds = String(date.getSeconds()).padStart(2,"0");
  // ``(배틱)을 사용해야 함
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

// window가 load되면 바로 보여지도록 설정
getClock();
setInterval(getClock, 1000);
