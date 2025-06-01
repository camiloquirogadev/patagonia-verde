// src/components/ui/ErrorDisplay.tsx
import React from 'react';

interface ErrorDisplayProps {
  error: Error | string;
  onRetry?: () => void;
  className?: string;
}


const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ 
  error,
  onRetry,
  className = ''
}) => {
  const errorMessage = typeof error === 'string' ? error : error.message;
  
  return (
    <div className={`bg-red-50 border border-red-200 text-red-700 p-4 rounded ${className}`}>
      <div className="flex items-center">
        <svg
          className="h-5 w-5 text-red-400 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className="text-lg font-medium">Error</h3>
      </div>
      <p className="mt-2">{errorMessage}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
        >
          Reintentar
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;