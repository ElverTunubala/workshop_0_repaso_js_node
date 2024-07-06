document.getElementById('fetch-products').addEventListener('click', () => {
    fetchProducts();
});

document.getElementById('search-input').addEventListener('input', (e) => {
    filterProducts(e.target.value);
});

let allProducts = [];

const fetchProducts = () => {
    fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(products => {
            allProducts = products;
            displayProducts(products);
        })
        .catch(error => {
            displayError(error);
        });
};

const displayProducts = (products) => {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product';

        const productImage = document.createElement('img');
        productImage.src = product.images[0];
        productImage.alt = product.title;

        const productTitle = document.createElement('h2');
        productTitle.textContent = product.title;

        const productPrice = document.createElement('p');
        productPrice.textContent = `$${product.price}`;

        productCard.appendChild(productImage);
        productCard.appendChild(productTitle);
        productCard.appendChild(productPrice);

        productsContainer.appendChild(productCard);
    });
};

const filterProducts = (query) => {
    const filteredProducts = allProducts.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filteredProducts);
};

const displayError = (error) => {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${error.message}`;
};
