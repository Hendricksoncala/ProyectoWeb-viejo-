export const getAllTshirt = async () => {
    let res = await fetch("http://localhost:3000/camiseta")
    let data = await res.json();
    return data;

}