import {
    getAllPants
} from "./modules/pants.js"

import {
    getAllJacket
} from "./modules/jacket.js"

import {
    getAllTshirt
} from "./modules/tshirt.js"


import {LitElement, html} from 'lit';

export class MyElement extends LitElement {
  static properties = {
    version: {},
  };

  constructor() {
    super();
    this.img_pants = getAllPants

  }

  render() {
    return html`
 
    <div class="cajita">
        <img src="camisa.png" alt="Imagen del producto">
        <div class="info">
            <h2>Título del producto</h2>
            <p>Precio: $19.99</p>
        </div>
        <button class="boton">Comprar</button>
  </div>

    `;
  }
}
customElements.define('my-element', MyElement);
