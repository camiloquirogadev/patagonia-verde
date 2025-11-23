/**
 * Tests de utilidades
 */
import { describe, it, expect } from 'vitest';
import {
  clampNumber,
  validateCoordinates,
  sanitizeString,
  isPositiveNumber,
  isValidISODate,
  validateBrightness,
} from '../validation';

describe('Validation Utils', () => {
  describe('clampNumber', () => {
    it('debe clampear valores fuera de rango', () => {
      expect(clampNumber(150, 0, 100)).toBe(100);
      expect(clampNumber(-10, 0, 100)).toBe(0);
      expect(clampNumber(50, 0, 100)).toBe(50);
    });
  });

  describe('validateCoordinates', () => {
    it('debe validar coordenadas correctas', () => {
      expect(validateCoordinates(-45.5, -71.5)).toBe(true);
      expect(validateCoordinates(0, 0)).toBe(true);
      expect(validateCoordinates(90, 180)).toBe(true);
      expect(validateCoordinates(-90, -180)).toBe(true);
    });

    it('debe rechazar coordenadas inválidas', () => {
      expect(validateCoordinates(91, 0)).toBe(false);
      expect(validateCoordinates(0, 181)).toBe(false);
      expect(validateCoordinates(NaN, 0)).toBe(false);
      expect(validateCoordinates(0, Infinity)).toBe(false);
    });
  });

  describe('sanitizeString', () => {
    it('debe sanitizar strings correctamente', () => {
      expect(sanitizeString('  test  ')).toBe('test');
      expect(sanitizeString(123)).toBe('');
      expect(sanitizeString('a'.repeat(2000), 100)).toHaveLength(100);
    });
  });

  describe('isPositiveNumber', () => {
    it('debe validar números positivos', () => {
      expect(isPositiveNumber(5)).toBe(true);
      expect(isPositiveNumber(0)).toBe(true);
      expect(isPositiveNumber(-5)).toBe(false);
      expect(isPositiveNumber('5')).toBe(false);
      expect(isPositiveNumber(NaN)).toBe(false);
    });
  });

  describe('isValidISODate', () => {
    it('debe validar fechas ISO', () => {
      expect(isValidISODate('2025-11-23T12:00:00Z')).toBe(true);
      expect(isValidISODate('2025-11-23')).toBe(true);
      expect(isValidISODate('invalid')).toBe(false);
      expect(isValidISODate('')).toBe(false);
    });
  });

  describe('validateBrightness', () => {
    it('debe validar y clampear valores de brillo', () => {
      expect(validateBrightness(500)).toBe(500);
      expect(validateBrightness(1500)).toBe(1000);
      expect(validateBrightness(-100)).toBe(0);
    });
  });
});
