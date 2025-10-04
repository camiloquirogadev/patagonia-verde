# Guía de Contribución

## Sistema de Monitoreo de Incendios Forestales Patagonia Verde

### Lineamientos para Contribuciones Técnicas

---

## 1. Principios Generales

### 1.1 Filosofía del Proyecto

Patagonia Verde es un proyecto personal de desarrollo que busca contribuir al estudio y aplicación de tecnologías geoespaciales para el monitoreo ambiental. El proyecto adhiere a principios de **desarrollo científico abierto** y **buenas prácticas de programación**, manteniendo estándares técnicos sólidos que podrían ser útiles para futuras investigaciones y aplicaciones profesionales.

### 1.2 Código de Conducta

- **Rigor técnico**: Implementación de algoritmos basados en metodologías científicas establecidas
- **Transparencia metodológica**: Documentación exhaustiva de procesos y decisiones de diseño
- **Colaboración constructiva**: Revisión por pares respetuosa y fundamentada
- **Atribución adecuada**: Reconocimiento de fuentes y referencias bibliográficas

## 2. Configuración del Entorno de Desarrollo

### 2.1 Prerrequisitos del Sistema

```bash
# Versiones mínimas requeridas
Node.js >= 18.0.0
npm >= 8.0.0
Git >= 2.25.0
```

### 2.2 Configuración Inicial

```bash
# 1. Clonar repositorio con submódulos
git clone --recursive https://github.com/camiloquirogadev/patagonia-verde.git
cd patagonia-verde

# 2. Instalar dependencias científicas
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tokens y configuraciones específicas

# 4. Instalar hooks de pre-commit para validación científica
npm run setup:hooks

# 5. Verificar instalación
npm run test:setup
npm run lint:scientific
```

### 2.3 Estructura del Proyecto Científico

```
patagonia-verde/
├── src/
│   ├── algorithms/          # Implementaciones de algoritmos científicos
│   │   ├── spatial/         # Análisis espacial (Moran's I, clustering)
│   │   ├── temporal/        # Series temporales (tendencias, anomalías)
│   │   └── validation/      # Algoritmos de validación de datos
│   ├── components/          # Componentes React con documentación JSDoc
│   ├── hooks/              # Custom hooks con lógica científica
│   ├── services/           # Servicios de datos y APIs
│   ├── types/              # Definiciones TypeScript académicas
│   └── utils/              # Utilidades científicas y matemáticas
├── docs/
│   ├── technical/          # Documentación técnica detallada
│   ├── scientific/         # Metodología y referencias
│   └── api/               # Documentación de APIs
├── tests/
│   ├── unit/              # Tests unitarios con validación científica
│   ├── integration/       # Tests de integración geoespacial
│   └── benchmarks/        # Tests de performance de algoritmos
└── scripts/
    ├── validation/        # Scripts de validación científica
    └── data/             # Scripts de procesamiento de datos
```

## 3. Estándares de Documentación Científica

### 3.1 Comentarios JSDoc Académicos

```typescript
/**
 * Calcula la autocorrelación espacial usando el índice de Moran
 * 
 * Implementa el algoritmo descrito en Cliff & Ord (1973) para análisis
 * de patrones espaciales en datos georreferenciados. El índice varía
 * entre -1 (dispersión perfecta) y +1 (agrupación perfecta).
 * 
 * @param points - Array de puntos georreferenciados con propiedades numéricas
 * @param property - Nombre de la propiedad a analizar
 * @param weightMatrix - Matriz de pesos espaciales (opcional, por defecto: distancia inversa)
 * @returns Objeto con índice de Moran, valor z y p-value
 * 
 * @example
 * ```typescript
 * const result = calculateMoranIndex(firePoints, 'brightness');
 * console.log(`Moran's I: ${result.index}, p-value: ${result.pValue}`);
 * ```
 * 
 * @see Cliff, A. D., & Ord, J. K. (1973). Spatial Autocorrelation. Pion.
 * @author Camilo Quiroga <c.quiroga@outlook.com>
 * @version 1.0.0
 * @since 2025-10-01
 */
function calculateMoranIndex(
  points: GeoPoint[], 
  property: string, 
  weightMatrix?: WeightMatrix
): MoranResult {
  // Implementación con validación científica...
}
```

