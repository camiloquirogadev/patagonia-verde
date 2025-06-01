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
  BarElement
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
  Legend
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
  const { labels, values } = useMemo(() => {
    // Agrupar incendios por fecha
    const groupedFires = fires.reduce((acc, fire) => {
      if (!fire.date || !isValid(parseISO(fire.date))) return acc;
      
      const date = format(parseISO(fire.date), 'dd/MM/yyyy');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Ordenar fechas
    const sortedDates = Object.keys(groupedFires).sort((a, b) => {
      const dateA = parseISO(a.split('/').reverse().join('-'));
      const dateB = parseISO(b.split('/').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();
    });

    return {
      labels: sortedDates,
      values: sortedDates.map(date => groupedFires[date])
    };
  }, [fires]);

  // Datos para gráfico de línea
  const lineChartData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Número de Incendios',
        data: values,
        borderColor: 'var(--fire-orange)',
        backgroundColor: 'var(--fire-orange-light)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: 'var(--fire-orange)',
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  // Datos para gráfico de barras
  const barChartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'Número de Incendios',
        data: values,
        borderColor: 'var(--fire-orange)',
        backgroundColor: 'var(--fire-orange-dark)',
        borderWidth: 2
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
          color: '#4B5563',
          font: {
            family: "'Inter', sans-serif",
            size: 12
          },
          padding: 16
        }
      },
      title: {
        display: true,
        text: title,
        color: '#1F2937',
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
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
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
            return `Fecha: ${tooltipItems[0].label}`;
          },
          label: (context) => {
            return `Incendios: ${context.parsed.y}`;
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
          color: '#4B5563',
          font: {
            family: "'Inter', sans-serif",
            size: 12,
            weight: 'normal'
          }
        },
        grid: {
          color: 'rgba(243, 244, 246, 0.2)'
        },
        ticks: {
          color: '#4B5563',
          font: {
            family: "'Inter', sans-serif",
            size: 11
          },
          padding: 8
        }
      },
      x: {
        title: {
          display: true,
          text: 'Fecha',
          color: '#4B5563',
          font: {
            family: "'Inter', sans-serif",
            size: 12,
            weight: 'normal'
          }
        },
        grid: {
          display: false
        },
        ticks: {
          color: '#4B5563',
          font: {
            family: "'Inter', sans-serif",
            size: 11
          },
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: 10
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
        duration: 1000,
        easing: 'easeInOutCubic'
      }
    }
  };

  return (
    <div className={`chart-container chart-animation ${className} ${fires.length === 0 ? 'chart-container-empty' : ''}`}>
      {fires.length === 0 ? (
        <div className="text-gray-500">
          No hay datos disponibles para mostrar
        </div>
      ) : type === 'line' ? (
        <Line options={options as ChartOptions<'line'>} data={lineChartData} />
      ) : (
        <Bar options={options as ChartOptions<'bar'>} data={barChartData} />
      )}
    </div>
  );
};

export default FiresChart;
