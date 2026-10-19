// Importo StrictMode para detectar posibles problemas en React.
import { StrictMode } from "react";

// Importo createRoot para renderizar la aplicación.
import { createRoot } from "react-dom/client";

// Importo BrowserRouter para habilitar la navegación.
import { BrowserRouter } from "react-router-dom";

// Importo los estilos globales.
import "./index.css";

// Importo el componente principal.
import App from "./App.jsx";

// Renderizo la aplicación dentro del elemento root.
createRoot(document.getElementById("root")).render(
  // Activo las verificaciones de React.
  <StrictMode>
    {/* Habilito la navegación entre páginas. */}
    <BrowserRouter>
      {/* Muestro el componente principal. */}
      <App />
    </BrowserRouter>
  </StrictMode>
);