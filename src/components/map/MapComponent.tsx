/**
 * Componente de mapa interactivo para visualizar incendios forestales
 * Utiliza Leaflet para renderizar mapas y marcadores personalizados
 */
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { FirePoint } from '../../types/fire';

interface MapComponentProps {
  fires: FirePoint[];
  onMarkerClick?: (fire: FirePoint) => void;
  loading?: boolean;
}

// Configuración de iconos para compatibilidad con bundlers modernos
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const MapComponent = ({ fires, onMarkerClick, loading = false }: MapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersLayer = useRef<L.LayerGroup | null>(null);
  const baseLayer = useRef<L.TileLayer | null>(null);

  // Configuración de diferentes proveedores de mapas
  const mapProviders = {
    carto: {
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd'
    },
    cartoDark: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd'
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
    }
  };

  // Configuración inicial del mapa base
  useEffect(() => {
    if (!mapContainer.current) return;

    // Crear instancia de mapa centrada en Patagonia
    map.current = L.map(mapContainer.current).setView([-45.5, -71.3], 6);

    // Usar CartoDB Light - mapa neutral que respeta fronteras reconocidas internacionalmente
    baseLayer.current = L.tileLayer(mapProviders.carto.url, {
      attribution: mapProviders.carto.attribution,
      subdomains: mapProviders.carto.subdomains,
      maxZoom: 20
    }).addTo(map.current);

    // Inicializar capa de marcadores para mejor gestión
    markersLayer.current = L.layerGroup().addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Renderizar marcadores cuando los datos cambien
  useEffect(() => {
    if (!map.current || !markersLayer.current) return;

    // Limpiar marcadores previos
    markersLayer.current.clearLayers();

    // Crear marcadores para cada punto de incendio
    fires.forEach(fire => {
      if (!markersLayer.current) return;

      // Función para determinar color según nivel de confianza
      const getColor = (confidence: string) => {
        switch (confidence) {
          case 'high': return '#f03b20';    // Rojo intenso
          case 'medium': return '#feb24c';  // Naranja
          case 'low': return '#ffeda0';     // Amarillo claro
          default: return '#999';           // Gris por defecto
        }
      };

      const color = getColor(fire.confidence);
      
      // Crear marcador circular con tamaño basado en brillo
      const marker = L.circleMarker([fire.latitude, fire.longitude], {
        radius: Math.max(5, Math.min(15, fire.brightness / 30)), // Radio proporcional al brillo
        fillColor: color,
        color: '#fff',      // Borde blanco
        weight: 2,          // Grosor del borde
        opacity: 1,
        fillOpacity: 0.8
      });

      // Crear popup informativo para cada marcador
      marker.bindPopup(`
        <div style="font-family: sans-serif;">
          <h3 style="margin: 0 0 8px 0; color: #333;">Incendio Detectado</h3>
          <p style="margin: 4px 0;"><strong>Coordenadas:</strong> ${fire.latitude.toFixed(4)}, ${fire.longitude.toFixed(4)}</p>
          <p style="margin: 4px 0;"><strong>Confianza:</strong> <span style="text-transform: capitalize;">${fire.confidence}</span></p>
          <p style="margin: 4px 0;"><strong>Brillo:</strong> ${fire.brightness} K</p>
          <p style="margin: 4px 0;"><strong>Satélite:</strong> ${fire.satellite}</p>
          <p style="margin: 4px 0;"><strong>Fecha:</strong> ${new Date(fire.date).toLocaleDateString('es-ES')}</p>
        </div>
      `);

      // Configurar eventos de interacción
      marker.on('click', () => {
        if (onMarkerClick) {
          onMarkerClick(fire);
        }
      });

      markersLayer.current.addLayer(marker);
    });

    // Ajustar vista automáticamente cuando hay datos
    if (fires.length > 0) {
      const group = new L.featureGroup(markersLayer.current.getLayers());
      map.current.fitBounds(group.getBounds().pad(0.1));
    }

  }, [fires, onMarkerClick]);

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mapContainer} 
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      />
      
      {/* Overlay de carga */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-700">Cargando mapa...</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Mensaje cuando no hay datos */}
      {!loading && fires.length === 0 && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-gray-600 mb-2">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay incendios para mostrar</h3>
            <p className="text-gray-600">Ajusta los filtros para ver más datos</p>
          </div>
        </div>
      )}

      {/* Selector de capas de mapa */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg z-20">
        <div className="p-2">
          <select 
            className="text-sm border-none bg-transparent focus:outline-none cursor-pointer"
            onChange={(e) => {
              if (map.current && baseLayer.current) {
                map.current.removeLayer(baseLayer.current);
                const provider = mapProviders[e.target.value as keyof typeof mapProviders];
                baseLayer.current = L.tileLayer(provider.url, {
                  attribution: provider.attribution,
                  subdomains: 'subdomains' in provider ? provider.subdomains : undefined,
                  maxZoom: 20
                }).addTo(map.current);
              }
            }}
            defaultValue="carto"
          >
            <option value="carto">Mapa Claro</option>
            <option value="cartoDark">Mapa Oscuro</option>
            <option value="satellite">Satélite</option>
          </select>
        </div>
      </div>

      {/* Leyenda explicativa - Siempre visible */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg z-20">
        <h4 className="text-sm font-medium text-gray-800 mb-2">Nivel de Confianza</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span className="text-xs text-gray-600">Alto</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-400"></div>
            <span className="text-xs text-gray-600">Medio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-200"></div>
            <span className="text-xs text-gray-600">Bajo</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">Región de Patagonia</p>
          <p className="text-xs text-gray-500">Incluye Malvinas Argentinas</p>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;