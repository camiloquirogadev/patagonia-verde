/**
 * Componente de skeleton loading para diferentes elementos
 */
import type { FC } from 'react';

interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular' | 'chart';
  width?: string | number;
  height?: string | number;
  className?: string;
}

const Skeleton: FC<SkeletonProps> = ({ 
  variant = 'text', 
  width = '100%', 
  height,
  className = '' 
}) => {
  const getHeightClass = () => {
    if (height) return { height };
    
    switch (variant) {
      case 'text': return { height: '1rem' };
      case 'chart': return { height: '200px' };
      case 'circular': return { height: '40px', width: '40px' };
      case 'rectangular': return { height: '120px' };
      default: return { height: '1rem' };
    }
  };

  const getShapeClass = () => {
    switch (variant) {
      case 'circular': return 'rounded-full';
      case 'text': return 'rounded';
      default: return 'rounded-lg';
    }
  };

  return (
    <div
      className={`
        bg-gray-300 animate-pulse 
        ${getShapeClass()}
        ${className}
      `}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        ...getHeightClass()
      }}
    />
  );
};

export default Skeleton;
