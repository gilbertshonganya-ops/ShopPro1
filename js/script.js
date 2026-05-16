let cart = JSON.parse(localStorage.getItem("cart")) || [];

// AJOUT AU PANIER
function addToCart(name, price, image) {
  cart.push({name, price, image});
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartIcon();
}

// MAJ ICÔNE
function updateCartIcon() {
  const cartIcon = document.getElementById("cart-icon");
  if(cartIcon){
    cartIcon.textContent = `🛒 (${cart.length})`;
  }
}

// REDIRECTION PANIER
document.getElementById("cart-icon").addEventListener("click", () => {
  window.location.href = "cart.html";
});

// INIT
updateCartIcon();