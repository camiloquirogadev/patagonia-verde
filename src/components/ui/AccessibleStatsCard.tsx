/**
 * Accessible Statistics Card Component
 * Provides enhanced accessibility features for statistical data display
 */
import React from 'react';

interface AccessibleStatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  color?: 'green' | 'red' | 'orange' | 'blue' | 'purple' | 'gray';
  trend?: 'up' | 'down' | 'stable';
  trendLabel?: string;
  className?: string;
  ariaLabel?: string;
}

const AccessibleStatsCard: React.FC<AccessibleStatsCardProps> = ({
  title,
  value,
  description,
  icon,
  color = 'gray',
  trend,
  trendLabel,
  className = '',
  ariaLabel
}) => {
  const colorClasses = {
    green: {
      bg: 'bg-green-500/20 hover:bg-green-500/30',
      border: 'border-green-500/30 hover:border-green-500/50',
      text: 'text-green-400',
      icon: 'bg-green-500/20'
    },
    red: {
      bg: 'bg-red-500/20 hover:bg-red-500/30',
      border: 'border-red-500/30 hover:border-red-500/50',
      text: 'text-red-400',
      icon: 'bg-red-500/20'
    },
    orange: {
      bg: 'bg-orange-500/20 hover:bg-orange-500/30',
      border: 'border-orange-500/30 hover:border-orange-500/50',
      text: 'text-orange-400',
      icon: 'bg-orange-500/20'
    },
    blue: {
      bg: 'bg-blue-500/20 hover:bg-blue-500/30',
      border: 'border-blue-500/30 hover:border-blue-500/50',
      text: 'text-blue-400',
      icon: 'bg-blue-500/20'
    },
    purple: {
      bg: 'bg-purple-500/20 hover:bg-purple-500/30',
      border: 'border-purple-500/30 hover:border-purple-500/50',
      text: 'text-purple-400',
      icon: 'bg-purple-500/20'
    },
    gray: {
      bg: 'bg-gray-500/20 hover:bg-gray-500/30',
      border: 'border-gray-500/30 hover:border-gray-500/50',
      text: 'text-gray-400',
      icon: 'bg-gray-500/20'
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 14l5-5 5 5z"/>
          </svg>
        );
      case 'down':
        return (
          <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        );
      case 'stable':
        return (
          <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const colors = colorClasses[color];

  return (
    <div 
      className={`group bg-gray-800/60 backdrop-blur-sm rounded-xl p-5 border ${colors.border} ${colors.bg} transition-all duration-300 hover:shadow-lg hover:shadow-${color}-500/10 ${className}`}
      role="article"
      aria-label={ariaLabel || `${title}: ${value}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // Handle activation if needed
        }
      }}
    >
      <div className="flex items-center justify-between mb-3">
        {icon && (
          <div className={`p-2 ${colors.icon} rounded-lg group-hover:bg-${color}-500/30 transition-colors`} aria-hidden="true">
            {icon}
          </div>
        )}
        <div className={`w-2 h-2 bg-${color}-400 rounded-full animate-pulse`} aria-hidden="true"></div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-xs font-medium text-gray-300 uppercase tracking-wide" id={`stat-title-${title.replace(/\s+/g, '-').toLowerCase()}`}>
          {title}
        </h3>
        <div className="flex items-baseline gap-2">
          <p 
            className={`text-3xl font-bold ${colors.text} group-hover:text-${color}-300 transition-colors`}
            aria-labelledby={`stat-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
          >
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {trend && (
            <div className="flex items-center gap-1" title={trendLabel} aria-label={trendLabel}>
              {getTrendIcon()}
              {trendLabel && (
                <span className="text-xs text-gray-400 sr-only">{trendLabel}</span>
              )}
            </div>
          )}
        </div>
        {description && (
          <p className="text-xs text-gray-500" role="note">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default AccessibleStatsCard;