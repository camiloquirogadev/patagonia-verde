import React, { Suspense } from 'react';
import Skeleton from '../ui/Skeleton';
import { useUI } from '../../context/UIContext';
import type { FirePoint } from '../../types/fire';

const FiresChart = React.lazy(() => import('../dashboard/FiresChart'));

interface TemporalAnalysisProps {
    filteredFires: FirePoint[];
}

export const TemporalAnalysis: React.FC<TemporalAnalysisProps> = ({ filteredFires }) => {
    const { isStatsCollapsed, toggleStats } = useUI();

    return (
        <div className="temporal-analysis bg-gradient-to-br from-emerald-900/20 to-green-900/20 rounded-xl p-4 border border-emerald-700/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-green-700 rounded-lg flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white">Análisis Temporal</h3>
                        <p className="text-xs text-emerald-300">Series de Tiempo • Tendencias</p>
                    </div>
                </div>
                <button
                    onClick={toggleStats}
                    className="p-1 hover:bg-emerald-700/70 rounded-lg transition-all duration-200 text-emerald-300 hover:text-emerald-200"
                >
                    <svg
                        className={`w-4 h-4 transform transition-transform duration-300 ${!isStatsCollapsed ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {!isStatsCollapsed && (
                <Suspense fallback={<Skeleton />}>
                    <FiresChart fires={filteredFires} />
                </Suspense>
            )}
        </div>
    );
};
