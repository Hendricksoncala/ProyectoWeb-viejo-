import { LitElement, css, html } from 'lit';

import { getAllProducts, addProduct, deleteProduct, getTrolleyFromLocalStorage, getAllJacket, getAllTshirt, deleteAllFromCart, getAllPants } from '../modules/products.js';

export class MyProducts extends LitElement {
    static properties = {
        products: { type: Array },
        category: { type: String },
        carrito: { type: Array }
    }

    constructor() {
        super();
        this.products = [];
        this.category = 'all';
        this.carrito = getTrolleyFromLocalStorage().carrito;
    }

    async updated(changedProperties) {
        if (changedProperties.has('category')) {
            await this.loadProducts();
        }
    }

    async loadProducts() {
        switch (this.category) {
            case 'coats':
                this.products = await getAllJacket();
                break;
            case 'shirts':
                this.products = await getAllTshirt();
                break;
            case 'jeans':
                this.products = await getAllPants();
                break;
            case 'storage':
                break;
            default:
                this.products = await getAllProducts();
        }
    }

    async add_product(product) {
        let carritoActualizado = await addProduct(product);
        this.carrito = carritoActualizado.carrito;
        this.dispatchEvent(new CustomEvent('update-carrito', { detail: this.carrito }));
        this.requestUpdate();
    }

    async delete_product(product) {
        let carritoActualizado = await deleteProduct(product.id);
        this.carrito = carritoActualizado.carrito;
        this.dispatchEvent(new CustomEvent('update-carrito', { detail: this.carrito }));
        this.requestUpdate();
    }

    async handleEmptyCart() {
        const confirmed = window.confirm("¿Seguro que quieres comprar todo?");
        if (confirmed) {
            await deleteAllFromCart();
            this.carrito = [];
            this.dispatchEvent(new CustomEvent('update-carrito', { detail: this.carrito }));
            this.requestUpdate();
        }
    }

    async handleClearCart() {
        const confirmed = window.confirm("¿Seguro que quieres vaciar el carrito?");
        if (confirmed) {
            await deleteAllFromCart();
            this.carrito = [];
            this.dispatchEvent(new CustomEvent('update-carrito', { detail: this.carrito }));
            this.requestUpdate();
        }
    }

    render() {
        const totalPrice = this.carrito.reduce((sum, product) => sum + product.precio, 0);

        return html`
            <div>
                ${this.category === 'storage' ? html`
                    <div>
                        ${this.carrito.length === 0 ? html`<p>No hay productos en el carrito</p>` : html`
                            <div class="products_container">
                                ${this.carrito.map(product => html`
                                    <div class="card">
                                        <img class="card-img" src="${product.imagen}"/>
                                        <div class="card-info">
                                            <p class="text-title">${product.nombre}</p>
                                            <p class="text-body">${product.descripcion}</p>
                                        </div>
                                        <div class="card-footer">
                                            <span class="text-title">${product.precio}</span>
                                            <button class="card-button" @click=${() => this.delete_product(product)}>
                                                <svg class="svg-icon" viewBox="0 0 20 20">
                                                    <!-- SVG path -->
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                `)}
                                <div class="total">
                                    <p>Total: $${totalPrice}</p>
                                    <button class="delete_all" @click=${this.handleEmptyCart}>COMPRAR AHORA</button>

                                </div>
                                <div class="delete">
                                    <button class="clear_cart" @click=${this.handleClearCart}>VACIAR CARRITO</button>
                                </div>
                            </div>
                        `}
                    </div>
                ` : html`
                    <div class="products_container">
                        ${this.products.map(product => html`
                            <div class="card">
                                <img class="card-img" src="${product.imagen}"/>
                                <div class="card-info">
                                    <p class="text-title">${product.nombre}</p>
                                    <p class="text-body">${product.descripcion}</p>
                                </div>
                                <div class="card-footer">
                                    <span class="text-title">${product.precio}</span>
                                    <button class="card-button" @click=${() => this.add_product(product)}>
                                        <svg class="svg-icon" viewBox="0 0 20 20">
                                            <!-- SVG path -->
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        `)}
                    </div>
                `}
            </div>
        `;
    }

