// Variables del menú hamburguesa
const menuBurger = document.querySelector(".hamburger");
const menuMobile = document.querySelector(".mobile-menu");

// Variables del carrito
const cartIcon = document.getElementById("cart");
const closeCart = document.getElementById("close-cart");
const cartMenu = document.querySelector(".menu-cart");
// Variable del boton agregar al carrito
const buyCart = document.querySelector(".buy");
const cartItems = document.querySelector(".show-cart-items");
const cartContent = document.querySelector(".cart-content");
const cartTotal = document.querySelector(".cart-total");
const productsDOM = document.querySelector(".flex-product");
const removeItem = document.querySelector(".fa-trash-can");
const cartFooter = document.querySelector(".cart-footer");
const categories = document.querySelector(".categories");
const modalSuccess = document.querySelector(".add-modal");
const allCategories = document.querySelectorAll(".category");

// Seteamos el array para el carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Funcion para guardar en el local storage
const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Renderizamos los productos
const renderAllProducts = (products) => {
  const { id, title, price, imagefront, imageback } = products;
  return `
      <div class="col-4">
                              <div class="img-area">
                                    <img src=${imageback} alt="" class="img-back">
                                    <img src=${imagefront} alt="" class="img-front">
                              </div>
                              <div class="info-card">
                                    <h4>${title}</h4>
                                    <p>$${price}</p>
                                    <button class="cart-button" data-id="${id}" data-title="${title}" data-price="${price}" data-image="${imagefront}" data-disabled="">Agregar al Carrito</button>
                              </div>
                        </div>
      `;
};

const renderDividedProducts = (index = 0) => {
  productsDOM.innerHTML = productsController.dividedProducts[index]
    .map(renderAllProducts)
    .join("");
};

const renderFilteredProducts = (category) => {
  const categoryList = productsData.filter((product) =>
    product.category.includes(category)
  );
  productsDOM.innerHTML = categoryList.map(renderAllProducts).join("");
};

const renderProducts = (index = 0, category = undefined) => {
  if (!category) {
    renderDividedProducts(index);
    return;
  } else {
    renderFilteredProducts(category);
  }
};

// Función que aplica los filtros.
const changeStateBtn = (selectCategory) => {
  const categories = [...allCategories];
  allCategories.forEach((categorySelect) => {
    if (categorySelect.dataset.category !== selectCategory) {
      categorySelect.classList.remove("active");
      return;
    } else {
      categorySelect.classList.add("active");
    }
  });
};

const addFilter = (e) => {
  const selectCategory = e.target.dataset.category;
  if (!e.target.classList.contains("category")) return;
  else {
    changeStateBtn(selectCategory);
  }
  renderProducts(0, selectCategory);
};

// Abrir y cerrar el carrito y el menú
const toggleCart = () => {
  cartMenu.classList.add("active");
  if (cartMenu.classList.contains("active")) {
    cartIcon.parentElement.classList.add("invisible");
    closeCart.addEventListener("click", (e) => {
      cartMenu.classList.remove("active");
      cartIcon.parentElement.classList.remove("invisible");
    });
  }
  if (menuMobile.classList.contains("active")) {
    menuMobile.classList.remove("active");
  }
};

const toggleMenu = () => {
  menuBurger.classList.toggle("active");
  menuMobile.classList.toggle("active");
  if (cartMenu.classList.contains("active")) {
    cartMenu.classList.remove("active");
    cartIcon.parentElement.classList.remove("invisible");
  }
};

// Función para que se cierre el carrito y el menú cuando scrolleamos
const closeOnScroll = () => {
  if (
    !menuMobile.classList.contains("active") &&
    !cartMenu.classList.contains("active")
  )
    return;

  menuMobile.classList.remove("active");
  menuBurger.classList.remove("active");
  cartMenu.classList.remove("active");
  cartIcon.parentElement.classList.remove("invisible");
};

// Lógica para el carrito

// Renderizamos el carrito
const renderCartProducts = (cartProduct) => {
  const { id, title, price, image, quantity } = cartProduct || {};
  if (!id || !title || !price || !image || quantity === undefined) {
    // Manejar la situación en la que cartProduct no está definido o falta información.
    return "";
  }
  return `
    <div class="cart-item">
      <img src="${image}" alt="${title}">
      <div class="container-cart">
        <h4>${title}</h4>
        <h5>$${price}</h5>
        <div class="btn-amount">
          <i class="fa-solid fa-chevron-left" data-id="${id}"></i>
          <span class="item-quantity">${quantity}</span>
          <i class="fa-solid fa-chevron-right" data-id="${id}"></i>
        </div>
      </div>
      <button class="tooltip">
        <i class="fa-regular fa-trash-can remove" data-id="${id}"></i>
        <span class="tooltiptext">Eliminar</span>
      </button>
    </div>
  `;
};

