
import { LitElement, css, html } from 'lit'
import { MyProducts } from './my-products'
import {
    getAllJacket,
    getAllTshirt,
    getAllPants,
    getTrolleyFromLocalStorage
} from '../modules/products.js'

export class MyElement extends LitElement {

    static properties = {
        carrito: { type: Array }
    };

    constructor() {
        super();
        this.selectedCategory = 'all';
        this.carrito = getTrolleyFromLocalStorage().carrito;
        this.productos = []; // Aquí se almacenarán los productos cargados
    }

    async handleButtonClick(e) {
        const botones = this.shadowRoot.querySelectorAll('.boton-categoria');
        botones.forEach(boton => {
            if (boton !== e.currentTarget){
                boton.classList.remove('active')
            }
            this.selectedCategory = e.currentTarget.id
            console.log(this.selectedCategory)
            this.requestUpdate()
            e.currentTarget.classList.add('active')
        });

        const categoria = e.currentTarget.id;
        this.selectedCategory = categoria;
        this.productos = [];

        try {
            if (categoria === 'coats') {
                this.productos = await getAllJacket();
            } else if (categoria === 'shirts') {
                this.productos = await getAllTshirt();
            } else if (categoria === 'jeans') {
                this.productos = await getAllPants();
            }
        } catch (error) {
            console.error("Error al cargar los productos:", error);
        }

        this.requestUpdate();
    }

