/**
 * Definiciones de tipos para datos de incendios forestales
 * Compatible con formato NASA FIRMS (Fire Information for Resource Management System)
 */

// Niveles de confianza para detección de incendios
export type FireConfidence = 'high' | 'medium' | 'low';

// Estructura principal para puntos de incendio detectados
export interface FirePoint {
  id: string;               // Identificador único del incendio
  latitude: number;         // Coordenada latitud (decimal)
  longitude: number;        // Coordenada longitud (decimal)
  brightness: number;       // Temperatura de brillo en Kelvin
  date: string;            // Fecha y hora de detección (ISO string)
  confidence: FireConfidence; // Nivel de confianza de la detección
  satellite?: string;       // Satélite que detectó el incendio
  frp?: number;            // Potencia Radiativa del Fuego (MW)
  scan?: number;           // Ángulo de escaneo del sensor
  track?: number;          // Ángulo de seguimiento del sensor  
  version?: string;        // Versión del algoritmo de detección
}