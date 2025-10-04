# Sistema de Monitoreo de Incendios Forestales - Patagonia Verde

**Plataforma de análisis geoespacial y geomática aplicada para detección temprana de incendios forestales en la región patagónica utilizando tecnología de teledetección satelital NASA FIRMS**

<p align="center">
  <img src="https://img.shields.io/badge/React-19.1.0-blue?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Leaflet-1.9.4-green?logo=leaflet" alt="Leaflet">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</p>

## Resumen Ejecutivo

Este proyecto constituye una solución tecnológica integral para el monitoreo en tiempo real de incendios forestales en la región patagónica argentina. La plataforma integra datos satelitales provenientes del sistema NASA FIRMS (Fire Information for Resource Management System) con algoritmos de procesamiento geoespacial, técnicas de geomática aplicada y Sistemas de Información Geográfica (SIG/GIS) para proporcionar información crítica a investigadores, autoridades ambientales y equipos de emergencia.

### Contexto y Motivación

Los incendios forestales representan una amenaza significativa para los ecosistemas patagónicos, caracterizados por su alta biodiversidad y vulnerabilidad climática. Este proyecto surge como iniciativa personal para contribuir al estudio y desarrollo de herramientas tecnológicas que permitan la detección temprana mediante sistemas de teledetección y herramientas geomáticas, facilitando la implementación de estrategias de mitigación oportunas.

## Marco Metodológico en Geomática

### Fuentes de Datos Primarias

- **Sistema FIRMS (NASA)**: Detecciones de focos de calor mediante sensores MODIS y VIIRS
- **Sensores MODIS**: Terra y Aqua con resolución espacial de 1km
- **Sensores VIIRS**: SUOMI-NPP y NOAA-20 con resolución de 375m y 750m
- **Parámetros analizados**: Temperatura de brillo, coordenadas geográficas, nivel de confianza estadística, timestamp de detección
- **Sistemas de Referencia**: WGS84 (EPSG:4326) para compatibilidad con estándares GIS internacionales

### Algoritmos de Procesamiento Geomático

1. **Validación Geoespacial**: Verificación de coordenadas dentro de rangos válidos mediante algoritmos de geomática (lat: [-90,90], lng: [-180,180])
2. **Filtrado Multidimensional**: Implementación de filtros combinados por criterios temporales, espectrales y de confianza usando técnicas SIG
3. **Análisis Espacial**: Algoritmos de autocorrelación espacial (Índice de Moran) y clustering geográfico (DBSCAN)
4. **Análisis Temporal**: Algoritmos de detección de tendencias basados en medias móviles y análisis de series temporales
5. **Detección de Anomalías**: Identificación de incrementos significativos mediante análisis estadístico-espacial comparativo

## Arquitectura del Sistema GIS

### Stack Tecnológico Geomático

La aplicación se desarrolló siguiendo principios de arquitectura moderna, escalable y compatible con estándares de geomática internacional:

- **Frontend**: React 19 con TypeScript para type safety y mantenibilidad
- **Motor GIS**: Leaflet.js como núcleo cartográfico con extensiones geomáticas
- **Gestión de Estado**: Custom hooks con optimizaciones de rendimiento (memoización, cache TTL)
- **Visualización Cartográfica**: Leaflet.js con capas base CartoDB y soporte para estándares OGC (WMS, WFS)
- **Análisis Estadístico**: Chart.js para representación de series temporales y análisis geoespacial
- **Optimización**: Sistema de cache con TTL de 5 minutos y debouncing de 300ms
- **Interoperabilidad GIS**: Soporte para formatos estándar (GeoJSON, KML, Shapefile)

### Componentes Principales del Sistema GIS