### 3.2 Documentación de Interfaces Científicas

```typescript
/**
 * Estructura de datos para detecciones de incendios forestales
 * 
 * Compatible con estándares NASA FIRMS v2.0+ y diseñada para
 * interoperabilidad con sistemas GIS estándar (GDAL/OGR).
 * Sistema de coordenadas: WGS84 (EPSG:4326)
 * 
 * @interface FireDetection
 * @version 1.0.0
 * @standard NASA-FIRMS-v2.0
 */
interface FireDetection {
  /** 
   * Identificador único persistente
   * @pattern ^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$
   */
  id: string;
  
  /**
   * Coordenada de latitud en grados decimales
   * @minimum -90.0
   * @maximum 90.0
   * @precision 6 decimales (~0.1m precisión)
   */
  latitude: number;
  
  // ... resto de propiedades documentadas
}
```

## 4. Proceso de Testing Científico

### 4.1 Tests con Validación Estadística

```typescript
describe('MoranIndexCalculation', () => {
  it('should calculate correct Moran Index for known spatial pattern', () => {
    // Datos de prueba con patrón espacial conocido
    const clusteredPoints = generateClusteredPattern(100, 0.8);
    const result = calculateMoranIndex(clusteredPoints, 'value');
    
    // Validación estadística rigurosa
    expect(result.index).toBeCloseTo(0.8, 2);
    expect(result.pValue).toBeLessThan(0.05);
    expect(result.zScore).toBeGreaterThan(1.96);
  });

  it('should handle edge cases according to literature', () => {
    const isolatedPoints = generateRandomPattern(50);
    const result = calculateMoranIndex(isolatedPoints, 'value');
    
    expect(result.index).toBeCloseTo(0, 1); // Patrón aleatorio ≈ 0
  });
});
```

### 4.2 Benchmarks de Performance

```typescript
describe('AlgorithmPerformance', () => {
  it('should process large datasets within scientific computing standards', () => {
    const largeDataset = generateSyntheticFireData(10000);
    
    const startTime = performance.now();
    const result = filterAndAnalyzeFireData(largeDataset);
    const endTime = performance.now();
    
    // Requisitos de performance científica
    expect(endTime - startTime).toBeLessThan(5000); // < 5 segundos
    expect(result.accuracy).toBeGreaterThan(0.95); // > 95% precisión
  });
});
```

## 5. Convenciones de Código Científico

### 5.1 Nomenclatura Académica

```typescript
// ✅ Correcto: Nomenclatura científica descriptiva
const brightnessTemperatureKelvin = 345.7;
const spatialAutocorrelationIndex = calculateMoranIndex(data);
const firmsDetectionConfidence: FireConfidence = 'high';

// ❌ Incorrecto: Nomenclatura ambigua
const temp = 345.7;
const index = calc(data);
const conf = 'high';
```

### 5.2 Constantes Científicas

```typescript
// Constantes físicas con referencias bibliográficas
const STEFAN_BOLTZMANN_CONSTANT = 5.670374419e-8; // W⋅m⁻²⋅K⁻⁴ (CODATA 2018)
const EARTH_RADIUS_METERS = 6371000; // WGS84 mean radius

// Umbrales basados en literatura peer-reviewed
const MODIS_FIRE_THRESHOLD_KELVIN = 320; // Giglio et al. (2016)
const VIIRS_DETECTION_THRESHOLD_KELVIN = 315; // Schroeder et al. (2014)
```

## 6. Proceso de Revisión por Pares

### 6.1 Checklist de Revisión Científica

- [ ] **Corrección algorítmica**: Implementación fiel a referencias científicas
- [ ] **Validación empírica**: Tests con datos reales conocidos  
- [ ] **Eficiencia computacional**: Complejidad temporal/espacial documentada
- [ ] **Referencias bibliográficas**: Citas apropiadas de metodología
- [ ] **Reproducibilidad**: Resultados consistentes entre ejecuciones
- [ ] **Interoperabilidad**: Compatibilidad con estándares existentes

### 6.2 Template de Pull Request Científico

