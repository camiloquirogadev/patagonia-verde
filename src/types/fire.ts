// Types for NASA FIRMS fire detection data
// Reference: NASA FIRMS API - Fire Information for Resource Management System
// Coordinate system: WGS84 (EPSG:4326)

export type FireConfidence = 'high' | 'medium' | 'low';

// Fire detection point from satellite sensors (MODIS/VIIRS)
export interface FirePoint {
  id: string;                    // Unique identifier
  latitude: number;              // Decimal degrees [-90, 90]
  longitude: number;             // Decimal degrees [-180, 180]
  brightness: number;            // Temperature in Kelvin
  date: string;                  // ISO 8601 timestamp (UTC)
  confidence: FireConfidence;    // Detection confidence level
  satellite?: string;            // Platform: Terra, Aqua, SUOMI-NPP, NOAA-20
  frp?: number;                  // Fire Radiative Power (MW)
  scan?: number;                 // Scan angle [0°, 65°]
  track?: number;                // Track angle [0°, 180°]
  version?: string;              // Algorithm version (e.g., "6.1")
}