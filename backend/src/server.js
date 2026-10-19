// Importo la aplicación Express.
const app = require("./app");

// Importo la conexión con SQLite.
const sequelize = require("./config/database");

// Importo el modelo para registrar la tabla.
require("./models/User");

// Defino el puerto del servidor.
const PORT = 3000;

// Sincronizo la base de datos antes de iniciar.
sequelize.sync()
.then(() => {
    // Inicio el servidor cuando SQLite está lista.
    app.listen(PORT, () => {
      // Confirmo que el servidor está funcionando.
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
    });
})
.catch((error) => {
    // Muestro el error si falla la inicialización.
    console.error("Error al iniciar el servidor:", error);
});