let cart = JSON.parse(localStorage.getItem("cart")) || [];

// AJOUT PANIER
function addToCart(name, price, image) {
  cart.push({name, price, image, quantity:1});
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartIcon();
}

// MAJ PANIER
function updateCartIcon(){
  const icon = document.getElementById("cart-icon");
  if(icon){
    icon.textContent = `🛒 (${cart.length})`;
  }
}

// RECHERCHE
function searchProducts() {
  const value = document.getElementById("search").value.toLowerCase();
  const products = document.querySelectorAll(".product");

  products.forEach(p => {
    const name = p.dataset.name;
    p.style.display = name.includes(value) ? "block" : "none";
  });
}

// TRI
function sortProducts(type) {
  const container = document.getElementById("product-list");
  const items = Array.from(container.querySelectorAll(".product"));

  items.sort((a, b) => {
    let priceA = parseFloat(a.dataset.price);
    let priceB = parseFloat(b.dataset.price);

    if(type === "low") return priceA - priceB;
    if(type === "high") return priceB - priceA;
    return 0;
  });

  container.innerHTML = "";
  items.forEach(item => container.appendChild(item));
}

// REDIRECTION PANIER
document.getElementById("cart-icon").addEventListener("click", () => {
  window.location.href = "cart.html";
});

// INIT
updateCartIcon();

