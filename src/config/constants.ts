/**
 * Application-wide constants.
 * Centralizes magic numbers and strings for maintainability.
 */

export const MOBILE_BREAKPOINT = 1024; // lg breakpoint in Tailwind

export const CONFIDENCE_LEVELS = {
  high: 'high',
  medium: 'medium',
  low: 'low',
} as const;

export const CONFIDENCE_DETAILS = {
  [CONFIDENCE_LEVELS.high]: {
    text: 'Alta',
    color: 'text-red-600',
    mapColor: '#dc2626',
  },
  [CONFIDENCE_LEVELS.medium]: {
    text: 'Media',
    color: 'text-orange-600',
    mapColor: '#ea580c',
  },
  [CONFIDENCE_LEVELS.low]: {
    text: 'Baja',
    color: 'text-yellow-600',
    mapColor: '#facc15',
  },
};

export const APP_VERSION = '1.3.0';
