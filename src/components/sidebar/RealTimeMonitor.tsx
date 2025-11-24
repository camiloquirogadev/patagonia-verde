import React from 'react';
import { useUI } from '../../context/UIContext';
import type { FirePoint } from '../../types/fire';

interface RealTimeMonitorProps {
    filteredFires: FirePoint[];
    refresh: () => Promise<void>;
}

export const RealTimeMonitor: React.FC<RealTimeMonitorProps> = ({ filteredFires, refresh }) => {
    const { setIsFiltersOpen, isFiltersOpen, openModal } = useUI();

    const highConfidenceFires = filteredFires.filter(f => f.confidence === 'high');
    const mediumConfidenceFires = filteredFires.filter(f => f.confidence === 'medium');

    return (
        <div className="monitor-satelital bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700 shadow-lg" role="region" aria-label="Monitor satelital de incendios en tiempo real">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${highConfidenceFires.length > 5 ? 'bg-gradient-to-br from-red-600 to-red-700' :
                        highConfidenceFires.length > 2 ? 'bg-gradient-to-br from-orange-600 to-amber-700' : 'bg-gradient-to-br from-green-600 to-emerald-700'
                        }`}>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {highConfidenceFires.length > 5 ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            ) : highConfidenceFires.length > 2 ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )}
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-white">Monitor Satelital</h3>
                        <p className="text-xs text-gray-400">Detecciones Activas • MODIS/VIIRS</p>
                    </div>
                </div>

                <div className="flex gap-1">
                    <button
                        onClick={refresh}
                        className="p-2 hover:bg-gray-700/70 rounded-lg transition-all duration-200 text-gray-300 hover:text-white backdrop-blur-sm"
                        title="Actualizar Datos"
                        aria-label="Actualizar datos de incendios"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                        className="p-2 hover:bg-blue-700/70 rounded-lg transition-all duration-200 text-gray-300 hover:text-blue-300 backdrop-blur-sm"
                        title="Filtros Avanzados"
                        aria-label="Abrir panel de filtros avanzados"
                        aria-expanded={isFiltersOpen}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3" role="group" aria-label="Estadísticas de detección de incendios">
                <button
                    onClick={() => openModal('critical', 'Incendios de Alta Confianza', highConfidenceFires)}
                    className="bg-gradient-to-br from-red-900/30 to-red-800/20 hover:from-red-800/40 hover:to-red-700/30 border border-red-700/50 rounded-lg p-3 transition-all duration-300 backdrop-blur-sm group"
                    aria-label={`Ver ${highConfidenceFires.length} incendios de alta confianza`}
                >
                    <div className="text-xs text-red-300 font-medium mb-1">Alta Confianza</div>
                    <div className="text-2xl font-bold text-red-400 group-hover:text-red-300">{highConfidenceFires.length}</div>
                    <div className="text-xs text-red-400/70 mt-1">Focos críticos</div>
                </button>
                <button
                    onClick={() => openModal('total', 'Dataset Completo de Detecciones', filteredFires)}
                    className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 hover:from-blue-800/40 hover:to-blue-700/30 border border-blue-700/50 rounded-lg p-3 transition-all duration-300 backdrop-blur-sm group"
                    aria-label={`Ver ${filteredFires.length} detecciones totales en el dataset`}
                >
                    <div className="text-xs text-blue-300 font-medium mb-1">Total Dataset</div>
                    <div className="text-2xl font-bold text-blue-400 group-hover:text-blue-300">{filteredFires.length}</div>
                    <div className="text-xs text-blue-400/70 mt-1">Detecciones</div>
                </button>
                <button
                    onClick={() => openModal('moderate', 'Incendios de Confianza Moderada', mediumConfidenceFires)}
                    className="bg-gradient-to-br from-orange-900/30 to-amber-800/20 hover:from-orange-800/40 hover:to-amber-700/30 border border-orange-700/50 rounded-lg p-3 transition-all duration-300 backdrop-blur-sm group"
                    aria-label={`Ver ${mediumConfidenceFires.length} incendios de confianza moderada`}
                >
                    <div className="text-xs text-orange-300 font-medium mb-1">Conf. Moderada</div>
                    <div className="text-2xl font-bold text-orange-400 group-hover:text-orange-300">{mediumConfidenceFires.length}</div>
                    <div className="text-xs text-orange-400/70 mt-1">Focos</div>
                </button>
                <button
                    onClick={() => openModal('satellites', 'Cobertura Satelital Activa', filteredFires.filter(f => f.satellite))}
                    className="bg-gradient-to-br from-emerald-900/30 to-green-800/20 hover:from-emerald-800/40 hover:to-green-700/30 border border-emerald-700/50 rounded-lg p-3 transition-all duration-300 backdrop-blur-sm group"
                    aria-label={`Ver cobertura de ${[...new Set(filteredFires.map(f => f.satellite))].length} satélites activos`}
                >
                    <div className="text-xs text-emerald-300 font-medium mb-1">Satélites</div>
                    <div className="text-2xl font-bold text-emerald-400 group-hover:text-emerald-300">{[...new Set(filteredFires.map(f => f.satellite))].length}</div>
                    <div className="text-xs text-emerald-400/70 mt-1">Activos</div>
                </button>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-700/50">
                <div className="flex items-center justify-between text-xs" role="status" aria-live="polite">
                    <span className="text-gray-400">Última actualización</span>
                    <span className="text-gray-300 font-mono">{new Date().toLocaleTimeString('es-ES')}</span>
                </div>
            </div>
        </div>
    );
};
