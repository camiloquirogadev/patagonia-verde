# Guía de Contribución

## Patagonia Verde - Monitoreo de Incendios Forestales

### Configuración Inicial

```bash
git clone https://github.com/camiloquirogadev/patagonia-verde.git
cd patagonia-verde
npm install
npm run dev
```

**Prerrequisitos**: Node.js >= 18.0.0, npm >= 8.0.0

---

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
├── hooks/              # Custom hooks (useFirmsData, etc.)
├── services/           # APIs y servicios externos
├── types/              # Definiciones TypeScript
└── utils/              # Utilidades y helpers
```

---

## 🔧 Estándares

### Nomenclatura
```typescript
// ✅ Descriptivo
const brightnessTemperatureKelvin = 345.7;

// ❌ Ambiguo  
const temp = 345.7;
```

### JSDoc
```typescript
/**
 * Filtra focos de incendio
 * @param fires Array de detecciones
 * @returns Array filtrado
 */
function filterFires(fires: Fire[]): Fire[] {
  // implementación...
}
```

---

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Con coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

**Cobertura mínima**: 80%

---

## 📋 Proceso de Contribución

1. **Fork** del repositorio
2. **Crear rama** feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. **Push** rama (`git push origin feature/nueva-funcionalidad`)
5. **Abrir** Pull Request

### Template de PR
```markdown
## Descripción
Breve descripción del cambio

## Cambios
- [ ] Nueva funcionalidad X
- [ ] Fix bug Y
- [ ] Actualización docs Z

## Testing
- [ ] Tests unitarios incluidos
- [ ] Tests de integración pasando
- [ ] Build exitoso
```

---

## 🔍 Checklist de Revisión

- [ ] Código sigue convenciones del proyecto
- [ ] Tests incluidos y pasando
- [ ] Documentación actualizada
- [ ] Performance no degradado
- [ ] TypeScript sin errores
- [ ] Lint sin warnings

---

## 🛠️ Scripts Útiles

```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm run lint         # Verificar código
npm run format       # Formatear código
npm test             # Ejecutar tests
```

---

**Contacto**: quirogacamilodev@gmail.com  
**Última actualización**: Octubre 2025