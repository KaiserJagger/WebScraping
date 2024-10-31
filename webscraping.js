// Importar las bibliotecas necesarias
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL de la página
const url = "URL DE LA SECCION QUE SE QUIERE SACAR DATOS";

async function fetchData(url) {
  try {
    // Obtener el HTML de la página
    const { data } = await axios.get(url);
    // Cargar el HTML en Cheerio
    const $ = cheerio.load(data);

    // Crear un arreglo para almacenar los productos
    const productos = [];

    // Seleccionar y procesar cada producto en la página
    $(".product-info").each((index, element) => {
      const nombre = $(element).find(".product-title").text().trim();
      const precio = $(element).find(".product-price").text().trim();

      // Agregar el producto al arreglo
      productos.push({ nombre, precio });
    });

    // Guardar los datos en un archivo JSON
    fs.writeFileSync("productos.json", JSON.stringify(productos, null, 2), "utf-8");

    console.log("Datos guardados en productos.json");
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

// Llamar a la función para obtener datos de la URL
fetchData(url);
