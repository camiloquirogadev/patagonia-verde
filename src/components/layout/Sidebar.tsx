import React from 'react';
import FilterPanel, { type FilterCriteria } from '../filters/FilterPanel';
import type { FirePoint } from '../../types/fire';
import { useUI } from '../../context/UIContext';
import { SystemHeader } from '../sidebar/SystemHeader';
import { RealTimeMonitor } from '../sidebar/RealTimeMonitor';
import { TemporalAnalysis } from '../sidebar/TemporalAnalysis';
import { DeveloperProfile } from '../sidebar/DeveloperProfile';
import { SystemInfo } from '../sidebar/SystemInfo';
import { TheoreticalFramework } from '../sidebar/TheoreticalFramework';

interface SidebarProps {
    isMobile: boolean;
    filteredFires: FirePoint[];
    availableSatellites: string[];
    refresh: () => Promise<void>;
    activeFilters: FilterCriteria;
    handleFilterChange: (filters: FilterCriteria) => void;
    handleResetFiltersApp: () => void;
    loading: boolean;
    totalFires: number;
    appVersion: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
    isMobile,
    filteredFires,
    availableSatellites,
    refresh,
    activeFilters,
    handleFilterChange,
    handleResetFiltersApp,
    loading,
    totalFires,
    appVersion
}) => {
    const {
        isMobileSidebarOpen,
        toggleMobileSidebar,
        isFiltersOpen,
        setIsFiltersOpen,
    } = useUI();

    return (
        <>
            {/* Overlay para cerrar sidebar en mobile */}
            {isMobile && isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1400] lg:hidden"
                    onClick={toggleMobileSidebar}
                    aria-hidden="true"
                />
            )}

            <aside className={`
                w-full lg:w-80 xl:w-96 p-4 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 shadow-xl overflow-y-auto flex-shrink-0 border-r border-gray-700
                ${isMobile
                    ? `fixed inset-y-0 left-0 z-[1500] transform transition-transform duration-300 ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
                    : 'relative z-[1500]'
                }
            `}>
                {/* Botón cerrar solo en mobile */}
                {isMobile && isMobileSidebarOpen && (
                    <button
                        onClick={toggleMobileSidebar}
                        className="absolute top-4 right-4 z-10 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 transition-colors lg:hidden"
                        aria-label="Cerrar panel lateral"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
                <div className="space-y-6">
                    <SystemHeader />
                    <RealTimeMonitor filteredFires={filteredFires} refresh={refresh} />

                    {isFiltersOpen && (
                        <div className="filter-panel bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-xl p-4 border border-indigo-700/30 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-sm font-bold text-white">Filtros de Análisis</h3>
                                </div>
                                <button
                                    onClick={() => setIsFiltersOpen(false)}
                                    className="p-1 hover:bg-gray-700/70 rounded text-gray-400 hover:text-white transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <FilterPanel
                                initialFilters={activeFilters}
                                availableSatellites={availableSatellites}
                                onFilterChange={handleFilterChange}
                                onResetFilters={handleResetFiltersApp}
                                totalFires={totalFires}
                                filteredFires={filteredFires.length}
                                isLoading={loading}
                            />
                        </div>
                    )}

                    <TemporalAnalysis filteredFires={filteredFires} />
                    <TheoreticalFramework />
                    <div className="info-sistema bg-gradient-to-br from-slate-900/50 to-gray-900/50 rounded-xl p-4 border border-slate-700/30 backdrop-blur-sm">
                        <div className="space-y-4">
                            <SystemInfo />
                            <DeveloperProfile appVersion={appVersion} totalFires={totalFires} />
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};
