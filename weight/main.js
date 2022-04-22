class Product {
    constructor(name, code, price, background = 'grey') {
        Product.index = Product.index ? Product.index + 1 : 1; // to generate id for each product
        this.id = Product.index;
        this.name = name;
        this.code = code;
        this.price = price;
        this.background = background;
        this.active = false;
    }

    calculate(kilogram = 0) {
        return (this.price * kilogram).toFixed(2);
    }
}

function renderProducts(container, products) {
    for (const product of products) {
        container.innerHTML += `
            <div class="product js-product ${product.active ? 'active' : ''}"
                 style="background-color: ${product.background};" 
                 data-product-id="${product.id}"
            >
                <span class="product-name">${product.name}</span>
                <span class="product-code">Код: ${product.code}</span>
                <span>${product.price.toFixed(2)}грн</span>
            </div>
        `;
    }
}

function renderProductResult(container, name, total) {
    container.innerHTML = `
        Сума за ${name} складає ${total}грн;
    `;
}

const products = [
    new Product('Буряк', '39', 38, 'rgba(201, 44, 44, 0.837)'),
    new Product('Морква', '32', 32, 'rgba(239, 129, 27, 0.837)'),
    new Product('Картопля', '42', 44, 'rgba(183, 181, 175, 0.837)'),
    new Product('Капуста', '65', 36, 'rgba(103, 208, 28, 0.837)'),
    new Product('Цибуля', '78', 22, 'rgb(242 230 20 / 84%)'),
    new Product('Часник', '81', 23, 'rgb(242 198 20 / 84%)'),
];

const productContainer = document.getElementById('product-container');
const resultContainer = document.getElementById('result-container');
const input = document.getElementById('input');
const button = document.getElementById('button');
let product = null;

renderProducts(productContainer, products);

productContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('js-product') || event.target.parentElement.classList.contains('js-product')) {
        
        const productId = event.target.classList.contains('js-product') ? 
            event.target.getAttribute('data-product-id') : 
            event.target.parentElement.getAttribute('data-product-id');

        if (product) product.active = false;
        product = products.find(product => product.id === Number(productId));
        product.active = true;

        // do new render of products
        productContainer.innerHTML = '';
        renderProducts(productContainer, products);
    }
})

button.addEventListener('click', () => {
    if (input.value && product) {
        const result = product.calculate(input.value);

        renderProductResult(resultContainer, product.name, result);
        // console.log('result: ', result);
    }
})

