const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const getMapboxToken = async (): Promise<string> => {
  const token = import.meta.env.VITE_MAPBOX_TOKEN;
  if (!token) {
    throw new Error('No se encontró el token de Mapbox en las variables de entorno. Asegúrate de crear un archivo .env con VITE_MAPBOX_TOKEN');
  }
  return token;
};

export const fetchFiresData = async (): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/fires`);
  if (!response.ok) {
    throw new Error('Error al cargar los datos de incendios');
  }
  return response.json();
};