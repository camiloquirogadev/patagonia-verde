/**
 * Aplicación principal Patagonia Verde
 * Dashboard para monitoreo de incendios forestales en tiempo real
 */
import './App.css';
import { useState, useMemo, useCallback } from 'react';
import { useFirmsData, type FirePoint } from './hooks/useFirmsData';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { format, parseISO, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import MapComponent from './components/map/MapComponent';
import FilterPanel, { type FilterCriteria } from './components/filters/FilterPanel';
import FiresChart from './components/dashboard/FiresChart';

const APP_VERSION = '1.0.0';

// Interfaz para estadísticas calculadas de incendios
interface Stats {
  totalFires: number;
  highConfidence: number;
  averageBrightness: number;
  satellites: string[];
  dateRange: { start?: string | null; end?: string | null };
}

// Configuración inicial de filtros (últimos 14 días)
const initialFilterValues: FilterCriteria = {
  startDate: format(new Date(new Date().setDate(new Date().getDate() - 14)), 'yyyy-MM-dd'),
  endDate: format(new Date(), 'yyyy-MM-dd'),
  minBrightness: 250,
  maxBrightness: 600,
  confidenceLevels: [],
  satellite: null,
};

function App() {
  const { fires, loading, error, refresh } = useFirmsData();
  const [selectedFire, setSelectedFire] = useState<FirePoint | null>(null);

  const [activeFilters, setActiveFilters] = useState<FilterCriteria>(initialFilterValues);
  console.log('App.tsx -> Raw fires data:', fires);
  console.log('App.tsx -> Active filters:', activeFilters);

  const handleFilterChange = useCallback((newFilters: FilterCriteria) => {
    setActiveFilters(newFilters);
  }, []);

  const handleResetFiltersApp = useCallback(() => {
    setActiveFilters(initialFilterValues);
  }, []);

  const availableSatellites = useMemo(() => {
    if (fires) {
      const uniqueSatellites = new Set(fires.map(fire => fire.satellite).filter(Boolean));
      return Array.from(uniqueSatellites) as string[];
    }
    return [];
  }, [fires]);

  const filteredFires = useMemo(() => {
    if (loading || error || !fires) return [];

    const result = fires.filter(fire => {
      const fireDate = parseISO(fire.date);

      let matchesDate = true;
      if (activeFilters.startDate) {
        const startDateFilter = startOfDay(parseISO(activeFilters.startDate));
        if (isBefore(fireDate, startDateFilter)) matchesDate = false;
      }
      if (matchesDate && activeFilters.endDate) {
        const endDateFilter = endOfDay(parseISO(activeFilters.endDate));
        if (isAfter(fireDate, endDateFilter)) matchesDate = false;
      }

      let matchesConfidence = true;
      if (activeFilters.confidenceLevels && activeFilters.confidenceLevels.length > 0) {
        matchesConfidence = activeFilters.confidenceLevels.includes(fire.confidence.toLowerCase());
      }

      let matchesBrightness = true;
      if (activeFilters.minBrightness !== null && activeFilters.minBrightness !== undefined) {
        if (fire.brightness < activeFilters.minBrightness) matchesBrightness = false;
      }
      if (matchesBrightness && activeFilters.maxBrightness !== null && activeFilters.maxBrightness !== undefined) {
        if (fire.brightness > activeFilters.maxBrightness) matchesBrightness = false;
      }

      let matchesSatellite = true;
      if (activeFilters.satellite) {
        matchesSatellite = fire.satellite === activeFilters.satellite;
      }

      return matchesDate && matchesConfidence && matchesBrightness && matchesSatellite;
    });
    console.log('App.tsx -> Filtered fires:', result);
    return result;
  }, [fires, activeFilters, loading, error]);

  const stats = useMemo<Stats>(() => {
    const firesToAnalyze = filteredFires;

    return {
      totalFires: firesToAnalyze.length,
      highConfidence: firesToAnalyze.filter(f => f.confidence.toLowerCase() === 'high').length,
      averageBrightness: firesToAnalyze.length
        ? firesToAnalyze.reduce((sum, fire) => sum + fire.brightness, 0) / firesToAnalyze.length
        : 0,
      satellites: [...new Set(firesToAnalyze.map(f => f.satellite).filter(Boolean))] as string[],
      dateRange: { start: activeFilters.startDate, end: activeFilters.endDate }
    };
  }, [filteredFires, activeFilters.startDate, activeFilters.endDate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Cargando datos de incendios...</p>
          <p className="text-xs text-gray-400 mt-2">Versión {APP_VERSION}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error.message || 'Ocurrió un error al cargar los datos de incendios'}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50" data-version={APP_VERSION}>
      <header className="bg-green-800 text-white p-4 shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-800 text-xl">🔥</span>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold">Incendios en Patagonia</h1>
          </div>
          <button
            className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
            onClick={refresh}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="hidden sm:inline">Actualizar</span>
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
        <aside className="w-full lg:w-80 xl:w-96 p-4 bg-gray-900 shadow-lg overflow-y-auto flex-shrink-0 z-10 border-r border-gray-700">
          <div className="space-y-6">
            <FilterPanel
              initialFilters={activeFilters}
              availableSatellites={availableSatellites}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFiltersApp}
              totalFires={fires?.length || 0}
              filteredFires={filteredFires.length}
              isLoading={loading}
            />

            <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
              <h3 className="font-medium text-white mb-4">Estadísticas</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                  <p className="text-sm text-gray-300">Total Incendios</p>
                  <p className="text-xl font-bold text-green-400">{stats.totalFires}</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                  <p className="text-sm text-gray-300">Alta Confianza</p>
                  <p className="text-xl font-bold text-red-400">{stats.highConfidence}</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                  <p className="text-sm text-gray-300">Brillo Promedio</p>
                  <p className="text-xl font-bold text-orange-400">{stats.averageBrightness.toFixed(1)} K</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                  <p className="text-sm text-gray-300">Satélites</p>
                  <p className="text-xl font-bold text-blue-400">{stats.satellites.length}</p>
                </div>
              </div>
              
              {/* Gráfico de evolución temporal */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Evolución Temporal</h4>
                <FiresChart 
                  fires={filteredFires}
                  type="line"
                  title="Incendios por Fecha"
                />
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 relative min-w-0">
          <MapComponent
            fires={filteredFires}
            onMarkerClick={setSelectedFire}
            loading={loading}
          />
          {selectedFire && (
            <div className="absolute bottom-4 left-4 right-4 lg:right-auto lg:max-w-sm bg-white p-4 rounded-lg shadow-lg z-10">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <h3 className="font-bold text-gray-900 mb-2">Detalles del Incendio</h3>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">Ubicación:</span> {selectedFire.latitude.toFixed(4)}, {selectedFire.longitude.toFixed(4)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Confianza:</span> <span className="capitalize">{selectedFire.confidence}</span>
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Brillo:</span> {selectedFire.brightness} K
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Satélite:</span> {selectedFire.satellite}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Fecha:</span> {format(new Date(selectedFire.date), 'dd/MM/yyyy HH:mm', { locale: es })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFire(null)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 p-1"
                  aria-label="Cerrar detalles"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;