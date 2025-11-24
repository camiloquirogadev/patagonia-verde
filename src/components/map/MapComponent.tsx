import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { FirePoint } from '../../types/fire';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getLocationName } from '../../utils/locationUtils';
import { getConfidenceDetails } from '../../utils/fireUtils';
import { logger } from '../../utils/logger';

interface MapComponentProps {
  fires: FirePoint[];
  onMarkerClick?: (fire: FirePoint) => void;
  loading?: boolean;
}

// Componente interno para el contenido del Popup
const FirePopupContent = ({ fire, onMoreDetails }: { fire: FirePoint; onMoreDetails?: () => void }) => {
  const locationName = getLocationName(fire.latitude, fire.longitude);
  const confidenceDetails = getConfidenceDetails(fire.confidence);

  return (
    <div className="p-3 min-w-[250px] font-sans">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white text-lg">🔥</span>
        </div>
        <div>
          <h3 className="font-bold text-base text-gray-800">Incendio Detectado</h3>
          <p className="text-xs text-gray-600">{locationName}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-red-50 p-2 rounded border border-red-100">
          <div className="text-xs text-gray-500 uppercase">Intensidad</div>
          <div className="text-sm font-bold text-red-600">{fire.brightness}K</div>
        </div>
        <div className="bg-orange-50 p-2 rounded border border-orange-100">
          <div className="text-xs text-gray-500 uppercase">Confianza</div>
          <div className={`text-sm font-bold ${confidenceDetails.color}`}>
            {confidenceDetails.text}
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-3">
        <span className="font-medium">Fecha:</span> {format(new Date(fire.date), 'dd/MM/yyyy HH:mm', { locale: es })}
      </div>

      {onMoreDetails && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent map click
            onMoreDetails();
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors text-sm shadow-sm"
        >
          Ver más detalles
        </button>
      )}
    </div>
  );
};

export default function MapComponent({ fires, onMarkerClick, loading = false }: MapComponentProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapElementRef.current) return;

    const map = L.map(mapElementRef.current).setView([-45.0, -71.0], 7);

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

    satelliteMap.addTo(map);

    const baseMaps = {
      "Satelital": satelliteMap,
      "Calles": streetMap,
      "Topográfico": topoMap
    };

    L.control.layers(baseMaps, {}, {
      position: 'topright',
      collapsed: true
    }).addTo(map);

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

    L.control.scale({
      position: 'bottomright',
      imperial: false,
      maxWidth: 100
    }).addTo(map);

    map.zoomControl.setPosition('topleft');

    const centerControl = L.Control.extend({
      onAdd: function () {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        Object.assign(container.style, {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          borderRadius: '8px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
          marginTop: '10px'
        });
        container.innerHTML = '🗺️';
        container.title = 'Centrar en Patagonia';
        container.setAttribute('role', 'button');
        container.setAttribute('aria-label', 'Centrar mapa en la región de la Patagonia');
        container.setAttribute('tabindex', '0');

        container.onclick = function () {
          map.setView([-45.0, -71.0], 7);
        };

        container.onkeydown = function (e: KeyboardEvent) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            map.setView([-45.0, -71.0], 7);
          }
        };

        return container;
      }
    });

    map.addControl(new centerControl({ position: 'topleft' }));

    if (navigator.geolocation) {
      const locationControl = L.Control.extend({
        onAdd: function () {
          const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
          Object.assign(container.style, {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            borderRadius: '8px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            marginTop: '10px'
          });
          container.innerHTML = '📍';
          container.title = 'Mi ubicación';
          container.setAttribute('role', 'button');
          container.setAttribute('aria-label', 'Mostrar mi ubicación actual en el mapa');
          container.setAttribute('tabindex', '0');

          container.onclick = function () {
            container.innerHTML = '⌛';
            container.setAttribute('aria-label', 'Obteniendo ubicación...');
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                map.setView([latitude, longitude], 10);
                L.marker([latitude, longitude])
                  .addTo(map)
                  .bindPopup('Tu ubicación actual')
                  .openPopup();
                container.innerHTML = '📍';
                container.setAttribute('aria-label', 'Mostrar mi ubicación actual en el mapa');
              },
              (error) => {
                logger.error('Error getting location:', error);
                container.innerHTML = '❌';
                container.setAttribute('aria-label', 'Error al obtener ubicación');
                setTimeout(() => {
                  container.innerHTML = '📍';
                  container.setAttribute('aria-label', 'Mostrar mi ubicación actual en el mapa');
                }, 2000);
              }
            );
          };

          container.onkeydown = function (e: KeyboardEvent) {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              container.click();
            }
          };

          return container;
        }
      });

      map.addControl(new locationControl({ position: 'topleft' }));
    }

    mapRef.current = map;
    markersLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersLayerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markersLayerRef.current) return;

    const markersLayer = markersLayerRef.current;
    markersLayer.clearLayers();

    const createFireIcon = (confidence: FirePoint['confidence']) => {
      const details = getConfidenceDetails(confidence);

      return L.divIcon({
        className: 'fire-marker',
        html: `<div style="
          width: 20px; 
          height: 20px; 
          background-color: ${details.mapColor}; 
          border: 3px solid white; 
          border-radius: 50%; 
          box-shadow: 0 2px 6px rgba(0,0,0,0.4)
        "></div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });
    };

    fires.forEach(fire => {
      const marker = L.marker([fire.latitude, fire.longitude], {
        icon: createFireIcon(fire.confidence)
      });

      // Secure popup rendering using React Portal/Root
      const popupNode = document.createElement('div');
      const root = createRoot(popupNode);

      root.render(
        <FirePopupContent
          fire={fire}
          onMoreDetails={onMarkerClick ? () => onMarkerClick(fire) : undefined}
        />
      );

      marker.bindPopup(popupNode, {
        maxWidth: 360,
        className: 'fire-popup-detailed'
      });

      markersLayer.addLayer(marker);
    });

    if (fires.length > 0) {
      const group = L.featureGroup(markersLayer.getLayers() as L.Layer[]);
      mapRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [fires, onMarkerClick]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-100" role="region" aria-label="Mapa interactivo de incendios">
      <div ref={mapElementRef} className="w-full h-full absolute inset-0" />

      {loading && (
        <div 
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
          role="status"
          aria-live="polite"
          aria-label="Cargando mapa de incendios"
        >
          <div className="bg-white p-6 rounded-xl shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
              <p className="text-gray-800 font-medium">Cargando mapa...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
