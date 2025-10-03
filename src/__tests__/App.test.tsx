/**
 * Tests para el componente principal App
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock de los componentes pesados para tests más rápidos
vi.mock('../components/map/MapComponent', () => ({
  default: () => <div data-testid="map-component">Mapa Simulado</div>
}));

vi.mock('../components/dashboard/FiresChart', () => ({
  default: () => <div data-testid="fires-chart">Gráfico Simulado</div>
}));

describe('App Component', () => {
  it('debe renderizar el título principal', () => {
    render(<App />);
    expect(screen.getByText(/Incendios en Patagonia/i)).toBeInTheDocument();
  });

  it('debe mostrar el botón de actualizar', () => {
    render(<App />);
    expect(screen.getByText(/Actualizar/i)).toBeInTheDocument();
  });

  it('debe renderizar el panel de control', () => {
    render(<App />);
    expect(screen.getByText(/Panel de Control/i)).toBeInTheDocument();
  });

  it('debe renderizar la sección de estadísticas', () => {
    render(<App />);
    expect(screen.getByText(/Estadísticas/i)).toBeInTheDocument();
  });

  it('debe renderizar la sección de apoyo', () => {
    render(<App />);
    expect(screen.getByText(/Apoyar el Proyecto/i)).toBeInTheDocument();
  });

  it('debe mostrar información de copyright', () => {
    render(<App />);
    expect(screen.getByText(/© 2025 Camilo Quiroga/i)).toBeInTheDocument();
  });
});
