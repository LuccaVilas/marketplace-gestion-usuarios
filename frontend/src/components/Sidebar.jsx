// Importo NavLink para navegar entre páginas.
import { NavLink } from "react-router-dom";

// Defino las secciones del menú.
const menuItems = [
  // Configuro el acceso al Dashboard.
  { path: "/", label: "Dashboard", end: true },

  // Configuro el acceso a la gestión de empleados.
  { path: "/empleados", label: "Empleados", end: false },
];

// Creo el componente del menú lateral.
function Sidebar() {
  // Muestro la estructura del Sidebar.
  return (
    <aside className="sidebar">
      {/* Muestro la identidad del sistema. */}
      <div className="sidebar-brand">
        {/* Muestro el nombre de la aplicación. */}
        <h2>Marketplace</h2>

        {/* Muestro el área administrativa. */}
        <span>Panel de Recursos Humanos</span>
      </div>

      {/* Creo la navegación principal. */}
      <nav className="sidebar-nav" aria-label="Navegación principal">
        {/* Genero los enlaces del menú. */}
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            {/* Muestro el nombre de la sección. */}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

// Exporto el menú lateral.
export default Sidebar;