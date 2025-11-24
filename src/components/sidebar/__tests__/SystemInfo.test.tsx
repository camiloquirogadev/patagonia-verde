import { render, screen } from '@testing-library/react';
import { SystemInfo } from '../SystemInfo';

describe('SystemInfo', () => {
    it('debería mostrar la fuente de datos', () => {
        render(<SystemInfo />);
        expect(screen.getByText('Fuente de Datos:')).toBeInTheDocument();
        expect(screen.getByText('NASA FIRMS')).toBeInTheDocument();
    });

    it('debería mostrar información de los sensores', () => {
        render(<SystemInfo />);
        expect(screen.getByText('Sensores:')).toBeInTheDocument();
        expect(screen.getByText('MODIS/VIIRS')).toBeInTheDocument();
    });

    it('debería mostrar la resolución temporal', () => {
        render(<SystemInfo />);
        expect(screen.getByText('Resolución Temporal:')).toBeInTheDocument();
        expect(screen.getByText('Tiempo Real')).toBeInTheDocument();
    });

    it('debería mostrar la precisión geográfica', () => {
        render(<SystemInfo />);
        expect(screen.getByText('Precisión Geográfica:')).toBeInTheDocument();
        expect(screen.getByText('1km')).toBeInTheDocument();
    });

    it('debería tener el título "Información del Sistema"', () => {
        render(<SystemInfo />);
        expect(screen.getByText('Información del Sistema')).toBeInTheDocument();
    });
});
