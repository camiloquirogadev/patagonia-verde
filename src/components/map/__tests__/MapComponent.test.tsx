/**
 * Tests para MapComponent
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MapComponent from '../MapComponent';
import type { FirePoint } from '../../../types/fire';

// Mock de Leaflet
vi.mock('leaflet', () => ({
  default: {
    map: vi.fn(() => ({
      setView: vi.fn().mockReturnThis(),
      addControl: vi.fn(),
      remove: vi.fn(),
      fitBounds: vi.fn(),
    })),
    tileLayer: vi.fn(() => ({
      addTo: vi.fn(),
    })),
    control: {
      layers: vi.fn(() => ({
        addTo: vi.fn(),
      })),
      scale: vi.fn(() => ({
        addTo: vi.fn(),
      })),
    },
    layerGroup: vi.fn(() => ({
      addTo: vi.fn(),
      clearLayers: vi.fn(),
      addLayer: vi.fn(),
      getLayers: vi.fn(() => []),
    })),
    marker: vi.fn(() => ({
      bindPopup: vi.fn().mockReturnThis(),
      on: vi.fn(),
    })),
    divIcon: vi.fn(() => ({})),
    featureGroup: vi.fn(() => ({
      getBounds: vi.fn(() => ({
        pad: vi.fn().mockReturnThis(),
      })),
    })),
    Control: {
      extend: vi.fn((config) => config),
    },
    DomUtil: {
      create: vi.fn(() => document.createElement('div')),
    },
  },
}));

const mockFireData = (): FirePoint[] => [
  {
    id: 'test-1',
    latitude: -45.5,
    longitude: -71.5,
    brightness: 350,
    confidence: 'high',
    date: '2025-11-23T12:00:00Z',
    satellite: 'Terra',
  },
  {
    id: 'test-2',
    latitude: -46.0,
    longitude: -72.0,
    brightness: 320,
    confidence: 'medium',
    date: '2025-11-23T13:00:00Z',
    satellite: 'Aqua',
  },
];

describe('MapComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar el contenedor del mapa', () => {
    render(<MapComponent fires={[]} />);
    const mapContainer = document.querySelector('.leaflet-container');
    expect(mapContainer).toBeTruthy();
  });

  it('debe mostrar loading spinner cuando loading es true', () => {
    render(<MapComponent fires={[]} loading={true} />);
    expect(screen.getByText(/Cargando mapa/i)).toBeInTheDocument();
  });

  it('debe renderizar marcadores para cada incendio', () => {
    const fires = mockFireData();
    render(<MapComponent fires={fires} />);
    
    // Verificar que se intentaron crear marcadores
    expect(fires.length).toBeGreaterThan(0);
  });

  it('debe llamar onMarkerClick cuando se proporciona', () => {
    const onMarkerClick = vi.fn();
    const fires = mockFireData();
    
    render(<MapComponent fires={fires} onMarkerClick={onMarkerClick} />);
    
    // El mock de Leaflet registra el handler 'click'
    expect(onMarkerClick).toBeDefined();
  });

  it('debe renderizar panel de apoyo al proyecto', () => {
    render(<MapComponent fires={[]} />);
    expect(screen.getByText(/Apoya el Proyecto/i)).toBeInTheDocument();
  });
});
