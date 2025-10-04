/**
 * Definiciones de tipos para el Sistema de Monitoreo de Incendios Forestales
 * 
 * Este módulo define las interfaces y tipos de datos utilizados en el procesamiento
 * de información satelital proveniente del sistema NASA FIRMS. Las estructuras
 * están diseñadas para mantener compatibilidad completa con los estándares
 * internacionales de teledetección, geomática aplicada y Sistemas de Información 
 * Geográfica (SIG/GIS).
 * 
 * Estándares de referencia:
 * - NASA FIRMS API v1.0+ (Fire Information for Resource Management System)
 * - MODIS Collection 6.1 Active Fire Product (MOD14/MYD14)
 * - VIIRS 375m/750m Active Fire Product (VNP14/VJ114)
 * - ISO 19115/19139 para metadatos geoespaciales
 * - OGC Simple Features Specification para geometrías
 * - EPSG:4326 (WGS84) como sistema de referencia espacial estándar
 * 
 * @author Camilo Quiroga - Desarrollador Full Stack & Especialista en Geomática
 * @version 1.0.0
 * @since 2025-10-01
 */

/**
 * Clasificación de niveles de confianza según estándares NASA FIRMS
 * 
 * Los algoritmos de detección de incendios satelitales asignan un nivel
 * de confianza estadística basado en características espectrales y
 * contextualización espacial del pixel analizado.
 * 
 * @typedef {('high'|'medium'|'low')} FireConfidence
 * @property {'high'} high - Probabilidad > 80% (recomendado para alertas)
 * @property {'medium'} medium - Probabilidad 50-80% (requiere validación)  
 * @property {'low'} low - Probabilidad < 50% (uso investigativo)
 */
export type FireConfidence = 'high' | 'medium' | 'low';

/**
 * Estructura de datos para puntos de detección de incendios forestales
 * 
 * Representa una detección individual de actividad ígnea capturada por
 * sensores satelitales de teledetección. Cada punto contiene información
 * geoespacial, temporal y espectral necesaria para análisis científico.
 * 
 * @interface FirePoint
 */
export interface FirePoint {
  /** 
   * Identificador único alfanumérico de la detección
   * Formato: "fire-{timestamp}-{sensor}" o UUID v4
   */
  id: string;
  
  /** 
   * Coordenada de latitud en grados decimales
   * Rango válido: [-90.0, 90.0]
   * Sistema de referencia: WGS84 (EPSG:4326)
   */
  latitude: number;
  
  /** 
   * Coordenada de longitud en grados decimales  
   * Rango válido: [-180.0, 180.0]
   * Sistema de referencia: WGS84 (EPSG:4326)
   */
  longitude: number;
  
  /** 
   * Temperatura de brillo del pixel en grados Kelvin
   * Rango típico: [300K, 1000K]
   * Banda espectral: Infrarrojo medio (3.9μm para MODIS, 3.74μm para VIIRS)
   */
  brightness: number;
  
  /** 
   * Timestamp de detección satelital
   * Formato: ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)
   * Timezone: UTC obligatorio
   */
  date: string;
  
  /** 
   * Nivel de confianza estadística de la detección
   * Calculado mediante algoritmos probabilísticos NASA
   */
  confidence: FireConfidence;
  
  /** 
   * Plataforma satelital responsable de la detección
   * Valores típicos: "Terra", "Aqua", "SUOMI-NPP", "NOAA-20"
   * @optional
   */
  satellite?: string;
  
  /** 
   * Potencia Radiativa del Fuego (Fire Radiative Power)
   * Unidades: Megawatts (MW)
   * Indicador de intensidad energética del incendio
   * @optional
   */
  frp?: number;
  
  /** 
   * Ángulo de escaneo del sensor al momento de la detección
   * Rango: [0°, 65°] - Afecta la precisión geográfica
   * @optional
   */
  scan?: number;
  
  /** 
   * Ángulo de seguimiento de la plataforma satelital
   * Rango: [0°, 180°] - Orientación del sensor
   * @optional  
   */
  track?: number;
  
  /** 
   * Versión del algoritmo de procesamiento utilizado
   * Formato: "Collection.Version" (ej: "6.1", "1.0")
   * @optional
   */
  version?: string;
}