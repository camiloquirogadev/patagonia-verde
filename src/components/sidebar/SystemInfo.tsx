import React from 'react';

export const SystemInfo: React.FC = () => (
    <div>
        <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Información del Sistema
        </h4>
        <div className="space-y-2 text-xs text-gray-300">
            <div className="flex items-center justify-between">
                <span>Fuente de Datos:</span>
                <span className="text-blue-300 font-medium">NASA FIRMS</span>
            </div>
            <div className="flex items-center justify-between">
                <span>Sensores:</span>
                <span className="text-green-300 font-medium">MODIS/VIIRS</span>
            </div>
            <div className="flex items-center justify-between">
                <span>Resolución Temporal:</span>
                <span className="text-orange-300 font-medium">Tiempo Real</span>
            </div>
            <div className="flex items-center justify-between">
                <span>Precisión Geográfica:</span>
                <span className="text-purple-300 font-medium">1km</span>
            </div>
        </div>
    </div>
);
