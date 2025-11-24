import React from 'react';

export const SystemHeader: React.FC = () => (
    <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-xl p-4 border border-blue-800/30 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            </div>
            <div>
                <h2 className="text-lg font-bold text-white">Sistema FIRMS</h2>
                <p className="text-xs text-blue-300">Fire Information for Resource Management</p>
            </div>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">
            Plataforma de monitoreo satelital en tiempo real para la detección y análisis de incendios forestales
            utilizando datos de la NASA y algoritmos de teledetección avanzada.
        </p>
    </div>
);
