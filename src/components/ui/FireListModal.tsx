import React from 'react';
import type { FirePoint } from '../../types/fire';

interface FireListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fires: FirePoint[];
  category: 'critical' | 'moderate' | 'total' | 'satellites';
}

export const FireListModal: React.FC<FireListModalProps> = ({
  isOpen,
  onClose,
  title,
  fires,
  category
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getConfidenceInfo = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return { 
          level: 'Alta', 
          color: 'text-red-600', 
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          emoji: '🔴',
          percentage: '85-100%'
        };
      case 'medium':
        return { 
          level: 'Media', 
          color: 'text-orange-600', 
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          emoji: '🟠',
          percentage: '50-84%'
        };
      default:
        return { 
          level: 'Baja', 
          color: 'text-yellow-600', 
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          emoji: '🟡',
          percentage: '10-49%'
        };
    }
  };

  const getBrightnessCategory = (brightness: number) => {
    if (brightness >= 400) return { category: 'Muy Alto', color: 'text-red-700', icon: '🔥🔥🔥' };
    if (brightness >= 350) return { category: 'Alto', color: 'text-red-600', icon: '🔥🔥' };
    if (brightness >= 300) return { category: 'Moderado', color: 'text-orange-600', icon: '🔥' };
    return { category: 'Bajo', color: 'text-yellow-600', icon: '💨' };
  };

  const getLocationName = (lat: number, lng: number) => {
    if (lat >= -43 && lat <= -41 && lng >= -73 && lng <= -71) {
      return "Región de Los Ríos";
    } else if (lat >= -46 && lat <= -43 && lng >= -74 && lng <= -71) {
      return "Región de Aysén";
    } else if (lat >= -56 && lat <= -46 && lng >= -76 && lng <= -66) {
      return "Región de Magallanes";
    } else if (lat >= -41 && lat <= -37 && lng >= -73 && lng <= -71) {
      return "Región de La Araucanía";
    }
    return "Patagonia";
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'critical':
        return '🚨';
      case 'moderate':
        return '⚠️';
      case 'total':
        return '📊';
      case 'satellites':
        return '🛰️';
      default:
        return '🔥';
    }
  };

  const getCategoryDescription = () => {
    switch (category) {
      case 'critical':
        return 'Incendios de alta confianza que requieren atención inmediata';
      case 'moderate':
        return 'Incendios de confianza media que requieren monitoreo';
      case 'total':
        return 'Todos los incendios detectados en la región';
      case 'satellites':
        return 'Satélites activos monitoreando la región';
      default:
        return 'Información detallada de incendios';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-red-600 text-white p-4 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 sm:p-2 transition-all duration-200"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="flex items-center gap-3 sm:gap-4 pr-12 sm:pr-16">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl sm:text-3xl">
              {getCategoryIcon()}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 truncate">{title}</h2>
              <p className="text-white/90 text-sm hidden sm:block">{getCategoryDescription()}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-3">
                <div className="bg-white/20 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {fires.length} {fires.length === 1 ? 'incendio' : 'incendios'}
                </div>
                <div className="bg-white/20 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  Actualizado: {new Date().toLocaleTimeString('es-ES')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-200px)] sm:max-h-[calc(90vh-200px)]">
          {fires.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🌿</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No hay incendios en esta categoría</h3>
              <p className="text-gray-500 text-sm sm:text-base px-4">Actualmente no se han detectado incendios que coincidan con los criterios seleccionados.</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:gap-4">
              {fires.map((fire, index) => {
                const confInfo = getConfidenceInfo(fire.confidence);
                const brightnessInfo = getBrightnessCategory(fire.brightness);
                const locationName = getLocationName(fire.latitude, fire.longitude);

                return (
                  <div key={fire.id} className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all duration-300 hover:border-orange-300">
                    {/* Header del incendio */}
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-base sm:text-lg text-gray-800 truncate">Incendio #{fire.id}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">{locationName}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs text-gray-500 uppercase font-medium hidden sm:block">Detección</div>
                        <div className="text-xs sm:text-sm font-semibold text-gray-700">{formatDate(fire.date)}</div>
                      </div>
                    </div>

                    {/* Grid de información */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
                      {/* Intensidad */}
                      <div className="bg-red-50 p-2 sm:p-3 rounded-md sm:rounded-lg border border-red-200">
                        <div className="flex items-center gap-1 sm:gap-2 mb-1">
                          <span className="text-base sm:text-lg">{brightnessInfo.icon}</span>
                          <div className="text-xs text-gray-600 uppercase font-medium">Intensidad</div>
                        </div>
                        <div className="text-sm sm:text-lg font-bold text-red-600">{fire.brightness}K</div>
                        <div className="text-xs text-red-500 font-medium">{brightnessInfo.category}</div>
                      </div>

                      {/* Confianza */}
                      <div className={`${confInfo.bgColor} p-2 sm:p-3 rounded-md sm:rounded-lg border ${confInfo.borderColor}`}>
                        <div className="flex items-center gap-1 sm:gap-2 mb-1">
                          <span className="text-base sm:text-lg">{confInfo.emoji}</span>
                          <div className="text-xs text-gray-600 uppercase font-medium">Confianza</div>
                        </div>
                        <div className={`text-sm sm:text-lg font-bold ${confInfo.color}`}>{confInfo.percentage}</div>
                        <div className={`text-xs ${confInfo.color} font-medium`}>{confInfo.level}</div>
                      </div>

                      {/* Satélite */}
                      <div className="bg-blue-50 p-2 sm:p-3 rounded-md sm:rounded-lg border border-blue-200">
                        <div className="flex items-center gap-1 sm:gap-2 mb-1">
                          <span className="text-base sm:text-lg">🛰️</span>
                          <div className="text-xs text-gray-600 uppercase font-medium">Satélite</div>
                        </div>
                        <div className="text-sm font-bold text-blue-600">{fire.satellite || 'N/A'}</div>
                        <div className="text-xs text-blue-500 font-medium">NASA FIRMS</div>
                      </div>

                      {/* Coordenadas */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-2 sm:p-3 rounded-md sm:rounded-lg border border-green-200">
                        <div className="flex items-center gap-1 sm:gap-2 mb-1">
                          <span className="text-base sm:text-lg">📍</span>
                          <div className="text-xs text-gray-600 uppercase font-medium">Ubicación</div>
                        </div>
                        <div className="text-xs font-semibold text-green-600">
                          <div>Lat: {fire.latitude.toFixed(4)}°</div>
                          <div>Lng: {fire.longitude.toFixed(4)}°</div>
                        </div>
                      </div>
                    </div>

                    {/* Barra de acción */}
                    <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-600">Monitoreo activo</span>
                      </div>
                      <button className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:bg-blue-50 px-2 py-1 sm:px-3 sm:py-1 rounded-full transition-all duration-200">
                        Ver en mapa →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm">Datos en tiempo real de NASA FIRMS</span>
            </div>
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-200 text-sm w-full sm:w-auto"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};