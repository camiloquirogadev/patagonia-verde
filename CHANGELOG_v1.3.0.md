# Changelog v1.3.0

**Fecha de Lanzamiento**: 23 de Noviembre 2025

## Nuevas Características

### Menu Movil Mejorado
- Boton flotante independiente en esquina inferior derecha
- Menu desplegable con animacion slideUp desde abajo
- 7 opciones de navegacion:
  1. Actualizar Datos
  2. Panel Lateral (abre sidebar completo)
  3. Filtros Avanzados
  4. Monitor Satelital
  5. Analisis Temporal
  6. Marco Teorico
  7. Informacion del Sistema
- UX optimizada:
  - Cierra solo el menu flotante, mantiene sidebar abierto
  - Navegacion automatica a secciones
  - Altura maxima adaptativa calc(100vh - 8rem)
  - Scroll interno si hay muchas opciones
  - Z-index corregido (overlay: 1500, panel: 1550, boton: 1600)

### Controles de Mapa con Emojis
- Centrar en Patagonia: Icono de mapa
- Mi Ubicacion: Icono de pin de ubicacion
- Estados dinamicos: reloj de arena (cargando), cruz (error)
- Botones con mejor diseno visual y accesibilidad

### Estadisticas del Proyecto
- Tiempo desde lanzamiento calculado dinamicamente desde octubre 2024
- Total de incendios registrados en tiempo real
- Visible en el perfil del desarrollador

### Tipografia Mejorada
- Tamano base aumentado: 18px (HTML), 20.25px (body)
- Escala Tailwind personalizada: +20-30% en todos los tamanos
- Mejor legibilidad en todos los dispositivos

### Sidebar Ampliado
- Ancho aumentado: w-80 (lg) / w-96 (xl)
- Stack tecnologico actualizado: React 19, TypeScript, Leaflet, Vite, GIS, Geospatial
- Boton de cierre mejorado en movil con mejor UX

### Marco Teorico Academico Optimizado
- Justificacion del Proyecto (5 objetivos)
- Impacto Social y Ambiental
- Decisiones Tecnologicas
- Vision y Desarrollo Futuro
- Sistema FIRMS (NASA)
- Sensores MODIS/VIIRS (especificaciones tecnicas)
- Principio de Deteccion Termica
- Aplicaciones en Gestion Ambiental
- Contexto Regional Patagonico
- Limitaciones Metodologicas
- Referencias Bibliograficas
- Removido: Seccion PWA/Offline (movida a docs privados)
- Removido: Estrategia Colaborativa Comunitaria (movida a docs privados)

### Animaciones CSS
- fadeIn: Para overlays (0.3s ease-out)
- slideUp: Para menu movil (0.3s cubic-bezier)
- Transiciones suaves en todos los componentes interactivos

## Mejoras de Rendimiento

### Bundle Size
- Bundle principal: 281.27 KB -> 81.14 KB (gzip)
- CSS: 71.46 KB -> 16.11 KB (gzip)
- Maps chunk: 149.56 KB -> 43.33 KB (gzip)
- Charts chunk: 174.08 KB -> 60.95 KB (gzip)
- Codigo splitting por modulos
- Tree shaking activado

## Stack Tecnologico (Actualizado)

### Frontend Core
- React 19.1.0 - Framework UI de ultima generacion
- TypeScript 5.8.3 - Tipado estatico
- Vite 6.3.5 - Build tool ultra-rapido

### Mapeo y Geoespacial
- Leaflet 1.9.4 - Biblioteca de mapas interactivos
- Tiles: OpenStreetMap, Satelital (ArcGIS), Topografico (OpenTopoMap)

### Visualizacion de Datos
- Chart.js 4.4.9 - Graficos dinamicos
- react-chartjs-2 5.3.0 - Integracion con React

### UI/UX
- Tailwind CSS 3.4.17 - Framework de utilidades
- @fontsource/inter 5.2.5 - Tipografia moderna
- Tailwind Forms & Typography - Plugins adicionales

### Testing
- Vitest 3.2.4 - Test runner
- Testing Library - Testing de componentes
- MSW 2.12.3 - Mock Service Worker para API

### Utilidades
- date-fns 4.1.0 - Manipulacion de fechas
- Express 5.1.0 - Server opcional
- CORS 2.8.5 - Configuracion CORS

## Seguridad y Calidad

- ESLint 9.25.0 configurado
- TypeScript strict mode
- WCAG 2.1 Level AA compliance
- Accesibilidad: Aria labels, roles, keyboard navigation

## Responsividad

- Mobile-first design
- Breakpoints: sm, md, lg, xl, 2xl
- Menu adaptativo: Sidebar en desktop, menu flotante en movil
- Touch-friendly: Botones y controles optimizados para tactil

## Documentacion Privada

- ROADMAP_PRIVADO.md: 1000+ lineas con:
  - Estrategia de colaboracion comunitaria (6 secciones)
  - Implementacion PWA/Offline completa
  - Codigo TypeScript de ejemplo
  - Roadmap por fases (2026-2028)
  - Infraestructura y escalabilidad
  - Costos estimados (10K, 100K, 1M usuarios)
  - Monetizacion opcional
  - Metricas de exito
- Excluido del repositorio via .gitignore

## Mejoras vs v1.1.0

1. Menu movil completamente rediseñado
2. Navegacion mejorada en dispositivos moviles
3. Emojis en controles del mapa
4. Estadisticas del proyecto en tiempo real
5. Tipografia 20-30% mas grande
6. Marco teorico optimizado (contenido tecnico mejorado)
7. Animaciones CSS personalizadas
8. Documentacion privada separada
9. Sidebar mas ancho y funcional
10. Accesibilidad mejorada

## Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de produccion
npm run preview      # Preview del build
npm test             # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run test:coverage # Cobertura de tests
npm run lint         # Linter ESLint
npm run format       # Formatear codigo (Prettier)
npm run deploy       # Deploy a Vercel
```

## Estado del Proyecto

Build exitoso - Sin errores criticos
Tamano optimizado: 281.27 KB (81.14 KB gzip) - bundle principal
Version: 1.3.0
Licencia: MIT

**Estado**: PRODUCTION READY

## Fuente de Datos

NASA FIRMS API
- Sensores: MODIS (1km resolucion) + VIIRS (375m resolucion)
- Latencia: 3-6 horas (near real-time)
- Cobertura: Global con foco en Patagonia
- Parametros: brightness, confidence, FRP, satellite

## Licencia

MIT License - Open Source
