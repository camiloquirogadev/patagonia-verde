import React from 'react';
import { useUI } from '../../context/UIContext';

interface MobileMenuProps {
    isMobile: boolean;
    refresh: () => Promise<void>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
    isMobile,
    refresh,
}) => {
    const { isMobileSidebarOpen, toggleMobileSidebar, toggleFilters } = useUI();

    if (!isMobile) return null;

    return (
        <>
            <div className="relative">
                <button
                    className="mobile-menu-button fixed top-16 right-4 z-[1050] lg:hidden flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 bg-gray-800/95 hover:bg-gray-700 rounded-lg border border-gray-600 transition-all duration-200 backdrop-blur-sm shadow-lg"
                    onClick={toggleMobileSidebar}
                    aria-label="Menú principal"
                >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span className="text-sm font-medium text-white hidden sm:inline">Menú</span>
                </button>

                {/* Menú hamburguesa desplegable */}
                {isMobileSidebarOpen && (
                    <div className="fixed top-28 right-4 w-72 max-w-[calc(100vw-2rem)] bg-gray-800/98 rounded-lg border border-gray-600 shadow-xl z-[1040] overflow-hidden backdrop-blur-md">
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-white">Controles</h3>
                                <button
                                    onClick={toggleMobileSidebar}
                                    className="p-1 text-gray-400 hover:text-white"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-2">
                                {/* Actualizar Datos */}
                                <button
                                    onClick={() => {
                                        toggleMobileSidebar();
                                        refresh();
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-700 rounded-lg transition-all duration-200"
                                >
                                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-white">Actualizar Datos</div>
                                        <div className="text-xs text-gray-400">Recargar información satelital</div>
                                    </div>
                                </button>

                                {/* Filtros Avanzados */}
                                <button
                                    onClick={() => {
                                        toggleMobileSidebar();
                                        toggleFilters();
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-700 rounded-lg transition-all duration-200"
                                >
                                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-white">Filtros Avanzados</div>
                                        <div className="text-xs text-gray-400">Configurar criterios de búsqueda</div>
                                    </div>
                                </button>

                                {/* Monitor de Tiempo Real */}
                                <button
                                    onClick={() => {
                                        toggleMobileSidebar();
                                        document.querySelector('.monitor-satelital')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-700 rounded-lg transition-all duration-200"
                                >
                                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v2H4v-2zM4 15h10v2H4v-2zM4 11h10v2H4v-2zM4 7h10v2H4V7z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-white">Monitor Satelital</div>
                                        <div className="text-xs text-gray-400">Ver detecciones activas</div>
                                    </div>
                                </button>

                                {/* Análisis Temporal */}
                                <button
                                    onClick={() => {
                                        toggleMobileSidebar();
                                        document.querySelector('.temporal-analysis')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-700 rounded-lg transition-all duration-200"
                                >
                                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-white">Análisis Temporal</div>
                                        <div className="text-xs text-gray-400">Tendencias y estadísticas</div>
                                    </div>
                                </button>

                                {/* Información del Sistema */}
                                <button
                                    onClick={() => {
                                        toggleMobileSidebar();
                                        document.querySelector('.info-sistema')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-700 rounded-lg transition-all duration-200"
                                >
                                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-white">Información</div>
                                        <div className="text-xs text-gray-400">Acerca del sistema</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Overlay para cerrar menú hamburguesa */}
            {isMobile && isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
                    onClick={toggleMobileSidebar}
                />
            )}
        </>
    );
};
