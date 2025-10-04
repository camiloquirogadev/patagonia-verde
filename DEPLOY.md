# Deploy - Patagonia Verde

## 🚀 Deploy en Vercel (Recomendado)

### Opción 1: Desde GitHub
```bash
# 1. Sube código
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Ve a vercel.com
# - Conecta GitHub
# - Importa repositorio
# - Deploy automático
```

### Opción 2: CLI Directo
```bash
npm i -g vercel
npm run build
vercel --prod
```

## ⚙️ Configuración

**Build Command**: `npm run build`  
**Output Directory**: `dist`  
**Variables**: Agregar `VITE_MAPBOX_TOKEN` en Settings

## 🌐 URLs
- **Demo**: https://patagonia-verde.vercel.app
- **Tu deploy**: https://patagonia-verde-[hash].vercel.app

---

**Deploy automático en cada push a main** ✨
