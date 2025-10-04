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

const DEFAULT_MIN_BRIGHTNESS = 100;
const DEFAULT_MAX_BRIGHTNESS = 1000;
const AVAILABLE_CONFIDENCE_LEVELS = [
  { value: 'high', label: 'Alta', color: 'red' },
  { value: 'medium', label: 'Media', color: 'orange' },
  { value: 'low', label: 'Baja', color: 'yellow' }
];

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

  // Efecto para actualizar estados cuando cambien los filtros iniciales
  useEffect(() => {
    setStartDate(initialFilters.startDate || null);
    setEndDate(initialFilters.endDate || null);
    setMinBrightness(initialFilters.minBrightness || null);
    setMaxBrightness(initialFilters.maxBrightness || null);
    setSelectedConfidenceLevels(initialFilters.confidenceLevels || []);
    setSelectedSatellite(initialFilters.satellite || null);
  }, [initialFilters]);

  // Función para aplicar filtros de forma controlada
  const applyFilters = useCallback(() => {
    const filters: FilterCriteria = {
      startDate,
      endDate,
      minBrightness: minBrightness !== null && !isNaN(minBrightness) ? Number(minBrightness) : null,
      maxBrightness: maxBrightness !== null && !isNaN(maxBrightness) ? Number(maxBrightness) : null,
      confidenceLevels: selectedConfidenceLevels,
      satellite: selectedSatellite,
    };
    
    onFilterChange(filters);
  }, [startDate, endDate, minBrightness, maxBrightness, selectedConfidenceLevels, selectedSatellite, onFilterChange]);

  // Aplicar filtros automáticamente cuando cambien (con debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      applyFilters();
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timeoutId);
  }, [applyFilters]);

  const handleResetFiltersInternal = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setMinBrightness(null);
    setMaxBrightness(null);
    setSelectedConfidenceLevels([]);
    setSelectedSatellite(null);
    // Llamar al reset del componente padre
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

  // Calcular porcentaje de filtrado
  const filterPercentage = totalFires > 0 ? Math.round((filteredFires / totalFires) * 100) : 0;

  return (
    <div className="bg-gray-800 rounded-lg p-3 sm:p-4 shadow-lg border border-gray-700">
      {/* Cabecera moderna con estadísticas */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-white truncate">Filtros Avanzados</h3>
              <p className="text-xs text-gray-400 hidden sm:block">Configurar criterios de búsqueda</p>
            </div>
          </div>
          
          {/* Estadísticas mejoradas */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 text-sm">
            <div className="bg-gray-700 px-2 py-1.5 sm:px-3 sm:py-2 rounded-md sm:rounded-lg">
              <div className="text-gray-300 text-xs">Total</div>
              <div className="text-white font-bold text-sm sm:text-lg">{totalFires}</div>
            </div>
            <div className="bg-gray-700 px-2 py-1.5 sm:px-3 sm:py-2 rounded-md sm:rounded-lg">
              <div className="text-gray-300 text-xs">Filtrados</div>
              <div className="text-white font-bold text-sm sm:text-lg flex items-center gap-1">
                {filteredFires}
                <span className="text-xs text-gray-400">({filterPercentage}%)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-2 ml-3 sm:ml-4 flex-shrink-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 sm:p-2 hover:bg-gray-700 rounded-full transition-all duration-200 text-gray-300 hover:text-white transform hover:scale-110"
            aria-label={isExpanded ? 'Colapsar panel' : 'Expandir panel'}
          >
            <svg
              className={`w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Indicador de filtros activos */}
          {hasActiveFilters && (
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full animate-pulse"></div>
          )}
        </div>
      </div>

      {/* Contenido del panel expandible */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="space-y-4 sm:space-y-5 pt-2">
          {/* Rango de fechas con mejor diseño */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h4 className="text-xs sm:text-sm font-medium text-blue-300">Rango de Fechas</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label htmlFor="startDate" className="block text-xs text-gray-400 mb-1">Desde</label>
                <input
                  type="date"
                  id="startDate"
                  value={formatDateForInput(startDate)}
                  onChange={e => setStartDate(e.target.value || null)}
                  className="w-full p-2 bg-gray-700/50 border border-gray-600 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-xs sm:text-sm transition-all duration-200 hover:bg-gray-700"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-xs text-gray-400 mb-1">Hasta</label>
                <input
                  type="date"
                  id="endDate"
                  value={formatDateForInput(endDate)}
                  onChange={e => setEndDate(e.target.value || null)}
                  className="w-full p-2 bg-gray-700/50 border border-gray-600 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-xs sm:text-sm transition-all duration-200 hover:bg-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Rango de brillo con sliders */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h4 className="text-xs sm:text-sm font-medium text-orange-300">Intensidad de Brillo (K)</h4>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs text-gray-400 w-6 sm:w-8 flex-shrink-0">Min</span>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={minBrightness || DEFAULT_MIN_BRIGHTNESS}
                  onChange={e => setMinBrightness(Number(e.target.value))}
                  className="flex-1 h-1.5 sm:h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-xs text-white w-10 sm:w-12 text-right flex-shrink-0">{minBrightness || DEFAULT_MIN_BRIGHTNESS}K</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs text-gray-400 w-6 sm:w-8 flex-shrink-0">Max</span>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={maxBrightness || DEFAULT_MAX_BRIGHTNESS}
                  onChange={e => setMaxBrightness(Number(e.target.value))}
                  className="flex-1 h-1.5 sm:h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-xs text-white w-10 sm:w-12 text-right flex-shrink-0">{maxBrightness || DEFAULT_MAX_BRIGHTNESS}K</span>
              </div>
            </div>
          </div>

          {/* Nivel de Confianza con mejor UI */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-xs sm:text-sm font-medium text-green-300">Nivel de Confianza</h4>
            </div>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {AVAILABLE_CONFIDENCE_LEVELS.map(level => {
                const isSelected = selectedConfidenceLevels.includes(level.value);
                const colorClasses = {
                  red: isSelected ? 'bg-red-600 border-red-500 text-white' : 'bg-red-900/30 border-red-700 text-red-300 hover:bg-red-800/40',
                  orange: isSelected ? 'bg-orange-600 border-orange-500 text-white' : 'bg-orange-900/30 border-orange-700 text-orange-300 hover:bg-orange-800/40',
                  yellow: isSelected ? 'bg-yellow-600 border-yellow-500 text-white' : 'bg-yellow-900/30 border-yellow-700 text-yellow-300 hover:bg-yellow-800/40'
                };
                
                return (
                  <button
                    key={level.value}
                    onClick={() => handleConfidenceChange(level.value)}
                    className={`px-2 py-1.5 sm:px-3 sm:py-2 border rounded-md sm:rounded-lg text-xs font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                      colorClasses[level.color as keyof typeof colorClasses]
                    }`}
                  >
                    {level.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selector de satélite mejorado */}
          {availableSatellites.length > 0 && (
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
                <h4 className="text-xs sm:text-sm font-medium text-purple-300">Satélite</h4>
              </div>
              <select
                value={selectedSatellite || ''}
                onChange={e => setSelectedSatellite(e.target.value || null)}
                className="w-full p-2 bg-gray-700/50 border border-gray-600 rounded-md sm:rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white text-xs sm:text-sm transition-all duration-200 hover:bg-gray-700"
              >
                <option value="">Todos los satélites</option>
                {availableSatellites.map(sat => (
                  <option key={sat} value={sat}>{sat}</option>
                ))}
              </select>
            </div>
          )}

          {/* Botón de reset mejorado */}
          {hasActiveFilters && (
            <div className="pt-3 border-t border-gray-700">
              <button
                onClick={handleResetFiltersInternal}
                disabled={isLoading}
                className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white text-xs sm:text-sm font-medium rounded-md sm:rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="hidden sm:inline">Restablecer Filtros</span>
                  <span className="sm:hidden">Reset</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
