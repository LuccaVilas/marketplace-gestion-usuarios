// Importo Express para crear la aplicación.
const express = require("express");

// Importo CORS para permitir solicitudes del frontend.
const cors = require("cors");

// Importo las rutas de usuarios.
const userRoutes = require("./routes/userRoutes");

// Creo la aplicación de Express.
const app = express();

// Habilito CORS.
app.use(cors());

// Permito recibir datos en formato JSON.
app.use(express.json());

// Configuro las rutas de usuarios.
app.use("/api/users", userRoutes);

// Exporto la aplicación para usarla en el servidor y los tests.
module.exports = app;