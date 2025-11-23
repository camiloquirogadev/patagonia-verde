/**
 * Componente de visualización temporal para análisis de incendios forestales    // Agrupar incendios por fecha y confianza
    const groupedFires = fires.reduce((acc, fire) => {
      if (!fire.date || !isValid(parseISO(fire.date))) return acc;
      
      const date = format(parseISO(fire.date), 'yyyy-MM-dd');
      if (!acc[date]) {
        acc[date] = { total: 0, high: 0, medium: 0, low: 0 };
      }
      acc[date].total += 1;
      acc[date][fire.confidence] += 1;
      return acc;
    }, {} as Record<string, { total: number; high: number; medium: number; low: number }>);

    // Ordenar fechas
    const sortedDates = Object.keys(groupedFires).sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime();
    });

    // Convertir fechas a formato de visualización
    const displayDates = sortedDates.map(date => format(parseISO(date), 'dd/MM/yyyy'));a gráficos interactivos para el análisis de series temporales
 * de detecciones satelitales de incendios. Incluye análisis estadístico
 * de tendencias, detección de anomalías y métricas de actividad.
 * 
 * Funcionalidades principales:
 * - Gráficos de líneas y barras configurables
 * - Análisis de tendencias con medias móviles
 * - Detección de anomalías temporales
 * - Clasificación automática de niveles de actividad
 * - Alertas de aumentos significativos
 * 
 * @author Camilo Quiroga - Desarrollador Full Stack & Geomática
 * @version 1.0.0
 * @since 2025-10-01
 */

import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  Filler
} from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import type { FirePoint } from '../../hooks/useFirmsData';
import { format, parseISO, isValid } from 'date-fns';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface FiresChartProps {
  fires: FirePoint[];
  type?: 'line' | 'bar';
  title?: string;
  className?: string;
}

type ChartType = 'line' | 'bar';

