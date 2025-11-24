// src/test/setup-msw.ts
import { server } from '../mocks/server';

// Establecer la API de mocking antes de todas las pruebas.
beforeAll(() => server.listen());

// Resetear cualquier manejador de peticiones que podamos añadir durante las pruebas,
// para que no afecten a otras pruebas.
afterEach(() => server.resetHandlers());

// Limpiar después de que las pruebas hayan terminado.
afterAll(() => server.close());