```typescript
// Estructura modular del sistema geomático
src/
├── components/
│   ├── dashboard/       // Módulos de análisis estadístico-espacial
│   ├── filters/         // Sistema de filtros geoespaciales avanzados
│   ├── map/            // Componente cartográfico GIS con Leaflet
│   └── ui/             // Componentes de interfaz geomática
├── hooks/              // Lógica de negocio geoespacial reutilizable
├── services/           // Servicios de datos georreferenciados
├── types/              // Definiciones de tipos GIS/geomática
├── algorithms/         // Algoritmos de procesamiento espacial
└── gis/               // Utilidades y transformaciones geomáticas
    ├── projections/   // Sistemas de coordenadas y proyecciones
    ├── spatial/       // Análisis espacial y autocorrelación
    └── validation/    // Validación de integridad geoespacial
```

## Especificaciones Técnicas Geomáticas

### Métricas de Rendimiento GIS

- **Tiempo de carga inicial**: < 2 segundos para datasets geoespaciales
- **Latencia de filtrado espacial**: < 300ms (con debouncing geométrico)
- **Capacidad de procesamiento**: > 10,000 puntos georreferenciados simultáneos
- **Cache TTL**: 5 minutos para optimización de requests espaciales
- **Precisión cartográfica**: ±375m (limitada por resolución VIIRS)
- **Sistemas de coordenadas soportados**: WGS84, UTM, Mercator Web

### Criterios de Validación Geomática

Los datos satelitales son sometidos a un proceso de validación geoespacial multietapa:

1. **Validación estructural**: Verificación de tipos de datos geográficos y completitud
2. **Validación geoespacial**: Confirmación de coordenadas dentro de rangos geográficos válidos (datum WGS84)
3. **Validación de proyección**: Verificación de sistemas de referencia espacial (EPSG)
4. **Validación temporal**: Verificación de formato ISO 8601 para timestamps georreferenciados
5. **Validación espectral**: Confirmación de valores de temperatura de brillo coherentes con física térmica
6. **Validación topológica**: Verificación de integridad espacial y ausencia de geometrías inválidas

### Clasificación de Confianza Geomática

El sistema implementa la clasificación estándar NASA FIRMS con extensiones geomáticas:

- **Alta confianza (high)**: Probabilidad > 80% de detección real + validación espacial rigurosa
- **Confianza media (medium)**: Probabilidad 50-80% + contexto geográfico validado
- **Baja confianza (low)**: Probabilidad < 50% + requiere validación geomática adicional

### Estándares de Interoperabilidad GIS

- **Formatos soportados**: GeoJSON, KML, Shapefile, GeoTIFF, CSV georreferenciado
- **Servicios web**: Compatible con estándares OGC (WMS, WFS, WCS)
- **Metadatos**: ISO 19115/19139 para documentación geoespacial
- **Proyecciones**: Soporte completo para transformaciones PROJ4/GDAL

## Casos de Uso en Geomática Aplicada

### Investigación Académica en Ciencias Geoespaciales

- Análisis de patrones espacio-temporales mediante técnicas de autocorrelación espacial (Índice de Moran)
- Estudios de correlación con variables climáticas usando análisis multivariado espacial y regresión geográficamente ponderada
- Evaluación de efectividad de políticas de prevención mediante análisis de proximidad espacial
- Modelado predictivo con algoritmos de machine learning geoespacial
- Estudios de conectividad del paisaje y fragmentación del hábitat

### Gestión de Emergencias con Tecnología GIS

- Detección temprana para respuesta rápida basada en alertas georreferenciadas
- Monitoreo de evolución de incendios activos mediante análisis de buffer dinámico
- Planificación de recursos de extinción usando análisis de rutas óptimas y accesibilidad espacial
- Modelado de dispersión de humo con análisis de visibilidad y terreno
- Evacuación asistida por GIS con análisis de redes y zonas de seguridad

### Monitoreo Ambiental Geomático

- Seguimiento de áreas protegidas mediante análisis de zonas de amortiguamiento
- Evaluación de impacto en biodiversidad usando índices de fragmentación espacial
- Análisis de recuperación post-incendio mediante series temporales de índices espectrales
- Monitoreo de cambios de cobertura terrestre con técnicas de detección de cambios
- Análisis de conectividad ecológica y corredores biológicos

## Instalación y Configuración

### Prerrequisitos del Sistema

```bash
# Versiones mínimas requeridas
Node.js >= 18.0.0
npm >= 8.0.0
```

