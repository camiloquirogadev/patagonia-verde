// src/components/filters/FilterPanel.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

// Interfaz para los criterios de filtro
export interface FilterCriteria {
  startDate?: string | null;
  endDate?: string | null;
  minBrightness?: number | null;
  maxBrightness?: number | null;
  confidenceLevels?: string[];
  satellite?: string | null;
}

// Props del componente
interface FilterPanelProps {
  initialFilters?: Partial<FilterCriteria>;
  availableSatellites?: string[];
  onFilterChange: (filters: FilterCriteria) => void;
  onResetFilters: () => void;
  totalFires?: number;
  filteredFires?: number;
  isLoading?: boolean;
}

const DEFAULT_MIN_BRIGHTNESS = 300;
const DEFAULT_MAX_BRIGHTNESS = 500;
const AVAILABLE_CONFIDENCE_LEVELS = ['high', 'medium', 'low'];

const FilterPanel: React.FC<FilterPanelProps> = ({
  initialFilters = {},
  availableSatellites = [],
  onFilterChange,
  onResetFilters,
  totalFires = 0,
  filteredFires = 0,
  isLoading = false,
}) => {
  // Estados para los filtros
  const [startDate, setStartDate] = useState<string | null>(initialFilters.startDate || null);
  const [endDate, setEndDate] = useState<string | null>(initialFilters.endDate || null);
  const [minBrightness, setMinBrightness] = useState<number | null>(initialFilters.minBrightness || null);
  const [maxBrightness, setMaxBrightness] = useState<number | null>(initialFilters.maxBrightness || null);
  const [selectedConfidenceLevels, setSelectedConfidenceLevels] = useState<string[]>(initialFilters.confidenceLevels || []);
  const [selectedSatellite, setSelectedSatellite] = useState<string | null>(initialFilters.satellite || null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Efecto para actualizar estados
  useEffect(() => {
    setStartDate(initialFilters.startDate || null);
    setEndDate(initialFilters.endDate || null);
    setMinBrightness(initialFilters.minBrightness || null);
    setMaxBrightness(initialFilters.maxBrightness || null);
    setSelectedConfidenceLevels(initialFilters.confidenceLevels || []);
    setSelectedSatellite(initialFilters.satellite || null);
  }, [initialFilters]);

  // Manejadores
  const handleApplyFilters = useCallback(() => {
    onFilterChange({
      startDate,
      endDate,
      minBrightness: minBrightness !== null && !isNaN(minBrightness) ? Number(minBrightness) : null,
      maxBrightness: maxBrightness !== null && !isNaN(maxBrightness) ? Number(maxBrightness) : null,
      confidenceLevels: selectedConfidenceLevels,
      satellite: selectedSatellite,
    });
  }, [startDate, endDate, minBrightness, maxBrightness, selectedConfidenceLevels, selectedSatellite, onFilterChange]);

  const handleResetFiltersInternal = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setMinBrightness(null);
    setMaxBrightness(null);
    setSelectedConfidenceLevels([]);
    setSelectedSatellite(null);
    onResetFilters();
  }, [onResetFilters]);

  const handleConfidenceChange = (confidence: string) => {
    setSelectedConfidenceLevels(prev =>
      prev.includes(confidence)
        ? prev.filter(c => c !== confidence)
        : [...prev, confidence]
    );
  };

  const formatDateForInput = (dateString: string | null | undefined): string => {
    if (!dateString) return '';
    try {
      return format(parseISO(dateString), 'yyyy-MM-dd');
    } catch {
      if (typeof dateString === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString;
      }
      return '';
    }
  };

  // Calcular si hay filtros activos
  const hasActiveFilters = startDate || endDate || minBrightness || maxBrightness || 
                          selectedConfidenceLevels.length > 0 || selectedSatellite;

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700">
      {/* Cabecera con estadísticas */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">Panel de Control</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-700 px-3 py-2 rounded-md">
              <div className="text-gray-300">Total</div>
              <div className="text-green-400 font-bold text-lg">{totalFires}</div>
            </div>
            <div className="bg-gray-700 px-3 py-2 rounded-md">
              <div className="text-gray-300">Filtrados</div>
              <div className="text-blue-400 font-bold text-lg">{filteredFires}</div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 ml-4 hover:bg-gray-700 rounded-full transition-colors text-gray-300 hover:text-white"
          aria-label={isExpanded ? 'Colapsar panel' : 'Expandir panel'}
        >
          <svg
            className={`w-6 h-6 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Contenido del panel */}
      {isExpanded && (
        <div className="space-y-6">
          {/* Rango de fechas */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Rango de Fechas</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm text-gray-400 mb-2">Inicio</label>
                <input
                  type="date"
                  id="startDate"
                  value={formatDateForInput(startDate)}
                  onChange={e => setStartDate(e.target.value || null)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400 text-white text-sm transition-colors duration-200"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm text-gray-400 mb-2">Fin</label>
                <input
                  type="date"
                  id="endDate"
                  value={formatDateForInput(endDate)}
                  onChange={e => setEndDate(e.target.value || null)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400 text-white text-sm transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          {/* Brillo */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Brillo (Temperatura)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="minBrightness" className="block text-sm text-gray-400 mb-2">Mínimo (K)</label>
                <input
                  type="number"
                  id="minBrightness"
                  placeholder={`${DEFAULT_MIN_BRIGHTNESS}`}
                  value={minBrightness ?? ''}
                  onChange={e => setMinBrightness(e.target.value ? parseFloat(e.target.value) : null)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400 text-white text-sm transition-colors duration-200"
                />
              </div>
              <div>
                <label htmlFor="maxBrightness" className="block text-sm text-gray-400 mb-2">Máximo (K)</label>
                <input
                  type="number"
                  id="maxBrightness"
                  placeholder={`${DEFAULT_MAX_BRIGHTNESS}`}
                  value={maxBrightness ?? ''}
                  onChange={e => setMaxBrightness(e.target.value ? parseFloat(e.target.value) : null)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400 text-white text-sm transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          {/* Nivel de Confianza */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Nivel de Confianza</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {AVAILABLE_CONFIDENCE_LEVELS.map(level => (
                <button
                  key={level}
                  onClick={() => handleConfidenceChange(level)}
                  className={`px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm text-gray-300 transition-all duration-200 hover:bg-gray-600 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 active:transform active:scale-95 ${
                    selectedConfidenceLevels.includes(level) ? 'bg-green-600 border-green-500 text-white hover:bg-green-700 shadow-md' : ''
                  }`}
                >
                  <span className="capitalize">{level}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Satélite */}
          {availableSatellites.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Satélite</h4>
              <select
                id="satellite"
                value={selectedSatellite || ''}
                onChange={e => setSelectedSatellite(e.target.value || null)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400 text-white text-sm transition-colors duration-200"
              >
                <option value="">Todos los satélites</option>
                {availableSatellites.map(sat => (
                  <option key={sat} value={sat}>{sat}</option>
                ))}
              </select>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700">
            <button
              onClick={handleApplyFilters}
              disabled={isLoading}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 text-white focus:ring-green-500/50 border-0 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Aplicando...
                </div>
              ) : (
                'Aplicar Filtros'
              )}
            </button>
            <button
              onClick={handleResetFiltersInternal}
              disabled={isLoading || !hasActiveFilters}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500/50 border-0 ${
                (isLoading || !hasActiveFilters) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Restablecer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
