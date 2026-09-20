// Regular function #1
export function calculateTotal(products) {
    return products.reduce((total, product) => {
        return total + product.price;
    }, 0);
}

// Regular function #2
export function getExpensiveProducts(products, minimumPrice) {
    return products.filter(product => product.price >= minimumPrice);
}

// Arrow function #1
export const getProductNames = (products) => {
    return products.map(product => product.name);
};

// Arrow function #2
export const formatPrice = (price) => {
    return `₦${price.toLocaleString()}`;
};