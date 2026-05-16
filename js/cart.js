// NUMÉRO WHATSAPP (À MODIFIER)
const phoneNumber = "243895006995";

// PANIER
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const totalEl = document.getElementById("total");

// AFFICHER PANIER
function displayCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {

    if(!item.quantity) item.quantity = 1;

    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.image || 'https://via.placeholder.com/100'}">

      <div class="cart-info">
        <h4>${item.name}</h4>
        <p>${item.price}$</p>

        <div class="quantity">
          <button onclick="decrease(${index})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increase(${index})">+</button>
        </div>

        <p class="remove" onclick="removeItem(${index})">Supprimer</p>
      </div>
    `;

    cartItems.appendChild(div);
  });

  totalEl.textContent = total;
  saveCart();
}

// AUGMENTER
function increase(index) {
  cart[index].quantity++;
  displayCart();
}

// DIMINUER
function decrease(index) {
  if(cart[index].quantity > 1){
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  displayCart();
}

// SUPPRIMER
function removeItem(index) {
  cart.splice(index, 1);
  displayCart();
}

// SAUVEGARDE
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// COMMANDE WHATSAPP
function orderWhatsApp() {
  const prenom = document.getElementById("client-prenom").value;
  const name = document.getElementById("client-name").value;
  const phone = document.getElementById("client-phone").value;
  const city = document.getElementById("client-city").value;
  const address = document.getElementById("client-address").value;

  // VALIDATION
  if(!name || !phone || !city || !address){
    alert("Veuillez remplir toutes les informations !");
    return;
  }

  if(cart.length === 0){
    alert("Panier vide !");
    return;
  }

  let message = "🛒 COMMANDE CLIENT\n\n";

  message += `prenom: ${prenom}\n`;
  message += `Nom: ${name}\n`;
  message += `Téléphone: ${phone}\n`;
  message += `Ville: ${city}\n`;
  message += `Adresse: ${address}\n\n`;

  message += "Produits:\n\n";

  let total = 0;

  cart.forEach((item, index) => {
    let qty = item.quantity || 1;
    let price = item.price * qty;

    message += `${index + 1}. ${item.name}\n`;
    message += `Quantité: ${qty}\n`;
    message += `Prix: ${price}$\n\n`;

    total += price;
  });

  message += `Total: ${total}$`;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// INIT
displayCart();