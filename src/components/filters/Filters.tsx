// src/components/Filters/Filters.tsx
import { ChangeEvent } from 'react';
import { FireConfidence } from '../../types/fire';

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
  className?: string;
}

const Filters = ({ filters, onFilterChange, className = '' }: FiltersProps) => {
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

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="confidence" className="block text-sm font-medium text-gray-700 mb-1">
            Nivel de Confianza
          </label>
          <select
            id="confidence"
            value={filters.confidence}
            onChange={handleConfidenceChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            aria-label="Filtrar por nivel de confianza"
          >
            <option value="all">Todos</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label htmlFor="brightness" className="block text-sm font-medium text-gray-700">
              Rango de Brillo
            </label>
            <span className="text-sm text-gray-500">
              {filters.minBrightness} - {filters.maxBrightness}
            </span>
          </div>
          <div className="flex space-x-4">
            <input
              type="range"
              id="brightness-min"
              min="0"
              max="500"
              value={filters.minBrightness}
              onChange={(e) => handleBrightnessChange(e, 'min')}
              className="w-full"
              aria-label="Brillo mínimo"
            />
            <input
              type="range"
              id="brightness-max"
              min="0"
              max="500"
              value={filters.maxBrightness}
              onChange={(e) => handleBrightnessChange(e, 'max')}
              className="w-full"
              aria-label="Brillo máximo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;