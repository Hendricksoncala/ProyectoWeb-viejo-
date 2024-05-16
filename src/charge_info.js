import { LitElement, html, css } from "lit"
export class myObjects extends LitElement{
    static properties = {

    }

    constructor(){
        super();
        this.objects = []
        
    }
    async loadlink(){

        const url = 'https://file.notion.so/f/f/eaa1771c-fc19-40d4-8527-37ca1caab8fa/8f181ea0-47f7-49a5-9b85-48db35d8ec38/Documentos_DB.json?id=a21b973c-4a2b-4e71-b3f3-1b6e38a01f05&table=block&spaceId=eaa1771c-fc19-40d4-8527-37ca1caab8fa&expirationTimestamp=1715990400000&signature=GCViQ4ZKaXS-9EPyPVeFN6pcR1sunb8L9a-ial-nsDY&downloadName=Documentos_DB.json';
        const options = {
            method: 'GET',
            headers: {
                "hola pepe" : 'hola pepe'
            }
        }
    }



}