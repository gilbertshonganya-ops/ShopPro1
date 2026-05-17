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

//resultat de la barre de rechercher

function searchProducts(){
  let value=document.getElementById("searchInput").value.toLowerCase();
  let container=document.getElementById("search-results");
  container.innerHTML="";
  if(value==="") return;
  let results=allProducts.filter(product=>product.name.toLowerCase().includes(value));
  
  results.forEach(product=>{
    container.innerHTML+=`<div class="result-item"onclick="window.location.href='${product.page}'">
    <img src="${product.image}">
    
    <div>
      <h4>${product.name}</h4>
      <p>${product.price}</p>
    </div>

</div>`;

});

}
