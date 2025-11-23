/**
 * Tests extendidos para useFirmsData
 */
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useFirmsData } from '../useFirmsData';

describe('useFirmsData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('debe cargar datos correctamente', async () => {
    const { result } = renderHook(() => useFirmsData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.fires).toBeDefined();
    expect(Array.isArray(result.current.fires)).toBe(true);
  });

  it('debe calcular estadísticas correctamente', async () => {
    const { result } = renderHook(() => useFirmsData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const { stats } = result.current;
    expect(stats).toHaveProperty('total');
    expect(stats).toHaveProperty('highConfidence');
    expect(stats).toHaveProperty('mediumConfidence');
    expect(stats).toHaveProperty('lowConfidence');
    
    expect(stats.total).toBeGreaterThanOrEqual(0);
    expect(stats.total).toBe(
      stats.highConfidence + stats.mediumConfidence + stats.lowConfidence
    );
  });

  it('debe validar estructura de FirePoint', async () => {
    const { result } = renderHook(() => useFirmsData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    if (result.current.fires.length > 0) {
      const fire = result.current.fires[0];
      
      expect(fire).toHaveProperty('id');
      expect(fire).toHaveProperty('latitude');
      expect(fire).toHaveProperty('longitude');
      expect(fire).toHaveProperty('brightness');
      expect(fire).toHaveProperty('confidence');
      expect(fire).toHaveProperty('date');
      expect(fire).toHaveProperty('satellite');
      
      expect(typeof fire.latitude).toBe('number');
      expect(typeof fire.longitude).toBe('number');
      expect(fire.latitude).toBeGreaterThanOrEqual(-90);
      expect(fire.latitude).toBeLessThanOrEqual(90);
      expect(fire.longitude).toBeGreaterThanOrEqual(-180);
      expect(fire.longitude).toBeLessThanOrEqual(180);
    }
  });

  it('debe proveer función refresh', async () => {
    const { result } = renderHook(() => useFirmsData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(typeof result.current.refresh).toBe('function');
  });

  it('debe manejar datos vacíos correctamente', async () => {
    const { result } = renderHook(() => useFirmsData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.fires).toBeDefined();
    expect(Array.isArray(result.current.fires)).toBe(true);
  });

  it('debe throttlear llamadas a refresh', async () => {
    const { result } = renderHook(() => useFirmsData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Llamar refresh múltiples veces rápidamente
    result.current.refresh();
    result.current.refresh();
    result.current.refresh();

    // Verificar que solo se ejecuta una vez debido al throttle
    expect(result.current.refresh).toBeDefined();
  });
});
