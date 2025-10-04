/**
 * Componente principal del Sistema de Monitoreo de Incendios Forestales Patagonia Verde
 * 
 * Este módulo constituye la aplicación central que integra todos los subsistemas 
 * para el análisis geoespacial y geomática aplicada de incendios forestales en la región patagónica.
 * Implementa técnicas de teledetección satelital, Sistemas de Información Geográfica (SIG/GIS)
 * y algoritmos de procesamiento geomático en tiempo real basados en el sistema NASA FIRMS.
 * 
 * @author Camilo Quiroga - Desarrollador Full Stack & Especialista en Geomática
 * @version 1.0.0
 * @since 2025-10-01
 * 
 * Arquitectura del sistema geomático:
 * - Gestión de estado geoespacial mediante custom hooks optimizados
 * - Motor GIS basado en Leaflet con extensiones cartográficas avanzadas
 * - Lazy loading para componentes de alta demanda computacional geoespacial
 * - Filtrado multidimensional espacial con algoritmos de optimización SIG
 * - Visualización cartográfica interactiva con análisis espacial en tiempo real
 * - Análisis estadístico-espacial temporal con integración Chart.js
 * - Soporte para estándares OGC (WMS, WFS) e interoperabilidad geomática
 * 
 * Fuentes de datos geoespaciales:
 * - NASA FIRMS (Fire Information for Resource Management System)
 * - Sensores MODIS (Terra/Aqua) - Resolución espacial 1km
 * - Sensores VIIRS (SUOMI-NPP/NOAA-20) - Resolución espacial 375m/750m
 * - Datum de referencia: WGS84 (EPSG:4326) para compatibilidad GIS universal
 * - Metadatos espaciales conformes a estándares ISO 19115/19139
 */
