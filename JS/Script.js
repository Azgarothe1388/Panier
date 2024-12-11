
const products = [
  { id: 1, name: "Article 1", price: 10 },
  { id: 2, name: "Article 2", price: 15 },
  { id: 3, name: "Article 3", price: 20 },
  { id: 4, name: "Article 4", price: 25 },
  { id: 5, name: "Article 5", price: 30 },
  { id: 6, name: "Article 6", price: 35 },
  { id: 7, name: "Article 7", price: 40 },
  { id: 8, name: "Article 8", price: 45 },
  { id: 9, name: "Article 9", price: 50 },
  { id: 10, name: "Article 10", price: 86 },
  { id: 11, name: "Article 11", price: 5 },
  { id: 12, name: "Article 12", price: 34 },
];

let cart = [];

const productsContainer = document.getElementById("products");
products.forEach(product => {
  const productElement = document.createElement("div");
  productElement.classList.add("product");
  productElement.innerHTML = `
    <h3>${product.name}</h3>
    <p>${product.price}€</p>
    <button onclick="addToCart(${product.id})">Ajouter au panier</button>
  `;
  productsContainer.appendChild(productElement);
});

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.product.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  alert(`${product.name} a été ajouté au panier.`);
}

document.getElementById("viewCartBtn").addEventListener("click", () => {
  document.getElementById("shop").style.display = "none";
  document.getElementById("cartPage").style.display = "block";
  displayCart();
});

function displayCart() {
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";

  cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <span class="item-name">${item.product.name}</span>
      <button onclick="updateQuantity(${item.product.id}, -1)">-</button>
      <span>${item.quantity}</span>
      <button onclick="updateQuantity(${item.product.id}, 1)">+</button>
      <button onclick="removeFromCart(${item.product.id})">Supprimer</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  updateTotal();
}

function updateQuantity(productId, change) {
  const item = cart.find(item => item.product.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      displayCart();
    }
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.product.id !== productId);
  displayCart();
}

function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  document.getElementById("total").textContent = `Total: ${total}€`;
}

document.getElementById("backToShopBtn").addEventListener("click", () => {
  document.getElementById("shop").style.display = "block";
  document.getElementById("cartPage").style.display = "none";
  document.getElementById("products").innerHTML = "";
  products.forEach(product => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.price}€</p>
      <button onclick="addToCart(${product.id})">Ajouter au panier</button>
    `;
    document.getElementById("products").appendChild(productElement);
  });
});

document.getElementById("confirmOrderBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Votre panier est vide.");
  } else {
    alert("Commande confirmée!");
    cart = [];
    displayCart();
  }
});
