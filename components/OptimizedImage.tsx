import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import imageCompression from 'browser-image-compression';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  priority?: boolean;
  onLoad?: () => void;
  blurPlaceholder?: string;
  compressionQuality?: number; // 0.1 to 1.0, default 0.8
  maxWidth?: number; // Max width in pixels, default 1920
  maxHeight?: number; // Max height in pixels, default 1080
  width?: number; // Width for responsive sizing
  height?: number; // Height for responsive sizing
  sizes?: string; // CSS media queries for responsive image sizes
  srcSet?: string; // Custom srcset (if not auto-generated)
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  fill = false,
  objectFit = 'cover',
  priority = false,
  onLoad,
  blurPlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3C/svg%3E',
  compressionQuality = 0.8,
  maxWidth = 1920,
  maxHeight = 1080,
  width,
  height,
  sizes,
  srcSet
}) => {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [showImage, setShowImage] = useState(priority);
  const [compressedSrc, setCompressedSrc] = useState<string>(priority ? src : blurPlaceholder);
  const [isCompressing, setIsCompressing] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Compress image on initial load or when src changes
  useEffect(() => {
    const compressImage = async () => {
      if (!src || src.startsWith('data:') || !isLoaded) return;
      
      try {
        setIsCompressing(true);
        const blob = await fetch(src).then(res => res.blob());
        const file = new File([blob], 'image', { type: blob.type });
        
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: priority ? maxWidth : Math.min(1024, maxWidth),
          useWebWorker: true,
          quality: compressionQuality,
          fileType: blob.type || 'image/jpeg'
        };

        const compressedBlob = await imageCompression(file, options);
        const url = URL.createObjectURL(compressedBlob);
        setCompressedSrc(url);
        setIsCompressing(false);
      } catch (error) {
        console.warn('Image compression failed, using original:', error);
        setCompressedSrc(src);
        setIsCompressing(false);
      }
    };

    if (priority) {
      compressImage();
    }
  }, [src, priority, compressionQuality, maxWidth]);

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

  // Compress image when it becomes visible
  useEffect(() => {
    if (!isLoaded || priority) return;

    const compressImage = async () => {
      if (!src || src.startsWith('data:')) return;
      
      try {
        const blob = await fetch(src).then(res => res.blob());
        const file = new File([blob], 'image', { type: blob.type });
        
        const options = {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
          quality: compressionQuality,
          fileType: blob.type || 'image/jpeg'
        };

        const compressedBlob = await imageCompression(file, options);
        const url = URL.createObjectURL(compressedBlob);
        setCompressedSrc(url);
      } catch (error) {
        console.warn('Image compression failed, using original:', error);
        setCompressedSrc(src);
      }
    };

    compressImage();
  }, [isLoaded, src, priority, compressionQuality]);

  // Convert jpg to webp, fallback to original
  const getImageSrc = (imgSrc: string) => {
    if (!imgSrc) return blurPlaceholder;
    
    // If it's a local asset and ends with .jpg or .png, we could potentially
    // point to a .webp version if the build system generated them.
    // For now, since we're using browser-image-compression, it handles the format.
    return compressedSrc || imgSrc;
  };

  const handleLoad = () => {
    setShowImage(true);
    onLoad?.();
  };

  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    'scale-down': 'object-scale-down'
  }[objectFit];

  return (
    <div className={`relative overflow-hidden ${className} ${fill ? 'w-full h-full' : ''}`}>
      <picture>
        {/* If we had actual .webp files on disk, we'd add <source type="image/webp" srcSet={...} /> here */}
        <motion.img
          ref={imgRef}
          src={priority ? src : (compressedSrc || blurPlaceholder)}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`${fill ? 'absolute inset-0 w-full h-full' : ''} ${objectFitClass} transition-opacity duration-500 ${
            showImage ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          initial={priority ? false : { opacity: 0 }}
          animate={{ opacity: showImage ? 1 : 0 }}
          onError={() => {
            if (imgRef.current && imgRef.current.src !== src) {
              imgRef.current.src = src;
            }
          }}
        />
      </picture>
      
      {/* Low-quality placeholder/blur effect */}
      {!showImage && (
        <div 
          className={`absolute inset-0 bg-gray-200 animate-pulse ${fill ? 'w-full h-full' : ''}`}
          style={{ backgroundImage: `url(${blurPlaceholder})`, backgroundSize: 'cover' }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
