export const getAllPants = async () => {
    let res = await fetch("http://localhost:3000/pantalon")
    let data = await res.json();
    return data;


}