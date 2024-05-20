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
export const addProduct = async (data) => {
    try {
        // Obtener el carrito existente
        let carrito = await getTrolleyFromLocalStorage();
        console.log(carrito);
        // Agregar el nuevo producto al carrito
        console.log(data)
        carrito.carrito.push(data)
        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

    } catch (error) {
        // Manejar el error aquí
        console.error("Error al agregar producto al carrito:", error);
    }
}
export const deleteProduct = async (data) => {
    try {
        // Obtener el carrito existente
        let carrito = await getTrolleyFromLocalStorage();
        console.log(carrito);
        // Agregar el nuevo producto al carrito
        console.log(data)
        const index = carrito.carrito.findIndex(product => product.id === data);

        // Si se encontró el elemento, eliminarlo del array
        if (index !== -1) {
            carrito.carrito.splice(index, 1); // Eliminar el elemento en la posición 'index'
        }
        // Volver a guardar el objeto actualizado en el localStorage
        const res = localStorage.setItem('carrito', JSON.stringify(carrito));

    } catch (error) {
        // Manejar el error aquí
        console.error("Error al agregar producto al carrito:", error);
    }
}
export const getTrolleyFromLocalStorage = () => {
    try {
        const carritoJSON = localStorage.getItem('carrito');
        console.log(JSON.parse(carritoJSON));
        return carritoJSON ? JSON.parse(carritoJSON) : { carrito: [] } ;

    } catch (error) {
        return { carrito: [] }

    }
}
