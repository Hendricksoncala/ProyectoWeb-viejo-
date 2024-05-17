import { fetchJsonDataFromUrl } from './modules/clothingData.js';

const url = `https://fakestoreapi.com/products`

// URL remota de tus datos JSON

export async function getAllPants() {
  const jsonData = await fetchJsonDataFromUrl(url);
  if (jsonData && jsonData.pants) {
    return jsonData.pants.map(pantalon => ({
      id: pantalon.id,
      nombre: pantalon.nombre,
      imagen: pantalon.imagen,
      precio: pantalon.precio
    }));
  } else {
    console.error('No se pudo obtener la información de los pantalones.');
    return null;
  }
}

// Llamar a la función y mostrar los datos en la consola
getAllPants().then(pantsData => {
  if (pantsData) {
    console.log(pantsData);
  }
});