const FiresChart: React.FC<FiresChartProps> = ({
  fires,
  type = 'line',
  title = 'Evolución de Incendios',
  className = ''
}) => {
  const temporalAnalysis = useMemo(() => {
    if (!fires.length) {
      return {
        labels: [],
        values: [],
        highConfidenceValues: [],
        mediumConfidenceValues: [],
        trend: 'stable',
        peakDate: null,
        averageDaily: 0,
        maxDaily: 0,
        totalDays: 0,
        recentIncrease: false,
        activityLevel: 'low'
      };
    }

    // Agrupar incendios por fecha y confianza
    const groupedFires = fires.reduce((acc, fire) => {
      if (!fire.date || !isValid(parseISO(fire.date))) return acc;

      const date = format(parseISO(fire.date), 'dd/MM/yyyy');
      if (!acc[date]) {
        acc[date] = { total: 0, high: 0, medium: 0, low: 0 };
      }
      acc[date].total += 1;
      acc[date][fire.confidence] += 1;
      return acc;
    }, {} as Record<string, { total: number; high: number; medium: number; low: number }>);

    // Ordenar fechas
    const sortedDates = Object.keys(groupedFires).sort((a, b) => {
      const dateA = parseISO(a.split('/').reverse().join('-'));
      const dateB = parseISO(b.split('/').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();
    });

    // Convertir fechas a formato de visualización (ya están en formato correcto)
    const displayDates = sortedDates;

    const values = sortedDates.map(date => groupedFires[date].total);
    const highConfidenceValues = sortedDates.map(date => groupedFires[date].high);
    const mediumConfidenceValues = sortedDates.map(date => groupedFires[date].medium);

    // Análisis de tendencias
    const totalDays = sortedDates.length;
    const averageDaily = values.reduce((sum, val) => sum + val, 0) / totalDays;
    const maxDaily = Math.max(...values);
    const peakIndex = values.indexOf(maxDaily);
    const peakDate = displayDates[peakIndex];

    // Calcular tendencia (últimos 3 días vs primeros 3 días)
    const recent = values.slice(-3).reduce((sum, val) => sum + val, 0) / Math.min(3, values.length);
    const initial = values.slice(0, 3).reduce((sum, val) => sum + val, 0) / Math.min(3, values.length);

    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    if (recent > initial * 1.2) trend = 'increasing';
    else if (recent < initial * 0.8) trend = 'decreasing';

    // Verificar aumento reciente (últimos 2 días)
    const recentIncrease = values.length >= 2 &&
      values[values.length - 1] > values[values.length - 2] * 1.5;

    // Nivel de actividad
    let activityLevel: 'low' | 'moderate' | 'high' | 'critical' = 'low';
    if (averageDaily > 10) activityLevel = 'critical';
    else if (averageDaily > 5) activityLevel = 'high';
    else if (averageDaily > 2) activityLevel = 'moderate';

    return {
      labels: displayDates,
      values,
      highConfidenceValues,
      mediumConfidenceValues,
      trend,
      peakDate,
      averageDaily: Math.round(averageDaily * 10) / 10,
      maxDaily,
      totalDays,
      recentIncrease,
      activityLevel
    };
  }, [fires]);

  const { labels, values, highConfidenceValues, mediumConfidenceValues, trend, peakDate, averageDaily, maxDaily, recentIncrease, activityLevel } = temporalAnalysis;

  // Datos para gráfico mejorado
  const chartData: ChartData<ChartType> = {
    labels,
    datasets: [
      {
        type: type,
        label: 'Alta Confianza',
        data: highConfidenceValues,
        borderColor: '#DC2626',
        backgroundColor: type === 'line' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(220, 38, 38, 0.8)',
        borderWidth: 2,
        tension: type === 'line' ? 0.4 : undefined,
        fill: type === 'line',
        pointBackgroundColor: '#DC2626',
        pointRadius: 3,
        pointHoverRadius: 6
      },
      {
        type: type,
        label: 'Confianza Media',
        data: mediumConfidenceValues,
        borderColor: '#F59E0B',
        backgroundColor: type === 'line' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.8)',
        borderWidth: 2,
        tension: type === 'line' ? 0.4 : undefined,
        fill: type === 'line',
        pointBackgroundColor: '#F59E0B',
        pointRadius: 3,
        pointHoverRadius: 6
      },
      {
        type: type,
        label: 'Total',
        data: values,
        borderColor: '#6366F1',
        backgroundColor: type === 'line' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.8)',
        borderWidth: 3,
        tension: type === 'line' ? 0.4 : undefined,
        fill: false,
        pointBackgroundColor: '#6366F1',
        pointRadius: 4,
        pointHoverRadius: 7,
        borderDash: type === 'line' ? [5, 5] : undefined
      }
    ]
  };

  const options: ChartOptions<ChartType> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#E5E7EB',
          font: {
            family: "'Inter', sans-serif",
            size: 11
          },
          padding: 12,
          usePointStyle: true
        }
      },
      title: {
        display: true,
        text: title,
        color: '#F9FAFB',
        font: {
          family: "'Inter', sans-serif",
          size: 14,
          weight: 'bold'
        },
        padding: { bottom: 16 }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleFont: {
          family: "'Inter', sans-serif",
          size: 13
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 12
        },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          title: (tooltipItems) => {
            return `📅 ${tooltipItems[0].label}`;
          },
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            const emoji = label.includes('Alta') ? '🔴' : label.includes('Media') ? '🟠' : '📊';
            return `${emoji} ${label}: ${value}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de Incendios',
          color: '#9CA3AF',
          font: {
            family: "'Inter', sans-serif",
            size: 11
          }
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.3)',
          display: true
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            family: "'Inter', sans-serif",
            size: 10
          },
          padding: 8
        }
      },
      x: {
        title: {
          display: true,
          text: 'Fecha',
          color: '#9CA3AF',
          font: {
            family: "'Inter', sans-serif",
            size: 11
          }
        },
        grid: {
          display: false
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            family: "'Inter', sans-serif",
            size: 10
          },
          maxRotation: 45,
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    animations: {
      tension: {
        duration: 1500,
        easing: 'easeInOutCubic'
      }
    }
  };

  // Función para obtener el emoji de tendencia
  const getTrendEmoji = (trend: string) => {
    switch (trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      default: return '📊';
    }
  };

  // Función para obtener el color del nivel de actividad
  const getActivityColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'moderate': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  const getActivityLabel = (level: string) => {
    switch (level) {
      case 'critical': return 'CRÍTICA';
      case 'high': return 'ALTA';
      case 'moderate': return 'MODERADA';
      default: return 'BAJA';
    }
  };

  return (
    <div className={`bg-gray-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-600/30 ${className}`}>
      {fires.length === 0 ? (
        <div className="text-center py-6 sm:py-8 text-gray-400">
          <svg className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-xs sm:text-sm">No hay datos disponibles para el análisis temporal</p>
        </div>
      ) : (
        <>
          {/* Métricas de análisis temporal */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="bg-gray-700/30 rounded-md sm:rounded-lg p-2 sm:p-3 text-center">
              <div className="text-sm sm:text-lg font-bold text-white">{averageDaily}</div>
              <div className="text-xs text-gray-400">Promedio diario</div>
            </div>
            <div className="bg-gray-700/30 rounded-md sm:rounded-lg p-2 sm:p-3 text-center">
              <div className="text-sm sm:text-lg font-bold text-white">{maxDaily}</div>
              <div className="text-xs text-gray-400">Máximo en un día</div>
            </div>
            <div className="bg-gray-700/30 rounded-md sm:rounded-lg p-2 sm:p-3 text-center">
              <div className={`text-sm sm:text-lg font-bold ${getActivityColor(activityLevel)}`}>
                {getActivityLabel(activityLevel)}
              </div>
              <div className="text-xs text-gray-400">Nivel actividad</div>
            </div>
            <div className="bg-gray-700/30 rounded-md sm:rounded-lg p-2 sm:p-3 text-center">
              <div className="text-sm sm:text-lg font-bold text-white">
                {getTrendEmoji(trend)} {trend === 'increasing' ? '+' : trend === 'decreasing' ? '-' : '='}
              </div>
              <div className="text-xs text-gray-400">Tendencia</div>
            </div>
          </div>

          {/* Alertas temporales */}
          {recentIncrease && (
            <div className="mb-3 sm:mb-4 bg-red-900/30 border border-red-700/50 rounded-md sm:rounded-lg p-2 sm:p-3">
              <div className="flex items-center gap-2 text-red-400">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-xs sm:text-sm font-medium">⚠️ Aumento significativo detectado</span>
              </div>
              <p className="text-xs text-red-300 mt-1">
                Se ha registrado un incremento notable en la actividad reciente
              </p>
            </div>
          )}

          {/* Gráfico mejorado */}
          <div className="h-48 sm:h-64">
            {type === 'line' ? (
              <Line options={options as ChartOptions<'line'>} data={chartData as ChartData<'line'>} />
            ) : (
              <Bar options={options as ChartOptions<'bar'>} data={chartData as ChartData<'bar'>} />
            )}
          </div>

          {/* Información adicional */}
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-600/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 text-xs text-gray-400">
              <div>
                <span className="font-medium text-gray-300">Período analizado:</span> {temporalAnalysis.totalDays} días
              </div>
              {peakDate && (
                <div>
                  <span className="font-medium text-gray-300">Día de mayor actividad:</span> {peakDate}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FiresChart;

