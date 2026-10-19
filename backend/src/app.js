// Importo Express para crear el servidor.
const express = require("express");

// Importo CORS para permitir solicitudes del frontend.
const cors = require("cors");

// Importo la conexión con SQLite.
const sequelize = require("./config/database");

// Importo el modelo de usuarios.
const User = require("./models/User");

// Creo la aplicación de Express.
const app = express();

// Importo las rutas de usuarios.
const userRoutes = require("./routes/userRoutes");

// Habilito CORS.
app.use(cors());

// Configuro la recepción de datos JSON.
app.use(express.json());

// Configuro la ruta principal de usuarios.
app.use("/api/users", userRoutes);

// Defino el puerto del servidor.
const PORT = 3000;

// Sincronizo los modelos con la base de datos.
sequelize.sync()
  .then(() => {
    // Inicio el servidor cuando la base de datos esté lista.
    app.listen(PORT, () => {
      // Muestro un mensaje de confirmación.
      console.log(`Servidor funcionando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    // Muestro un error si falla la conexión.
    console.error("Error al conectar con SQLite:", error);
  });