import {
    getAllJacket,
    getAllTshirt,
    getAllPants,
    getAllProducts,
    getAllTrolley
}

    from '../modules/products.js';

import { LitElement, css, html } from 'lit';
export class MyProducts extends LitElement {
    static properties = {
        products: { type: Array },
        category: { type: String }
    }

    constructor() {
        super();
        this.products = []
        this.category = 'all';
    }

    async updated(changedProperties) {
        console.log(this.category)
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
            default:
                this.products = await getAllProducts();
        }
    }

    render() {
        return html`
      <div class="products_container">
      ${Array.isArray(this.products) && this.products.length > 0 ?
                this.products.map(product => html`
          <div class="producto">
            <img class="producto_img" src="${product.imagen}"/>
              <div class="producto_detalles">
                <h3 class="producto_titulo">${product.nombre}</h3>
                <p class="producto_precio">$${product.precio}</p>
                <button class="product_add">Comprar</button>
              </div>
          </div>  
        `)
                : html`<p>No products found</p>`
            }
      </div>
      `;
    }


    static get styles() {
        return css`
        @import url(variables.css);
          .products_container{
            display: grid;
            grid-template-columns: repeat(4,1fr);
            gap: 1rem;
            align-items: center;
          }
    
          .producto{
            width: 200px;
            margin: 1em;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .producto .producto_img{
            width: 100%;
            height: 200px;
            border-radius: 1rem;
          }
    
          .producto_detalles{
            background-color: var(--clr-main);
            color: var(--clr-white);
            border-radius: 1rem;
            margin-top: -2rem;
            position: relative;
            display: flex;
            flex-direction: column;
          }
    
          .producto_detalles .producto_titulo{
            margin-left: 10px;
            margin-top: 5px;
            margin-bottom: 5px;
            margin-right: 10px;
            font-size: .8rem;
          }
    
          .producto_detalles .producto_precio{
            margin-left: 10px;
            margin-top: 5px;
            margin-bottom: 5px;
            font-size: .9rem;
          }
          
    
          .product_add{
            background-color: var(--clr-white);
            color: var(--clr-main);
            padding: .4rem;
            text-transform: uppercase;
            border-radius: 2rem;
            cursor: pointer;
            border: 2px solid var(--clr-white);
            transition: background-color .2s, color .2s;
          }
    
          .product_add:hover{
            background-color: var(--clr-main);
            color: var(--clr-white);
          }
          
        
    @media screen and (max-width: 1050px) {
        .products_container {
            grid-template-columns: 1fr 1fr ;
            width: 100%
        }
    }
    @media screen and (max-width: 550px) and (min-width: 300px) {
        .products_container {
            grid-template-columns: 1fr;
            width: 100%;
        }
    }

        `
    }
}
customElements.define('my-products', MyProducts);
