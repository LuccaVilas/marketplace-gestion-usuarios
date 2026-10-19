// Importo los hooks para gestionar estados y efectos.
import { useState, useEffect } from "react";

// Importo Link para navegar entre páginas.
import { Link } from "react-router-dom";

// Importo la función para consultar empleados.
import { getUsers } from "../services/userService";

// Creo el componente principal del Dashboard.
function Dashboard() {
  // Guardo la cantidad total de empleados.
  const [totalEmployees, setTotalEmployees] = useState(0);

  // Controlo el estado de carga.
  const [loading, setLoading] = useState(true);

  // Guardo los posibles errores.
  const [error, setError] = useState("");

  // Consulto los empleados al cargar el Dashboard.
  useEffect(() => {
    // Creo la función para obtener las estadísticas.
    const loadDashboard = async () => {
      try {
        // Obtengo los empleados desde la API.
        const employees = await getUsers();

        // Actualizo la cantidad de empleados.
        setTotalEmployees(employees.length);

        // Limpio los errores anteriores.
        setError("");
      } catch (error) {
        // Guardo el mensaje de error.
        setError(error.message);
      } finally {
        // Finalizo el estado de carga.
        setLoading(false);
      }
    };

    // Ejecuto la consulta.
    loadDashboard();
  }, []);

  // Muestro el contenido del Dashboard.
  return (
    <main className="dashboard">
      {/* Creo el encabezado principal. */}
      <header className="dashboard-header">
        {/* Muestro la categoría de la página. */}
        <span className="dashboard-label">
          PANEL GENERAL
        </span>

        {/* Muestro el título principal. */}
        <h1>Dashboard</h1>

        {/* Muestro la descripción del sistema. */}
        <p>
          Administración y gestión del personal interno del marketplace.
        </p>
      </header>

      {/* Creo la sección de estadísticas. */}
      <section className="dashboard-stats">
        {/* Creo la tarjeta de empleados registrados. */}
        <div className="stat-card">
          {/* Identifico la estadística. */}
          <span>Empleados registrados</span>

          {/* Muestro la cantidad o el estado de carga. */}
          <h2>
            {loading ? "..." : error ? "—" : totalEmployees}
          </h2>

          {/* Muestro un mensaje según el resultado. */}
          <p>
            {loading
              ? "Cargando información..."
              : error
                ? "No se pudo obtener la información."
                : "Total de empleados en el sistema"}
          </p>
        </div>
      </section>

      {/* Creo la sección de bienvenida. */}
      <section className="dashboard-welcome">
        {/* Muestro el título de bienvenida. */}
        <h2>Gestión de Recursos Humanos</h2>

        {/* Explico la función del sistema. */}
        <p>
          Centralizá la información de los empleados y administrá
          sus registros desde un solo lugar.
        </p>

        {/* Creo el acceso directo a empleados. */}
        <Link to="/empleados" className="dashboard-button">
          Gestionar empleados
        </Link>
      </section>
    </main>
  );
}

// Exporto el componente principal.
export default Dashboard;