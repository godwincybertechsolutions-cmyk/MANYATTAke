import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  priority?: boolean;
  onLoad?: () => void;
  width?: number;
  height?: number;
  sizes?: string;
  srcSet?: string;
}

const BLUR_PLACEHOLDER =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3C/svg%3E';

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  fill = false,
  objectFit = 'cover',
  priority = false,
  onLoad,
  width,
  height,
  sizes,
  srcSet,
}) => {
  const [visible, setVisible] = useState(priority);
  const [resolvedSrc, setResolvedSrc] = useState(priority ? src : BLUR_PLACEHOLDER);
  const imgRef = useRef<HTMLImageElement>(null);

  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    'scale-down': 'object-scale-down',
  }[objectFit];

  useEffect(() => {
    if (priority) {
      setResolvedSrc(src);
      setVisible(true);
      return;
    }

    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setResolvedSrc(src);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px', threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src, priority]);

  const handleLoad = () => {
    setVisible(true);
    onLoad?.();
  };

  const imgProps = {
    ref: imgRef,
    src: resolvedSrc,
    alt,
    loading: (priority ? 'eager' : 'lazy') as 'eager' | 'lazy',
    decoding: (priority ? 'sync' : 'async') as 'sync' | 'async',
    fetchPriority: priority ? ('high' as const) : undefined,
    sizes,
    srcSet,
    width: fill ? undefined : width,
    height: fill ? undefined : height,
    className: `${objectFitClass} transition-opacity duration-300 ${
      visible ? 'opacity-100' : 'opacity-0'
    } ${fill ? `w-full h-full ${className}` : className}`,
    onLoad: handleLoad,
    onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      if (img.src !== src) img.src = src;
      setVisible(true);
    },
  };

  if (fill) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <img {...imgProps} className={`${objectFitClass} w-full h-full transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    );
  }

  return <img {...imgProps} />;
};

export default OptimizedImage;
