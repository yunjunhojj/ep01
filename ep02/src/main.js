import test from "./test.json";

// 세이브할때마다 패치 -> 랜더링 -> 이벤트 리스너 등록
// develop mode -> 로컬 데이터 사용
const getProducts = async () => {
  if (process.env.NODE_ENV === "development") {
    const products = test;
    return products;
  }

  const response = await fetch(
    "https://learnwitheunjae.dev/api/sinabro-js/ecommerce"
  );
  const products = await response.json();
  return products;
};

const findElement = (startingElement, selector) => {
  let currentElement = startingElement;
  while (!currentElement.matches(selector)) {
    currentElement = currentElement.parentElement;
  }
  return currentElement;
};

async function main() {
  const products = await getProducts();

  document.querySelector("#products").innerHTML = products
    .map((product, index) => {
      const { name, images } = product;
      return `
      <div class="product" data-product-id="${
        product.id
      }" data-product-index="${index}">
        <img src="${images[0]}" alt="${name}" />
        <div class="product__name">${name}</div>
        <div class="product__buttons flex items-center justify-between">
          <div class="product__price">₩${product.regularPrice.toLocaleString()}</div>
          <div>
            <button class="product__button-decrease bg-green-200 hover:bg-green-3 py-1 px-3 ">-</button>
            <span class="product__button__divider">3</span>
            <button class="product__button-increase bg-green-200 hover:bg-green-3 py-1 px-3 ">+</button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  document.querySelector("#products").addEventListener("click", (event) => {
    const { target } = event;
    const productElement = findElement(target, ".product");
    const productIndex = productElement.dataset.productIndex;
    const product = products[productIndex];

    if (target.classList.contains("product__button-decrease")) {
      console.log("decrease");
      console.log(product);
    }
    if (target.classList.contains("product__button-increase")) {
      console.log("increase");
      console.log(product);
    }
  });
}

main();
