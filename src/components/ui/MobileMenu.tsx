import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';

interface MobileMenuProps {
    isMobile: boolean;
    refresh: () => Promise<void>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
    isMobile,
    refresh,
}) => {
    const { toggleMobileSidebar, toggleFilters } = useUI();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            {/* Botón flotante de menú */}
            <button
                className={`
                    mobile-menu-button fixed bottom-6 right-6 z-[1600]
                    w-14 h-14 flex items-center justify-center
                    bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800
                    rounded-full shadow-2xl border-2 border-white/20
                    transition-all duration-300 transform hover:scale-110 active:scale-95
                    ${isMenuOpen ? 'scale-95' : ''}
                `}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMenuOpen}
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Overlay oscuro para cerrar el menú */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1500] animate-fadeIn"
                    onClick={() => setIsMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Panel de menú desplegable */}
            {isMenuOpen && (
                <div 
                    className="
                        fixed bottom-24 right-6 w-80 max-w-[calc(100vw-3rem)]
                        max-h-[calc(100vh-8rem)]
                        bg-gray-900/98 rounded-2xl border border-gray-700/50
                        shadow-2xl z-[1550] backdrop-blur-xl
                        animate-slideUp flex flex-col
                    "
                    role="dialog"
                    aria-label="Menú de controles"
                >
                    <div className="p-5 flex-shrink-0">
                        {/* Header del menú */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700/50">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-white">Menú de Controles</h3>
                            </div>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                                aria-label="Cerrar menú"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Opciones del menú */}
                        <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-16rem)] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent pr-1">
                            {/* Actualizar Datos */}
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
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

                            {/* Panel Lateral Completo */}
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    if (!document.querySelector('aside.translate-x-0')) {
                                        toggleMobileSidebar();
                                    }
                                }}
                                className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-700 rounded-lg transition-all duration-200"
                            >
                                <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-medium text-white">Panel Lateral</div>
                                    <div className="text-xs text-gray-400">Abrir menú completo</div>
                                </div>
                            </button>

                            {/* Filtros Avanzados */}
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    toggleFilters();
                                    if (!document.querySelector('aside.translate-x-0')) {
                                        toggleMobileSidebar();
                                    }
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
                                    setIsMenuOpen(false);
                                    if (!document.querySelector('aside.translate-x-0')) {
                                        toggleMobileSidebar();
                                    }
                                    setTimeout(() => {
                                        document.querySelector('.monitor-satelital')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }, 100);
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
                                    <div className="text-xs text-gray-400">Ver detecciones en tiempo real</div>
                                </div>
                            </button>

                            {/* Análisis Temporal */}
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    if (!document.querySelector('aside.translate-x-0')) {
                                        toggleMobileSidebar();
                                    }
                                    setTimeout(() => {
                                        document.querySelector('.temporal-analysis')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }, 100);
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

                            {/* Marco Teórico */}
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    if (!document.querySelector('aside.translate-x-0')) {
                                        toggleMobileSidebar();
                                    }
                                    setTimeout(() => {
                                        const element = document.querySelector('.theoretical-framework');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            setTimeout(() => {
                                                const expandButton = element.querySelector('button[aria-expanded="false"]') as HTMLButtonElement;
                                                if (expandButton) {
                                                    expandButton.click();
                                                }
                                            }, 400);
                                        }
                                    }, 100);
                                }}
                                className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-700 rounded-lg transition-all duration-200"
                            >
                                <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-medium text-white">Marco Teórico</div>
                                    <div className="text-xs text-gray-400">Fundamentos académicos</div>
                                </div>
                            </button>

                            {/* Información del Sistema */}
                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    if (!document.querySelector('aside.translate-x-0')) {
                                        toggleMobileSidebar();
                                    }
                                    setTimeout(() => {
                                        document.querySelector('.info-sistema')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }, 100);
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
        </>
    );
};
