// document.body.innerHTML = "<h1>Hello from JavaScript</h1>";

// 1. document.createElement("태그명")
const h1 = document.createElement("h1");

// 텍스트 추가
h1.innerText = "Hello from JavaScript";

// 스타일 추가
h1.style.color = "red";
h1.style.textAlign = "center";

// 클래스 추가
h1.classList.add("heading");
// 클래스 제거
h1.classList.remove("heading");

// 2. document.body.appendChild(요소)
// document.body.appendChild(h1);
document.body.prepend(h1);

// 3. document.body.insertBefore(요소, 기준요소)
const h2 = document.createElement("h2");
h2.innerText = "goodBye from JavaScript";
document.body.insertBefore(h2, h1);

// 4. document.querySelector(선택자)
// const heading = document.querySelector(".heading");
// const heading = document.querySelector("#heading");
// const heading = document.querySelector("h1");

// 5. document.querySelectorAll(선택자)
// const heading = document.querySelectorAll(".heading");
// const heading = document.querySelectorAll("#heading");
// const heading = document.querySelectorAll("h1");
