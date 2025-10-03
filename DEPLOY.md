# Vercel Deploy Instructions

## Opción 1: Deploy desde GitHub (Recomendado)

1. **Sube tu código a GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Ve a vercel.com:**
   - Crea una cuenta gratis con tu GitHub
   - Haz clic en "New Project"
   - Importa tu repositorio `patagonia-verde`

3. **Configuración automática:**
   - Vercel detectará que es un proyecto Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Variables de entorno:**
   - En el dashboard de Vercel, ve a Settings > Environment Variables
   - Agrega: `VITE_MAPBOX_TOKEN` con tu token de Mapbox

5. **Deploy automático:**
   - Cada push a main se desplegará automáticamente

## Opción 2: Deploy directo con Vercel CLI

1. **Instala Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Build el proyecto:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

## URL de ejemplo:
Tu app estará disponible en: `https://patagonia-verde-[hash].vercel.app`
