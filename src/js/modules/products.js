export const getAllJacket = async () => {
    let res = await fetch("http://localhost:3000/abrigo")
    let data = await res.json();
    return data;

}

export function clearTrolleyInLocalStorage() {
    localStorage.setItem('trolley', JSON.stringify({ carrito: [] }));
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
        let carrito = getTrolleyFromLocalStorage();
        carrito.carrito.push(data);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        return carrito;
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
    }
};

export const deleteProduct = async (data) => {
    try {
        let carrito = getTrolleyFromLocalStorage();
        const index = carrito.carrito.findIndex(product => product.id === data);

        if (index !== -1) {
            carrito.carrito.splice(index, 1);
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        return carrito;
    } catch (error) {
        console.error("Error al eliminar producto del carrito:", error);
    }
};

export const getTrolleyFromLocalStorage = () => {
    try {
        const carritoJSON = localStorage.getItem('carrito');
        return carritoJSON ? JSON.parse(carritoJSON) : { carrito: [] };
    } catch (error) {
        return { carrito: [] };
    }
};

export const deleteAllFromCart = async () => {
    try {
        localStorage.removeItem('carrito');
        return { carrito: [] }; // Retornamos un carrito vacío
    } catch (error) {
        console.error("Error al eliminar todos los productos del carrito:", error);
    }
}