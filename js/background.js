// img 파일과 이름을 같게 해줘야 함
const images = [""];

const chosenImage = images[Math.floor(Math.random() * images.length)];

// 자바스크립트에서 생성해서 html 추가 => createElement(html 코드 추가)
// ()안에 들어갈 글이 폴더명과 같아야 함
const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`;

document.body.appendChild(bgImage);