    async updateCarrito(e) {
        this.carrito = e.detail;
        await this.requestUpdate();
    }
    static styles = css`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap');
    :root {
        VERDE : #174D4D;
        #174D4D: #785ce9;
        --clr-white: #FFFFFF;
        --clr-gray: #e2e2e2;
        --clr-red: #961818;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Rubik', sans-serif;
    }

    h1, h2, h3, h4, h5, h6, p, a, input, textarea, ul {
        margin: 0;
        padding: 0;
    }

    ul {
        list-style-type: none;
    }

    a {
        text-decoration: none;
    }

    .wrapper {
        display: grid;
        grid-template-columns: 1fr 4fr;
        background-color: #174D4D;
    }

    aside {
        padding: 2rem;
        padding-right: 0;
        color: #FFFFFF;
        position: sticky;
        top: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .logo {
        font-weight: 400;
        font-size: 1.3rem;
    }

    .menu {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    .boton-menu {
        background-color: transparent;
        border: 0;
        color: #FFFFFF;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: 600;
        padding: 1rem;
        font-size: .85rem;
        width: 100%;
    }

    .boton-menu.active {
        background-color: #FFFFFF;
        color: #48e;
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        position: relative;
    }

    .boton-menu.active::before {
        content: '';
        position: absolute;
        width: 1rem;
        height: 2rem;
        bottom: 100%;
        right: 0;
        background-color: transparent;
        border-bottom-right-radius: .5rem;
        box-shadow: 0 1rem 0 #FFFFFF;
    }

    .boton-menu.active::after {
        content: '';
        position: absolute;
        width: 1rem;
        height: 2rem;
        top: 100%;
        right: 0;
        background-color: transparent;
        border-top-right-radius: .5rem;
        box-shadow: 0 -1rem 0 #FFFFFF;
    }

    .boton-menu > i.bi-hand-index-thumb-fill,
    .boton-menu > i.bi-hand-index-thumb {
        transform: rotateZ(90deg);
    }

    .boton-carrito {
        margin-top: 2rem;
    }

    .numerito {
        background-color: #FFFFFF;
        color: #48e;
        padding: .15rem .25rem;
        border-radius: .25rem;
    }

    .boton-carrito.active .numerito {
        background-color: #48e;
        color: #FFFFFF;
    }

    .texto-footer {
        color: var(#174D4D-light);
        font-size: .85rem;
    }

    main {
        background-color: #FFFFFF;
        margin: 1rem;
        margin-left: 0;
        border-radius: 2rem;
        padding: 3rem;
    }

    .titulo-principal {
        color: #48e;
        margin-bottom: 2rem;
    }



    .producto-imagen {
        max-width: 100%;
        border-radius: 1rem;
    }

    .producto-detalles {
        background-color: #48e;
        color: #FFFFFF;
        padding: .5rem;
        border-radius: 1rem;
        margin-top: -2rem;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: .25rem;
    }


    .producto-titulo {
        font-size: 1rem;
    }

    .producto-agregar {
        border: 0;
        background-color: #FFFFFF;
        color: #48e;
        padding: .4rem;
        text-transform: uppercase;
        border-radius: 2rem;
        cursor: pointer;
        border: 2px solid #FFFFFF;
        transition: background-color .2s, color .2s;
    }

    .producto-agregar:hover {
        background-color: #48e;
        color: #FFFFFF;
    }


    /** CARRITO **/

    .contenedor-carrito {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .carrito-vacio,
    .carrito-comprado {
        color: #48e;
    }

    .carrito-productos {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .carrito-producto {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--clr-gray);
        color: #48e;
        padding: .5rem;
        padding-right: 1.5rem;
        border-radius: 1rem;
    }

    .carrito-producto-imagen {
        width: 4rem;
        border-radius: 1rem;
    }

    .carrito-producto small {
        font-size: .75rem;
    }

    .carrito-producto-eliminar {
        border: 0;
        background-color: transparent;
        color: var(--clr-red);
        cursor: pointer;
    }
    <my-element>
    .carrito-acciones-vaciar {
        border: 0;
        background-color: var(--clr-gray);
        padding: 1rem;
        border-radius: 1rem;
        color: #48e;
        text-transform: uppercase;
        cursor: pointer;
    }

    .carrito-acciones-derecha {
        display: flex;
    }

    .carrito-acciones-total {
        display: flex;
        background-color: var(--clr-gray);
        padding: 1rem;
        color: #48e;
        text-transform: uppercase;
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        gap: 1rem;
    }

    .carrito-acciones-comprar {
        border: 0;
        background-color: #48e;
        padding: 1rem;
        color: #FFFFFF;
        text-transform: uppercase;
        cursor: pointer;
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
    }

    .header-mobile {
        display: none;
    }

    .close-menu {
        display: none;
    }

    .disabled {
        display: none;
    }

    /*** MEDIA QUERIES ***/
    @media screen and (max-width: 400px){
        
    .products_container {
        display: grid;
        grid-template-columns: 1fr  /* Ajustar a dos columnas */
        gap: 1rem; /* Añadir un espacio entre las tarjetas */
    }
    }

    @media screen and (max-width: 600px) {
    .wrapper {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    


    .aside-visible {
        transform: translateX(0);
        opacity: 1;
        visibility: visible;
    }

    .boton-menu.active::before,
    .boton-menu.active::after {
        display: none;
    }

    main {
        margin: 1rem;
        margin-top: 0;
        padding: 2rem;
    }

    .products_container {
        display: grid;
        grid-template-columns: 1fr 1fr; /* Ajustar a dos columnas */
        gap: 1rem; /* Añadir un espacio entre las tarjetas */
    }

    .header-mobile {
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header-mobile .logo {
        color: var(--clr-gray);
    }

    .open-menu, .close-menu {
        background-color: transparent;
        color: var(--clr-gray);
        border: 0;
        font-size: 2rem;
        cursor: pointer;
    }

    .close-menu {
        display: block;
        position: absolute;
        top: 1rem;
        right: 1rem;
    }

    .carrito-producto {
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding: .5rem;
    }

    .carrito-producto-subtotal {
        display: none;
    }

    .carrito-acciones {
        flex-wrap: wrap;
        row-gap: 1rem;
    }
}
`;

render() {
    return html`
        <div class="wrapper">
            <header class="header-mobile">
                <h1 class="logo">CarpiShop</h1>
                <button class="open-menu" id="open-menu">
                    <i class="bi bi-list"></i>
                </button>
            </header>
            <aside>
                <button class="close-menu" id="close-menu">
                    <i class="bi bi-x"></i>
                </button>
                <header>
                    <h1 class="logo">CampusShop</h1>
                </header>
                <nav>
                    <ul class="menu">
                        <li>
                            <button id="all" class="boton-menu boton-categoria active" @click=${this.handleButtonClick}><i class="bi bi-hand-index-thumb-fill"></i> Todos los productos</button>
                        </li>
                        <li>
                            <button id="coats" class="boton-menu boton-categoria" @click=${this.handleButtonClick}><i class="bi bi-hand-index-thumb"></i> Abrigos</button>
                        </li>
                        <li>
                            <button id="shirts" class="boton-menu boton-categoria" @click=${this.handleButtonClick}><i class="bi bi-hand-index-thumb"></i> Camisetas</button>
                        </li>
                        <li>
                            <button id="jeans" class="boton-menu boton-categoria" @click=${this.handleButtonClick}><i class="bi bi-hand-index-thumb"></i> Pantalones</button>
                        </li>
                        <li>
                            <button id="storage" class="boton-menu boton-categoria" @click=${this.handleButtonClick}><i class="bi bi-cart-fill"></i> CARRITO <span id="numerito" class="numerito">${this.carrito.length}</span></button>
                        </li>
                    </ul>
                </nav>
                <footer>
                    <p>© CampusShop 2024</p>
                </footer>
            </aside>
            <main>
                <h2 class="titulo-principal" id="titulo-principal">${this.selectedCategory}</h2>
                <my-products .category="${this.selectedCategory}" .carrito="${this.carrito}" @update-carrito="${this.updateCarrito}"></my-products>
                
            </main>
        </div>

        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
        <script src="./js/menu.js"></script>
    `;
}
}

customElements.define('my-element', MyElement)