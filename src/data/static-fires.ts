/**
 * Datos de ejemplo para incendios forestales en la región de Patagonia
 * Estructura compatible con la API FIRMS de NASA
 */
import type { FirePoint } from '../types/fire';

// Conjunto de datos de prueba con ubicaciones reales en Patagonia
export const staticFiresData: { fires: FirePoint[] } = {
  "fires": [
    {
      "id": "fire-1",
      "latitude": -45.57,
      "longitude": -71.3,
      "brightness": 350,
      "date": "2025-10-01T10:30:00Z",
      "confidence": "high",
      "satellite": "Terra"
    },
    {
      "id": "fire-2",
      "latitude": -42.1,
      "longitude": -71.8,
      "brightness": 280,
      "date": "2025-10-01T14:15:00Z",
      "confidence": "medium",
      "satellite": "Aqua"
    },
    {
      "id": "fire-3",
      "latitude": -43.5,
      "longitude": -72.2,
      "brightness": 320,
      "date": "2025-09-30T09:45:00Z",
      "confidence": "high",
      "satellite": "Terra"
    },
    {
      "id": "fire-4",
      "latitude": -44.2,
      "longitude": -70.8,
      "brightness": 290,
      "date": "2025-09-30T16:20:00Z",
      "confidence": "medium",
      "satellite": "Aqua"
    },
    {
      "id": "fire-5",
      "latitude": -41.8,
      "longitude": -73.1,
      "brightness": 370,
      "date": "2025-09-29T11:10:00Z",
      "confidence": "high",
      "satellite": "Terra"
    },
    {
      "id": "fire-6",
      "latitude": -46.3,
      "longitude": -72.5,
      "brightness": 310,
      "date": "2025-09-29T15:40:00Z",
      "confidence": "high",
      "satellite": "Aqua"
    },
    {
      "id": "fire-7",
      "latitude": -40.9,
      "longitude": -71.5,
      "brightness": 260,
      "date": "2025-09-28T10:05:00Z",
      "confidence": "medium",
      "satellite": "Terra"
    },
    {
      "id": "fire-8",
      "latitude": -45.1,
      "longitude": -70.2,
      "brightness": 330,
      "date": "2025-09-28T13:30:00Z",
      "confidence": "high",
      "satellite": "Aqua"
    },
    {
      "id": "fire-9",
      "latitude": -42.5,
      "longitude": -72.0,
      "brightness": 305,
      "date": "2025-10-02T08:15:00Z",
      "confidence": "high",
      "satellite": "Terra"
    },
    {
      "id": "fire-10",
      "latitude": -44.8,
      "longitude": -71.1,
      "brightness": 275,
      "date": "2025-10-02T12:45:00Z",
      "confidence": "medium",
      "satellite": "Aqua"
    }
  ]
};
