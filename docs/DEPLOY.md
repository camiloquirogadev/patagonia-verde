# Deployment Guide

## Patagonia Verde

### Deploy on Vercel (Recommended)

#### Option 1: From GitHub
```bash
# 1. Push code
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Go to vercel.com
# - Connect GitHub
# - Import repository
# - Automatic deploy
```

#### Option 2: Direct CLI
```bash
npm i -g vercel
npm run build
vercel --prod
```

---

## Configuration

**Build Command**: `npm run build`  
**Output Directory**: `dist`  
**Variables**: Add `VITE_MAPBOX_TOKEN` in Settings

---

## URLs

- **Demo**: https://patagonia-verde.vercel.app
- **Your deploy**: https://patagonia-verde-[hash].vercel.app

---

**Automatic deploy on each push to main**
