// src/hooks/useFirmsData.ts
import { useState, useEffect, useCallback } from "react";
import type { FirePoint } from "../types/fire";
import { staticFiresData } from "../data/static-fires";

// URL base para la API - actualmente usando datos estáticos
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

  // Función para cargar datos estáticos (sin servidor)
  const fetchFires = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Cargando datos estáticos de incendios');
      
      // Simular un pequeño retraso para imitar una carga real
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Verificar que los datos estáticos existan
      if (!staticFiresData || !staticFiresData.fires || !Array.isArray(staticFiresData.fires)) {
        throw new Error('Formato de datos estáticos inválido');
      }
      
      // Usar directamente los datos estáticos ya tipados
      const firesData = staticFiresData.fires;
      
      console.log('Datos estáticos cargados:', firesData.length, 'incendios');
      console.log('Muestra de datos:', firesData[0]);
      
      // Asegurarse de que los datos tengan el formato correcto
      const validatedData = firesData.map((fire, index) => ({
        id: fire.id || `fire-${index}-${Date.now()}`,
        latitude: typeof fire.latitude === 'number' ? fire.latitude : parseFloat(String(fire.latitude)) || 0,
        longitude: typeof fire.longitude === 'number' ? fire.longitude : parseFloat(String(fire.longitude)) || 0,
        brightness: typeof fire.brightness === 'number' ? fire.brightness : parseFloat(String(fire.brightness)) || 0,
        date: fire.date || new Date().toISOString(),
        confidence: (fire.confidence || 'medium') as FirePoint['confidence'],
        satellite: fire.satellite || 'Desconocido'
      }));
      
      setData(validatedData);
      
    } catch (err) {
      console.error('Error al cargar datos estáticos:', err);
      setError(err instanceof Error ? err : new Error('Error al cargar datos estáticos'));
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
