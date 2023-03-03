const API_KEY = "d5116feb122cd7da019c72b7175326ad"

// 정상 작동 시 보이는 화면
function onGeoOk(position){
    // 위도 얻기
  const lat = position.coords.latitude;
    // 경도 얻기
  const lng = position.coords.longitude;
  // javascript에서 url 부르는 방법
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  // 중요포인트 => 1. ``(배틱)사용 2. lat, lng, API_KEY가 알맞은 위치에 있어야 함(lat=${lat}&lon=${lng}&appid=${API_KEY})
  // &units=metric = 온도를 섭씨로 바꿔줌
  // 콘솔에 url이 뜨고 내용이 알맞게 뜨면 성공
  
  // url을 불러오는 함수 fetch(url)사용
  fetch(url).then(response => response.json().then(data => {
    // 날씨 불러오기
    const weather = document.querySelector("#weather span:first-child")
    const city = document.querySelector("#weather span:last-child")
    city.innerText = data.name;
    // 온도 불러오기
    weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
  }));
  // fetch = promise = 당장 뭔가가 일어나지 않고 시간이 좀 걸린 뒤에 일어나는 것
}
// 에러 시 보이는 화면
function onGeoError() {
  alert("can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
