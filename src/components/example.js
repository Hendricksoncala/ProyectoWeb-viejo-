import { fetchJsonDataFromUrl } from './modules/clothingData.js';

const url = 'https://file.notion.so/f/f/eaa1771c-fc19-40d4-8527-37ca1caab8fa/8f181ea0-47f7-49a5-9b85-48db35d8ec38/Documentos_DB.json?id=a21b973c-4a2b-4e71-b3f3-1b6e38a01f05&table=block&spaceId=eaa1771c-fc19-40d4-8527-37ca1caab8fa&expirationTimestamp=1716004800000&signature=f8VWhVKLOZ5bW0wCRd5NF5K_1gElGC3nG8FDX5l0Qbs&downloadName=Documentos_DB.json'
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