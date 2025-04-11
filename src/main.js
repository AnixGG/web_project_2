const API_URL = 'https://fakestoreapi.com';
let allProducts = [];


const elements = {
    productsContainer: document.querySelector('.products'),
    productDetailsContainer: document.querySelector('.product-details'),
    loadingElement: document.querySelector('.loading'),
};


async function loadAllProducts() {
    try {
        elements.loadingElement.classList.remove('hidden');
        elements.productsContainer.classList.add('hidden');
        elements.productDetailsContainer.classList.add('hidden');

        const response = await fetch(`${API_URL}/products`);
        allProducts = await response.json();

        displayProducts(allProducts);
        elements.loadingElement.classList.add('hidden');
        elements.productsContainer.classList.remove('hidden');
    } catch (error) {
        elements.loadingElement.textContent = 'Ошибка загрузки';
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <h4 class="product-title">${product.title}</h4>
                    <div class="product-price">$${product.price}</div>
                    <button class="view-details" data-id="${product.id}">Details</button>
                </div>
            `;
        elements.productsContainer.appendChild(productElement);
    });

    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            showProductDetails(productId);
        });
    });

}

async function showProductDetails(productId) {
    try {
        elements.loadingElement.classList.remove('hidden');
        elements.productsContainer.classList.add('hidden');
        elements.productDetailsContainer.classList.add('hidden');

        const response = await fetch(`${API_URL}/products/${productId}`);
        const product = await response.json();

        elements.productDetailsContainer.innerHTML = `
                <button class="back-2-products">Back</button>
                <img src="${product.image}" alt="${product.title}" class="detail-image">
                <h2 class="detail-title">${product.title}</h2>
                <div class="detail-price">$${product.price}</div>
                <span class="detail-category">${product.category}</span>
                <p class="detail-description">${product.description}</p>
                <div class="rating">Rating: ${product.rating.rate} (${product.rating.count})</div>
            `;

        document.querySelector(".back-2-products").addEventListener('click', () => {
            elements.productsContainer.classList.remove('hidden');
            elements.productDetailsContainer.classList.add('hidden');
        });
        elements.loadingElement.classList.add('hidden');
        elements.productDetailsContainer.classList.remove('hidden');
    } catch {
        elements.loadingElement.textContent = 'Ошибка загрузки';
        console.error('Error fetching product:', error);
    }
}


loadAllProducts();