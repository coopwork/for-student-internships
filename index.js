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

let shoppingCartItems = JSON.parse(localStorage.getItem('shopping_cart')) ?? [];


async function getProducts() {
  const products = await fetchProducts();

  RenderCartItems(shoppingCartItems);

  // console.log("Список продуктов", products);
  // console.table(products);

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
      on: {
        click: () => add_to_cart(item),
      },
    });

    const buttonRemove = createElement({
      tag: "button",
      className: "product__cart__action__btn",
      text: "Убрать из корзины",
      attrs: { "data-cart-action": "delete_from_cart" },
      on: {
        click: () => removeFromCart(item.id),
      },
    });

    const product__pay = createElement({
      tag: "div",
      className: "product__pay",
      children: [product__price, buttonAdd, buttonRemove],
    });

    const ulINgredient = createElement({
      tag: "ul",
      className: "product__ingridients",
      children: item.ingredients.map((ing) =>
        createElement({ tag: "li", text: ing })
      ),
    });

    const product__info__iconDiv = createElement({
      tag: "div",
      className: "product__info__icon",
      text: "i",
    });

    const product__infoDiv = createElement({
      tag: "div",
      className: "product__info",
      children: [product__info__iconDiv, ulINgredient],
    });

    const article = createElement({
      tag: "article",
      className: "product__card",
      attrs: {
        "data-in-cart": shoppingCartItems.find((findItem) => findItem.id === item.id) ? "true" : "false",
        "data-id": item.id,
      },
      children: [img, title, product__pay, product__infoDiv],
    });

    document.querySelector(".products").appendChild(article);
  });
}

getProducts();

function add_to_cart(product) {
  // console.log(product);

  const product__card = document.querySelector(`[data-id="${product.id}"]`);

  product__card.setAttribute("data-in-cart", "true");

  // console.log(product__card);

  shoppingCartItems.push(product);
  RenderCartItems(shoppingCartItems);
}

function removeFromCart(product_id) {
  // console.log(product_id);

  const product__card = document.querySelector(`[data-id="${product_id}"]`);

  product__card.setAttribute("data-in-cart", "false");

  shoppingCartItems = shoppingCartItems.filter(
    (item) => item.id !== product_id
  );
  RenderCartItems(shoppingCartItems);
}

function creatCartItem(product) {
  const image = createElement({
    tag: "img",
    className: "product__cover",
    attrs: {
      src: product.image,
      alt: product.title,
    },
  });

  const product__title = createElement({
    tag: "h4",
    text: product.title,
    className: "product__title",
  });

  const product__price = createElement({
    tag: "p",
    text: product.price,
  });

  const product__btn = createElement({
    tag: "button",
    className: "product__cart__action__btn",
    attrs: {
      "data-cart-action": "delete_from_cart",
    },
    text: "Убрать из корзины",
    on: {
      click: () => removeFromCart(product.id),
    },
  });

  const product__pay = createElement({
    tag: "div",
    className: "product__pay",
    children: [product__title, product__price, product__btn],
  });

  const article = createElement({
    tag: "article",
    className: "product__card",
    children: [image, product__pay],
  });

  document.querySelector(".cart__products").appendChild(article);
}

function RenderCartItems(products) {
  document.querySelectorAll('.cart__products .product__card')
    .forEach((product__card) => product__card.remove())
  products.forEach((product) => creatCartItem(product));

  const shopping__cart__sum = document.querySelector('.shopping__cart__sum')
  console.log(shopping__cart__sum);

  shopping__cart__sum.textContent = shoppingCartItems.reduce((acc, product) => acc + product.price, 0) + ' тг.'

  // console.log(shopping__cart__sum);

  shopping__cart__sum.textContent = shoppingCartItems.reduce((acc, product) => acc + product.price, 0)


  const shopping__cart__btn = document.querySelector('.shopping__cart__btn')
  if (shoppingCartItems.length) {
    if (shoppingCartItems.length) {
      shopping__cart__btn.setAttribute('data-count', shoppingCartItems.length)
    } else {
      shopping__cart__btn.removeAttribute('data-count')
    }
    // console.log(shopping__cart__btn);

    localStorage.setItem('shopping_cart', JSON.stringify(shoppingCartItems));

  }
}