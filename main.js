// document.body.innerHTML = "<h1>Hello from JavaScript</h1>";

// 1. document.createElement("태그명")
// const h1 = document.createElement("h1");

// 텍스트 추가
// h1.innerText = "Hello from JavaScript";

// 스타일 추가
// h1.style.color = "red";
// h1.style.textAlign = "center";

// 클래스 추가
// h1.classList.add("heading");
// 클래스 제거
// h1.classList.remove("heading");

// 2. document.body.appendChild(요소)
// document.body.appendChild(h1);
// document.body.prepend(h1);

// 3. document.body.insertBefore(요소, 기준요소)
// const h2 = document.createElement("h2");
// h2.innerText = "goodBye from JavaScript";
// document.body.insertBefore(h2, h1);

// 4. document.querySelector(선택자)
// const heading = document.querySelector(".heading");
// const heading = document.querySelector("#heading");
// const heading = document.querySelector("h1");

// 5. document.querySelectorAll(선택자)
// const heading = document.querySelectorAll(".heading");
// const heading = document.querySelectorAll("#heading");
// const heading = document.querySelectorAll("h1");

// 2 of 6

document.querySelector("#app").innerHTML = `
  <button type="button" class="hello1">Hello 1</button>
  <button type="button" class="hello2">Hello 2</button>
  <button type="button" class="hello3">Hello 3</button>

  <div class="box">
    <input type="text" class="name" placeholder="Enter your name:" />
  </div>    

  <div class="parent">
    <button type="button" class="btn">
      <span>Click</span>
      <span>me</span>
    </button>
  </div>

  `;

document.querySelector("button").addEventListener("click", (e) => {
  const input = document.querySelector(".name");
  console.log(input.value);
});

// change 이벤트는 바뀔 때마다 발생 하지 않는다.
document.querySelector(".name").addEventListener("change", (e) => {
  console.log(e.target.value);
});

// input 이벤트는 바뀔 때마다 발생 한다.
document.querySelector(".name").addEventListener("input", (e) => {
  console.log(e.target.value);
});

// 이벤트 버블링
document.querySelector(".btn").addEventListener("click", (e) => {
  // 버블링이 일어나면서 parent, btn, span 순으로 출력된다.

  // 버블링을 막는 방법
  // e.stopPropagation();

  console.log("btn");
});

document.querySelector(".parent").addEventListener("click", (e) => {
  console.log("parent");
});
