// Datos estáticos de incendios para desarrollo
import type { FirePoint } from '../types/fire';

// Datos directamente en el formato esperado por la aplicación
export const staticFiresData: { fires: FirePoint[] } = {
  "fires": [
    {
      "id": "fire-1",
      "latitude": -45.57,
      "longitude": -71.3,
      "brightness": 350,
      "date": "2025-05-28T10:30:00Z",
      "confidence": "high",
      "satellite": "Terra"
    },
    {
      "id": "fire-2",
      "latitude": -42.1,
      "longitude": -71.8,
      "brightness": 280,
      "date": "2025-05-28T14:15:00Z",
      "confidence": "medium",
      "satellite": "Aqua"
    },
    {
      "id": "fire-3",
      "latitude": -43.5,
      "longitude": -72.2,
      "brightness": 320,
      "date": "2025-05-27T09:45:00Z",
      "confidence": "high",
      "satellite": "Terra"
    },
    {
      "id": "fire-4",
      "latitude": -44.2,
      "longitude": -70.8,
      "brightness": 290,
      "date": "2025-05-27T16:20:00Z",
      "confidence": "medium",
      "satellite": "Aqua"
    },
    {
      "id": "fire-5",
      "latitude": -41.8,
      "longitude": -73.1,
      "brightness": 370,
      "date": "2025-05-26T11:10:00Z",
      "confidence": "high",
      "satellite": "Terra"
    },
    {
      "id": "fire-6",
      "latitude": -46.3,
      "longitude": -72.5,
      "brightness": 310,
      "date": "2025-05-26T15:40:00Z",
      "confidence": "high",
      "satellite": "Aqua"
    },
    {
      "id": "fire-7",
      "latitude": -40.9,
      "longitude": -71.5,
      "brightness": 260,
      "date": "2025-05-25T10:05:00Z",
      "confidence": "medium",
      "satellite": "Terra"
    },
    {
      "id": "fire-8",
      "latitude": -45.1,
      "longitude": -70.2,
      "brightness": 330,
      "date": "2025-05-25T13:30:00Z",
      "confidence": "high",
      "satellite": "Aqua"
    }
  ]
};
