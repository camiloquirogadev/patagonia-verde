# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Versionado Semántico](https://semver.org/lang/es/).

---

## [1.3.0] - 2025-11-23

### Agregado
- **Menú Móvil Mejorado**
  - Botón flotante independiente en esquina inferior derecha
  - Menú desplegable con animación slideUp desde abajo
  - 7 opciones de navegación: Actualizar Datos, Panel Lateral, Filtros, Monitor, Análisis, Marco Teórico, Info Sistema
  - UX optimizada: cierra solo el menú flotante, mantiene sidebar abierto
  - Navegación automática a secciones con scroll suave
  - Z-index corregido (overlay: 1500, panel: 1550, botón: 1600)

- **Controles de Mapa con Emojis**
  - Centrar en Patagonia con icono de mapa 🗺️
  - Mi Ubicación con pin de ubicación 📍
  - Estados dinámicos: reloj de arena ⌛ (cargando), cruz ❌ (error)
  - Mejor diseño visual y accesibilidad

- **Estadísticas del Proyecto**
  - Tiempo desde lanzamiento calculado dinámicamente desde octubre 2024
  - Total de incendios registrados en tiempo real
  - Visible en el perfil del desarrollador

- **Marco Teórico Académico Optimizado**
  - Justificación del Proyecto (5 objetivos)
  - Impacto Social y Ambiental
  - Decisiones Tecnológicas detalladas
  - Visión y Desarrollo Futuro
  - Sistema FIRMS (NASA) con especificaciones técnicas
  - Sensores MODIS/VIIRS (resolución, bandas, latencia)
  - Principio de Detección Térmica
  - Aplicaciones en Gestión Ambiental
  - Contexto Regional Patagónico
  - Limitaciones Metodológicas
  - Referencias Bibliográficas

- **Animaciones CSS personalizadas**
  - `fadeIn`: Para overlays (0.3s ease-out)
  - `slideUp`: Para menú móvil (0.3s cubic-bezier)
  - Transiciones suaves en componentes interactivos

### Mejorado
- **Tipografía**
  - Tamaño base aumentado: 18px (HTML), 20.25px (body)
  - Escala Tailwind personalizada: +20-30% en todos los tamaños
  - Mejor legibilidad en todos los dispositivos

- **Sidebar**
  - Ancho aumentado: w-80 (lg) / w-96 (xl)
  - Stack tecnológico actualizado con badges mejorados
  - Botón de cierre mejorado en móvil

- **Bundle Size optimizado**
  - Bundle principal: 282 KB → 81 KB (gzip)
  - CSS: 71 KB → 16 KB (gzip)
  - Maps chunk: 150 KB → 43 KB (gzip)
  - Charts chunk: 174 KB → 61 KB (gzip)

### Cambiado
- Separación de documentación pública y privada
- Contenido PWA/Offline movido a documentación privada
- Estrategia Colaborativa movida a `ROADMAP_PRIVADO.md`

---

## [1.1.0] - 2024-10-01

### Agregado
- **Sistema de Monitoreo de Incendios**
  - Integración con NASA FIRMS API (MODIS/VIIRS)
  - Visualización de datos satelitales en tiempo real
  - Mapa interactivo con Leaflet
  - Filtros por fecha, temperatura y nivel de confianza

- **Interfaz de Usuario**
  - Diseño responsive (mobile-first)
  - Panel lateral con información detallada
  - Sistema de estadísticas en tiempo real
  - Gráficos temporales con Chart.js

- **Funcionalidades Core**
  - Monitor satelital en tiempo real
  - Análisis temporal de incendios
  - Panel de filtros avanzados
  - Sistema de información académica
  - Perfil del desarrollador

- **Accesibilidad**
  - WCAG 2.1 Level AA compliance
  - Aria labels completos
  - Navegación por teclado
  - Contraste de colores optimizado

### Stack Tecnológico Inicial
- React 19.1.0
- TypeScript 5.8.3
- Vite 6.3.5
- Tailwind CSS 3.4.17
- Leaflet 1.9.4
- Chart.js 4.4.9
- Vitest 3.2.4
- date-fns 4.1.0

### Rendimiento
- Build optimizado: ~200KB (gzip)
- Code splitting por módulos
- Lazy loading de componentes
- Tree shaking activado

---

## Fuente de Datos

**NASA FIRMS API**
- Sensores: MODIS (1km resolución) + VIIRS (375m resolución)
- Latencia: 3-6 horas (near real-time)
- Cobertura: Global con foco en Patagonia Argentina
- Parámetros: brightness, confidence, FRP, satellite

---

## Scripts Disponibles

```bash
npm run dev              # Servidor de desarrollo
npm run build            # Build de producción
npm run preview          # Preview del build
npm test                 # Ejecutar tests
npm run test:watch       # Tests en modo watch
npm run test:coverage    # Cobertura de tests
npm run lint             # Linter ESLint
npm run format           # Formatear código
npm run deploy           # Deploy a Vercel
```

---

## Licencia

MIT License - Open Source

[1.3.0]: https://github.com/camiloquirogadev/patagonia-verde/releases/tag/v1.3.0
[1.1.0]: https://github.com/camiloquirogadev/patagonia-verde/releases/tag/v1.1.0
