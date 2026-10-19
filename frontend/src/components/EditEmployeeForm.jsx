// Importo useState para gestionar los estados.
import { useState } from "react";

// Importo la función para actualizar empleados.
import { updateUser } from "../services/userService";

// Creo el componente del formulario de edición.
function EditEmployeeForm({ employee, onUserUpdated, onCancel }) {
  // Guardo los datos editables del empleado.
  const [formData, setFormData] = useState({
    email: employee.email,
    domicilio: employee.domicilio,
  });

  // Guardo los posibles errores del formulario.
  const [error, setError] = useState("");

  // Controlo si se están guardando los cambios.
  const [loading, setLoading] = useState(false);

  // Compruebo si se modificó algún dato.
  const hasChanges =
    formData.email !== employee.email ||
    formData.domicilio !== employee.domicilio;

  // Creo la función para actualizar los campos.
  const handleChange = (event) => {
    // Obtengo el nombre y el valor del campo.
    const { name, value } = event.target;

    // Actualizo el campo correspondiente.
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Creo la función para guardar los cambios.
  const handleSubmit = async (event) => {
    // Evito que el navegador recargue la página.
    event.preventDefault();

    // Evito guardar si no hay cambios o ya existe un envío.
    if (!hasChanges || loading) return;

    // Limpio los errores anteriores.
    setError("");

    // Elimino los espacios innecesarios.
    const email = formData.email.trim();
    const domicilio = formData.domicilio.trim();

    // Verifico que ambos campos estén completos.
    if (!email || !domicilio) {
      setError("Email y domicilio son obligatorios.");
      return;
    }

    // Defino el formato permitido para el email.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Verifico que el email sea válido.
    if (!emailRegex.test(email)) {
      setError("Ingresá un email válido.");
      return;
    }

    // Activo el estado de carga.
    setLoading(true);

    try {
      // Envío los datos validados al backend.
      await updateUser(employee.id, { email, domicilio });

      // Actualizo el listado de empleados.
      await onUserUpdated();
    } catch (error) {
      // Muestro el mensaje de error recibido.
      setError(error.message);
    } finally {
      // Finalizo el estado de carga.
      setLoading(false);
    }
  };

  // Muestro el formulario de edición.
  return (
    <form className="edit-employee-form" onSubmit={handleSubmit}>
      {/* Muestro el nombre del empleado seleccionado. */}
      <h2>
        Editar: {employee.nombre} {employee.apellido}
      </h2>

      {/* Muestro la etiqueta del correo electrónico. */}
      <label htmlFor="edit-email">Email</label>

      {/* Permito modificar el correo electrónico. */}
      <input
        id="edit-email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      {/* Muestro la etiqueta del domicilio. */}
      <label htmlFor="edit-domicilio">Domicilio</label>

      {/* Permito modificar el domicilio. */}
      <input
        id="edit-domicilio"
        name="domicilio"
        type="text"
        value={formData.domicilio}
        onChange={handleChange}
        required
      />

      {/* Muestro los errores del formulario. */}
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}

      {/* Permito guardar únicamente cuando existen cambios. */}
      <button
        type="submit"
        className="btn-save"
        disabled={loading || !hasChanges}
      >
        {loading ? "Guardando..." : "Guardar cambios"}
      </button>

      {/* Permito cancelar la edición sin guardar. */}
      <button
        type="button"
        className="btn-cancel"
        onClick={onCancel}
        disabled={loading}
      >
        Cancelar
      </button>
    </form>
  );
}

// Exporto el componente de edición.
export default EditEmployeeForm;