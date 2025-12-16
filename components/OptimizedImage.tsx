import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  priority?: boolean;
  onLoad?: () => void;
  blurPlaceholder?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  fill = false,
  objectFit = 'cover',
  priority = false,
  onLoad,
  blurPlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3C/svg%3E'
}) => {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [showImage, setShowImage] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Convert jpg to webp, fallback to original
  const getImageSrc = (imgSrc: string) => {
    if (!imgSrc) return blurPlaceholder;
    if (imgSrc.startsWith('http')) return imgSrc; // External images as-is
    return imgSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  const handleLoad = () => {
    setShowImage(true);
    onLoad?.();
  };

  const webpSrc = getImageSrc(src);

  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    'scale-down': 'object-scale-down'
  }[objectFit];

  if (fill) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <img
          ref={imgRef}
          src={priority ? webpSrc : blurPlaceholder}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          className={`w-full h-full ${objectFitClass} transition-opacity duration-300 ${
            showImage ? 'opacity-100' : 'opacity-75'
          }`}
          onLoad={handleLoad}
        />
        {!priority && isLoaded && (
          <img
            src={webpSrc}
            alt={alt}
            className={`absolute inset-0 w-full h-full ${objectFitClass} transition-opacity duration-300 ${
              showImage ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={() => {
              // Fallback to original if webp fails
              const fallbackImg = new Image();
              fallbackImg.src = src;
              if (imgRef.current) {
                imgRef.current.src = src;
              }
            }}
          />
        )}
      </div>
    );
  }

  return (
    <motion.img
      ref={imgRef}
      src={priority ? webpSrc : blurPlaceholder}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      className={`${objectFitClass} transition-opacity duration-300 ${
        showImage ? 'opacity-100' : 'opacity-75'
      } ${className}`}
      onLoad={handleLoad}
      initial={{ opacity: 0 }}
      animate={{ opacity: showImage ? 1 : 0.7 }}
      transition={{ duration: 0.3 }}
      {...(!priority && isLoaded && {
        srcSet: `${webpSrc} 1x`
      })}
      onError={() => {
        // Fallback to original if webp fails
        if (imgRef.current) {
          imgRef.current.src = src;
        }
      }}
    />
  );
};

export default OptimizedImage;
