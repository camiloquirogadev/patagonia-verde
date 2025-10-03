/**
 * Servicios de API para gestión de datos externos
 * Incluye configuración de tokens y endpoints de datos
 */

// Configuración base de la API - usa variable de entorno o localhost por defecto
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Obtiene el token de Mapbox desde variables de entorno
 * @returns Token de autenticación para Mapbox
 * @throws Error si no se encuentra el token
 */
export const getMapboxToken = async (): Promise<string> => {
  const token = import.meta.env.VITE_MAPBOX_TOKEN;
  if (!token) {
    throw new Error('Token de Mapbox no configurado. Verifica el archivo .env');
  }
  return token;
};

/**
 * Obtiene datos de incendios desde el servidor backend
 * @returns Datos de incendios en formato JSON
 * @throws Error si la petición falla
 */
export const fetchFiresData = async (): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/fires`);
  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}: No se pudieron cargar los datos`);
  }
  return response.json();
};