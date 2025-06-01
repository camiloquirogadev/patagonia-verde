# Guía de Contribución

## Configuración del Entorno

1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Crea un archivo `.env.local` basado en `.env.example`
4. Inicia el servidor de desarrollo: `npm run dev`

## Estructura del Proyecto

- `/src/components`: Componentes de React
- `/src/hooks`: Custom Hooks
- `/src/services`: Lógica de servicios y APIs
- `/src/types`: Definiciones de TypeScript
- `/src/utils`: Funciones de utilidad
- `/public`: Archivos estáticos

## Convenciones de Código

- Usar TypeScript en todo momento
- Seguir las reglas de ESLint y Prettier
- Escribir pruebas unitarias para nueva funcionalidad
- Documentar componentes y funciones con JSDoc

## Despliegue

El proyecto se despliega automáticamente en Vercel al hacer push a la rama `main`.