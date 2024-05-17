// import {
//  MyElement

// } from "./components/my-element.js"

import {
    getAllPants
} from "./modules/pants.js"

import {
    getAllJacket
} from "./modules/jacket.js"

import {
    getAllTshirt
} from "./modules/tshirt.js"

import { MyElement } from "./components/my-element.js"


console.log(await getAllJacket())
console.log(await getAllTshirt())
console.log(await getAllPants())


window.addEventListener('load', () => {
    const myElement = document.createElement('my-element')
    document.getElementsByTagName('body').append(myElement)
})

window.customElements.define('my-element', MyElement)
