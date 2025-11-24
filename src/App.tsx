import { useCallback, useEffect, useMemo, Suspense, useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { FirePoint } from './types/fire';
import { APP_VERSION, MOBILE_BREAKPOINT } from './config/constants';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import MapComponent from './components/map/MapComponent';
import { FireListModal } from './components/modals/FireListModal';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { MobileMenu } from './components/ui/MobileMenu';
import { useUI } from './context/UIContext';
import { useFireFilters } from './hooks/useFireFilters';
import { useFirmsData } from './hooks/useFirmsData';
import { getConfidenceDetails } from './utils/fireUtils';
import { getLocationName } from './utils/locationUtils';

function App() {
  const { fires, loading, error, refresh } = useFirmsData();
  const {
    activeFilters,
    filteredFires,
    handleFilterChange,
    handleResetFilters
  } = useFireFilters(fires);

  const {
    isModalOpen,
    modalCategory,
    modalTitle,
    modalFires,
    selectedFire,
    closeModal,
    selectFire,
  } = useUI();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const availableSatellites = useMemo(() => {
    return Array.from(new Set(fires.map(f => f.satellite).filter(Boolean))) as string[];
  }, [fires]);

  const handleResetFiltersApp = useCallback(() => {
    handleResetFilters();
  }, [handleResetFilters]);

  const handleMarkerClick = useCallback((fire: FirePoint) => {
    selectFire(fire);
  }, [selectFire]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100" role="alert" aria-live="assertive">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4 font-bold" aria-hidden="true">ERROR</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error de Conexión</h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            aria-label="Reintentar carga de datos"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden font-sans">
      <Header refresh={refresh} />

      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        <Sidebar
          isMobile={isMobile}
          filteredFires={filteredFires}
          availableSatellites={availableSatellites}
          refresh={refresh}
          activeFilters={activeFilters}
          handleFilterChange={handleFilterChange}
          handleResetFiltersApp={handleResetFiltersApp}
          loading={loading}
          totalFires={fires.length}
          appVersion={APP_VERSION}
        />

        <main className="flex-1 relative min-w-0 w-full" role="main" aria-label="Mapa de incendios">
          <MobileMenu
            isMobile={isMobile}
            refresh={refresh}
          />

          <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center bg-gray-100"><LoadingSpinner /></div>}>
            <MapComponent
              fires={filteredFires}
              onMarkerClick={handleMarkerClick}
              loading={loading}
            />
          </Suspense>

          {selectedFire && (
            <div 
              className="absolute bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:top-4 lg:bottom-auto bg-white p-3 sm:p-4 rounded-xl shadow-2xl z-[1000] max-w-full lg:max-w-sm animate-fade-in-up lg:animate-fade-in-down border-l-4 border-red-500"
              role="complementary"
              aria-label="Detalles del incendio seleccionado"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="min-w-0 flex-1 mr-2">
                  <h3 className="font-bold text-gray-800 text-base sm:text-lg truncate">Detalle de Foco</h3>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{getLocationName(selectedFire.latitude, selectedFire.longitude)}</p>
                </div>
                <button
                  onClick={() => selectFire(null)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                  aria-label="Cerrar panel de detalles"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                  <span className="text-xs sm:text-sm text-gray-600">Intensidad (Brillo)</span>
                  <span className="font-bold text-red-600 text-sm sm:text-base">{selectedFire.brightness}K</span>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                  <span className="text-xs sm:text-sm text-gray-600">Confianza</span>
                  <span className={`font-bold text-sm sm:text-base ${getConfidenceDetails(selectedFire.confidence).color}`}>
                    {getConfidenceDetails(selectedFire.confidence).text}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                  <span className="text-xs sm:text-sm text-gray-600">Fecha</span>
                  <span className="font-medium text-gray-800 text-xs sm:text-sm">
                    {format(new Date(selectedFire.date), 'dd/MM/yyyy HH:mm', { locale: es })}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                  <span className="text-xs sm:text-sm text-gray-600">Satélite</span>
                  <span className="font-medium text-blue-600 text-xs sm:text-sm">{selectedFire.satellite}</span>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 pt-3 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => selectFire(null)}
                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1"
                >
                  Cerrar detalle
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      <FireListModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        fires={modalFires}
        category={modalCategory}
      />
    </div>
  );
}

export default App;