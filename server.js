/**
 * Servidor de desarrollo para la aplicación Patagonia Verde
 * Proporciona endpoints de API para datos de incendios forestales
 */
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración de rutas para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración del servidor
const app = express();
const PORT = 3000;

// Configuración de middleware
app.use(cors());
app.use(express.json());

// Registro de peticiones HTTP
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Endpoint de salud del servidor
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString()
  });
});

// Datos de muestra para desarrollo y testing
const sampleFires = {
  "fires": [
    {
      "latitude": -45.57,
      "longitude": -71.3,
      "brightness": 350,
      "acq_date": "2025-05-28",
      "confidence": "high",
      "satellite": "Terra"
    },
    {
      "latitude": -42.1,
      "longitude": -71.8,
      "brightness": 280,
      "acq_date": "2025-05-28",
      "confidence": "medium",
      "satellite": "Aqua"
    },
    {
      "latitude": -43.5,
      "longitude": -72.2,
      "brightness": 320,
      "acq_date": "2025-05-27",
      "confidence": "high",
      "satellite": "Terra"
    }
  ]
};

// Endpoint principal para datos de incendios
app.get('/api/fires', (req, res) => {
  // Retorna datos de ejemplo en formato compatible con FIRMS
  res.json(sampleFires);
});

// Inicialización del servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`API de incendios: http://localhost:${PORT}/api/fires`);
});