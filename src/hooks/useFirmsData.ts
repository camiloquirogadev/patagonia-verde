/**
 * Hook personalizado para gestionar datos de incendios forestales
 * Maneja la carga, estado y actualización de datos de incendios desde diferentes fuentes
 */
import { useState, useEffect, useCallback } from "react";
import type { FirePoint } from "../types/fire";
import { staticFiresData } from "../data/static-fires";

// Configuración de API - cambiar a servidor real cuando esté disponible
// const API_BASE_URL = 'http://localhost:3000';

interface UseFirmsDataReturn {
  fires: FirePoint[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export const useFirmsData = (): UseFirmsDataReturn => {
  const [data, setData] = useState<FirePoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Función principal para obtener datos de incendios
  const fetchFires = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Iniciando carga de datos de incendios');
      
      // Simular latencia de red para mejor UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Validar estructura de datos antes de procesar
      if (!staticFiresData || !staticFiresData.fires || !Array.isArray(staticFiresData.fires)) {
        throw new Error('Estructura de datos inválida');
      }
      
      // Extraer datos de incendios de la fuente estática
      const firesData = staticFiresData.fires;
      
      console.log('Datos cargados exitosamente:', firesData.length, 'registros');
      console.log('Ejemplo de registro:', firesData[0]);
      
      // Normalizar y validar cada punto de incendio
      const validatedData = firesData.map((fire, index) => {
        // Validación de coordenadas
        const lat = typeof fire.latitude === 'number' ? fire.latitude : parseFloat(String(fire.latitude));
        const lng = typeof fire.longitude === 'number' ? fire.longitude : parseFloat(String(fire.longitude));
        
        if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
          console.warn(`Coordenadas inválidas para incendio ${fire.id}:`, { lat, lng });
          return null;
        }

        // Validación de brillo
        const brightness = typeof fire.brightness === 'number' ? fire.brightness : parseFloat(String(fire.brightness));
        if (isNaN(brightness) || brightness < 0) {
          console.warn(`Brillo inválido para incendio ${fire.id}:`, brightness);
          return null;
        }

        // Validación de confianza
        const validConfidences: FirePoint['confidence'][] = ['high', 'medium', 'low'];
        const confidence = validConfidences.includes(fire.confidence) ? fire.confidence : 'medium';

        // Validación de fecha
        const date = fire.date || new Date().toISOString();
        try {
          new Date(date).toISOString();
        } catch {
          console.warn(`Fecha inválida para incendio ${fire.id}:`, fire.date);
          return null;
        }

        return {
          id: fire.id || `fire-${index}-${Date.now()}`,
          latitude: lat,
          longitude: lng,
          brightness: brightness,
          date: date,
          confidence: confidence,
          satellite: typeof fire.satellite === 'string' ? fire.satellite.trim() : 'Desconocido'
        };
      }).filter(Boolean) as FirePoint[];
      
      setData(validatedData);
      
    } catch (err) {
      console.error('Error durante la carga de datos:', err);
      setError(err instanceof Error ? err : new Error('Error al cargar datos de incendios'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFires();
  }, [fetchFires]);

  return { 
    fires: data, 
    loading, 
    error,
    refresh: fetchFires 
  };
};

export type { FirePoint };
