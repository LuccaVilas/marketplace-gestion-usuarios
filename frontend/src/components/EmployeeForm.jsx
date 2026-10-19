// Importo useState para gestionar los estados.
import { useState } from "react";

// Importo la función para registrar empleados.
import { createUser } from "../services/userService";

// Defino los valores iniciales del formulario.
const initialFormData = {
  nombre: "",
  apellido: "",
  documento: "",
  legajo: "",
  email: "",
  domicilio: "",
};

// Defino las etiquetas de cada campo.
const fieldLabels = {
  nombre: "Nombre",
  apellido: "Apellido",
  documento: "DNI / Pasaporte",
  legajo: "Legajo",
  email: "Correo electrónico",
  domicilio: "Domicilio",
};

// Creo el componente de registro de empleados.
function EmployeeForm({ onUserCreated }) {
  // Guardo los datos ingresados en el formulario.
  const [formData, setFormData] = useState(initialFormData);

  // Guardo los posibles errores.
  const [error, setError] = useState("");

  // Controlo si el formulario se está enviando.
  const [loading, setLoading] = useState(false);

  // Actualizo los datos mientras escribo.
  const handleChange = (event) => {
    // Obtengo el nombre y valor del campo.
    const { name, value } = event.target;

    // Actualizo únicamente el campo modificado.
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Limpio el error anterior.
    setError("");
  };

  // Creo la función para registrar empleados.
  const handleSubmit = async (event) => {
    // Evito que se recargue la página.
    event.preventDefault();

    // Evito realizar envíos duplicados.
    if (loading) return;

    // Elimino espacios innecesarios de los campos.
    const cleanData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        value.trim(),
      ])
    );

    // Compruebo que todos los campos estén completos.
    if (Object.values(cleanData).some((value) => !value)) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // Defino el formato válido del correo electrónico.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Compruebo que el correo tenga un formato correcto.
    if (!emailRegex.test(cleanData.email)) {
      setError("Ingresá un correo electrónico válido.");
      return;
    }

    // Activo el estado de carga.
    setLoading(true);

    // Limpio los errores anteriores.
    setError("");

    try {
      // Registro el empleado en la base de datos.
      await createUser(cleanData);

      // Limpio los campos después del registro.
      setFormData({ ...initialFormData });

      // Actualizo el listado de empleados.
      await onUserCreated();
    } catch (error) {
      // Muestro el error recibido.
      setError(error.message);
    } finally {
      // Finalizo el estado de carga.
      setLoading(false);
    }
  };

  // Muestro el formulario de registro.
  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      {/* Genero los campos del formulario. */}
      {Object.keys(formData).map((field) => (
        <div className="form-field" key={field}>
          {/* Muestro la etiqueta correspondiente. */}
          <label htmlFor={field}>
            {fieldLabels[field]}
          </label>

          {/* Muestro el campo de entrada. */}
          <input
            id={field}
            name={field}
            type={field === "email" ? "email" : "text"}
            value={formData[field]}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
      ))}

      {/* Muestro los posibles errores. */}
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      {/* Creo el botón para registrar empleados. */}
      <button
        type="submit"
        className="form-submit"
        disabled={loading}
      >
        {loading ? "Registrando..." : "Registrar empleado"}
      </button>
    </form>
  );
}

// Exporto el formulario de registro.
export default EmployeeForm;