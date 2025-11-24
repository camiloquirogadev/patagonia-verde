import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TemporalAnalysis } from '../TemporalAnalysis';
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
];

describe('TemporalAnalysis', () => {
    it('debería renderizar el título del análisis temporal', () => {
        render(
            <UIProvider>
                <TemporalAnalysis filteredFires={mockFires} />
            </UIProvider>
        );
        
        expect(screen.getByText('Análisis Temporal')).toBeInTheDocument();
    });

    it('debería mostrar el subtítulo con información de series de tiempo', () => {
        render(
            <UIProvider>
                <TemporalAnalysis filteredFires={mockFires} />
            </UIProvider>
        );
        
        expect(screen.getByText('Series de Tiempo • Tendencias')).toBeInTheDocument();
    });

    it('debería tener un botón para colapsar/expandir', async () => {
        const user = userEvent.setup();
        render(
            <UIProvider>
                <TemporalAnalysis filteredFires={mockFires} />
            </UIProvider>
        );
        
        const toggleButton = screen.getByRole('button');
        expect(toggleButton).toBeInTheDocument();
        
        await user.click(toggleButton);
        // El componente debería cambiar su estado al hacer clic
    });
});
