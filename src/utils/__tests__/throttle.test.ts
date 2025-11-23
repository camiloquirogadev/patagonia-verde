/**
 * Tests de throttle y debounce
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { throttle, debounce } from '../throttle';

describe('Throttle and Debounce Utils', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('throttle', () => {
    it('debe ejecutar función inmediatamente la primera vez', () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 1000);

      throttled();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('debe ignorar llamadas durante el período de throttle', () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 1000);

      throttled();
      throttled();
      throttled();

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('debe permitir ejecución después del período de throttle', () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 1000);

      throttled();
      expect(fn).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(1001);
      throttled();
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('debounce', () => {
    it('debe retrasar la ejecución', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 300);

      debounced();
      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(300);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('debe resetear el timer en cada llamada', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 300);

      debounced();
      vi.advanceTimersByTime(100);
      
      debounced();
      vi.advanceTimersByTime(100);
      
      debounced();
      vi.advanceTimersByTime(300);

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('debe ejecutar solo una vez con múltiples llamadas rápidas', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 300);

      debounced();
      debounced();
      debounced();
      debounced();

      vi.advanceTimersByTime(300);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });
});
