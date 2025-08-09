// Cart functionality
let cart = [];

// Load cart from localStorage on page load
function loadCart() {
  const savedCart = localStorage.getItem('fashionCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  updateCartCount();
  displayCartItems();
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('fashionCart', JSON.stringify(cart));
  updateCartCount();
}

// Add item to cart
window.addToCart = function(id, name, price, image) {
  console.log('Adding to cart:', {id, name, price, image});
  
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      image: image,
      quantity: 1
    });
  }
  
  saveCart();
  console.log('Cart after adding:', cart);
  showCartNotification(name);
}

// Show cart notification
function showCartNotification(productName) {
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.innerHTML = `
    <div style="position: fixed; top: 20px; right: 20px; background: #4CAF50; color: white; padding: 15px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2); z-index: 1000;">
      ✓ Đã thêm ${productName} vào giỏ hàng!
    </div>
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Update cart count in header
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartLink = document.querySelector('a[href="cart.html"]');
  if (cartLink) {
    cartLink.textContent = `Giỏ hàng (${cartCount})`;
  }
}

// Remove item from cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  displayCartItems();
}

// Update item quantity
function updateQuantity(id, newQuantity) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity = parseInt(newQuantity);
    saveCart();
    displayCartItems();
  }
}

// Display cart items on cart page
function displayCartItems() {
  const cartTable = document.getElementById('cart-table');
  const cartTotal = document.getElementById('total');
  
  if (!cartTable || !cartTotal) return;

  const tbody = cartTable.querySelector('tbody');
  tbody.innerHTML = '';

  let total = 0;

  if (cart.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px;">Giỏ hàng trống</td></tr>';
    cartTotal.textContent = '0';
    return;
  }

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;">
        ${item.name}
      </td>
      <td>${item.price.toLocaleString()}đ</td>
      <td>
        <input type="number" value="${item.quantity}" min="1" 
               onchange="updateQuantity(${item.id}, this.value)" style="width: 60px;">
      </td>
      <td>${subtotal.toLocaleString()}đ</td>
      <td>
        <button class="remove" onclick="removeFromCart(${item.id})">Xóa</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  cartTotal.textContent = total.toLocaleString();
}

// Clear entire cart
function clearCart() {
  cart = [];
  saveCart();
  displayCartItems();
}

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", function () {
  loadCart();
});
