import { render, screen } from '@testing-library/react';
import { SystemHeader } from '../SystemHeader';

describe('SystemHeader', () => {
    it('debería renderizar el título del sistema', () => {
        render(<SystemHeader />);
        expect(screen.getByText('Sistema FIRMS')).toBeInTheDocument();
    });

    it('debería mostrar el subtítulo correcto', () => {
        render(<SystemHeader />);
        expect(screen.getByText('Fire Information for Resource Management')).toBeInTheDocument();
    });

    it('debería mostrar la descripción académica', () => {
        render(<SystemHeader />);
        expect(screen.getByText(/Plataforma de monitoreo satelital en tiempo real/i)).toBeInTheDocument();
    });

    it('debería tener el icono de bombilla', () => {
        const { container } = render(<SystemHeader />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });
});
