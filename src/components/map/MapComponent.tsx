// src/components/Map/MapComponent.tsx
import { useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { FirePoint } from '../../types/fire';

import { getMapboxToken } from '../../services/api';

interface MapComponentProps {
  fires: FirePoint[];
  onMarkerClick?: (fire: FirePoint) => void;
  loading?: boolean;
}

const MapComponent = ({ fires, onMarkerClick, loading = false }: MapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const sourceLoaded = useRef<boolean>(false);

  // Actualizar datos de incendios
  const updateFiresData = useCallback(() => {
    if (!map.current || !sourceLoaded.current) return;

    const source = map.current.getSource('fires') as mapboxgl.GeoJSONSource;
    if (!source) return;

    source.setData({
      type: 'FeatureCollection',
      features: fires.map(fire => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [fire.longitude, fire.latitude]
        },
        properties: {
          id: fire.id,
          brightness: fire.brightness,
          confidence: fire.confidence
        }
      }))
    });
  }, [fires]);

  // Inicializar el mapa
  useEffect(() => {
    if (!mapContainer.current) return;

    const initializeMap = async () => {
      try {
        const token = await getMapboxToken();
        mapboxgl.accessToken = token;

        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/satellite-streets-v12',
          center: [-71.3, -45.5],
          zoom: 4.5,
        });

        // Agregar controles
        map.current.addControl(new mapboxgl.NavigationControl());
        
        // Configurar clustering cuando el mapa esté listo
        map.current.on('load', () => {
          if (!map.current) return;

          // Agregar fuente de datos
          map.current.addSource('fires', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: []
            },
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50
          });

          // Estilos para los clusters
          map.current.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'fires',
            filter: ['has', 'point_count'],
            paint: {
              'circle-color': [
                'step',
                ['get', 'point_count'],
                '#51bbd6',   // 0-99
                100,
                '#f1f075',   // 100-999
                1000,
                '#f28cb1'    // 1000+
              ],
              'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,    // 0-99
                100,
                30,    // 100-999
                1000,
                40     // 1000+
              ]
            }
          });

          // Estilos para el contador de clusters
          map.current.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'fires',
            filter: ['has', 'point_count'],
            layout: {
              'text-field': '{point_count_abbreviated}',
              'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
              'text-size': 12
            }
          });

          // Estilos para los puntos individuales
          map.current.addLayer({
            id: 'unclustered-point',
            type: 'circle',
            source: 'fires',
            filter: ['!', ['has', 'point_count']],
            paint: {
              'circle-color': [
                'match',
                ['get', 'confidence'],
                'high', '#f03b20',
                'medium', '#feb24c',
                /* default */ '#ffeda0'
              ],
              'circle-radius': [
                'interpolate',
                ['linear'],
                ['get', 'brightness'],
                0, 4,
                500, 10
              ],
              'circle-stroke-width': 1,
              'circle-stroke-color': '#fff'
            }
          });

          // Manejar clics en los clusters
          map.current.on('click', 'clusters', (e) => {
            if (!map.current) return;
            
            const features = map.current.queryRenderedFeatures(e.point, {
              layers: ['clusters']
            });
            
            const clusterId = features[0].properties?.cluster_id;
            const source = map.current.getSource('fires') as mapboxgl.GeoJSONSource;
            
            source.getClusterExpansionZoom(
              clusterId,
              (err, zoom) => {
                if (err || !map.current) return;
                
                const coordinates = (features[0].geometry as any).coordinates;
                map.current.easeTo({
                  center: coordinates,
                  zoom: zoom ?? undefined
                });
              }
            );
          });
          
          // Manejar clics en los puntos individuales
          map.current.on('click', 'unclustered-point', (e) => {
            if (!map.current) return;
            
            const coordinates = (e.features?.[0].geometry as any).coordinates.slice();
            const properties = e.features?.[0].properties;
            
            const fire = fires.find(f => 
              f.longitude === coordinates[0] && 
              f.latitude === coordinates[1] &&
              f.confidence === properties?.confidence
            );
            
            if (fire && onMarkerClick) {
              onMarkerClick(fire);
            }
          });

          // Cambiar el cursor al pasar sobre los clusters/puntos
          map.current.on('mouseenter', ['clusters', 'unclustered-point'], () => {
            if (map.current) {
              map.current.getCanvas().style.cursor = 'pointer';
            }
          });

          map.current.on('mouseleave', ['clusters', 'unclustered-point'], () => {
            if (map.current) {
              map.current.getCanvas().style.cursor = '';
            }
          });

          sourceLoaded.current = true;
          updateFiresData(); // Cargar datos iniciales
        });

      } catch (error) {
        console.error('Error al inicializar el mapa:', error);
      }
    };

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      sourceLoaded.current = false;
    };
  }, []);

  // Actualizar datos cuando cambien los incendios
  useEffect(() => {
    updateFiresData();
  }, [fires, updateFiresData]);

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-full relative"
      role="application"
      aria-label="Mapa de incendios"
    >
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="text-white text-lg">Cargando datos...</div>
        </div>
      )}
      {!loading && fires.length === 0 && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="text-white text-lg">No hay datos de incendios para mostrar</div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;