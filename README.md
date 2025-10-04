# Patagonia Verde - Monitoreo de Incendios Forestales

**Plataforma de análisis geoespacial para detección temprana de incendios forestales en la Patagonia usando datos satelitales NASA FIRMS**

<p align="center">
  <img src="https://img.shields.io/badge/React-19.1.0-blue?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Leaflet-1.9.4-green?logo=leaflet" alt="Leaflet">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</p>

## 🎯 Características

- **Datos en tiempo real** desde NASA FIRMS (MODIS/VIIRS)
- **Mapa interactivo** con clustering de focos de calor
- **Filtros avanzados** por fecha, temperatura y confianza
- **Análisis temporal** con gráficos y tendencias
- **Responsive design** optimizado para móviles

## 🚀 Instalación

```bash
git clone https://github.com/camiloquirogadev/patagonia-verde.git
cd patagonia-verde
npm install
npm run dev
```

## 🛠️ Tecnologías

**Frontend**: React 19, TypeScript, Vite  
**Mapas**: Leaflet + CartoDB  
**Datos**: NASA FIRMS (MODIS/VIIRS)  
**Estilos**: Tailwind CSS

## 📊 Datos

**NASA FIRMS** - Sistema de información de incendios  
**Sensores**: MODIS (1km), VIIRS (375m)  
**Actualización**: Near real-time (3-6h)

## 🌐 Deploy

### Vercel (Recomendado)
```bash
npm run build
npx vercel --prod
```

### Netlify
```bash
npm run build
# Arrastra carpeta 'dist' a netlify.com/drop
```

## 🔧 Scripts

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm test` - Ejecutar tests
- `npm run lint` - Verificar código

## 🤝 Contribuciones

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para detalles.

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para detalles.

---

**Desarrollado por [Camilo Quiroga](https://github.com/camiloquirogadev)** • Proyecto personal 2025
