// Importo los tipos de datos de Sequelize.
const { DataTypes } = require("sequelize");

// Importo la conexión con la base de datos.
const sequelize = require("../config/database");

// Defino el modelo de usuario.
const User = sequelize.define("User", {
  // Defino el nombre como campo obligatorio.
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Defino el apellido como campo obligatorio.
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Defino el documento como campo obligatorio.
  documento: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Defino el legajo como identificador único.
  legajo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  // Defino el email como campo obligatorio.
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Defino el domicilio como campo obligatorio.
  domicilio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Exporto el modelo para utilizarlo en otras partes del backend.
module.exports = User;