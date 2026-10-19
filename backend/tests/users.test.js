// Importo Supertest para probar la API.
const request = require("supertest");

// Importo la aplicación Express.
const app = require("../src/app");

// Importo la conexión con SQLite.
const sequelize = require("../src/config/database");

// Importo el modelo de empleados.
const User = require("../src/models/User");

// Defino los datos del empleado de prueba.
const testEmployee = {
  nombre: "Juan",
  apellido: "Pérez",
  documento: "12345678",
  legajo: "TEST001",
  email: "juan@test.com",
  domicilio: "Calle 123",
};

// Preparo una base de datos limpia antes de las pruebas.
beforeAll(async () => {
  // Creo las tablas en SQLite temporal.
  await sequelize.sync({ force: true });
});

// Cierro la conexión al finalizar las pruebas.
afterAll(async () => {
  // Libero los recursos de SQLite.
  await sequelize.close();
});

// Agrupo las pruebas de usuarios.
describe("API de empleados", () => {
  // Guardo el ID del empleado creado.
  let employeeId;

  // Compruebo el registro de empleados.
  test("POST - registra un empleado", async () => {
    // Envío los datos al backend.
    const response = await request(app)
      .post("/api/users")
      .send(testEmployee);

    // Compruebo el código HTTP.
    expect(response.status).toBe(201);

    // Verifico el legajo registrado.
    expect(response.body.legajo).toBe("TEST001");

    // Guardo el ID para las siguientes pruebas.
    employeeId = response.body.id;
  });

  // Compruebo la consulta de empleados.
  test("GET - obtiene los empleados", async () => {
    // Consulto el listado de empleados.
    const response = await request(app).get("/api/users");

    // Verifico que la consulta sea exitosa.
    expect(response.status).toBe(200);

    // Compruebo que la respuesta sea un arreglo.
    expect(Array.isArray(response.body)).toBe(true);

    // Verifico que exista el empleado creado.
    expect(response.body).toHaveLength(1);
  });

  // Compruebo que no se permitan legajos duplicados.
  test("POST - rechaza legajos duplicados", async () => {
    // Intento registrar nuevamente el mismo empleado.
    const response = await request(app)
      .post("/api/users")
      .send(testEmployee);

    // Verifico que el servidor rechace el duplicado.
    expect(response.status).toBe(409);
  });

  // Compruebo la edición de empleados.
  test("PUT - actualiza email y domicilio", async () => {
    // Envío los nuevos datos del empleado.
    const response = await request(app)
      .put(`/api/users/${employeeId}`)
      .send({
        email: "nuevo@test.com",
        domicilio: "Calle 456",
      });

    // Verifico que la actualización sea exitosa.
    expect(response.status).toBe(200);

    // Compruebo el nuevo email.
    expect(response.body.email).toBe("nuevo@test.com");

    // Compruebo el nuevo domicilio.
    expect(response.body.domicilio).toBe("Calle 456");
  });

  // Compruebo la eliminación de empleados.
  test("DELETE - elimina un empleado", async () => {
    // Solicito eliminar el empleado creado.
    const response = await request(app)
      .delete(`/api/users/${employeeId}`);

    // Verifico que la eliminación sea exitosa.
    expect(response.status).toBe(200);

    // Compruebo que el empleado ya no exista.
    const employee = await User.findByPk(employeeId);

    // Verifico que la consulta no encuentre registros.
    expect(employee).toBeNull();
  });
});