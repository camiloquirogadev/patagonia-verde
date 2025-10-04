# Arquitectura del Sistema

## Patagonia Verde - Monitoreo de Incendios Forestales

### Versión: 1.0.0 | Octubre 2025

---

## Resumen

Sistema web de análisis geoespacial para monitoreo de incendios forestales en la Patagonia usando datos satelitales NASA FIRMS.

**Arquitectura**: Layered + Component-based  
**Stack**: React 19, TypeScript, Leaflet, Chart.js

---

## Stack Tecnológico

- **React 19 + TypeScript**: Framework y type safety
- **Leaflet**: Mapas interactivos 
- **Chart.js**: Visualización de datos
- **Tailwind CSS**: Estilos utility-first
- **Vite**: Build tool y desarrollo

---

## Módulos Principales

### 1. useFirmsData Hook
**Propósito**: Gestión de datos satelitales
- Validación geoespacial automática
- Cache con TTL y error handling
- Optimización de memoria

```typescript
const validateCoordinates = (lat: number, lng: number): boolean => {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};
```

### 2. Sistema de Filtros
**Dimensiones**: Temporal, espectral, confianza, satelital
- Debouncing 300ms
- Memoización con useMemo
- Filtrado in-memory

### 3. Visualización Cartográfica
**Componentes**: MapComponent, MarkerClusters, PopupComponent
- Lazy loading de componentes pesados
- Virtual scrolling para datasets grandes
- Throttling de eventos zoom/pan

### 4. Análisis Temporal
**Métricas**: Tendencias, anomalías, proyecciones
```typescript
const calculateTrend = (values: number[]): TrendType => {
  const recentAvg = mean(values.slice(-3));
  const historicalAvg = mean(values.slice(0, 3));
  return recentAvg > historicalAvg * 1.2 ? 'increasing' : 'stable';
};
```

---

## Patrones de Diseño

- **Observer**: Hooks reactivos
- **Strategy**: Algoritmos intercambiables de filtrado
- **Factory**: Generación dinámica de componentes
- **Singleton**: Cache global funcional

---

## Optimizaciones

### Performance
- Code splitting con Lazy loading
- Memoización (React.memo, useMemo, useCallback)
- Virtualization para listas largas
- Debouncing en inputs

### Network
- HTTP/2 para recursos críticos
- Compresión Gzip/Brotli
- CDN para assets estáticos

### Memoria
- Cleanup automático de event listeners
- Nulling de referencias pesadas
- Memory profiling integrado

---

## Seguridad

### Validación
```typescript
const sanitizeInput = (input: unknown): string => {
  return typeof input === 'string' ? input.trim().slice(0, 1000) : '';
};

const validateFirePoint = (data: unknown): data is FirePoint => {
  return isObject(data) && isNumber(data.latitude) && isNumber(data.longitude);
};
```

### Error Handling
- Error Boundaries en React
- Try-catch en operaciones async
- Fallbacks con datos por defecto
- Feedback informativo al usuario

---

## Testing & Deploy

### Testing
- **Vitest**: Lógica de negocio (cobertura >80%)
- **Testing Library**: Componentes React
- **Cypress**: E2E testing

### Build & Deploy
```bash
npm run build    # Tree shaking + minificación automática
npm run deploy   # Vercel/Netlify integration
```

### Monitoring
- Performance metrics
- Error tracking (Sentry-ready)
- Resource usage monitoring

---

## Escalabilidad

### Capacidades Diseñadas
- 10,000+ puntos georreferenciados simultáneos
- 1000+ usuarios concurrentes
- Integración APIs adicionales

### Scaling Strategies
- **Horizontal**: Diseño stateless, CDN, load balancing
- **Vertical**: Memory pooling, Web Workers para CPU intensivo
- **Data**: Pagination, streaming, compression

---

**Autor**: Camilo Quiroga  
**Contacto**: camiloquirogadev@gmail.com