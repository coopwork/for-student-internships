import { createElement } from "./assets/js/create-element.js";
import { fetchProducts } from "./assets/js/fetch-products.js";

const shoppingCartElements = {
  window: document.querySelector(".shopping__cart"),
  openBtn: document.querySelector(".shopping__cart__btn"),
  closeBtn: document.querySelector(".shopping__cart__close__btn"),
};
shoppingCartElements.openBtn.addEventListener("click", () => {
  shoppingCartElements.window.setAttribute("data-open", "true");
});

shoppingCartElements.closeBtn.addEventListener("click", () => {
  shoppingCartElements.window.setAttribute("data-open", "false");
});
shoppingCartElements.window.addEventListener("click", (event) => {
  if (event.target.classList.contains("shopping__cart"))
    shoppingCartElements.window.setAttribute("data-open", "false");
});

const shoppingCartItems = [];

async function getProducts() {
  const products = await fetchProducts();

  console.log("Список продуктов", products);
  console.table(products);

  products.forEach((item) => {
    const img = createElement({
      tag: "img",
      className: "product__cover",
      attrs: {
        src: item.image,
        alt: item.title,
      },
    });

    const title = createElement({
      tag: "h4",
      className: "product__title",
      text: item.title,
    });

    const product__price = createElement({
      tag: "p",
      text: `${item.price} тг.`,
    });

    const buttonAdd = createElement({
      tag: "button",
      className: "product__cart__action__btn",
      text: "Добавить в корзину",
      attrs: { "data-cart-action": "add_to_cart" },
    });

    const buttonRemove = createElement({
      tag: "button",
      className: "product__cart__action__btn",
      text: "Убрать из корзины",
      attrs: { "data-cart-action": "delete_from_cart" },
    });

    const product__pay = createElement({
      tag: "div",
      className: "product__pay",
      children: [product__price, buttonAdd, buttonRemove],
    });



    const ulINgredient = createElement({
      tag: "ul", className: "product__ingridients", children: item.ingredients.map(ing => createElement({ tag: "li", text: ing }))
    })

    const product__info__iconDiv = createElement({
      tag: "div", className: "product__info__icon", text: "i"
    })

    const product__infoDiv = createElement({
      tag: "div", className: "product__info", children: [product__info__iconDiv, ulINgredient]
    })

    const article = createElement({
      tag: "article",
      className: "product__card",
      attrs: {
        "data-in-cart": "false",
      },
      children: [img, title, product__pay, product__infoDiv],
    });

    document.querySelector(".products").appendChild(article);
  });
}

getProducts();

function add_to_cart(product) {

  shoppingCartItems.push(product);

}