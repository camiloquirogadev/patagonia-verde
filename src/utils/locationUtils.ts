/**
 * Utilidades para la detección de ubicaciones geográficas
 */

export const getLocationName = (lat: number, lng: number): string => {
    // Tierra del Fuego (Isla Grande)
    // Límite aproximado: Meridiano 68.6° O
    if (lat <= -52) {
        if (lng > -68.6) {
            return "Provincia de Tierra del Fuego (Argentina)";
        } else {
            return "Región de Magallanes (Chile)";
        }
    }

    // Zona Continental Sur (Santa Cruz vs Magallanes/Aysén)
    // Límite aproximado en la cordillera, simplificado
    if (lat <= -46) {
        // Santa Cruz (Argentina) generalmente al este de -72°/-73° dependiendo de la latitud
        // Simplificación: Al este de -72° es mayormente Argentina en esta zona, 
        // pero hay zonas de Chile (fiordos) que entran.
        // Usaremos un límite más conservador para Argentina aquí.
        if (lng > -71.5) {
            return "Provincia de Santa Cruz (Argentina)";
        } else {
            // Aysén o Magallanes
            if (lat <= -48.5) return "Región de Magallanes (Chile)";
            return "Región de Aysén (Chile)";
        }
    }

    // Zona Chubut vs Aysén/Los Lagos
    if (lat <= -42) {
        if (lng > -71.8) { // El Bolsón, Esquel están al este de -71.6 aprox
            return "Provincia de Chubut (Argentina)";
        } else {
            if (lat <= -44) return "Región de Aysén (Chile)";
            return "Región de Los Lagos (Chile)";
        }
    }

    // Zona Río Negro/Neuquén vs Los Lagos/Los Ríos
    // Bariloche está en -41.13, -71.30
    if (lat <= -36) {
        // Límite cordillerano aproximado -71.6
        if (lng > -71.6) {
            if (lat <= -40) return "Provincia de Río Negro (Argentina)";
            return "Provincia de Neuquén (Argentina)";
        } else {
            if (lat <= -40.5) return "Región de Los Lagos (Chile)";
            if (lat <= -39) return "Región de Los Ríos (Chile)";
            return "Región de La Araucanía (Chile)";
        }
    }

    return "Patagonia";
};