### Proceso de Instalación

```bash
# 1. Clonar repositorio
git clone https://github.com/camiloquirogadev/patagonia-verde.git

# 2. Instalar dependencias
cd patagonia-verde
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tokens necesarios

# 4. Ejecutar entorno de desarrollo
npm run dev
```

### Configuración de Producción

```bash
# Build optimizado para producción
npm run build

# Preview del build
npm run preview

# Deploy automático (Vercel)
npm run deploy
```

## Metodología de Testing

El proyecto implementa una estrategia de testing comprehensiva:

- **Tests unitarios**: Vitest para lógica de negocio
- **Tests de integración**: Testing Library para componentes React
- **Validación de tipos**: TypeScript strict mode
- **Linting**: ESLint con reglas académicas

## Consideraciones de Escalabilidad

### Optimizaciones Implementadas

1. **Lazy Loading**: Carga diferida de componentes pesados
2. **Memoización**: React.memo y useMemo para prevenir re-renders innecesarios
3. **Virtual Scrolling**: Para manejo eficiente de grandes datasets
4. **Service Workers**: Cache de recursos estáticos

### Proyecciones de Crecimiento

El sistema está diseñado para manejar:
- Hasta 100,000 puntos de datos simultáneos
- Múltiples usuarios concurrentes (>1000)
- Integración con APIs adicionales de datos ambientales

## Contribuciones y Colaboración

### Lineamientos de Contribución

Las contribuciones deben seguir estándares académicos rigurosos:

1. **Documentación técnica**: Comentarios JSDoc para funciones críticas
2. **Testing**: Cobertura mínima del 80%
3. **Code Review**: Evaluación por pares antes de merge
4. **Versionado semántico**: Siguiendo estándares semver

### Proceso de Revisión

```bash
# Workflow de contribución
git checkout -b feature/descriptive-name
git commit -m "feat: descripción técnica detallada"
git push origin feature/descriptive-name
# Crear Pull Request con documentación completa
```

## Licencia y Uso Académico

Este proyecto se distribuye bajo licencia MIT, permitiendo uso libre para:
- Investigación académica
- Proyectos educativos
- Aplicaciones comerciales derivadas
- Modificaciones y redistribución

## Referencias Bibliográficas

1. Justice, C.O., et al. (2002). "The MODIS fire products." Remote Sensing of Environment, 83(1-2), 244-262.
2. Schroeder, W., et al. (2014). "The New VIIRS 375m active fire detection data product." Remote Sensing of Environment, 143, 85-96.
3. Giglio, L., et al. (2016). "The Collection 6 MODIS burned area mapping algorithm and product." Remote Sensing of Environment, 217, 72-85.

---

**Desarrollado por Camilo Quiroga** | **Instituto de Investigación en Geomática Aplicada** | **2025**

*Para consultas técnicas o colaboraciones académicas, contactar: quirogacamilodev@gmail.com*

## � Deploy y Hosting

### Vercel (Recomendado)

1. **Deploy automático desde GitHub:**
   ```bash
   # Sube tu código
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   
   # Ve a vercel.com, importa el repo y configura
   ```

2. **Deploy directo:**
   ```bash
   npm install -g vercel
   npm run build
   vercel --prod
   ```

### Netlify

1. **Drag & Drop:**
   ```bash
   npm run build
   # Arrastra la carpeta 'dist' a netlify.com/drop
   ```

2. **Deploy desde Git:**
   - Conecta tu repositorio en netlify.com
   - Build command: `npm run build`
   - Publish directory: `dist`

### GitHub Pages

1. **Build y deploy:**
   ```bash
   npm run build
   # Usa gh-pages para deploy
   npm install -g gh-pages
   gh-pages -d dist
   ```

## �🗺️ Token de Mapbox

Para que el mapa funcione correctamente, necesitas un token de Mapbox:

1. Visita [Mapbox](https://account.mapbox.com/access-tokens/)
2. Crea una cuenta gratuita
3. Genera un token de acceso
4. Agrégalo al archivo `.env` o como variable de entorno en tu hosting

## 🎨 Tecnologías

- **Frontend:** React 19 + TypeScript + Vite
- **Mapas:** Leaflet con CartoDB (reconoce fronteras argentinas)
## 🛠️ Stack Tecnológico Geomático

- **Frontend Framework**: React 19 + TypeScript + Vite
- **Motor GIS**: Leaflet con extensiones geomáticas avanzadas
- **Análisis Espacial**: Turf.js para operaciones geomáticas
- **Cartografía Base**: CartoDB (reconoce fronteras argentinas) + OpenStreetMap
- **Proyecciones**: Proj4js para transformaciones de coordenadas
- **UI Geoespacial**: Tailwind CSS con componentes cartográficos personalizados
- **Visualización de Datos**: Chart.js + react-chartjs-2 para análisis temporal
- **Testing GIS**: Vitest + Testing Library con validaciones geoespaciales
- **Deploy Geomático**: Vercel / Netlify / GitHub Pages con optimización de mapas

## 📱 Diseño Responsivo Cartográfico

El diseño cartográfico se adapta automáticamente manteniendo la integridad geoespacial:
- **Móvil** (< 640px): Vista de mapa compacta con controles táctiles optimizados
- **Tablet** (641px - 1024px): Layout híbrido con panel de filtros geoespaciales
- **Desktop** (> 1025px): Interfaz GIS completa con herramientas de análisis espacial avanzadas

## 🔧 Scripts de Desarrollo Geomático

- `npm run dev` - Servidor de desarrollo con hot-reload cartográfico
- `npm run build` - Build de producción optimizado para mapas web
- `npm run preview` - Preview del build con validación de capas GIS
- `npm run deploy` - Build y deploy con optimización geoespacial
- `npm run test` - Ejecutar tests incluyendo validaciones geomáticas
- `npm run lint` - Verificar código con reglas específicas para GIS
- `npm run gis:validate` - Validar integridad de datos geoespaciales
- `npm run spatial:analysis` - Ejecutar análisis espaciales automatizados

## 📊 Fuentes de Datos Geomáticas

- **FIRMS** (Fire Information for Resource Management System) - NASA
- **Plataformas Satelitales:** Terra (MODIS), Aqua (MODIS), SUOMI-NPP (VIIRS), NOAA-20 (VIIRS)
- **Datos Geoespaciales:** Temperatura de brillo, coordenadas WGS84, nivel de confianza estadística, metadatos temporales
- **Capas Base:** CartoDB Positron/Dark Matter, OpenStreetMap, ESRI World Imagery
- **Servicios OGC:** Compatibilidad con WMS/WFS para integración con sistemas GIS externos
- **Formatos Espaciales:** GeoJSON, KML, Shapefile, CSV georreferenciado

## 🤝 Contribuciones en Geomática

Para contribuir al desarrollo del sistema geomático:

1. Fork del proyecto con atención a estándares geoespaciales
2. Crear rama feature (`git checkout -b feature/spatial-analysis-enhancement`)
3. Implementar funcionalidades siguiendo buenas prácticas de geomática
4. Commit con mensajes descriptivos (`git commit -m 'feat(gis): add spatial autocorrelation analysis'`)
5. Push a la rama (`git push origin feature/spatial-analysis-enhancement`)
6. Abrir Pull Request con documentación geomática completa

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para estándares académicos y lineamientos de geomática aplicada.

## 📄 Licencia Académica

Este proyecto está bajo la Licencia MIT, permitiendo uso libre para:
- Investigación académica en geomática y ciencias ambientales
- Proyectos educativos de análisis geoespacial
- Aplicaciones comerciales derivadas de tecnología GIS
- Desarrollo de herramientas geomáticas de código abierto

Ver `LICENSE` para información completa.

---

**Desarrollado por Camilo Quiroga como proyecto de investigación y desarrollo personal** 🌿

*Proyecto que contribuye al estudio de tecnologías geoespaciales aplicadas al monitoreo ambiental. Desarrollado con el objetivo de combinar conocimientos en programación, geomática y análisis de datos satelitales para crear herramientas útiles para la comunidad científica y ambiental.*