    static get styles() {
        return css`
            @import url(variables.css);
            .products_container {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 1rem;
                align-items: center;
            }
            .card {
                width: 80%;
                height: auto;
                padding: .6em;
                background: #f5f5f5;
                position: relative;
                overflow: visible;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
            }
            .card-img {
                background-color: #ffcaa6;
                height: 200px;
                width: 100%;
                border-radius: .5rem;
                transition: .3s ease;
                margin: 0 5px 5px 0;
            }
            .card-info {
                padding-top: 5%;
            }
            svg {
                width: 20px;
                height: 20px;
            }
            .card-footer {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 10px;
                border-top: 1px solid #ddd;
            }
            .text-title {
                font-weight: 900;
                font-size: 1.2em;
                line-height: 1;
            }
            .text-body {
                font-size: .8em;
                padding-bottom: 10px;
            }
            .card-button {
                border: 1px solid #252525;
                display: flex;
                padding: .3em;
                cursor: pointer;
                border-radius: 50px;
                transition: .3s ease-in-out;
            }
            .card-img:hover {
                transform: translateY(-5%);
                box-shadow: rgba(226, 196, 63, 0.25) 0px 13px 47px -5px, rgba(180, 71, 71, 0.3) 0px 8px 16px -8px;
            }
            .card-button:hover {
                border: 1px solid #ffcaa6;
                background-color: #ffcaa6;
            }
            .total {
                display: flex;
                align-items: center;
                background-color: #e2e2e2; /* Fondo gris claro */
                border-radius: 1em;
                overflow: hidden; /* Para asegurarnos de que el borde sea uniforme */

            }
            
            .total p {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1em; /* Espaciado alrededor del texto */
                margin: 0; /* Eliminar márgenes */
                font-size: 1.2em; /* Tamaño de fuente */
                color:#174D4D; /* Color del texto */
                background-color: #e2e2e2; /* Fondo gris claro */
                border: none; /* Sin borde */
            }
            
            .total button {
                border: none;
                background: #174D4D; /* Color morado */
                color: white; /* Color del texto */
                padding: 1em; /* Espaciado dentro del botón */
                cursor: pointer;
                transition: background-color 0.3s ease-in-out;
                font-size: 1em; /* Tamaño de fuente */

            }
            
            .total button:hover {
                background-color: #48e; /* Color morado oscuro para hover */
            }
            
            .total p, .total button {
                border-radius: 1em; /* Radio de borde para ambos elementos */
            }



            .delete {
                display: flex;
                align-items: center;
                background-color: #e2e2e2; /* Fondo gris claro */
                border-radius: 1em;
                overflow: hidden; /* Para asegurarnos de que el borde sea uniforme */

            }
            
            .delete p {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1em; /* Espaciado alrededor del texto */
                margin: 0; /* Eliminar márgenes */
                font-size: 1.2em; /* Tamaño de fuente */
                color:#991B1B; /* Color del texto */
                background-color: #e2e2e2; /* Fondo gris claro */
                border: none; /* Sin borde */
            }
            
            .delete button {
                border: none;
                background: #991B1B; /* Color rojo */
                color: white; /* Color del texto */
                padding: 1em; /* Espaciado dentro del botón */
                cursor: pointer;
                transition: background-color 0.3s ease-in-out;
                font-size: 1em; /* Tamaño de fuente */

            }
            
            .delete button:hover {
                background-color: #FF0000; /* Color rojo oscuro para hover */
            }
            
            .delete p, .delete button {
                border-radius: 1em; /* Radio de borde para ambos elementos */
            }
            @media screen and (max-width: 400px){
                .products_container {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    gap: 1rem;
                    align-items: center;
                }
            }
        
            @media screen and (max-width: 600px){
                .products_container {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    align-items: center;
                }
            }
        `;
    }
}

customElements.define('my-products', MyProducts);