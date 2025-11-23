/**
 * Tests para FilterPanel
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterPanel from '../FilterPanel';

describe('FilterPanel', () => {
  const mockOnFilterChange = vi.fn();
  const mockOnResetFilters = vi.fn();
  const mockSatellites = ['Terra', 'Aqua', 'NOAA-20'];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar el panel de filtros', () => {
    render(
      <FilterPanel
        onFilterChange={mockOnFilterChange}
        onResetFilters={mockOnResetFilters}
        availableSatellites={mockSatellites}
      />
    );
    
    expect(screen.getByText(/Filtros Avanzados/i)).toBeInTheDocument();
  });

  it('debe mostrar estadísticas de total y filtrados', () => {
    render(
      <FilterPanel
        onFilterChange={mockOnFilterChange}
        onResetFilters={mockOnResetFilters}
        totalFires={100}
        filteredFires={45}
      />
    );
    
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('debe aplicar filtro de fecha correctamente', async () => {
    render(
      <FilterPanel
        onFilterChange={mockOnFilterChange}
        onResetFilters={mockOnResetFilters}
      />
    );
    
    // Expandir panel
    const expandButton = screen.getAllByRole('button')[0];
    fireEvent.click(expandButton);
    
    await waitFor(() => {
      const startDateInput = screen.getByLabelText(/Desde/i);
      expect(startDateInput).toBeInTheDocument();
    });
    
    const startDateInput = screen.getByLabelText(/Desde/i);
    fireEvent.change(startDateInput, { target: { value: '2025-01-01' } });
    
    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalled();
    }, { timeout: 500 });
  });

  it('debe validar rangos de brillo correctamente', async () => {
    render(
      <FilterPanel
        onFilterChange={mockOnFilterChange}
        onResetFilters={mockOnResetFilters}
      />
    );
    
    // Expandir panel
    const expandButton = screen.getAllByRole('button')[0];
    fireEvent.click(expandButton);
    
    await waitFor(() => {
      const sliders = screen.getAllByRole('slider');
      expect(sliders.length).toBeGreaterThan(0);
    });
    
    const minSlider = screen.getByLabelText(/Brillo mínimo/i);
    fireEvent.change(minSlider, { target: { value: '500' } });
    
    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalled();
    });
  });

  it('debe seleccionar nivel de confianza', async () => {
    render(
      <FilterPanel
        onFilterChange={mockOnFilterChange}
        onResetFilters={mockOnResetFilters}
      />
    );
    
    // Expandir panel
    const expandButton = screen.getAllByRole('button')[0];
    fireEvent.click(expandButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Alta/i)).toBeInTheDocument();
    });
    
    const highConfidenceButton = screen.getByText(/Alta/i);
    fireEvent.click(highConfidenceButton);
    
    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalled();
    });
  });

  it('debe resetear filtros correctamente', async () => {
    render(
      <FilterPanel
        onFilterChange={mockOnFilterChange}
        onResetFilters={mockOnResetFilters}
        initialFilters={{ startDate: '2025-01-01' }}
      />
    );
    
    // Expandir panel
    const expandButton = screen.getAllByRole('button')[0];
    fireEvent.click(expandButton);
    
    await waitFor(() => {
      const resetButton = screen.getByText(/Restablecer Filtros/i);
      expect(resetButton).toBeInTheDocument();
    });
    
    const resetButton = screen.getByText(/Restablecer Filtros/i);
    fireEvent.click(resetButton);
    
    expect(mockOnResetFilters).toHaveBeenCalled();
  });

  it('debe mostrar indicador de filtros activos', async () => {
    render(
      <FilterPanel
        onFilterChange={mockOnFilterChange}
        onResetFilters={mockOnResetFilters}
        initialFilters={{ startDate: '2025-01-01' }}
      />
    );
    
    // Verificar que hay un indicador visual de filtros activos
    const indicator = document.querySelector('.animate-pulse');
    expect(indicator).toBeInTheDocument();
  });
});
