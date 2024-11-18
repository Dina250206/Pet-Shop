document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountElement = document.getElementById("cart-count");
    const cartModal = document.getElementById("cart-modal");
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const clearCartButton = document.getElementById("clear-cart");
    const cartButton = document.getElementById("cart-btn");
    const closeCartButton = document.getElementById("close-cart");
    const checkoutButton = document.getElementById("checkout-button");
    const paymentForm = document.getElementById("payment-form");

    // Update cart count
    const updateCartCount = () => {
        const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartCountElement.textContent = totalCount;
    };

    // Save cart to localStorage
    const updateCart = () => {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    };

    // Render cart items in modal
    const renderCart = () => {
        cartItemsContainer.innerHTML = ""; // Clear previous items
        let totalPrice = 0;

        cart.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price} x ${item.quantity}</span>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(li);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
        paymentForm.style.display = totalPrice > 0 ? "block" : "none"; // Show form if there are items
    };

    // Open modal
    cartButton.addEventListener("click", () => {
        cartModal.style.display = "flex"; // Show modal
        renderCart();
    });

    // Close modal
    closeCartButton.addEventListener("click", () => {
        cartModal.style.display = "none"; // Hide modal
    });

    // Clear cart
    clearCartButton.addEventListener("click", () => {
        cart.length = 0;
        localStorage.removeItem("cart");
        renderCart();
        updateCartCount();
    });

    // Remove item from cart
    cartItemsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-item")) {
            const id = e.target.dataset.id;
            const index = cart.findIndex(item => item.id === id);
            if (index > -1) {
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
                updateCartCount();
            }
        }
    });

    // Add products to cart
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const id = button.dataset.id;
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);

            const existingProduct = cart.find(item => item.id === id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            updateCart();
            alert(`${name} added to cart.`);
        });
    });

    // Handle payment form submission
    paymentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const cardName = document.getElementById("card-name").value;
        const cardNumber = document.getElementById("card-number").value;
        const expiryDate = document.getElementById("expiry-date").value;
        const cvv = document.getElementById("cvv").value;

        if (!cardName || !cardNumber || !expiryDate || !cvv) {
            alert("Please fill in all payment details.");
            return;
        }

        alert("Payment successful! Thank you for your purchase.");
        cart.length = 0;
        localStorage.removeItem("cart");
        renderCart();
        updateCartCount();
        cartModal.style.display = "none";
    });

    // Initialize cart count on page load
    updateCartCount();
});
