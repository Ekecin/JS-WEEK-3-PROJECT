import {
    calculateTotal,
    getExpensiveProducts,
    getProductNames,
    formatPrice
} from "./utils.js";


// ========================================
// PRODUCTS
// ========================================

const products = [
    {
        name: "Laptop",
        price: 450000,
        category: "Electronics"
    },
    {
        name: "Mouse",
        price: 15000,
        category: "Electronics"
    },
    {
        name: "Keyboard",
        price: 25000,
        category: "Electronics"
    },
    {
        name: "Headphones",
        price: 35000,
        category: "Audio"
    }
];


// ========================================
// MAP
// Question: What are the names of all products?
// ========================================

const productNames = getProductNames(products);

console.log("Product Names:", productNames);


// ========================================
// FILTER
// Question: Which products cost less than ₦30,000?
// ========================================

const affordableProducts = products.filter(
    product => product.price < 30000
);

console.log("Products under ₦30,000:", affordableProducts);


// ========================================
// REDUCE
// Question: What is the total value of all products?
// ========================================

const totalValue = calculateTotal(products);

console.log("Total value:", formatPrice(totalValue));


// ========================================
// DESTRUCTURING
// ========================================

const { name, price } = products[0];

console.log("First product:", name);
console.log("First product price:", formatPrice(price));

const [firstProduct, secondProduct] = products;

console.log("First product object:", firstProduct);
console.log("Second product object:", secondProduct);


// ========================================
// SPREAD OPERATOR
// ========================================

const exampleProduct = {
    name: "USB Cable",
    price: 5000,
    category: "Accessories"
};

const updatedProducts = [...products, exampleProduct];

console.log("Products using spread:", updatedProducts);


// ========================================
// DOM BUTTON
// ========================================

const message = document.getElementById("message");
const changeBtn = document.getElementById("changeBtn");

changeBtn.addEventListener("click", () => {
    message.textContent = "The button was clicked successfully!";
});


// ========================================
// DISPLAY PRODUCTS
// ========================================

const productsContainer = document.getElementById("products");

function displayProducts(productsToDisplay) {

    productsContainer.innerHTML = "";

    if (productsToDisplay.length === 0) {
        productsContainer.innerHTML = "<p>No products found.</p>";
        return;
    }

    productsToDisplay.forEach(product => {

        const productElement = document.createElement("div");

        productElement.classList.add("product");

        const title = document.createElement("h3");
        title.textContent = product.name;

        const priceText = document.createElement("p");
        priceText.textContent = formatPrice(product.price);

        const categoryText = document.createElement("p");
        categoryText.textContent = product.category;

        productElement.append(title, priceText, categoryText);

        productsContainer.appendChild(productElement);
    });
}


// Show products when page loads
displayProducts(products);


// ========================================
// SEARCH / FILTER
// ========================================

const searchInput = document.getElementById("searchInput");

function applySearch() {

    const searchTerm = searchInput.value.toLowerCase().trim();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    displayProducts(filteredProducts);
}

searchInput.addEventListener("input", applySearch);


// ========================================
// ADD PRODUCT FORM
// ========================================

const productForm = document.getElementById("productForm");
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const formMessage = document.getElementById("formMessage");

productForm.addEventListener("submit", (event) => {

    // Stop the page from reloading
    event.preventDefault();

    const productName = productNameInput.value.trim();
    const productPrice = Number(productPriceInput.value);

    // Create new product
    const newProduct = {
        name: productName,
        price: productPrice,
        category: "New Product"
    };

    // Add product to the actual products array
    products.push(newProduct);

    // Refresh the product display
    displayProducts(products);

    // Show success message
    formMessage.textContent =
        `${productName} has been added successfully!`;

    // Clear the form
    productForm.reset();

    console.log("New product:", newProduct);
});


// ========================================
// FETCH + ASYNC/AWAIT
// ========================================

async function fetchUsers() {

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const users = await response.json();

        console.log("Users from API:", users);

    } catch (error) {

        console.error(
            "Failed to fetch users:",
            error.message
        );
    }
}

fetchUsers();


// ========================================
// FETCH PRODUCTS FROM AN EXTERNAL API
// ========================================

const PRODUCTS_API_URL = "https://dummyjson.com/products?limit=12";

// The API prices are in US dollars, this app shows naira.
// Approximate rate - change it whenever you like.
const USD_TO_NGN = 1500;

const apiStatus = document.getElementById("apiStatus");

async function fetchProducts() {

    apiStatus.textContent = "Loading more products from the API...";

    try {

        const response = await fetch(PRODUCTS_API_URL);

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();

        // Reshape API data to match our own product objects
        const apiProducts = data.products.map(item => ({
            name: item.title,
            price: Math.round(item.price * USD_TO_NGN),
            category: item.category
        }));

        // Spread the API products into the existing array
        products.push(...apiProducts);

        // Re-render (respects anything already typed in the search box)
        applySearch();

        apiStatus.textContent =
            `Loaded ${apiProducts.length} products from the API.`;

        console.log("Products from API:", apiProducts);

    } catch (error) {

        // If the request fails, the page still works with the local products
        apiStatus.textContent =
            "Could not load products from the API. Showing local products only.";

        console.error("Failed to fetch products:", error.message);
    }
}

fetchProducts();