```markdown
## Descripción Científica

### Metodología Implementada
- **Algoritmo**: [Nombre y referencia bibliográfica]
- **Complejidad**: [Temporal: O(n), Espacial: O(n)]
- **Aplicabilidad**: [Casos de uso científicos específicos]

### Validación Empírica
- [ ] Tests con datasets de referencia conocidos
- [ ] Comparación con implementaciones científicas estándar
- [ ] Validación estadística de resultados

### Referencias Bibliográficas
1. [Referencia principal del algoritmo]
2. [Implementaciones de referencia]
3. [Validaciones empíricas previas]

### Impacto Científico
- **Mejoras de precisión**: [Porcentaje de mejora vs. estado actual]
- **Eficiencia computacional**: [Mejoras de performance medidas]
- **Casos de uso nuevos**: [Capacidades analíticas añadidas]
```

## 7. Versionado Científico

### 7.1 Esquema de Versionado

```
MAJOR.MINOR.PATCH-VALIDATION

Donde:
- MAJOR: Cambios en metodología científica fundamental
- MINOR: Nuevos algoritmos o funcionalidades científicas
- PATCH: Correcciones de bugs o mejoras de performance
- VALIDATION: Estado de revisión (alpha, beta, peer-reviewed)
```

### 7.2 Changelog Académico

```markdown
## [1.2.0-peer-reviewed] - 2025-10-15

### Added - Nuevas Metodologías Científicas
- Algoritmo de autocorrelación espacial según Cliff & Ord (1973)
- Implementación de clustering DBSCAN para análisis de focos
- Validación estadística con test de Mann-Kendall

### Changed - Mejoras Metodológicas
- Optimización del filtrado FIRMS (50% mejora en performance)
- Actualización de umbrales según Collection 6.1

### Fixed - Correcciones Científicas
- Corrección en cálculo de distancias para altas latitudes
- Fix en transformación de coordenadas polares
```

## 8. Herramientas y Scripts

### 8.1 Scripts de Validación Científica

```bash
# Validar implementación científica completa
npm run validate:scientific

# Ejecutar benchmarks de algoritmos
npm run benchmark:algorithms

# Generar documentación técnica
npm run docs:generate

# Validar referencias bibliográficas
npm run lint:references
```

### 8.2 Configuración VSCode Científica

```json
// .vscode/settings.json
{
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "editor.codeActionsOnSave": {
    "source.organizeImports": true,
    "source.fixAll.eslint": true
  },
  "editor.rulers": [80, 120],
  "files.associations": {
    "*.md": "markdown"
  }
}
```

## 9. Recursos Científicos

### 9.1 Bibliotecas Recomendadas

```typescript
// Análisis estadístico científico
import { jStat } from 'jstat';
import { ml } from 'ml-js';

// Procesamiento geoespacial profesional
import { turf } from '@turf/turf';
import { proj4 } from 'proj4';

// Validación científica de datos
import { z } from 'zod';
import { ajv } from 'ajv';
```

### 9.2 Referencias Bibliográficas Fundamentales

1. **Giglio, L., Schroeder, W., & Justice, C. O.** (2016). The collection 6 MODIS active fire detection algorithm and fire products. *Remote Sensing of Environment*, 178, 31-41.

2. **Cliff, A. D., & Ord, J. K.** (1973). *Spatial Autocorrelation*. London: Pion Limited.

3. **Schroeder, W., Oliva, P., Giglio, L., & Csiszar, I. A.** (2014). The New VIIRS 375m active fire detection data product. *Remote Sensing of Environment*, 143, 85-96.

## 10. Despliegue y Distribución

### 10.1 Pipeline de Despliegue Científico

```bash
# 1. Validación científica automatizada
npm run validate:full

# 2. Generación de documentación técnica
npm run docs:build

# 3. Build optimizado para producción
npm run build:production

# 4. Deploy automático en Vercel (rama main)
git push origin main
```

### 10.2 Distribución de Releases

Cada release incluye:
- Documentación técnica actualizada
- Changelog científico detallado  
- Benchmarks de performance
- Validación de precisión científica

---

**Documento elaborado por**: Comité de Revisión Científica Patagonia Verde  
**Revisado por**: Dr. Elena Martínez (Teledetección), Dr. Carlos Rodríguez (SIG)  
**Última actualización**: Octubre 2025  
**Versión**: 2.0.0-peer-reviewed  

*Para consultas sobre contribuciones científicas: scientific-review@patagonia-verde.research*