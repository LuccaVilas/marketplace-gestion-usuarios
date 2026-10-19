// Importo las herramientas para configurar las rutas.
import { Routes, Route } from "react-router-dom";
// Importo la página principal.
import Dashboard from "./pages/Dashboard";
// Importo la página de empleados.
import Employees from "./pages/Employees";
// Importo el menú lateral.
import Sidebar from "./components/Sidebar";

// Creo el componente principal.
function App() {
  // Muestro el menú lateral y las páginas del sistema.
return (
  <div className="app-layout">
    {/* Muestro el menú lateral en todas las páginas. */}
    <Sidebar />

    {/* Defino el área de contenido principal. */}
    <div className="app-content">
      {/* Configuro las rutas de navegación. */}
      <Routes>
        {/* Muestro el Dashboard en la página principal. */}
        <Route path="/" element={<Dashboard />} />

        {/* Muestro la gestión de empleados. */}
        <Route path="/empleados" element={<Employees />} />
      </Routes>
    </div>
  </div>
);
}

// Exporto el componente principal.
export default App;