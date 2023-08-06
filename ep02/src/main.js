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

const getProdectsElement = (products, count = 0) => {
  return products
    .map((product) => {
      const { name, images } = product;
      return `
      <div class="product" data-product-id="${product.id}">
        <img src="${images[0]}" alt="${name}" />
        <div class="product__name">${name}</div>
        <div class="product__buttons flex items-center justify-between">
          <div class="product__price">₩${product.regularPrice.toLocaleString()}</div>
          <div>
            <button class="product__button-decrease bg-green-200 hover:bg-green-3 py-1 px-3 ">-</button>
            <span class="cart-count">${count}</span>
            <button class="product__button-increase bg-green-200 hover:bg-green-3 py-1 px-3 ">+</button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
};

const findElement = (startingElement, selector) => {
  let currentElement = startingElement;
  while (!currentElement.matches(selector)) {
    currentElement = currentElement.parentElement;
  }
  return currentElement;
};

const sumAllCartCount = (countMap) => {
  return Object.values(countMap).reduce((acc, cur) => acc + cur, 0);
};

async function main() {
  const products = await getProducts();
  const productMap = {};
  products.forEach((product) => {
    productMap[product.id] = product;
  });

  const countMap = {};

  document.querySelector("#products").innerHTML = getProdectsElement(products);

  document.querySelector("#products").addEventListener("click", (event) => {
    const { target: targetElement } = event;
    const productElement = findElement(targetElement, ".product");
    const productId = productElement.dataset.productId;
    const product = productMap[productId];

    if (
      targetElement.matches(".product__button-increase") ||
      targetElement.matches(".product__button-decrease")
    ) {
      if (countMap[productId] === undefined) {
        countMap[productId] = 0;
      }

      if (targetElement.matches(".product__button-increase")) {
        countMap[productId] += 1;
      }

      if (targetElement.matches(".product__button-decrease")) {
        countMap[productId] -= 1;
      }
      // index 번째 cart-count 업데이트
      const cartCount = document.querySelector(
        `.product[data-product-id="${productId}"] .cart-count`
      );

      cartCount.innerText = countMap[productId];

      document.querySelector(".total-count").innerText =
        sumAllCartCount(countMap);

      const productIds = Object.keys(countMap);
      document.querySelector(".cart-items").innerHTML = getProdectsElement(
        productIds.map((productId) => productMap[productId]),
        countMap[productId]
      );
    }
  });

  document.querySelector("#cart-button").addEventListener("click", (event) => {
    document.querySelector("#cart-layer").classList.remove("hidden");
  });

  document.querySelector("#close-cart").addEventListener("click", (event) => {
    document.querySelector("#cart-layer").classList.add("hidden");
  });

  document.querySelector(".cart-dimmed").addEventListener("click", (event) => {
    document.querySelector("#cart-layer").classList.add("hidden");
  });
}

main();
