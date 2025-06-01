// src/components/Stats/Stats.tsx
import { FirePoint } from '../../types/fire';

interface StatsProps {
  fires: FirePoint[];
  className?: string;
}

const Stats = ({ fires, className = '' }: StatsProps) => {
  const totalFires = fires.length;
  const highConfidence = fires.filter(f => f.confidence === 'high').length;
  const mediumConfidence = fires.filter(f => f.confidence === 'medium').length;
  const lowConfidence = fires.filter(f => f.confidence === 'low').length;
  
  const averageBrightness = fires.length > 0 
    ? Math.round(fires.reduce((sum, f) => sum + f.brightness, 0) / fires.length)
    : 0;

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}></div>