const renderCart = () => {
  cartContent.innerHTML = cart.map(renderCartProducts).join("");
};

// Deshabilitar el boton de comprar
const disabledBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled");
    btn.disabled = true;
  } else {
    btn.classList.remove("disabled");
    btn.disabled = false;
  }
};

// Obtener el total de los productos
const getCartTotal = () => {
  return cart.reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0);
};

// Mostrar el total de los productos
const showTotal = () => {
  cartTotal.innerHTML = 0;
  if (cart.length >= 1) {
    cartTotal.innerHTML = `${getCartTotal().toFixed(3)}`;
  }
};

// Destructuro el product data
const createProductData = (id, title, price, image) => {
  return { id, title, price, image };
};

// Funcion para comprobar si el producto es existente
const isExistingProduct = (product) => {
  return cart.find((item) => item.id === product.id);
};

// Agrego el producto al carrito
const createCartProduct = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
};

// Funcion para que se muestre el modal mostrando un mensaje
const showModalSuccess = (msg) => {
  modalSuccess.classList.add("active-modal");
  modalSuccess.textContent = msg;
  setTimeout(() => {
    modalSuccess.classList.remove("active-modal");
  }, 1500);
};

// Checkeo el estado del carrito
const checkCartState = () => {
  saveLocalStorage(cart);
  renderCart(cart);
  showTotal(cart);
  showCartQuantity();
  disabledBtn(buyCart);
};

// Agrego los productos
const addProducts = (e) => {
  if (!e.target.classList.contains("cart-button")) return;
  const { id, title, price, image } = e.target.dataset;
  const product = createProductData(id, title, price, image);

  if (isExistingProduct(product)) {
    showModalSuccess("El producto ya se encuentra en el carrito");
  } else {
    createCartProduct(product);
    showModalSuccess("Se agregó exitosamente al carrito");
  }

  checkCartState();
};

// Mostrar la cantidad en el ícono del carrito
const showCartQuantity = () => {
  cartItems.innerHTML = cart.length;
};

// Función para remover los items del carrito
const removeProductFromCart = (existingProduct) => {
  cart = cart.filter((product) => product.id !== existingProduct.id);
  checkCartState();
};

const btnRemove = (e) => {
  if (e.target.classList.contains("remove")) {
    cart = cart.filter((item) => item.id !== e.target.dataset.id);
    checkCartState();
  }
};

// Función para que se reste una unidad al producto
const btnLess = (existingProduct) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === existingProduct.id
      ? { ...cartProduct, quantity: Number(cartProduct.quantity) - 1 }
      : cartProduct;
  });
};

const logicBtnLess = (id, e) => {
  const existingCartProduct = cart.find((item) => item.id === id);

  if (existingCartProduct.quantity === 1) {
    if (window.confirm("Desea eliminar el producto del carrito")) {
      removeProductFromCart(existingCartProduct);
    }
    return;
  }
  btnLess(existingCartProduct);
};

// Función para que se sume una unidad al producto
const btnPlus = (existingProduct) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === existingProduct.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct;
  });
};

const logicBtnPlus = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  btnPlus(existingCartProduct);
};

// Función general para que funcione el restar o agregar una unidad al producto
const productQuantity = (e) => {
  if (e.target.classList.contains("fa-chevron-left")) {
    logicBtnLess(e.target.dataset.id);
  } else if (e.target.classList.contains("fa-chevron-right")) {
    logicBtnPlus(e.target.dataset.id);
  }
  checkCartState();
};

// Función para completar la compra

const resetCart = () => {
  cart = [];
  checkCartState();
};

const cartAction = (confirmMsg, successMsg) => {
  if (!cart.length) return;
  if (window.confirm(confirmMsg)) {
    resetCart();
    alert(successMsg);
  }
};

const completeBuy = () => {
  cartAction("¿Desea realizar la compra?", "Compra realizada con éxito");
};

// Funcion incializadora
const init = () => {
  renderProducts();
  categories.addEventListener("click", addFilter);
  cartIcon.addEventListener("click", toggleCart);
  menuBurger.addEventListener("click", toggleMenu);
  window.addEventListener("scroll", closeOnScroll);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showTotal);
  productsDOM.addEventListener("click", addProducts);
  document.addEventListener("DOMContentLoaded", showCartQuantity);
  disabledBtn(buyCart);
  cartContent.addEventListener("click", productQuantity);
  cartContent.addEventListener("click", btnRemove);
  buyCart.addEventListener("click", completeBuy);
};

init();
