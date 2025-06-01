// server.js - Versión simplificada compatible con ES modules
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar Express
const app = express();
const PORT = 3000;

// Middleware básico
app.use(cors());
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Ruta de estado del servidor
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString()
  });
});

// Datos de ejemplo para incendios
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

// Ruta para los datos de incendios
app.get('/api/fires', (req, res) => {
  // Devolver datos de ejemplo directamente
  res.json(sampleFires);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`Datos de incendios: http://localhost:${PORT}/api/fires`);
});