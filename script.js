const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotalElement = document.getElementById('cart-subtotal');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

const apiResponse = [
    { "id": 1, "name": "Sofa", "price": 19.99, "quantity": 2, "image": "https://mysleepyhead.com/media/catalog/product/4/t/4thaug_2ndhalf5889_green.jpg" },
    { "id": 2, "name": "Shoes", "price": 9.99, "quantity": 1, "image": "https://fausto.in/cdn/shop/products/FST_FOBWC-1503_GOLDEN_1-1_MOOD_6611f676-23f5-4eb0-bd7b-c527c4123b70_400x.jpg?v=1679576984" },
    { "id": 3, "name": "Jwellery", "price": 14.99, "quantity": 3,"image": "https://cdn.staticans.com/image/tr:e-sharpen-01,h-1440,w-1080,cm-pad_resize/catalog/toniq/product/OAW22FIJJS107/OAW22FIJJS107.jpg"}
];

function loadCartItems(items) {
    let subtotal = 0;
    cartItemsContainer.innerHTML = '';

    items.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const cartItem = document.createElement('li');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <div class="item-details">
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name}</span>
            </div>
            <div class="item-quantity">
                <input type="number" value="${item.quantity}" min="1" data-index="${index}">
            </div>
            <div class="item-price">$${itemTotal.toFixed(2)}</div>
            <div class="remove-item" data-index="${index}">&times;</div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    cartSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    cartTotalElement.textContent = `$${subtotal.toFixed(2)}`;
}

function updateCart(index, newQuantity) {
    if (newQuantity < 1) return;
    apiResponse[index].quantity = newQuantity;
    loadCartItems(apiResponse);
}

function removeCartItem(index) {
    apiResponse.splice(index, 1);
    loadCartItems(apiResponse);
}

cartItemsContainer.addEventListener('input', (e) => {
    if (e.target.tagName === 'INPUT') {
        const index = parseInt(e.target.getAttribute('data-index'));
        const newQuantity = parseInt(e.target.value);
        updateCart(index, newQuantity);
    }
});

cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        removeCartItem(index);
    }
});

checkoutBtn.addEventListener('click', () => {
    alert('Proceeding to checkout!');
});

loadCartItems(apiResponse);