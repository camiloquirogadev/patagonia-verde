/**
 * Utilidades de validación y sanitización de datos
 */

/**
 * Valida y clampea un valor numérico dentro de un rango
 */
export const clampNumber = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * Valida coordenadas geográficas
 */
export const validateCoordinates = (lat: number, lng: number): boolean => {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
};

/**
 * Valida y sanitiza un string
 */
export const sanitizeString = (input: unknown, maxLength = 1000): string => {
  if (typeof input !== 'string') {
    return '';
  }
  return input.trim().slice(0, maxLength);
};

/**
 * Valida que un valor sea un número finito positivo
 */
export const isPositiveNumber = (value: unknown): value is number => {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
};

/**
 * Valida formato de fecha ISO
 */
export const isValidISODate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Valida rango de brillo para incendios
 */
export const validateBrightness = (brightness: number): number => {
  return clampNumber(brightness, 0, 1000);
};
