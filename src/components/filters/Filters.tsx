// src/components/Filters/Filters.tsx
import { useMemo } from 'react';
import type { ChangeEvent } from 'react';

interface FiltersProps {
  filters: {
    confidence: string;
    minBrightness: number;
    maxBrightness: number;
  };
  onFilterChange: (filters: {
    confidence: string;
    minBrightness: number;
    maxBrightness: number;
  }) => void;
  totalFires?: number;
  filteredCount?: number;
  className?: string;
}

const Filters = ({ 
  filters, 
  onFilterChange, 
  totalFires = 0, 
  filteredCount = 0, 
  className = '' 
}: FiltersProps) => {
  const handleConfidenceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      confidence: e.target.value
    });
  };

  const handleBrightnessChange = (e: ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = parseInt(e.target.value, 10);
    onFilterChange({
      ...filters,
      [type === 'min' ? 'minBrightness' : 'maxBrightness']: value
    });
  };

  const resetFilters = () => {
    onFilterChange({
      confidence: 'all',
      minBrightness: 0,
      maxBrightness: 500
    });
  };

  const confidenceOptions = useMemo(() => [
    { value: 'all', label: '🌍 Todos los niveles', count: totalFires },
    { value: 'high', label: '🔥 Alta confianza', emoji: '🔴' },
    { value: 'medium', label: '⚠️ Media confianza', emoji: '🟡' },
    { value: 'low', label: '📊 Baja confianza', emoji: '🟢' }
  ], [totalFires]);

  const isFiltered = filters.confidence !== 'all' || 
                   filters.minBrightness > 0 || 
                   filters.maxBrightness < 500;

  return (
    <div className={`bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-200 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          🎛️ Filtros
        </h2>
        {isFiltered && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-800 underline transition-colors"
            title="Limpiar todos los filtros"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Contador de resultados */}
      <div className="mb-6 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
        <div className="text-center">
          <span className="text-2xl font-bold text-blue-700">{filteredCount}</span>
          <span className="text-sm text-blue-600 ml-2">de {totalFires} incendios</span>
        </div>
        {isFiltered && (
          <div className="text-xs text-blue-500 text-center mt-1">
            Filtros aplicados
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        {/* Filtro de confianza mejorado */}
        <div>
          <label htmlFor="confidence" className="block text-sm font-semibold text-gray-700 mb-3">
            📊 Nivel de Confianza
          </label>
          <select
            id="confidence"
            value={filters.confidence}
            onChange={handleConfidenceChange}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white shadow-sm"
            aria-label="Filtrar por nivel de confianza"
          >
            {confidenceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de brillo modernizado */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold text-gray-700">
              ☀️ Rango de Brillo
            </label>
            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
              {filters.minBrightness} - {filters.maxBrightness}
            </span>
          </div>
          
          {/* Slider dual mejorado */}
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Mínimo</label>
              <input
                type="range"
                id="brightness-min"
                min="0"
                max="500"
                step="10"
                value={filters.minBrightness}
                onChange={(e) => handleBrightnessChange(e, 'min')}
                className="w-full h-2 bg-gradient-to-r from-blue-200 to-red-200 rounded-lg appearance-none cursor-pointer slider"
                aria-label="Brillo mínimo"
              />
            </div>
            
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Máximo</label>
              <input
                type="range"
                id="brightness-max"
                min="0"
                max="500"
                step="10"
                value={filters.maxBrightness}
                onChange={(e) => handleBrightnessChange(e, 'max')}
                className="w-full h-2 bg-gradient-to-r from-blue-200 to-red-200 rounded-lg appearance-none cursor-pointer slider"
                aria-label="Brillo máximo"
              />
            </div>
          </div>

          {/* Presets rápidos */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <button
              onClick={() => onFilterChange({ ...filters, minBrightness: 0, maxBrightness: 150 })}
              className="text-xs py-2 px-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              🟢 Bajo
            </button>
            <button
              onClick={() => onFilterChange({ ...filters, minBrightness: 150, maxBrightness: 350 })}
              className="text-xs py-2 px-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
            >
              🟡 Medio
            </button>
            <button
              onClick={() => onFilterChange({ ...filters, minBrightness: 350, maxBrightness: 500 })}
              className="text-xs py-2 px-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              🔴 Alto
            </button>
          </div>
        </div>
      </div>

      {/* Ayuda contextual */}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
        <p className="font-medium mb-1">💡 Ayuda:</p>
        <p>• El brillo indica la intensidad del incendio</p>
        <p>• La confianza muestra la precisión del satélite</p>
      </div>
    </div>
  );
};

export default Filters;
