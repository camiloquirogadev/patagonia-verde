# Changelog v1.1.0

**Fecha de Lanzamiento**: Octubre 2024

## Características Principales

### Sistema de Monitoreo de Incendios
- Integración con NASA FIRMS API (MODIS/VIIRS)
- Visualización de datos satelitales en tiempo real
- Mapa interactivo con Leaflet
- Filtros por fecha, temperatura y nivel de confianza

### Interfaz de Usuario
- Diseño responsive (mobile-first)
- Panel lateral con información detallada
- Sistema de estadísticas en tiempo real
- Gráficos temporales con Chart.js

### Tecnologías Base
- React 19
- TypeScript 5.8
- Vite 6.3
- Tailwind CSS 3.4
- Leaflet 1.9
- Chart.js 4.4

### Funcionalidades
- Monitor satelital en tiempo real
- Análisis temporal de incendios
- Panel de filtros avanzados
- Sistema de información académica
- Perfil del desarrollador

### Rendimiento
- Build optimizado: ~200KB (gzip)
- Code splitting por módulos
- Lazy loading de componentes
- Tree shaking activado

### Accesibilidad
- WCAG 2.1 Level AA
- Aria labels completos
- Navegación por teclado
- Contraste de colores optimizado

## Stack Tecnológico

### Frontend Core
- React 19.1.0
- TypeScript 5.8.3
- Vite 6.3.5

### Mapeo
- Leaflet 1.9.4
- Tiles: OpenStreetMap, Satelital, Topográfico

### Visualización
- Chart.js 4.4.9
- react-chartjs-2 5.3.0

### UI/UX
- Tailwind CSS 3.4.17
- @fontsource/inter 5.2.5

### Testing
- Vitest 3.2.4
- Testing Library
- MSW 2.12.3

### Utilidades
- date-fns 4.1.0
- Express 5.1.0
- CORS 2.8.5

## Fuente de Datos

**NASA FIRMS**
- Sensores: MODIS (1km) + VIIRS (375m)
- Latencia: 3-6 horas
- Cobertura: Global (foco Patagonia)

## Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm test             # Ejecutar tests
npm run lint         # Linter ESLint
npm run format       # Formatear código
```

## Documentación

- README.md - Guía principal
- ARCHITECTURE.md - Arquitectura del sistema
- CONTRIBUTING.md - Guía de contribución
- SCIENTIFIC_METHODOLOGY.md - Metodología científica
- SECURITY.md - Política de seguridad

## Licencia

MIT License - Open Source
