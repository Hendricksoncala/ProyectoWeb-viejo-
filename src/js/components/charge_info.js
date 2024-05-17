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
 
    // <div class="pants_block">
    //     <div class="block_titule">
    //         <div>${this.img_pants}</div>
    //     </div>
    //     <div class="block_product">
    //         <div class="">
            
    //         </div>
    //     </div>
    // </div>
    `;
  }
}
customElements.define('my-element', MyElement);
