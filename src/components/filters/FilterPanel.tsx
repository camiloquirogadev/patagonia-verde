// src/components/filters/FilterPanel.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

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
const AVAILABLE_CONFIDENCE_LEVELS = ['high', 'nominal', 'low'];

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
  const [isExpanded, setIsExpanded] = useState(true);

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
    } catch (error) {
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
    <div className="filter-panel">
      {/* Cabecera con estadísticas */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-200">Panel de Control</h3>
          <div className="flex gap-4 mt-2 text-sm">
            <div className="text-gray-400">
              Total: <span className="text-white font-medium">{totalFires}</span>
            </div>
            <div className="text-gray-400">
              Filtrados: <span className="text-white font-medium">{filteredFires}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
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
          <div className="filter-section">
            <h4 className="filter-header">Rango de Fechas</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm text-gray-400 mb-1">Inicio</label>
                <input
                  type="date"
                  id="startDate"
                  value={formatDateForInput(startDate)}
                  onChange={e => setStartDate(e.target.value || null)}
                  className="filter-input"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm text-gray-400 mb-1">Fin</label>
                <input
                  type="date"
                  id="endDate"
                  value={formatDateForInput(endDate)}
                  onChange={e => setEndDate(e.target.value || null)}
                  className="filter-input"
                />
              </div>
            </div>
          </div>

          {/* Brillo */}
          <div className="filter-section">
            <h4 className="filter-header">Brillo (Temperatura)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="minBrightness" className="block text-sm text-gray-400 mb-1">Mínimo (K)</label>
                <input
                  type="number"
                  id="minBrightness"
                  placeholder={`${DEFAULT_MIN_BRIGHTNESS}`}
                  value={minBrightness ?? ''}
                  onChange={e => setMinBrightness(e.target.value ? parseFloat(e.target.value) : null)}
                  className="filter-input"
                />
              </div>
              <div>
                <label htmlFor="maxBrightness" className="block text-sm text-gray-400 mb-1">Máximo (K)</label>
                <input
                  type="number"
                  id="maxBrightness"
                  placeholder={`${DEFAULT_MAX_BRIGHTNESS}`}
                  value={maxBrightness ?? ''}
                  onChange={e => setMaxBrightness(e.target.value ? parseFloat(e.target.value) : null)}
                  className="filter-input"
                />
              </div>
            </div>
          </div>

          {/* Nivel de Confianza */}
          <div className="filter-section">
            <h4 className="filter-header">Nivel de Confianza</h4>
            <div className="grid grid-cols-3 gap-2">
              {AVAILABLE_CONFIDENCE_LEVELS.map(level => (
                <button
                  key={level}
                  onClick={() => handleConfidenceChange(level)}
                  className={`confidence-button ${
                    selectedConfidenceLevels.includes(level) ? 'confidence-button-active' : ''
                  }`}
                >
                  <span className="capitalize">{level}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Satélite */}
          {availableSatellites.length > 0 && (
            <div className="filter-section">
              <h4 className="filter-header">Satélite</h4>
              <select
                id="satellite"
                value={selectedSatellite || ''}
                onChange={e => setSelectedSatellite(e.target.value || null)}
                className="filter-input"
              >
                <option value="">Todos los satélites</option>
                {availableSatellites.map(sat => (
                  <option key={sat} value={sat}>{sat}</option>
                ))}
              </select>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex gap-3">
            <button
              onClick={handleApplyFilters}
              disabled={isLoading}
              className={`flex-1 btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Aplicando...' : 'Aplicar'}
            </button>
            <button
              onClick={handleResetFiltersInternal}
              disabled={isLoading || !hasActiveFilters}
              className={`flex-1 btn-secondary ${
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
