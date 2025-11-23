/**
 * Configuración y validación de variables de entorno
 * Type-safe environment variables con validación en runtime
 */

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_MAPBOX_TOKEN?: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface Env {
  apiUrl: string;
  mapboxToken: string;
  mode: 'development' | 'production' | 'test';
  isDev: boolean;
  isProd: boolean;
}

/**
 * Valida y exporta variables de entorno con valores por defecto seguros
 */
function validateEnv(importMetaEnv: ImportMetaEnv): Env {
  const mode = importMetaEnv.MODE as 'development' | 'production' | 'test';
  
  return {
    apiUrl: importMetaEnv.VITE_API_URL || 'http://localhost:3000/api',
    mapboxToken: importMetaEnv.VITE_MAPBOX_TOKEN || '',
    mode,
    isDev: importMetaEnv.DEV,
    isProd: importMetaEnv.PROD,
  };
}

export const env = validateEnv(import.meta.env as unknown as ImportMetaEnv);