import './App.css';
import { useState, useMemo, useCallback, Suspense, lazy, useEffect } from 'react';
import { useFirmsData, type FirePoint } from './hooks/useFirmsData';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Skeleton from './components/ui/Skeleton';
import { FireListModal } from './components/ui/FireListModal';
import { format, parseISO, startOfDay, endOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import FilterPanel, { type FilterCriteria } from './components/filters/FilterPanel';

// Lazy loading para componentes pesados
const MapComponent = lazy(() => import('./components/map/MapComponent'));
const FiresChart = lazy(() => import('./components/dashboard/FiresChart'));

const APP_VERSION = '1.0.0';

/**
 * Configuración inicial del sistema de filtros
 */
const initialFilterValues: FilterCriteria = {
  startDate: null,
  endDate: null,  
  minBrightness: null,
  maxBrightness: null,
  confidenceLevels: [],
  satellite: null,
};

/**
 * Componente principal del sistema de monitoreo
 * Optimizado para dispositivos móviles y Samsung Galaxy S22
 */
function App() {
  const { fires, loading, error, refresh } = useFirmsData();
  const [selectedFire, setSelectedFire] = useState<FirePoint | null>(null);
  const [isStatsCollapsed, setIsStatsCollapsed] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Estados para el modal de lista de incendios
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<'critical' | 'moderate' | 'total' | 'satellites'>('total');
  const [modalTitle, setModalTitle] = useState('');
  const [modalFires, setModalFires] = useState<FirePoint[]>([]);

  const [activeFilters, setActiveFilters] = useState<FilterCriteria>(initialFilterValues);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cerrar menú cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('.menu-dropdown')) {
        setIsMenuOpen(false);
      }
      if (isMobileSidebarOpen && !target.closest('aside') && !target.closest('.mobile-menu-button')) {
        setIsMobileSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, isMobileSidebarOpen]);

  const handleFilterChange = useCallback((newFilters: FilterCriteria) => {
    setActiveFilters(newFilters);
  }, []);

  const handleResetFiltersApp = useCallback(() => {
    setActiveFilters({ ...initialFilterValues });
  }, []);

  const availableSatellites = useMemo(() => {
    if (fires) {
      const uniqueSatellites = new Set(fires.map(fire => fire.satellite).filter(Boolean));
      return Array.from(uniqueSatellites) as string[];
    }
    return [];
  }, [fires]);

  const filteredFires = useMemo(() => {
    if (loading || error || !fires || fires.length === 0) {
      return [];
    }

    // Pre-procesar fechas para optimización
    const startTime = activeFilters.startDate ? startOfDay(parseISO(activeFilters.startDate)).getTime() : null;
    const endTime = activeFilters.endDate ? endOfDay(parseISO(activeFilters.endDate)).getTime() : null;
    const hasConfidenceFilter = activeFilters.confidenceLevels && activeFilters.confidenceLevels.length > 0;
    const confidenceLevelsSet = hasConfidenceFilter ? new Set(activeFilters.confidenceLevels?.map(c => c.toLowerCase()) || []) : null;

    return fires.filter((fire, index) => {
      try {
        // Validar datos del incendio
        if (!fire || typeof fire !== 'object') {
          return false;
        }

        // Filtro por fechas optimizado
        if (startTime || endTime) {
          const fireTime = parseISO(fire.date).getTime();
          if (startTime && fireTime < startTime) return false;
          if (endTime && fireTime > endTime) return false;
        }

        // Filtro por nivel de confianza optimizado
        if (hasConfidenceFilter) {
          const fireConfidence = fire.confidence?.toLowerCase() || '';
          if (!confidenceLevelsSet?.has(fireConfidence)) return false;
        }

        // Filtro por brillo
        if (activeFilters.minBrightness !== null && activeFilters.minBrightness !== undefined) {
          if (fire.brightness < activeFilters.minBrightness) return false;
        }
        if (activeFilters.maxBrightness !== null && activeFilters.maxBrightness !== undefined) {
          if (fire.brightness > activeFilters.maxBrightness) return false;
        }

        // Filtro por satélite
        if (activeFilters.satellite && activeFilters.satellite.trim() !== '') {
          if (fire.satellite !== activeFilters.satellite) return false;
        }

        return true;
      } catch (error) {
        console.error(`Error filtering fire ${index}:`, error);
        return false;
      }
    });
  }, [fires, activeFilters, loading, error]);

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
      {/* Botón hamburguesa para móvil - Menú único */}
      {isMobile && (
        <div className="relative">
          <button
            className="mobile-menu-button fixed top-4 right-4 z-50 lg:hidden flex items-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 transition-all duration-200 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            aria-label="Menú principal"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="text-sm font-medium text-white hidden sm:inline">Menú</span>
          </button>

          {/* Menú hamburguesa desplegable */}
          {isMobileSidebarOpen && (
            <div className="fixed top-16 right-4 w-72 bg-gray-800 rounded-lg border border-gray-600 shadow-xl z-40 overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Controles</h3>
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-1 text-gray-400 hover:text-white"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-2">
                  {/* Actualizar Datos */}
                  <button
                    onClick={() => {
                      setIsMobileSidebarOpen(false);
                      refresh();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-700 rounded-lg transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-white">Actualizar Datos</div>
                      <div className="text-xs text-gray-400">Recargar información satelital</div>
                    </div>
                  </button>

                  {/* Filtros Avanzados */}
                  <button
                    onClick={() => {
                      setIsMobileSidebarOpen(false);
                      setIsFiltersOpen(!isFiltersOpen);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-700 rounded-lg transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-white">Filtros Avanzados</div>
                      <div className="text-xs text-gray-400">Configurar criterios de búsqueda</div>
                    </div>
                  </button>

                  {/* Monitor de Tiempo Real */}
                  <button
                    onClick={() => {
                      setIsMobileSidebarOpen(false);
                      document.querySelector('.monitor-satelital')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-700 rounded-lg transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v2H4v-2zM4 15h10v2H4v-2zM4 11h10v2H4v-2zM4 7h10v2H4V7z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-white">Monitor Satelital</div>
                      <div className="text-xs text-gray-400">Ver detecciones activas</div>
                    </div>
                  </button>

                  {/* Análisis Temporal */}
                  <button
                    onClick={() => {
                      setIsMobileSidebarOpen(false);
                      document.querySelector('.temporal-analysis')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-700 rounded-lg transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-white">Análisis Temporal</div>
                      <div className="text-xs text-gray-400">Tendencias y estadísticas</div>
                    </div>
                  </button>

                  {/* Información del Sistema */}
                  <button
                    onClick={() => {
                      setIsMobileSidebarOpen(false);
                      document.querySelector('.info-sistema')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-700 rounded-lg transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-white">Información</div>
                      <div className="text-xs text-gray-400">Acerca del sistema</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Overlay para cerrar menú hamburguesa */}
      {isMobile && isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <header className="bg-gray-900 text-white shadow-lg border-b border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4">
          {/* Logo y título principal */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">🔥</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Patagonia Verde FIRMS
              </h1>
              <p className="text-xs text-gray-300 hidden sm:block">Sistema de Monitoreo Avanzado</p>
            </div>
          </div>

          {/* Navegación - Solo en desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Menú desplegable de control - Solo desktop */}
            <div className="menu-dropdown relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg border border-gray-600 transition-all duration-200"
              >
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="text-sm font-medium">Controles</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Menú desplegable */}
              {isMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-gray-800 rounded-lg border border-gray-600 shadow-xl z-50 overflow-hidden">
                  <div className="p-2">
                    {/* Filtros Avanzados */}
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsFiltersOpen(true);
                        // Scroll to filters
                        document.querySelector('.filter-panel')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-700 rounded-lg transition-all duration-200"
                    >
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-white">Filtros Avanzados</div>
                        <div className="text-xs text-gray-400">Configurar criterios de búsqueda</div>
                      </div>
                    </button>

                    {/* Monitor de Tiempo Real */}
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        // Scroll to alerts
                        document.querySelector('.alerts-center')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-700 rounded-lg transition-all duration-200"
                    >
                      <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v2H4v-2zM4 15h10v2H4v-2zM4 11h10v2H4v-2zM4 7h10v2H4V7z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-white">Monitor Tiempo Real</div>
                        <div className="text-xs text-gray-400">Alertas y detecciones activas</div>
                      </div>
                    </button>

                    {/* Análisis Temporal */}
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        // Scroll to chart
                        document.querySelector('.temporal-analysis')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-700 rounded-lg transition-all duration-200"
                    >
                      <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-white">Análisis Temporal</div>
                        <div className="text-xs text-gray-400">Tendencias y estadísticas</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Botón de actualización - Solo desktop */}
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg border border-gray-600 transition-all duration-200"
              onClick={refresh}
            >
              <svg className="w-4 h-4 text-gray-300 hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-sm font-medium hidden sm:inline">Actualizar</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
        <aside className={`
          w-full lg:w-72 xl:w-80 p-4 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 shadow-xl overflow-y-auto flex-shrink-0 z-10 border-r border-gray-700
          ${isMobile ? 'hidden lg:block' : ''}
        `}>
          <div className="space-y-6">
            {/* Header Académico del Sistema */}
            <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-xl p-4 border border-blue-800/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Sistema FIRMS</h2>
                  <p className="text-xs text-blue-300">Fire Information for Resource Management</p>
                </div>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Plataforma de monitoreo satelital en tiempo real para la detección y análisis de incendios forestales 
                utilizando datos de la NASA y algoritmos de teledetección avanzada.
              </p>
            </div>

            {/* Monitor de Tiempo Real Mejorado */}
            <div className="monitor-satelital bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                    filteredFires.filter(f => f.confidence === 'high').length > 5 ? 'bg-gradient-to-br from-red-600 to-red-700' : 
                    filteredFires.filter(f => f.confidence === 'high').length > 2 ? 'bg-gradient-to-br from-orange-600 to-amber-700' : 'bg-gradient-to-br from-green-600 to-emerald-700'
                  }`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {filteredFires.filter(f => f.confidence === 'high').length > 5 ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      ) : filteredFires.filter(f => f.confidence === 'high').length > 2 ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      )}
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Monitor Satelital</h3>
                    <p className="text-xs text-gray-400">Detecciones Activas • MODIS/VIIRS</p>
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <button
                    onClick={() => refresh()}
                    className="p-2 hover:bg-gray-700/70 rounded-lg transition-all duration-200 text-gray-300 hover:text-white backdrop-blur-sm"
                    title="Actualizar Datos"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className="p-2 hover:bg-blue-700/70 rounded-lg transition-all duration-200 text-gray-300 hover:text-blue-300 backdrop-blur-sm"
                    title="Filtros Avanzados"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Métricas Académicas */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setModalCategory('critical');
                    setModalTitle('Incendios de Alta Confianza');
                    setModalFires(filteredFires.filter(f => f.confidence === 'high'));
                    setIsModalOpen(true);
                  }}
                  className="bg-gradient-to-br from-red-900/30 to-red-800/20 hover:from-red-800/40 hover:to-red-700/30 border border-red-700/50 rounded-lg p-3 transition-all duration-300 backdrop-blur-sm group"
                >
                  <div className="text-xs text-red-300 font-medium mb-1">Alta Confianza</div>
                  <div className="text-2xl font-bold text-red-400 group-hover:text-red-300">{filteredFires.filter(f => f.confidence === 'high').length}</div>
                  <div className="text-xs text-red-400/70 mt-1">Focos críticos</div>
                </button>
                <button
                  onClick={() => {
                    setModalCategory('total');
                    setModalTitle('Dataset Completo de Detecciones');
                    setModalFires(filteredFires);
                    setIsModalOpen(true);
                  }}
                  className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 hover:from-blue-800/40 hover:to-blue-700/30 border border-blue-700/50 rounded-lg p-3 transition-all duration-300 backdrop-blur-sm group"
                >
                  <div className="text-xs text-blue-300 font-medium mb-1">Total Dataset</div>
                  <div className="text-2xl font-bold text-blue-400 group-hover:text-blue-300">{filteredFires.length}</div>
                  <div className="text-xs text-blue-400/70 mt-1">Detecciones</div>
                </button>
                <button
                  onClick={() => {
                    setModalCategory('moderate');
                    setModalTitle('Incendios de Confianza Moderada');
                    setModalFires(filteredFires.filter(f => f.confidence === 'medium'));
                    setIsModalOpen(true);
                  }}
                  className="bg-gradient-to-br from-orange-900/30 to-amber-800/20 hover:from-orange-800/40 hover:to-amber-700/30 border border-orange-700/50 rounded-lg p-3 transition-all duration-300 backdrop-blur-sm group"
                >
                  <div className="text-xs text-orange-300 font-medium mb-1">Conf. Moderada</div>
                  <div className="text-2xl font-bold text-orange-400 group-hover:text-orange-300">{filteredFires.filter(f => f.confidence === 'medium').length}</div>
                  <div className="text-xs text-orange-400/70 mt-1">Focos</div>
                </button>
                <button
                  onClick={() => {
                    setModalCategory('satellites');
                    setModalTitle('Cobertura Satelital Activa');
                    setModalFires(filteredFires.filter(f => f.satellite));
                    setIsModalOpen(true);
                  }}
                  className="bg-gradient-to-br from-emerald-900/30 to-green-800/20 hover:from-emerald-800/40 hover:to-green-700/30 border border-emerald-700/50 rounded-lg p-3 transition-all duration-300 backdrop-blur-sm group"
                >
                  <div className="text-xs text-emerald-300 font-medium mb-1">Satélites</div>
                  <div className="text-2xl font-bold text-emerald-400 group-hover:text-emerald-300">{availableSatellites.length}</div>
                  <div className="text-xs text-emerald-400/70 mt-1">Activos</div>
                </button>
              </div>

              {/* Información de actualización */}
              <div className="mt-4 pt-3 border-t border-gray-700/50">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Última actualización</span>
                  <span className="text-gray-300 font-mono">{new Date().toLocaleTimeString('es-ES')}</span>
                </div>
              </div>
            </div>

            {/* Panel de filtros mejorado */}
            {isFiltersOpen && (
              <div className="filter-panel bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-xl p-4 border border-indigo-700/30 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-white">Filtros de Análisis</h3>
                  </div>
                  <button
                    onClick={() => setIsFiltersOpen(false)}
                    className="p-1 hover:bg-gray-700/70 rounded text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <FilterPanel
                  initialFilters={activeFilters}
                  availableSatellites={availableSatellites}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFiltersApp}
                  totalFires={fires?.length || 0}
                  filteredFires={filteredFires.length}
                  isLoading={loading}
                />
              </div>
            )}

            {/* Análisis Temporal Académico */}
            <div className="temporal-analysis bg-gradient-to-br from-emerald-900/20 to-green-900/20 rounded-xl p-4 border border-emerald-700/30 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-green-700 rounded-lg flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Análisis Temporal</h3>
                    <p className="text-xs text-emerald-300">Series de Tiempo • Tendencias</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsStatsCollapsed(!isStatsCollapsed)}
                  className="p-1 hover:bg-emerald-700/70 rounded-lg transition-all duration-200 text-emerald-300 hover:text-emerald-200"
                >
                  <svg 
                    className={`w-4 h-4 transform transition-transform duration-300 ${!isStatsCollapsed ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              {!isStatsCollapsed && (
                <Suspense fallback={<Skeleton />}>
                  <FiresChart fires={filteredFires} />
                </Suspense>
              )}
            </div>

            {/* Información Académica y del Desarrollador */}
            <div className="info-sistema bg-gradient-to-br from-slate-900/50 to-gray-900/50 rounded-xl p-4 border border-slate-700/30 backdrop-blur-sm">
              <div className="space-y-4">
                {/* Información del Sistema */}
                <div>
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Información del Sistema
                  </h4>
                  <div className="space-y-2 text-xs text-gray-300">
                    <div className="flex items-center justify-between">
                      <span>Fuente de Datos:</span>
                      <span className="text-blue-300 font-medium">NASA FIRMS</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sensores:</span>
                      <span className="text-green-300 font-medium">MODIS/VIIRS</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Resolución Temporal:</span>
                      <span className="text-orange-300 font-medium">Tiempo Real</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Precisión Geográfica:</span>
                      <span className="text-purple-300 font-medium">1km</span>
                    </div>
                  </div>
                </div>

                {/* Información del Desarrollador */}
                <div className="pt-3 border-t border-gray-700/50">
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Desarrollo
                  </h4>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      CQ
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Camilo Quiroga</div>
                      <div className="text-xs text-gray-400">Software Engineer • Geomática</div>
                    </div>
                  </div>
                  
                  {/* Tecnologías */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-md border border-blue-600/30">React</span>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-md border border-blue-500/30">TypeScript</span>
                    <span className="px-2 py-1 bg-green-600/20 text-green-300 text-xs rounded-md border border-green-600/30">Leaflet</span>
                    <span className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-md border border-purple-600/30">Vite</span>
                  </div>

                  {/* Enlaces profesionales */}
                  <div className="flex items-center gap-3">
                    <a 
                      href="https://github.com/camiloquirogadev" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors text-xs group"
                    >
                      <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/camilo-quiroga-dev/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-gray-300 hover:text-blue-400 transition-colors text-xs group"
                    >
                      <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  </div>

                  {/* Versión y licencia */}
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-3 pt-2 border-t border-gray-700/30">
                    <span>v{APP_VERSION}</span>
                    <span>MIT License</span>
                  </div>
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
                  className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal de lista de incendios */}
      {isModalOpen && (
        <FireListModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          fires={modalFires}
          title={modalTitle}
          category={modalCategory}
        />
      )}
    </div>
  );
}

export default App;