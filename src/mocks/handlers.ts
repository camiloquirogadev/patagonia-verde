// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

const API_URL = 'https://firms.modaps.eosdis.nasa.gov/api/country/csv/*';

export const handlers = [
    http.get(API_URL, () => {
        // Genera una respuesta CSV simulada
        const mockCsv = `latitude,longitude,brightness,scan,track,acq_date,acq_time,satellite,confidence,version,bright_t31,frp
-42.5, -72.5, 300, 1, 1, 2023-01-01, 1200, Terra, 90, 1, 280, 10
-43.1, -73.2, 310, 1, 1, 2023-01-01, 1201, Aqua, 95, 1, 285, 15
-42.8, -72.9, 305, 1, 1, 2023-01-01, 1202, Terra, 85, 1, 282, 12
`;
        return HttpResponse.text(mockCsv);
    }),
];
