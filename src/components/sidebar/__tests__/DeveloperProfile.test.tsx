import { render, screen } from '@testing-library/react';
import { DeveloperProfile } from '../DeveloperProfile';

describe('DeveloperProfile', () => {
    const appVersion = '1.0.0';

    it('debería mostrar el nombre del desarrollador', () => {
        render(<DeveloperProfile appVersion={appVersion} />);
        expect(screen.getByText('Camilo Quiroga')).toBeInTheDocument();
    });

    it('debería mostrar el rol del desarrollador', () => {
        render(<DeveloperProfile appVersion={appVersion} />);
        expect(screen.getByText('Software Engineer • Geomática')).toBeInTheDocument();
    });

    it('debería mostrar las tecnologías utilizadas', () => {
        render(<DeveloperProfile appVersion={appVersion} />);
        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
        expect(screen.getByText('Leaflet')).toBeInTheDocument();
        expect(screen.getByText('Vite')).toBeInTheDocument();
    });

    it('debería tener enlaces a GitHub y LinkedIn', () => {
        render(<DeveloperProfile appVersion={appVersion} />);
        
        const githubLink = screen.getByRole('link', { name: /GitHub/i });
        const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });
        
        expect(githubLink).toHaveAttribute('href', 'https://github.com/camiloquirogadev/patagonia-verde');
        expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/camilo-quiroga-dev/');
    });

    it('debería mostrar la versión de la aplicación', () => {
        render(<DeveloperProfile appVersion={appVersion} />);
        expect(screen.getByText(`v${appVersion}`)).toBeInTheDocument();
    });

    it('debería mostrar la licencia MIT', () => {
        render(<DeveloperProfile appVersion={appVersion} />);
        expect(screen.getByText('MIT License')).toBeInTheDocument();
    });

    it('debería tener enlaces a Ko-fi y GitHub Sponsors', () => {
        render(<DeveloperProfile appVersion={appVersion} />);
        
        const kofiLink = screen.getByRole('link', { name: /Café/i });
        const sponsorLink = screen.getByRole('link', { name: /Sponsor/i });
        
        expect(kofiLink).toHaveAttribute('href', 'https://ko-fi.com/camiloquirogadev');
        expect(sponsorLink).toHaveAttribute('href', 'https://github.com/sponsors/camiloquirogadev');
    });
});
