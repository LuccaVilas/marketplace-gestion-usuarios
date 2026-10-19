// Importo Sequelize para gestionar la base de datos.
const { Sequelize } = require("sequelize");

// Importo path para trabajar con rutas de archivos.
const path = require("path");

// Creo la conexión con la base de datos SQLite.
const sequelize = new Sequelize({
  // Defino SQLite como motor de base de datos.
  dialect: "sqlite",

  // Defino dónde se guardará el archivo de la base de datos.
  storage: path.join(__dirname, "../../database.sqlite"),

  // Desactivo los mensajes SQL en la consola.
  logging: false,
});

// Exporto la conexión para utilizarla en otros archivos.
module.exports = sequelize;