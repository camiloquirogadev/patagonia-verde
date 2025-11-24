// src/hooks/__tests__/useFirmsData.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { useFirmsData } from '../useFirmsData';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';

describe('useFirmsData', () => {
    it('debería cargar y procesar los datos de incendios correctamente', async () => {
        const { result } = renderHook(() => useFirmsData());

        // Espera a que el estado de carga sea falso
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        // Verifica que los datos se hayan cargado
        expect(result.current.fires.length).toBe(3);
        expect(result.current.totalFires).toBe(3);
        expect(result.current.error).toBeNull();

        // Verifica un punto de datos específico
        const firstFire = result.current.fires[0];
        expect(firstFire.latitude).toBe(-42.5);
        expect(firstFire.longitude).toBe(-72.5);
        expect(firstFire.confidence).toBe('high'); // 90 es 'high'
    });

    it('debería manejar errores de la API', async () => {
        // Sobrescribe el manejador para simular un error
        server.use(
            http.get('https://firms.modaps.eosdis.nasa.gov/api/country/csv/*', () => {
                return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' });
            })
        );

        const { result } = renderHook(() => useFirmsData());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        // Verifica que el error se haya registrado
        expect(result.current.error).not.toBeNull();
        expect(result.current.error).toContain('500');
        expect(result.current.fires.length).toBe(0);
    });

    it('debería filtrar los satélites disponibles correctamente', async () => {
        const { result } = renderHook(() => useFirmsData());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        // El mock data tiene 'Terra' y 'Aqua'
        expect(result.current.availableSatellites).toEqual(['Terra', 'Aqua']);
    });
});