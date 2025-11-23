# Metodología Científica

## Patagonia Verde - Fuentes de Datos y Algoritmos

### Documento Técnico | Octubre 2025

---

## Marco Teórico

### Fundamentos de Teledetección
La detección de incendios satelital aprovecha las **propiedades radiométricas** del espectro electromagnético para identificar anomalías térmicas. Los algoritmos analizan la radiancia espectral en bandas infrarrojas (3-5 μm y 8-12 μm).

#### Algoritmos de Detección
```
IF (T_4μm - T_11μm) > ΔT_threshold AND
   T_4μm > T_background + σ_threshold AND
   Cloud_mask = clear
THEN Fire_detected = TRUE
```

#### Niveles de Confianza
```
P(Fire|Observation) = f(ΔT, Size, Context, Cloud_probability)

- High confidence: P > 0.8
- Medium confidence: 0.5 ≤ P ≤ 0.8  
- Low confidence: P < 0.5
```

---

## Fuentes de Datos

**NASA FIRMS** - Fire Information for Resource Management System

| Sensor | Resolución | Cobertura |
|--------|------------|-----------|
| **MODIS** | 1km | 1-2 días |
| **VIIRS** | 375m | 12 horas |

**Productos**: MOD14/MYD14, VNP14/VJ114  
**Latencia**: 2-4 horas

---

## Metodología de Análisis

### Preprocesamiento
```python
def quality_filter(fire_data):
    return fire_data[
        (fire_data['confidence'] >= 'medium') &
        (fire_data['scan'] <= 45) &  # Ángulo < 45°
        (fire_data['track'] <= 45)
    ]
```

### Análisis Temporal
**Regresión polinómica** para tendencias:
```
y(t) = β₀ + β₁t + β₂t² + ε(t)
```

**Control estadístico** para anomalías:
```
UCL = μ + 3σ
Anomalía detectada si: |x(t) - μ| > 3σ
```

### Análisis Espacial
**Clustering DBSCAN**:
- Radio: 1km
- Puntos mínimos: 3
- Métrica: Haversine

**Índice de Moran** para autocorrelación espacial:
```
I = (n/S₀) × Σᵢⱼ wᵢⱼ(xᵢ - x̄)(xⱼ - x̄) / Σᵢ(xᵢ - x̄)²
```

---

## Limitaciones

### Técnicas
- **MODIS**: Detección > 0.5 hectáreas
- **VIIRS**: Susceptible a nubes
- **Latencia**: 2-4 horas
- **Cobertura nubosa**: Reduce detecciones

### Errores Comunes
**Falsos Positivos**: Industrias, volcanes, reflexión solar  
**Falsos Negativos**: Nubes densas, fuegos pequeños

---

## Referencias

1. **Giglio, L., et al.** (2016). Collection 6 MODIS active fire detection. *Remote Sensing of Environment*, 178, 31-41.

2. **Schroeder, W., et al.** (2014). VIIRS 375m active fire detection. *Remote Sensing of Environment*, 143, 85-96.

3. **Justice, C. O., et al.** (2002). The MODIS fire products. *Remote Sensing of Environment*, 83(1-2), 244-262.

---

**Autor**: Camilo Quiroga | **Contacto**: camiloquirogadev@gmail.com