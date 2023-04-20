// Get the product list element
const productList = document.getElementById('product-list');

// Get the cart element
const cart = document.getElementById('cart');

// Get the cart list element
const cartList = document.getElementById('cart-list');

// Get the cart total element
const cartTotal = document.getElementById('cart-total');

// Create an empty cart array
let cartItems = [];

// Add click event listeners to each Add to Cart button
const addButtons = document.querySelectorAll('.add-to-cart');
addButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

// Add an item to the cart
function addToCart(event) {
  // Get the product information
  const product = event.target.parentNode;
  const productName = product.querySelector('h2').innerText;
  const productPrice = product.querySelector('p').innerText;

  // Check if the item is already in the cart
  const existingItem = cartItems.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ name: productName, price: productPrice, quantity: 1 });
  }

  // Update the cart list
  updateCart();
}

// Remove an item from the cart
function removeFromCart(event) {
  // Get the item name and remove it from the cart
  const itemName = event.target.parentNode.querySelector('p').innerText;
  cartItems = cartItems.filter(item => item.name !== itemName);

  // Update the cart list
  updateCart();
}

// Update the cart list and total
function updateCart() {
  // Clear the current cart list
  cartList.innerHTML = '';

  // Add each item to the cart list
  cartItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.classList.add('cart-item');
    listItem.innerHTML = `
      <p>${item.name}</p>
      <p>$${item.price}</p>
      <p>${item.quantity}</p>
      <button class="remove-from-cart">Remove</button>
    `;
    const removeButton = listItem.querySelector('.remove-from-cart');
    removeButton.addEventListener('click', removeFromCart);
    cartList.appendChild(listItem);
  });

  // Update the cart total
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.innerHTML = `Total: $${total.toFixed(0)}`;
}

// Initialize the cart
updateCart();