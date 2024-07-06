const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];

document.getElementById('show-products').addEventListener('click', () => {
    displayProducts(products);
});

document.getElementById('calculate-total').addEventListener('click', () => {
    calculateTotalPrice(products);
});

document.getElementById('filter-category').addEventListener('click', () => {
    const category = document.getElementById('category-input').value;
    filterProductsByCategory(category);
});

document.getElementById('search-product').addEventListener('click', () => {
    const name = document.getElementById('search-input').value;
    searchProductByName(name);
});

const displayProducts = (products) => {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product';

        const productTitle = document.createElement('h2');
        productTitle.textContent = product.name;

        const productCategory = document.createElement('p');
        productCategory.textContent = `Categoría: ${product.category}`;

        const productPrice = document.createElement('p');
        productPrice.textContent = `Precio: $${product.price}`;

        const productStock = document.createElement('p');
        productStock.textContent = `Stock: ${product.stock}`;

        productCard.appendChild(productTitle);
        productCard.appendChild(productCategory);
        productCard.appendChild(productPrice);
        productCard.appendChild(productStock);

        productsContainer.appendChild(productCard);
    });
};

const calculateTotalPrice = (products) => {
    const totalPrice = products.reduce((total, product) => total + product.price, 0);
    document.getElementById('total-price').textContent = `Precio Total: $${totalPrice}`;
};

const filterProductsByCategory = (category) => {
    const filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    displayProducts(filteredProducts);
};

const searchProductByName = (name) => {
    const product = products.find(product => product.name.toLowerCase() === name.toLowerCase());
    const searchResult = document.getElementById('search-result');
    if (product) {
        searchResult.textContent = `Producto encontrado: ${product.name}, Categoría: ${product.category}, Precio: $${product.price}, Stock: ${product.stock}`;
    } else {
        searchResult.textContent = 'Producto no encontrado';
    }
};

const checkAvailability = (products) => {
    const allAvailable = products.every(product => product.stock > 0);
    document.getElementById('availability').textContent = allAvailable ? 'Todos los productos están disponibles' : 'Hay productos agotados';
};

const getProductNames = (products) => {
    const productNames = products.map(product => product.name);
    console.log('Nombres de productos:', productNames.join(', '));
};

try {
    displayProducts(products);
    checkAvailability(products);
    getProductNames(products);
} catch (error) {
    document.getElementById('error-message').textContent = `Error: ${error.message}`;
}
