import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { FirePoint } from '../../types/fire';

interface MapComponentProps {
  fires: FirePoint[];
  onMarkerClick?: (fire: FirePoint) => void;
  loading?: boolean;
}

export default function MapComponent({ fires, onMarkerClick, loading = false }: MapComponentProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Verificar si ya existe un mapa para evitar duplicados
    if (mapRef.current || !mapElementRef.current) return;

    // Inicializar mapa centrado en Patagonia
    const map = L.map(mapElementRef.current).setView([-45.0, -71.0], 7);
    
    // Configurar capas de mapas
    const streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
      minZoom: 3
    });

    const satelliteMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '© Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
      maxZoom: 18,
      minZoom: 3
    });

    const topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenTopoMap contributors',
      maxZoom: 17,
      minZoom: 3
    });

    // Iniciar con vista satelital
    satelliteMap.addTo(map);

    // Control de capas mejorado y más visible
    const baseMaps = {
      "🛰️ Satelital": satelliteMap,
      "🗺️ Calles": streetMap,
      "🏔️ Topográfico": topoMap
    };

    L.control.layers(baseMaps, {}, {
      position: 'topright',
      collapsed: true
    }).addTo(map);

    // Mejorar estilos del control de capas
    setTimeout(() => {
      const layerContainer = document.querySelector('.leaflet-control-layers') as HTMLElement;
      if (layerContainer) {
        layerContainer.style.zIndex = '1000';
        layerContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        layerContainer.style.backdropFilter = 'blur(10px)';
        layerContainer.style.borderRadius = '12px';
        layerContainer.style.border = '1px solid rgba(0, 0, 0, 0.1)';
        layerContainer.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
      }
    }, 100);

    // Control de escala mejorado
    L.control.scale({
      position: 'bottomright',
      imperial: false,
      maxWidth: 100
    }).addTo(map);

    // Control de zoom personalizado (posición fija)
    map.zoomControl.setPosition('topleft');

    // Control personalizado para centrar en Patagonia
    const centerControl = L.Control.extend({
      onAdd: function() {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        container.style.backdropFilter = 'blur(10px)';
        container.style.width = '40px';
        container.style.height = '40px';
        container.style.cursor = 'pointer';
        container.style.borderRadius = '8px';
        container.style.border = '1px solid rgba(0, 0, 0, 0.1)';
        container.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
        container.innerHTML = '🎯';
        container.style.fontSize = '18px';
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.transition = 'all 0.2s ease';
        container.style.marginTop = '10px'; // Separación del zoom
        container.title = 'Centrar en Patagonia';

        container.onmouseover = function() {
          container.style.backgroundColor = 'rgba(255, 255, 255, 1)';
          container.style.transform = 'scale(1.1)';
        };

        container.onmouseout = function() {
          container.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
          container.style.transform = 'scale(1)';
        };

        container.onclick = function() {
          map.setView([-45.0, -71.0], 7);
          container.style.transform = 'scale(0.95)';
          setTimeout(() => {
            container.style.transform = 'scale(1)';
          }, 150);
        };

        return container;
      }
    });

    map.addControl(new centerControl({ position: 'topleft' }));

    // Control de ubicación (si disponible) - posición separada
    if (navigator.geolocation) {
      const locationControl = L.Control.extend({
        onAdd: function() {
          const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
          container.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
          container.style.backdropFilter = 'blur(10px)';
          container.style.width = '40px';
          container.style.height = '40px';
          container.style.cursor = 'pointer';
          container.style.borderRadius = '8px';
          container.style.border = '1px solid rgba(0, 0, 0, 0.1)';
          container.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
          container.innerHTML = '📍';
          container.style.fontSize = '18px';
          container.style.display = 'flex';
          container.style.alignItems = 'center';
          container.style.justifyContent = 'center';
          container.style.transition = 'all 0.2s ease';
          container.style.marginTop = '10px'; // Separación del control anterior
          container.title = 'Mi ubicación';

          container.onmouseover = function() {
            container.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            container.style.transform = 'scale(1.1)';
          };

          container.onmouseout = function() {
            container.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            container.style.transform = 'scale(1)';
          };

          container.onclick = function() {
            container.innerHTML = '⏳';
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                map.setView([latitude, longitude], 10);
                L.marker([latitude, longitude])
                  .addTo(map)
                  .bindPopup('Tu ubicación actual')
                  .openPopup();
                container.innerHTML = '📍';
              },
              (error) => {
                console.error('Error getting location:', error);
                container.innerHTML = '❌';
                setTimeout(() => {
                  container.innerHTML = '📍';
                }, 2000);
              }
            );
          };

          return container;
        }
      });

      map.addControl(new locationControl({ position: 'topleft' }));
    }

    // Control de información del mapa removido - ahora la información detallada se muestra en los popups de cada incendio

    mapRef.current = map;

    // Configurar iconos personalizados
    const createFireIcon = (confidence: FirePoint['confidence']) => {
      const colors = {
        high: '#dc2626',    // rojo intenso
        medium: '#ea580c',  // naranja
        low: '#facc15'      // amarillo
      };
      
      return L.divIcon({
        className: 'fire-marker',
        html: `<div style="
          width: 12px; 
          height: 12px; 
          background-color: ${colors[confidence]}; 
          border: 2px solid white; 
          border-radius: 50%; 
          box-shadow: 0 1px 3px rgba(0,0,0,0.3)
        "></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });
    };

    // Agregar marcadores de incendios
    const markersLayer = L.layerGroup().addTo(map);

    const updateMarkers = () => {
      markersLayer.clearLayers();
      
      fires.forEach(fire => {
        const marker = L.marker([fire.latitude, fire.longitude], {
          icon: createFireIcon(fire.confidence)
        });

        // Popup con información detallada y profesional del incendio
        const formatDate = (dateString: string) => {
          const date = new Date(dateString);
          return date.toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/Santiago'
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
                percentage: '85-100%',
                description: 'Detección muy confiable'
              };
            case 'medium':
              return { 
                level: 'Media', 
                color: 'text-orange-600', 
                bgColor: 'bg-orange-50',
                borderColor: 'border-orange-200',
                emoji: '🟠',
                percentage: '50-84%',
                description: 'Detección moderadamente confiable'
              };
            default:
              return { 
                level: 'Baja', 
                color: 'text-yellow-600', 
                bgColor: 'bg-yellow-50',
                borderColor: 'border-yellow-200',
                emoji: '🟡',
                percentage: '10-49%',
                description: 'Detección requiere verificación'
              };
          }
        };

        const getBrightnessCategory = (brightness: number) => {
          if (brightness >= 400) return { category: 'Muy Alto', color: 'text-red-700', icon: '🔥🔥🔥' };
          if (brightness >= 350) return { category: 'Alto', color: 'text-red-600', icon: '🔥�' };
          if (brightness >= 300) return { category: 'Moderado', color: 'text-orange-600', icon: '�' };
          return { category: 'Bajo', color: 'text-yellow-600', icon: '💨' };
        };

        const getLocationName = (lat: number, lng: number) => {
          // Determinar región aproximada basada en coordenadas
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

        const getSatelliteInfo = (satelliteName: string) => {
          const satellites: Record<string, { description: string; orbit: string; agency: string }> = {
            'Terra': { 
              description: 'Satélite de observación terrestre', 
              orbit: 'Órbita polar sincronizada con el sol',
              agency: 'NASA'
            },
            'Aqua': { 
              description: 'Satélite de monitoreo climático', 
              orbit: 'Órbita polar ascendente',
              agency: 'NASA'
            },
            'NOAA-20': { 
              description: 'Satélite meteorológico operacional', 
              orbit: 'Órbita polar',
              agency: 'NOAA'
            },
            'Suomi-NPP': { 
              description: 'Satélite de investigación polar', 
              orbit: 'Órbita heliosincrónica',
              agency: 'NASA/NOAA'
            }
          };
          return satellites[satelliteName] || { 
            description: 'Satélite de observación', 
            orbit: 'Órbita terrestre',
            agency: 'NASA/NOAA'
          };
        };

        const confInfo = getConfidenceInfo(fire.confidence);
        const brightnessInfo = getBrightnessCategory(fire.brightness);
        const locationName = getLocationName(fire.latitude, fire.longitude);
        const satelliteInfo = getSatelliteInfo(fire.satellite || 'Unknown');

        marker.bindPopup(`
          <div class="p-4 min-w-[320px] font-sans">
            <!-- Encabezado Principal -->
            <div class="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
              <div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <span class="text-white text-xl">🔥</span>
              </div>
              <div>
                <h3 class="font-bold text-lg text-gray-800">Incendio Forestal Detectado</h3>
                <p class="text-sm text-gray-600">${locationName}</p>
              </div>
            </div>
            
            <!-- Grid de Información Principal -->
            <div class="grid grid-cols-2 gap-3 mb-4">
              <!-- Intensidad Térmica -->
              <div class="bg-red-50 p-3 rounded-lg border ${brightnessInfo.color.includes('red') ? 'border-red-200' : 'border-orange-200'}">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-lg">${brightnessInfo.icon}</span>
                  <div class="text-xs text-gray-600 uppercase font-medium">Intensidad Térmica</div>
                </div>
                <div class="text-lg font-bold ${brightnessInfo.color}">${fire.brightness}K</div>
                <div class="text-xs ${brightnessInfo.color} font-medium">${brightnessInfo.category}</div>
              </div>

              <!-- Nivel de Confianza -->
              <div class="${confInfo.bgColor} p-3 rounded-lg border ${confInfo.borderColor}">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-lg">${confInfo.emoji}</span>
                  <div class="text-xs text-gray-600 uppercase font-medium">Confianza</div>
                </div>
                <div class="text-lg font-bold ${confInfo.color}">${confInfo.percentage}</div>
                <div class="text-xs ${confInfo.color} font-medium">${confInfo.level}</div>
              </div>
            </div>

            <!-- Información Satelital Detallada -->
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xl">🛰️</span>
                <div class="text-sm text-blue-700 uppercase font-bold tracking-wide">Sistema de Detección</div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-blue-800">Satélite:</span>
                  <span class="text-sm font-bold text-blue-900">${fire.satellite || 'No especificado'}</span>
                </div>
                <div class="text-xs text-blue-700">${satelliteInfo.description}</div>
                <div class="text-xs text-blue-600">
                  <span class="font-medium">Órbita:</span> ${satelliteInfo.orbit}
                </div>
                <div class="text-xs text-blue-600">
                  <span class="font-medium">Agencia:</span> ${satelliteInfo.agency} • FIRMS
                </div>
              </div>
            </div>

            <!-- Ubicación Geográfica -->
            <div class="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xl">📍</span>
                <div class="text-sm text-green-700 uppercase font-bold tracking-wide">Coordenadas Geográficas</div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <div class="text-xs text-green-600 font-medium">Latitud</div>
                  <div class="text-sm font-bold text-green-800">${fire.latitude.toFixed(6)}°</div>
                </div>
                <div>
                  <div class="text-xs text-green-600 font-medium">Longitud</div>
                  <div class="text-sm font-bold text-green-800">${fire.longitude.toFixed(6)}°</div>
                </div>
              </div>
              <div class="mt-2 text-xs text-green-700">
                <span class="font-medium">Región:</span> ${locationName}
              </div>
              <div class="text-xs text-green-600 mt-1">
                <span class="font-medium">Sistema:</span> WGS84 • Precisión: ±375m
              </div>
            </div>

            <!-- Información Temporal -->
            <div class="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-4">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xl">🕒</span>
                <div class="text-sm text-orange-700 uppercase font-bold tracking-wide">Información Temporal</div>
              </div>
              <div class="text-sm font-bold text-orange-800 mb-2">${formatDate(fire.date)}</div>
              <div class="text-xs text-orange-700">
                <span class="font-medium">Zona horaria:</span> Chile Continental (CLT)
              </div>
              <div class="text-xs text-orange-600 mt-1">
                <span class="font-medium">Precisión temporal:</span> ±5 minutos
              </div>
            </div>

            <!-- Advertencias y Notas Técnicas -->
            <div class="bg-gradient-to-br from-amber-50 to-red-50 p-4 rounded-lg border-l-4 border-amber-500 mb-4">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-lg">⚠️</span>
                <div class="text-sm font-bold text-amber-700">Información Importante</div>
              </div>
              <div class="space-y-2 text-xs text-amber-800">
                <div>• <span class="font-medium">Retraso de datos:</span> 3-5 horas desde la detección</div>
                <div>• <span class="font-medium">Resolución:</span> Píxel de 1km² aproximadamente</div>
                <div>• <span class="font-medium">Verificación:</span> ${confInfo.description}</div>
                <div>• <span class="font-medium">Fuente:</span> NASA FIRMS (Fire Information for Resource Management System)</div>
              </div>
            </div>

            <!-- ID del Incendio y Metadatos -->
            <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-sm">🆔</span>
                <div class="text-xs font-bold text-gray-700 uppercase tracking-wide">Identificación</div>
              </div>
              <div class="text-xs text-gray-600">
                <div><span class="font-medium">ID:</span> ${fire.id}</div>
                <div class="mt-1"><span class="font-medium">Generado:</span> ${new Date().toLocaleString('es-ES')}</div>
              </div>
            </div>
          </div>
        `, {
          maxWidth: 360,
          className: 'fire-popup-detailed'
        });

        // Evento de click si se proporciona handler
        if (onMarkerClick) {
          marker.on('click', () => onMarkerClick(fire));
        }

        markersLayer.addLayer(marker);
      });

      // Ajustar vista si hay marcadores
      if (fires.length > 0) {
        const group = L.featureGroup(markersLayer.getLayers() as L.Layer[]);
        map.fitBounds(group.getBounds().pad(0.1));
      }
    };

    updateMarkers();

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [fires, onMarkerClick]);  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-100">
      <div ref={mapElementRef} className="w-full h-full absolute inset-0" />
      
      {loading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-800 font-medium">Cargando mapa...</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Panel de apoyo al proyecto - reposicionado para evitar superposiciones */}
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 z-10 max-w-xs">
        <div className="p-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            ❤️ Apoya el Proyecto
          </h4>
          
          <div className="space-y-3">
            <button
              onClick={() => window.open('https://ko-fi.com/camiloquirogadev', '_blank')}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              ☕ Cómprame un café
            </button>

            <button
              onClick={() => window.open('https://github.com/sponsors/camiloquirogadev', '_blank')}
              className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white text-sm py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              💖 GitHub Sponsors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
