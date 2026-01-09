/**
 * Adaptive Logo Component
 * A reusable component that displays the optimal logo version based on
 * the background color it's placed over
 * 
 * Usage Examples:
 * <AdaptiveLogo size="lg" />  // For hero section
 * <AdaptiveLogo size="sm" />  // For navbar
 * <AdaptiveLogo parentBg="rgb(255, 255, 255)" />  // Explicit background
 */

import React, { useMemo } from 'react';
import OptimizedImage from './OptimizedImage';
import { getAdaptiveLogoPath, getLuminance } from '../hooks/useAdaptiveLogo';

interface AdaptiveLogoProps {
  /** Size variant: 'sm' (40px), 'md' (80px), 'lg' (120px), 'xl' (160px) */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Show text alongside logo */
  showText?: boolean;
  /** Text to display */
  text?: string;
  /** CSS classes to apply to container */
  className?: string;
  /** Image classes */
  imageClassName?: string;
  /** Text classes */
  textClassName?: string;
  /** Explicit background color (for testing or specific scenarios) */
  parentBg?: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether to show contrast ratio in title (debug mode) */
  debug?: boolean;
}

const sizeMap = {
  sm: 40,
  md: 80,
  lg: 120,
  xl: 160,
};

const AdaptiveLogo: React.FC<AdaptiveLogoProps> = ({
  size = 'lg',
  showText = false,
  text = 'Manyatta Kenya',
  className = '',
  imageClassName = '',
  textClassName = '',
  parentBg,
  onClick,
  debug = false,
}) => {
  const height = sizeMap[size];
  const width = height * 1.4; // Approximate aspect ratio

  const logoData = useMemo(() => {
    const bg = parentBg || 'rgb(255, 255, 255)';
    const logoPath = getAdaptiveLogoPath(bg);
    const isInverted = logoPath.includes('Inverted');

    // Calculate contrast for debug purposes
    let contrastRatio = 0;
    if (debug) {
      const originalDarkLuminance = 0.2; // Approximate
      const invertedLightLuminance = 0.95; // Approximate
      const bgLuminance = getLuminance(bg);

      const contrastWithOriginal = (Math.max(originalDarkLuminance, bgLuminance) + 0.05) / 
        (Math.min(originalDarkLuminance, bgLuminance) + 0.05);
      const contrastWithInverted = (Math.max(invertedLightLuminance, bgLuminance) + 0.05) / 
        (Math.min(invertedLightLuminance, bgLuminance) + 0.05);

      contrastRatio = isInverted ? contrastWithInverted : contrastWithOriginal;
    }

    return {
      logoPath,
      isInverted,
      contrastRatio,
    };
  }, [parentBg, debug]);

  const containerClasses = `inline-flex items-center gap-3 ${className}`;
  const titleText = debug 
    ? `${logoData.isInverted ? 'Inverted' : 'Original'} Logo - Contrast: ${logoData.contrastRatio.toFixed(1)}:1` 
    : 'Manyatta Kenya';

  return (
    <div 
      className={containerClasses}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : -1}
      aria-label="Manyatta Kenya Logo"
      title={titleText}
    >
      <OptimizedImage
        src={logoData.logoPath}
        alt="Manyatta Kenya Logo"
        width={width}
        height={height}
        className={`h-[${height}px] ${imageClassName}`}
        style={{ height: `${height}px`, width: 'auto' }}
      />
      
      {showText && (
        <span className={`text-xl font-bold font-serif ${textClassName}`}>
          {text}
        </span>
      )}
    </div>
  );
};

export default AdaptiveLogo;
