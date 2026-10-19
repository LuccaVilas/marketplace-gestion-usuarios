// Importo Sequelize para gestionar la base de datos.
const { Sequelize } = require("sequelize");

// Importo path para trabajar con rutas de archivos.
const path = require("path");

// Compruebo si estoy ejecutando pruebas automáticas.
const isTest = process.env.NODE_ENV === "test";

// Configuro SQLite con una base temporal para los tests.
const sequelize = new Sequelize({
  // Defino SQLite como motor de base de datos.
  dialect: "sqlite",

  // Uso memoria durante los tests y un archivo en desarrollo.
  storage: isTest
    ? ":memory:"
    : path.join(__dirname, "../../database.sqlite"),

  // Desactivo los mensajes SQL en consola.
  logging: false,
});

// Exporto la conexión para utilizarla en otros archivos.
module.exports = sequelize;