// Importo Express para definir las rutas.
const express = require("express");

// Importo las funciones para consultar, crear y editar usuarios.
const { getUsers, createUser, updateUser, deleteUser } = 
require("../controllers/userController");

// Creo el enrutador de Express.
const router = express.Router();

// Defino la ruta GET para obtener todos los usuarios.
router.get("/", getUsers);

// Defino la ruta POST para registrar usuarios.
router.post("/", createUser);

// Defino la ruta PUT para actualizar un usuario por su ID.
router.put("/:id", updateUser);

// Defino la ruta DELETE para eliminar un usuario por su ID.
router.delete("/:id", deleteUser);

// Exporto las rutas.
module.exports = router;