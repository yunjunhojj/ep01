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

async function main() {
  const products = await getProducts();

  document.querySelector("#products").innerHTML = products
    .map((product) => {
      const { name, images } = product;
      return `
      <div class="product">
        <img src="${images[0]}" alt="${name}" />
        <div class="product__name">${name}</div>
        <div class="product__buttons flex items-center justify-between">
          <div class="product__price">₩${product.regularPrice.toLocaleString()}</div>
          <div>
            <button class="product__button bg-green-200 hover:bg-green-3 py-1 px-3 ">-</button>
            <span class="product__button__divider">3</span>
            <button class="product__button bg-green-200 hover:bg-green-3 py-1 px-3 ">+</button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}

main();
