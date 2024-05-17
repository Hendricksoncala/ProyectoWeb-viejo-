import { LitElement, html, css } from "lit"
export class myObjects extends LitElement{
    static properties = {

    }

    constructor(){
        super();
        this.objects = []
        
    }
    async loadlink(){

        const url = `https://fakestoreapi.com/products`
        const options = {
            method: 'GET',
            headers: {
                "hola pepe" : 'hola pepe'
            }
        }
    }


}