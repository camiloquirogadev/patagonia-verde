/**
 * Aplicación principal Patagonia Verde
 * Dashboard para monitoreo de incendios forestales en tiempo real
 */
import './App.css';
import { useState, useMemo, useCallback, Suspense, lazy } from 'react';
import { useFirmsData, type FirePoint } from './hooks/useFirmsData';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Skeleton from './components/ui/Skeleton';
import { format, parseISO, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import FilterPanel, { type FilterCriteria } from './components/filters/FilterPanel';

// Lazy loading para componentes pesados
const MapComponent = lazy(() => import('./components/map/MapComponent'));
const FiresChart = lazy(() => import('./components/dashboard/FiresChart'));

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
  const [isStatsCollapsed, setIsStatsCollapsed] = useState(false);

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

            <div className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700">
              {/* Cabecera con título y botón de contraer */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Estadísticas</h3>
                </div>
                <button
                  onClick={() => setIsStatsCollapsed(!isStatsCollapsed)}
                  className="p-2 ml-4 hover:bg-gray-700 rounded-full transition-colors text-gray-300 hover:text-white"
                  aria-label={!isStatsCollapsed ? 'Colapsar panel' : 'Expandir panel'}
                >
                  <svg 
                    className={`w-6 h-6 transform transition-transform ${!isStatsCollapsed ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              {!isStatsCollapsed && (
                <>
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
                    <Suspense fallback={<Skeleton variant="chart" className="bg-gray-700" />}>
                      <FiresChart 
                        fires={filteredFires}
                        type="line"
                        title="Incendios por Fecha"
                      />
                    </Suspense>
                  </div>
                </>
              )}
            </div>

            {/* Sección de apoyo al proyecto - independiente */}
            <div className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700">
              <div className="text-center space-y-3">
                <button
                  onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=YOUR_BUTTON_ID', '_blank')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8.5 12.5c0 .28.22.5.5.5h3v3c0 .28.22.5.5.5s.5-.22.5-.5v-3h3c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-3V9c0-.28-.22-.5-.5-.5s-.5.22-.5.5v3H9c-.28 0-.5.22-.5.5z"/>
                  </svg>
                  Apoyar el Proyecto
                </button>
                
                <div className="text-xs text-gray-400 space-y-1">
                  <p>© 2025 Camilo Quiroga</p>
                  
                  {/* Enlaces sociales */}
                  <div className="flex justify-center gap-4 mt-2">
                    <a 
                      href="https://github.com/camiloquirogadev" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="GitHub"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    
                    <a 
                      href="https://www.linkedin.com/in/camilo-quiroga-dev/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                  
                  <p className="text-gray-500">v{APP_VERSION}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 relative min-w-0">
          <Suspense fallback={<div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
            <LoadingSpinner />
          </div>}>
            <MapComponent
              fires={filteredFires}
              onMarkerClick={setSelectedFire}
              loading={loading}
            />
          </Suspense>
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