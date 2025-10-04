// src/components/Stats/Stats.tsx
import { useMemo } from 'react';
import type { FirePoint } from '../../types/fire';

interface StatsProps {
  fires: FirePoint[];
  className?: string;
}

const Stats = ({ fires, className = '' }: StatsProps) => {
  // Memoizar cálculos de estadísticas
  const stats = useMemo(() => {
    const totalFires = fires.length;
    const highConfidence = fires.filter(f => f.confidence === 'high').length;
    const mediumConfidence = fires.filter(f => f.confidence === 'medium').length;
    const lowConfidence = fires.filter(f => f.confidence === 'low').length;
    
    const averageBrightness = fires.length > 0 
      ? Math.round(fires.reduce((sum, f) => sum + f.brightness, 0) / fires.length)
      : 0;

    return {
      totalFires,
      highConfidence,
      mediumConfidence,
      lowConfidence,
      averageBrightness
    };
  }, [fires]);

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Estadísticas de Incendios</h3>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{stats.totalFires}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-800">{stats.highConfidence}</div>
          <div className="text-sm text-gray-600">Alta Confianza</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.mediumConfidence}</div>
          <div className="text-sm text-gray-600">Media Confianza</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.lowConfidence}</div>
          <div className="text-sm text-gray-600">Baja Confianza</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.averageBrightness}</div>
          <div className="text-sm text-gray-600">Brillo Promedio</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;