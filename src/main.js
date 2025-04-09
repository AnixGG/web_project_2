const API_URL = 'https://fakestoreapi.com';
let allProducts = [];

document.addEventListener('DOMContentLoaded', async () => {
    const productsContainer = document.getElementById('products');
    const productDetailsContainer = document.getElementById('product-details');
    const loadingElement = document.getElementById('loading');
    const cartCounter = document.getElementById('cart-counter');
    const cartPreview = document.getElementById('cart-preview');
    const viewProductsBtn = document.getElementById('view-products');

    // Загрузка всех товаров
    async function loadProducts() {
        try {
            loadingElement.classList.remove('hidden');
            productsContainer.classList.add('hidden');
            productDetailsContainer.classList.add('hidden');
            
            const response = await fetch(`${API_URL}/products`);
            allProducts = await response.json();
            
            displayProducts(allProducts);
            loadingElement.classList.add('hidden');
            productsContainer.classList.remove('hidden');
        } catch (error) {
            loadingElement.textContent = 'Failed to load products. Please try again later.';
            console.error('Error fetching products:', error);
        }
    }

    // Отображение товаров
    function displayProducts(products) {
        productsContainer.innerHTML = '';
        
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-card';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">$${product.price}</div>
                    <button class="view-details" data-id="${product.id}">View Details</button>
                </div>
            `;
            productsContainer.appendChild(productElement);
        });

        // Обработчики для кнопок "View Details"
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                showProductDetails(productId);
            });
        });
    }

    // Показать детали товара
    async function showProductDetails(productId) {
        try {
            loadingElement.classList.remove('hidden');
            productsContainer.classList.add('hidden');
            productDetailsContainer.classList.add('hidden');
            
            const response = await fetch(`${API_URL}/products/${productId}`);
            const product = await response.json();
            
            productDetailsContainer.innerHTML = `
                <button id="back-to-products">← Back to Products</button>
                <img src="${product.image}" alt="${product.title}" class="detail-image">
                <h2 class="detail-title">${product.title}</h2>
                <div class="detail-price">$${product.price}</div>
                <span class="detail-category">${product.category}</span>
                <p class="detail-description">${product.description}</p>
                <div class="rating">Rating: ${product.rating.rate} (${product.rating.count} reviews)</div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart ($ ${product.price})</button>
            `;
            
            document.getElementById('back-to-products').addEventListener('click', () => {
                productsContainer.classList.remove('hidden');
                productDetailsContainer.classList.add('hidden');
            });
            
            document.querySelector('.add-to-cart').addEventListener('click', () => {
                addToCart(product.id, product.price);
            });
            
            loadingElement.classList.add('hidden');
            productDetailsContainer.classList.remove('hidden');
        } catch (error) {
            loadingElement.textContent = 'Failed to load product details. Please try again later.';
            console.error('Error fetching product:', error);
        }
    }

    // Работа с корзиной
    function addToCart(productId, price) {
        let cart = JSON.parse(localStorage.getItem('cart')) || { items: {}, total: 0 };
        
        if (!cart.items[productId]) {
            cart.items[productId] = { quantity: 0, price: price };
        }
        
        cart.items[productId].quantity += 1;
        cart.total += parseFloat(price);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCartUI();
        alert('Product added to cart!');
    }

    function updateCartUI() {
        const cart = JSON.parse(localStorage.getItem('cart')) || { items: {}, total: 0 };
        const totalItems = Object.values(cart.items).reduce((sum, item) => sum + item.quantity, 0);
        
        cartCounter.textContent = totalItems;
        cartPreview.textContent = `Cart: ${totalItems} items ($${cart.total.toFixed(2)})`;
    }

    // Обработчики событий
    viewProductsBtn.addEventListener('click', () => {
        productsContainer.classList.remove('hidden');
        productDetailsContainer.classList.add('hidden');
    });

    // Инициализация
    await loadProducts();
    updateCartUI();
});