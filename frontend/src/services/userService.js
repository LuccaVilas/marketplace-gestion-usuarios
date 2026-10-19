// Defino la dirección de la API del backend.
const API_URL = "http://localhost:3000/api/users";

// Creo una función para procesar las respuestas del servidor.
const handleResponse = async (response) => {
  // Verifico si la solicitud fue exitosa.
  if (!response.ok) {
    // Intento obtener el mensaje de error del backend.
    const error = await response.json().catch(() => ({}));

    // Devuelvo un error con su mensaje correspondiente.
    throw new Error(error.message || "Ocurrió un error en el servidor.");
  }

  // Convierto la respuesta a formato JSON.
  return response.json();
};

// Creo la función para consultar todos los empleados.
export const getUsers = async () => {
  // Realizo una solicitud GET.
  const response = await fetch(API_URL);

  // Devuelvo los empleados obtenidos.
  return handleResponse(response);
};

// Creo la función para registrar un empleado.
export const createUser = async (userData) => {
  // Envío los datos mediante una solicitud POST.
  const response = await fetch(API_URL, {
    // Defino el método HTTP.
    method: "POST",

    // Indico que envío información en formato JSON.
    headers: {
      "Content-Type": "application/json",
    },

    // Convierto los datos a JSON.
    body: JSON.stringify(userData),
  });

  // Devuelvo el empleado registrado.
  return handleResponse(response);
};

// Creo la función para editar un empleado.
export const updateUser = async (id, userData) => {
  // Envío los cambios mediante una solicitud PUT.
  const response = await fetch(`${API_URL}/${id}`, {
    // Defino el método HTTP.
    method: "PUT",

    // Indico que envío información en formato JSON.
    headers: {
      "Content-Type": "application/json",
    },

    // Convierto los datos actualizados a JSON.
    body: JSON.stringify(userData),
  });

  // Devuelvo el empleado actualizado.
  return handleResponse(response);
};

// Creo la función para eliminar un empleado.
export const deleteUser = async (id) => {
  // Envío una solicitud DELETE utilizando el ID.
  const response = await fetch(`${API_URL}/${id}`, {
    // Defino el método HTTP.
    method: "DELETE",
  });

  // Devuelvo la confirmación del servidor.
  return handleResponse(response);
};