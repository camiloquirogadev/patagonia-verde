// src/types/fire.ts
export type FireConfidence = 'high' | 'medium' | 'low';

export interface FirePoint {
  id: string;
  latitude: number;
  longitude: number;
  brightness: number;
  date: string;
  confidence: FireConfidence;
  satellite?: string;
  frp?: number; // Fire Radiative Power
  scan?: number;
  track?: number;
  version?: string;
}