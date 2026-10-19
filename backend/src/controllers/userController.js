// Importo el modelo de usuarios.
const User = require("../models/User");

// Creo la función para obtener todos los usuarios.
const getUsers = async (req, res) => {
  try {
    // Consulto todos los usuarios de la base de datos.
    const users = await User.findAll();

    // Devuelvo los usuarios en formato JSON.
    return res.status(200).json(users);
  } catch (error) {
    // Devuelvo un error si falla la consulta.
    return res.status(500).json({
      message: "Error al obtener los usuarios.",
    });
  }
};

// Creo la función para registrar usuarios.
const createUser = async (req, res) => {
  try {
    // Obtengo los datos enviados desde el frontend.
    const { nombre, apellido, documento, legajo, email, domicilio } = req.body;

    // Verifico que todos los campos estén completos.
    if (!nombre || !apellido || !documento || !legajo || !email || !domicilio) {
      // Devuelvo un error si falta algún dato.
      return res.status(400).json({
        message: "Todos los campos son obligatorios.",
      });
    }

    // Verifico que todos los campos sean textos válidos.
if (
  [nombre, apellido, documento, legajo, email, domicilio].some(
    (value) => typeof value !== "string" || !value.trim()
  )
) {
  return res.status(400).json({
    message: "Todos los campos deben contener texto válido.",
  });
}

// Defino el formato permitido para el email.
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Verifico que el email sea válido.
if (!emailRegex.test(email.trim())) {
  return res.status(400).json({
    message: "Ingresá un email válido.",
  });
}

    // Creo el usuario en la base de datos.
    const user = await User.create({
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      documento: documento.trim(),
      legajo: legajo.trim(),
      email: email.trim(),
      domicilio: domicilio.trim(),
    });

    // Devuelvo el usuario creado.
    return res.status(201).json(user);
  } catch (error) {
    // Devuelvo un error si el legajo ya existe.
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "El legajo ya está registrado.",
      });
    }

    // Devuelvo un error si falla el registro.
    return res.status(500).json({
      message: "Error al registrar el usuario.",
    });
  }
}

// Creo la función para actualizar usuarios.
const updateUser = async (req, res) => {
  try {
    // Obtengo el ID del usuario desde la URL.
    const { id } = req.params;

    // Obtengo el email y domicilio enviados.
    const { email, domicilio } = req.body;

    // Busco el usuario por su ID.
    const user = await User.findByPk(id);

    // Verifico si el usuario existe.
    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado.",
      });
    }

    // Verifico que los campos sean válidos.
    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof domicilio !== "string" ||
      !domicilio.trim()
    ) {
      return res.status(400).json({
        message: "Email y domicilio son obligatorios.",
      });
    }

    // Defino el formato válido para el email.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Verifico que el email tenga un formato válido.
    if (!emailRegex.test(email.trim())) {
    // Devuelvo un error si el email es incorrecto.
    return res.status(400).json({
    message: "Ingresá un email válido.",
    });
    }

    // Actualizo los datos del usuario.
    await user.update({
      email: email.trim(),
      domicilio: domicilio.trim(),
    });

    // Devuelvo el usuario actualizado.
    return res.status(200).json(user);
  } catch (error) {
    // Devuelvo un error si falla la actualización.
    return res.status(500).json({
      message: "Error al actualizar el usuario.",
    });
  }
};

// Creo la función para eliminar usuarios.
const deleteUser = async (req, res) => {
  try {
    // Obtengo el ID desde la URL.
    const { id } = req.params;

    // Busco el usuario por su ID.
    const user = await User.findByPk(id);

    // Verifico si el usuario existe.
    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado.",
      });
    }

    // Elimino el usuario de la base de datos.
    await user.destroy();

    // Confirmo la eliminación.
    return res.status(200).json({
      message: "Usuario eliminado correctamente.",
    });
  } catch (error) {
    // Devuelvo un error si falla la eliminación.
    return res.status(500).json({
      message: "Error al eliminar el usuario.",
    });
  }
};

// Exporto las funciones del controlador.
module.exports = { getUsers, createUser, updateUser, deleteUser };