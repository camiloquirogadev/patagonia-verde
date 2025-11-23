# Patagonia Verde FIRMS
**Sistema de Monitoreo de Incendios Forestales** - Detección satelital en tiempo real

[![React](https://img.shields.io/badge/React-19.1-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://typescriptlang.org)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green?logo=leaflet)](https://leafletjs.com)
[![MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## Descripción

Plataforma web para análisis geoespacial de incendios forestales en la Patagonia usando datos NASA FIRMS (MODIS/VIIRS). Visualización interactiva en tiempo real con filtros avanzados y análisis temporal.

## Características

- Datos en tiempo real desde NASA FIRMS
- Mapa interactivo (Leaflet + CartoDB)
- Análisis temporal con gráficos (Recharts)
- Filtros por fecha, temperatura y confianza
- Responsive design (mobile-first)
- Performance optimizado (~188KB gzip)

## Instalación

```bash
git clone https://github.com/camiloquirogadev/patagonia-verde
cd patagonia-verde
npm install
npm run dev
```

## Stack Tecnológico

| Categoría | Tecnologías |
|-----------|-------------|
| Frontend | React 19, TypeScript, Vite |
| Mapas | Leaflet, CartoDB Tiles |
| Datos | NASA FIRMS API (MODIS/VIIRS) |
| UI | Tailwind CSS, Recharts |
| Testing | Vitest, Testing Library |

## Fuente de Datos

**NASA FIRMS** - Fire Information for Resource Management System  
- Sensores: MODIS (1km), VIIRS (375m)  
- Actualización: Near real-time (3-6h latency)  
- Coverage: Global, Patagonia focus

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview build locally
npm test         # Run tests
npm run lint     # Lint code
```

## Documentación

- [Contributing Guide](docs/CONTRIBUTING.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Deployment](docs/DEPLOY.md)
- [Roadmap](docs/ROADMAP.md)
- [Security](SECURITY.md)

## Licencia

MIT © [Camilo Quiroga](https://github.com/camiloquirogadev)

---

**Proyecto Final** • Universidad • 2025
