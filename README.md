# Sistema de Gestión de Usuarios Internos

Aplicación Full Stack para administrar los empleados internos de un marketplace mediante un panel de Recursos Humanos.

## Tecnologías

**Frontend**
- React
- Vite
- React Router
- CSS3

**Backend**
- Node.js
- Express
- Sequelize
- SQLite

## Funcionalidades

- Dashboard con estadísticas de empleados.
- Registro de nuevos empleados.
- Listado y búsqueda de empleados.
- Edición de email y domicilio.
- Eliminación de empleados con confirmación.
- Validación de formularios.
- Actualización de datos sin recargar la página.
- Diseño responsive.

## Estructura del proyecto

```text
marketplace-gestion-usuarios/
├── frontend/
├── backend/
├── .gitignore
└── README.md
```

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/LuccaVilas/marketplace-gestion-usuarios
cd marketplace-gestion-usuarios
```

### 2. Configurar el backend

```bash
cd backend
npm install
npm run dev
```

El servidor estará disponible en:

http://localhost:3000

### 3. Configurar el frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en:

http://localhost:5173

## API REST

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/users | Listar empleados |
| POST | /api/users | Registrar empleado |
| PUT | /api/users/:id | Editar empleado |
| DELETE | /api/users/:id | Eliminar empleado |

## Base de datos

Se utiliza SQLite mediante Sequelize.

La base de datos se genera automáticamente al iniciar el backend.

## Pruebas automáticas

El backend cuenta con pruebas automatizadas utilizando Jest y Supertest.

Se verifican las siguientes operaciones:

- GET: consulta de empleados.
- POST: registro de empleados.
- POST: rechazo de legajos duplicados.
- PUT: actualización de email y domicilio.
- DELETE: eliminación de empleados.

### Ejecutar los tests

Desde la carpeta `backend`:

```bash
npm test
```

Las pruebas utilizan una base de datos SQLite temporal en memoria, sin modificar los datos reales.

**Resultado:** 5 pruebas aprobadas.

## Autor

Lucca Vilas 
Desarrollado como proyecto Full Stack para portafolio profesional.