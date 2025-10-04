/**
 * Hook optimizado para gestionar datos de incendios forestales NASA FIRMS
 * 
 * Custom hook que encapsula la lógica de obtención, validación y cache
 * de datos satelitales de incendios forestales. Implementa buenas prácticas
 * de desarrollo React con optimizaciones de rendimiento.
 * 
 * Características principales:
 * - Cache en memoria con TTL para reducir requests redundantes
 * - Validación robusta de datos geoespaciales
 * - Memoización de estadísticas calculadas
 * - Manejo de errores con fallbacks graceful
 * 
 * @author Camilo Quiroga - Desarrollador Full Stack & Geomática
 * @version 1.0.0
 * @since 2025-10-01
 */
import { useState, useEffect, useCallback, useMemo } from "react";
import type { FirePoint } from "../types/fire";
import { staticFiresData } from "../data/static-fires";

interface UseFirmsDataReturn {
  fires: FirePoint[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  stats: {
    total: number;
    highConfidence: number;
    mediumConfidence: number;
    lowConfidence: number;
  };
}

// Cache simple para evitar reprocesamiento
let cachedData: FirePoint[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export const useFirmsData = (): UseFirmsDataReturn => {
  const [data, setData] = useState<FirePoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Función de validación optimizada
  const validateFirePoint = useCallback((fire: unknown, index: number): FirePoint | null => {
    try {
      // Type guard para validar estructura
      if (!fire || typeof fire !== 'object') {
        return null;
      }

      const fireObj = fire as Record<string, unknown>;

      // Validación de coordenadas
      const lat = Number(fireObj.latitude);
      const lng = Number(fireObj.longitude);
      
      if (!Number.isFinite(lat) || !Number.isFinite(lng) || 
          lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        return null;
      }

      // Validación de brillo
      const brightness = Number(fireObj.brightness);
      if (!Number.isFinite(brightness) || brightness < 0) {
        return null;
      }

      // Validación de confianza
      const validConfidences = ['high', 'medium', 'low'] as const;
      const confidenceStr = fireObj.confidence as string;
      const confidence = validConfidences.find(v => v === confidenceStr) || 'medium';

      // Fecha con fallback
      const date = typeof fireObj.date === 'string' ? fireObj.date : new Date().toISOString();

      return {
        id: typeof fireObj.id === 'string' ? fireObj.id : `fire-${index}-${Date.now()}`,
        latitude: lat,
        longitude: lng,
        brightness: brightness,
        date: date,
        confidence: confidence,
        satellite: typeof fireObj.satellite === 'string' ? fireObj.satellite.trim() : 'Desconocido'
      };
    } catch {
      return null;
    }
  }, []);

  // Función principal para obtener datos optimizada
  const fetchFires = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      // Verificar cache
      const now = Date.now();
      if (cachedData && (now - cacheTimestamp) < CACHE_DURATION) {
        setData(cachedData);
        setLoading(false);
        return;
      }
      
      // Simular latencia solo en desarrollo
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      // Validar estructura de datos
      if (!staticFiresData?.fires || !Array.isArray(staticFiresData.fires)) {
        throw new Error('Estructura de datos inválida');
      }
      
      // Procesar datos de forma eficiente
      const validatedData = staticFiresData.fires
        .map(validateFirePoint)
        .filter((fire): fire is FirePoint => fire !== null);
      
      // Actualizar cache
      cachedData = validatedData;
      cacheTimestamp = now;
      
      setData(validatedData);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar datos de incendios';
      setError(new Error(errorMessage));
      console.error('Error en useFirmsData:', err);
    } finally {
      setLoading(false);
    }
  }, [validateFirePoint]);

  // Estadísticas memoizadas
  const stats = useMemo(() => {
    const total = data.length;
    const highConfidence = data.filter(f => f.confidence === 'high').length;
    const mediumConfidence = data.filter(f => f.confidence === 'medium').length;
    const lowConfidence = data.filter(f => f.confidence === 'low').length;

    return {
      total,
      highConfidence,
      mediumConfidence,
      lowConfidence
    };
  }, [data]);

  useEffect(() => {
    fetchFires();
  }, [fetchFires]);

  return { 
    fires: data, 
    loading, 
    error,
    refresh: fetchFires,
    stats
  };
};

export type { FirePoint, UseFirmsDataReturn };
