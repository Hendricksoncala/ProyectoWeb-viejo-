export const getAllJacket = async () => {
    let res = await fetch("http://localhost:3000/abrigo")
    let data = await res.json();
    return data;

}

export const getAllTshirt = async () => {
    let res = await fetch("http://localhost:3000/camiseta")
    let data = await res.json();
    return data;

}

export const getAllPants = async () => {
    let res = await fetch("http://localhost:3000/pantalon")
    let data = await res.json();
    return data;

}

export const getAllProducts = async () => {
    let res = await fetch("http://localhost:3000")
    
    let data = await  res.json();
    return data;
}

export const getAllTrolley = async () => {
    let res = await fetch("http://localhost:3000/carrito")
    let data = await  res.json();
    return data;
}



/*OTRA FORMA DE PODER HACER EL PROYECTO--------------------------------------------------------------------------------------------------------*/
