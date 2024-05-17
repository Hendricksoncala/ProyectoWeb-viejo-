// import {
//  MyElement

// } from "./components/my-element.js"

import {
    getAllPants
} from "./modules/pants"


console.log(await getAllPants())


window.customElements.define('my-element', MyElement)
