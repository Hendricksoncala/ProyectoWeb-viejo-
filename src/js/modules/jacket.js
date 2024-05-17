export const getAllJacket = async () => {
    let res = await fetch("http://localhost:3000/abrigo")
    let data = await res.json();
    return data;

}