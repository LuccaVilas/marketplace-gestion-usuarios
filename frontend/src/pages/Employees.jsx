// Importo los hooks para gestionar estados y efectos.
import { useState, useEffect } from "react";

// Importo Link para navegar entre páginas.
import { Link } from "react-router-dom";

// Importo las funciones para consultar y eliminar empleados.
import { getUsers, deleteUser } from "../services/userService";

// Importo el formulario de registro.
import EmployeeForm from "../components/EmployeeForm";

// Importo el formulario de edición.
import EditEmployeeForm from "../components/EditEmployeeForm";

// Creo el componente de gestión de empleados.
function Employees() {
  // Guardo los empleados registrados.
  const [employees, setEmployees] = useState([]);

  // Guardo el empleado seleccionado para editar.
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Guardo el texto del buscador.
  const [search, setSearch] = useState("");

  // Guardo los mensajes de error.
  const [error, setError] = useState("");

  // Controlo el estado de carga.
  const [loading, setLoading] = useState(true);

  // Consulto los empleados desde la API.
  const loadEmployees = async () => {
    // Activo el estado de carga.
    setLoading(true);

    try {
      // Obtengo los empleados registrados.
      const data = await getUsers();

      // Actualizo el listado.
      setEmployees(data);

      // Limpio los errores anteriores.
      setError("");

      // Confirmo que la actualización fue correcta.
      return true;
    } catch (error) {
      // Muestro el mensaje de error.
      setError(error.message);

      // Indico que la actualización falló.
      return false;
    } finally {
      // Finalizo la carga.
      setLoading(false);
    }
  };

  // Cargo los empleados al abrir la página.
  useEffect(() => {
    // Consulto los datos iniciales.
    loadEmployees();
  }, []);

  // Filtro los empleados según la búsqueda.
  const filteredEmployees = employees.filter((employee) => {
    // Normalizo el texto ingresado.
    const query = search.toLowerCase().trim();

    // Busco coincidencias en los datos principales.
    return [
      employee.nombre,
      employee.apellido,
      employee.legajo,
      employee.documento,
      employee.email,
    ].some((value) =>
      String(value ?? "").toLowerCase().includes(query)
    );
  });

  // Creo la función para eliminar empleados.
  const handleDelete = async (employee) => {
    // Solicito confirmación antes de eliminar.
    const confirmed = window.confirm(
      `¿Estás seguro de que querés eliminar a ${employee.nombre} ${employee.apellido}?`
    );

    // Cancelo la operación si no se confirma.
    if (!confirmed) return;

    try {
      // Elimino el empleado de la base de datos.
      await deleteUser(employee.id);

      // Actualizo el listado.
      const updated = await loadEmployees();

      // Cierro la edición si corresponde.
      if (updated && editingEmployee?.id === employee.id) {
        setEditingEmployee(null);
      }
    } catch (error) {
      // Muestro el error de eliminación.
      setError(error.message);
    }
  };

  // Muestro el contenido de la página.
  return (
    <main className="employees-page">
      {/* Creo el encabezado principal. */}
      <header className="employees-header">
        {/* Muestro la categoría de la sección. */}
        <span className="employees-label">
          RECURSOS HUMANOS
        </span>

        {/* Muestro el título de la página. */}
        <h1>Gestión de Empleados</h1>

        {/* Muestro una descripción de la sección. */}
        <p>
          Administrá los registros del personal interno del marketplace.
        </p>
      </header>

      {/* Creo la tarjeta del formulario de registro. */}
      <section className="employees-form-card">
        {/* Muestro el título del formulario. */}
        <h2>Registrar empleado</h2>

        {/* Muestro las instrucciones del registro. */}
        <p>Completá los datos para registrar un nuevo empleado.</p>

        {/* Conecto el formulario con el listado. */}
        <EmployeeForm onUserCreated={loadEmployees} />
      </section>

      {/* Creo la tarjeta del listado. */}
      <section className="employees-list-card">
        {/* Muestro el título del listado. */}
        <h2>Empleados registrados</h2>

        {/* Muestro la cantidad de resultados. */}
        <p className="employees-count">
          {filteredEmployees.length} de {employees.length} empleados
        </p>

        {/* Creo el buscador de empleados. */}
        <input
          className="employees-search"
          type="search"
          placeholder="Buscar por nombre, apellido o legajo..."
          aria-label="Buscar empleados"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {/* Muestro el estado de carga. */}
        {loading && (
          <p className="employees-loading">
            Cargando empleados...
          </p>
        )}

        {/* Muestro los errores de consulta. */}
        {!loading && error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        {/* Informo cuando no hay empleados registrados. */}
        {!loading && !error && employees.length === 0 && (
          <p className="employees-empty">
            No hay empleados registrados.
          </p>
        )}

        {/* Informo cuando la búsqueda no tiene resultados. */}
        {!loading &&
          !error &&
          employees.length > 0 &&
          filteredEmployees.length === 0 && (
            <p className="employees-empty">
              No se encontraron empleados con esa búsqueda.
            </p>
          )}

        {/* Recorro los empleados encontrados. */}
        {!loading &&
          !error &&
          filteredEmployees.map((employee) => (
            <div className="employee-item" key={employee.id}>
              {/* Muestro el nombre completo. */}
              <p>
                {employee.nombre} {employee.apellido}
              </p>

              {/* Muestro el correo electrónico. */}
              <p>Email: {employee.email}</p>

              {/* Muestro el número de legajo. */}
              <p>Legajo: {employee.legajo}</p>

              {/* Muestro el documento. */}
              <p>Documento: {employee.documento}</p>

              {/* Muestro el domicilio. */}
              <p>Domicilio: {employee.domicilio}</p>

              {/* Agrupo los botones de acciones. */}
              <div className="employee-actions">
                {/* Permito seleccionar un empleado para editar. */}
                <button
                  type="button"
                  className="btn-edit"
                  onClick={() => setEditingEmployee(employee)}
                >
                  Editar
                </button>

                {/* Permito eliminar un empleado. */}
                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => handleDelete(employee)}
                >
                  Eliminar
                </button>
              </div>

              {/* Muestro el formulario del empleado seleccionado. */}
              {editingEmployee?.id === employee.id && (
                <EditEmployeeForm
                  key={employee.id}
                  employee={employee}
                  onUserUpdated={async () => {
                    // Actualizo el listado después de editar.
                    const updated = await loadEmployees();

                    // Cierro el formulario si la actualización fue correcta.
                    if (updated) {
                      setEditingEmployee(null);
                    }
                  }}
                  onCancel={() => setEditingEmployee(null)}
                />
              )}
            </div>
          ))}
      </section>

      {/* Agrego un enlace para volver al Dashboard. */}
      <Link to="/" className="dashboard-button">
        Volver al inicio
      </Link>
    </main>
  );
}

// Exporto el componente de empleados.
export default Employees;