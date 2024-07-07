document.addEventListener('DOMContentLoaded', () => {
    const btnCart = document.querySelector('.container-icon');
    const containerCartProducts = document.querySelector('.container-cart-products');
    const addButtons = document.querySelectorAll('.info-product button');
    const cartProductsList = document.querySelector('.cart-products-list');
    const totalPagarElement = document.querySelector('.total-pagar');
    const contadorProductos = document.getElementById('contador-productos');
    
    let cart = [];
    let totalPagar = 0;

    btnCart.addEventListener('click', () => {
        containerCartProducts.classList.toggle('hidden-cart');
    });

    addButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = button.closest('.item');
            const title = item.querySelector('h2').innerText;
            const price = parseFloat(item.querySelector('.price').innerText.replace('$', '').replace('.', '').replace(',', '.'));

            addItemToCart(title, price);
        });
    });

    function addItemToCart(title, price) {
        const itemInCart = cart.find(item => item.title === title);
        
        if (itemInCart) {
            itemInCart.quantity++;
        } else {
            cart.push({ title, price, quantity: 1 });
        }

        totalPagar += price;
        updateCart();
    }

    function updateCart() {
        cartProductsList.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-product');
            cartItem.innerHTML = `
                <div class="info-cart-product">
                    <span class="cantidad-producto-carrito">${item.quantity}</span>
                    <p class="titulo-producto-carrito">${item.title}</p>
                    <span class="precio-producto-carrito">$${item.price}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            `;
            cartItem.querySelector('.icon-close').addEventListener('click', () => {
                removeItemFromCart(item.title);
            });
            cartProductsList.appendChild(cartItem);
        });

        totalPagarElement.innerText = `$${totalPagar.toLocaleString('es-CL')}`;
        contadorProductos.innerText = cart.length;
    }

    function removeItemFromCart(title) {
        const itemIndex = cart.findIndex(item => item.title === title);
        
        if (itemIndex > -1) {
            totalPagar -= cart[itemIndex].price * cart[itemIndex].quantity;
            cart.splice(itemIndex, 1);
        }

        updateCart();
    }
});
