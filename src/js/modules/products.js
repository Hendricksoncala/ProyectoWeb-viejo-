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

export const getAllTrolley = async () => {
    let res = await fetch("http://localhost:3000/carrito")
    let data = await  res.json();
    return data;
}


export const getAllProducts = async () => {
    try {
        const [jackets, tshirts, pants] = await Promise.all([
            fetch("http://localhost:3000/abrigo").then(res => res.json()),
            fetch("http://localhost:3000/camiseta").then(res => res.json()),
            fetch("http://localhost:3000/pantalon").then(res => res.json())
        ]);

        const allProducts = [...jackets, ...tshirts, ...pants];

        console.log(allProducts);
        return allProducts;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};


/*OTRA FORMA DE PODER HACER EL PROYECTO--------------------------------------------------------------------------------------------------------*/
