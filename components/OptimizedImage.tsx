import React, { useEffect, useRef, useState } from 'react';

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
  sizes = fill ? '100vw' : undefined,
  srcSet,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    'scale-down': 'object-scale-down',
  }[objectFit];

  useEffect(() => {
    if (priority) {
      setShouldLoad(true);
      return;
    }

    const element = imgRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [priority, src]);

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

  const imageClassName = `${objectFitClass} block transition-opacity duration-300 ${
    loaded ? 'opacity-100' : 'opacity-0'
  } ${fill ? 'h-full w-full' : ''} ${className}`;

  const image = (
    <img
      ref={imgRef}
      src={shouldLoad ? src : BLUR_PLACEHOLDER}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      sizes={sizes}
      srcSet={shouldLoad ? srcSet : undefined}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={imageClassName}
      onLoad={handleLoad}
      onError={() => {
        setFailed(true);
        setLoaded(true);
      }}
    />
  );

  if (fill) {
    return (
      <div className={`relative h-full w-full overflow-hidden bg-gray-100 ${className}`}>
        {failed && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 px-4 text-center text-sm text-gray-500">
            Image unavailable
          </div>
        )}
        {image}
      </div>
    );
  }

  return (
    <span className="relative block overflow-hidden bg-gray-100" style={{ aspectRatio: width && height ? `${width} / ${height}` : undefined }}>
      {failed && (
        <span className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-gray-500">
          Image unavailable
        </span>
      )}
      {image}
    </span>
  );
};

export default OptimizedImage;
