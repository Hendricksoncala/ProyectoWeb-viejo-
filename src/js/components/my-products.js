import { LitElement, css, html } from 'lit';
import { getAllProducts, addProduct, deleteProduct, getTrolleyFromLocalStorage } from '../modules/products.js';

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
        this.products = await getAllProducts();
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
                                <div>
                                    Total: ${totalPrice}
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
            @media screen and (max-width: 1050px) {
                .products_container {
                    grid-template-columns: 1fr 1fr;
                    width: 100%;
                }
            }
            @media screen and (max-width: 550px) and (min-width: 300px) {
                .products_container {
                    grid-template-columns: 1fr;
                    width: 100%;
                }
            }
        `;
    }
}

customElements.define('my-products', MyProducts);