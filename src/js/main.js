// import {
//  MyElement

// } from "./components/my-element.js"


// import { MyElement } from "./components/my-element.js"
// import { getAllJacket,
//     getAllTshirt, 
//     getAllPants, 
//     getAllProducts,
//     getAllTrolley } 
    
//     from 



window.addEventListener('load', () => {
    const myElement = document.createElement('my-element')
    document.getElementsByTagName('body').append(myElement)
})

window.customElements.define('my-element', MyElement)
