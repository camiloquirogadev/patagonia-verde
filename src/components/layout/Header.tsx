import React from 'react';

interface HeaderProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
    setIsFiltersOpen: (isOpen: boolean) => void;
    refresh: () => Promise<void>;
}

export const Header: React.FC<HeaderProps> = ({
    isMenuOpen,
    setIsMenuOpen,
    setIsFiltersOpen,
    refresh
}) => {
    return (
        <header className="bg-gray-900 text-white shadow-lg border-b border-gray-700 relative z-[1100]">
            <div className="flex justify-between items-center gap-2 sm:gap-4 p-3 sm:p-4">
                {/* Logo y título principal */}
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                        <span className="text-white text-lg sm:text-xl">🔥</span>
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-white truncate">
                            Patagonia Verde FIRMS
                        </h1>
                        <p className="text-xs text-gray-300 hidden sm:block">Sistema de Monitoreo Avanzado</p>
                    </div>
                </div>

                {/* Navegación - Solo en desktop */}
                <div className="hidden lg:flex items-center gap-3">
                    {/* Menú desplegable de control - Solo desktop */}
                    <div className="menu-dropdown relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg border border-gray-600 transition-all duration-200"
                        >
                            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <span className="text-sm font-medium">Controles</span>
                            <svg className={`w-4 h-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Menú desplegable */}
                        {isMenuOpen && (
                            <div className="absolute top-full right-0 mt-2 w-64 bg-gray-800 rounded-lg border border-gray-600 shadow-xl z-[2000] overflow-hidden">
                                <div className="p-2">
                                    {/* Filtros Avanzados */}
                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            setIsFiltersOpen(true);
                                            // Scroll to filters
                                            document.querySelector('.filter-panel')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-700 rounded-lg transition-all duration-200"
                                    >
                                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
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
                                            setIsMenuOpen(false);
                                            // Scroll to alerts
                                            document.querySelector('.monitor-satelital')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-700 rounded-lg transition-all duration-200"
                                    >
                                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v2H4v-2zM4 15h10v2H4v-2zM4 11h10v2H4v-2zM4 7h10v2H4V7z" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <div className="text-sm font-medium text-white">Monitor Tiempo Real</div>
                                            <div className="text-xs text-gray-400">Alertas y detecciones activas</div>
                                        </div>
                                    </button>

                                    {/* Análisis Temporal */}
                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            // Scroll to chart
                                            document.querySelector('.temporal-analysis')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-700 rounded-lg transition-all duration-200"
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
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Botón de actualización - Solo desktop */}
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg border border-gray-600 transition-all duration-200"
                        onClick={refresh}
                    >
                        <svg className="w-4 h-4 text-gray-300 hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span className="text-sm font-medium hidden sm:inline">Actualizar</span>
                    </button>
                </div>
            </div>
        </header>
    );
};
