import { useMemo, useCallback, useState } from 'react';
import { parseISO, startOfDay, endOfDay } from 'date-fns';
import type { FirePoint } from '../types/fire';
import type { FilterCriteria } from '../components/filters/FilterPanel';
import { logger } from '../utils/logger';

export const initialFilterValues: FilterCriteria = {
    startDate: null,
    endDate: null,
    minBrightness: null,
    maxBrightness: null,
    confidenceLevels: [],
    satellite: null,
};

export const useFireFilters = (fires: FirePoint[]) => {
    const [activeFilters, setActiveFilters] = useState<FilterCriteria>(initialFilterValues);

    const handleFilterChange = useCallback((newFilters: FilterCriteria) => {
        setActiveFilters(newFilters);
    }, []);

    const handleResetFilters = useCallback(() => {
        setActiveFilters({ ...initialFilterValues });
    }, []);

    const filteredFires = useMemo(() => {
        if (!fires || fires.length === 0) {
            return [];
        }

        // Pre-procesar fechas para optimización
        const startTime = activeFilters.startDate ? startOfDay(parseISO(activeFilters.startDate)).getTime() : null;
        const endTime = activeFilters.endDate ? endOfDay(parseISO(activeFilters.endDate)).getTime() : null;
        const hasConfidenceFilter = activeFilters.confidenceLevels && activeFilters.confidenceLevels.length > 0;
        const confidenceLevelsSet = hasConfidenceFilter ? new Set(activeFilters.confidenceLevels?.map(c => c.toLowerCase()) || []) : null;

        return fires.filter((fire, index) => {
            try {
                // Validar datos del incendio
                if (!fire || typeof fire !== 'object') {
                    return false;
                }

                // Filtro por fechas optimizado
                if (startTime || endTime) {
                    const fireTime = parseISO(fire.date).getTime();
                    if (startTime && fireTime < startTime) return false;
                    if (endTime && fireTime > endTime) return false;
                }

                // Filtro por nivel de confianza optimizado
                if (hasConfidenceFilter) {
                    const fireConfidence = fire.confidence?.toLowerCase() || '';
                    if (!confidenceLevelsSet?.has(fireConfidence)) return false;
                }

                // Filtro por brillo
                if (activeFilters.minBrightness !== null && activeFilters.minBrightness !== undefined) {
                    if (fire.brightness < activeFilters.minBrightness) return false;
                }
                if (activeFilters.maxBrightness !== null && activeFilters.maxBrightness !== undefined) {
                    if (fire.brightness > activeFilters.maxBrightness) return false;
                }

                // Filtro por satélite
                if (activeFilters.satellite && activeFilters.satellite.trim() !== '') {
                    if (fire.satellite !== activeFilters.satellite) return false;
                }

                return true;
            } catch (error) {
                logger.error(`Error filtering fire ${index}:`, error);
                return false;
            }
        });
    }, [fires, activeFilters]);

    return {
        activeFilters,
        filteredFires,
        handleFilterChange,
        handleResetFilters
    };
};
