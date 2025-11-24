import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RealTimeMonitor } from '../RealTimeMonitor';
import { UIProvider } from '../../../context/UIContext';
import type { FirePoint } from '../../../types/fire';

const mockFires: FirePoint[] = [
    {
        id: '1',
        latitude: -42.5,
        longitude: -72.5,
        brightness: 300,
        scan: 1,
        track: 1,
        date: '2023-01-01T12:00:00Z',
        satellite: 'Terra',
        confidence: 'high',
        version: '1.0',
        frp: 10,
    },
    {
        id: '2',
        latitude: -43.1,
        longitude: -73.2,
        brightness: 310,
        scan: 1,
        track: 1,
        date: '2023-01-01T12:01:00Z',
        satellite: 'Aqua',
        confidence: 'medium',
        version: '1.0',
        frp: 15,
    },
    {
        id: '3',
        latitude: -42.8,
        longitude: -72.9,
        brightness: 305,
        scan: 1,
        track: 1,
        date: '2023-01-01T12:02:00Z',
        satellite: 'Terra',
        confidence: 'high',
        version: '1.0',
        frp: 12,
    },
];

const mockRefresh = vi.fn();

describe('RealTimeMonitor', () => {
    it('debería mostrar el conteo correcto de incendios de alta confianza', () => {
        render(
            <UIProvider>
                <RealTimeMonitor filteredFires={mockFires} refresh={mockRefresh} />
            </UIProvider>
        );
        
        const highConfidenceFires = mockFires.filter(f => f.confidence === 'high').length;
        expect(screen.getByText(highConfidenceFires.toString())).toBeInTheDocument();
    });

    it('debería mostrar el total de detecciones', () => {
        render(
            <UIProvider>
                <RealTimeMonitor filteredFires={mockFires} refresh={mockRefresh} />
            </UIProvider>
        );
        
        expect(screen.getByText(mockFires.length.toString())).toBeInTheDocument();
    });

    it('debería llamar a refresh cuando se presiona el botón', async () => {
        const user = userEvent.setup();
        render(
            <UIProvider>
                <RealTimeMonitor filteredFires={mockFires} refresh={mockRefresh} />
            </UIProvider>
        );
        
        const refreshButton = screen.getByTitle('Actualizar Datos');
        await user.click(refreshButton);
        
        expect(mockRefresh).toHaveBeenCalledTimes(1);
    });

    it('debería mostrar la hora actual de actualización', () => {
        render(
            <UIProvider>
                <RealTimeMonitor filteredFires={mockFires} refresh={mockRefresh} />
            </UIProvider>
        );
        
        expect(screen.getByText('Última actualización')).toBeInTheDocument();
    });
});
