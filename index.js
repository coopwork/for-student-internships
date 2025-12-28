import { fetchProducts } from "./assets/js/fetch-products.js";

const shoppingCartElements = {
  window: document.querySelector('.shopping__cart'),
  openBtn: document.querySelector('.shopping__cart__btn'),
  closeBtn: document.querySelector('.shopping__cart__close__btn'),
};
shoppingCartElements.openBtn.addEventListener('click', () => {
  shoppingCartElements.window.setAttribute('data-open', 'true')
});

shoppingCartElements.closeBtn.addEventListener('click', () => {
  shoppingCartElements.window.setAttribute('data-open', 'false')
});
shoppingCartElements.window.addEventListener('click', event => {
  if (event.target.classList.contains('shopping__cart'))
    shoppingCartElements.window.setAttribute('data-open', 'false')
});




const shoppingCartItems = [];

async function getProducts() {
  const products = await fetchProducts();

  console.log('Список продуктов', products);
  console.table(products);
}

getProducts();




