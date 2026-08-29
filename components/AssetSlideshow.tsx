import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

type AssetSlideshowProps = {
  images: string[];
  alt: string;
  className?: string;
  imageClassName?: string;
  interval?: number;
  priority?: boolean;
  onOpenGallery?: () => void;
};

const AssetSlideshow: React.FC<AssetSlideshowProps> = ({
  images,
  alt,
  className = '',
  imageClassName = '',
  interval = 6000,
  priority = false,
  onOpenGallery,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || images.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [images.length, interval, isPlaying]);

  if (!images.length) return null;

  const goTo = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
    setIsPlaying(false);
  };

  const activeImage = images[activeIndex];
  const nextImage = images.length > 1 ? images[(activeIndex + 1) % images.length] : undefined;

  return (
    <div className={`relative isolate overflow-hidden ${className}`} onClick={onOpenGallery}>
      {images.map((img, idx) => (
        <img
          key={img}
          src={img}
          alt={`${alt} — image ${idx + 1} of ${images.length}`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${imageClassName} ${idx === activeIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
          loading={priority && idx === 0 ? 'eager' : 'lazy'}
          fetchPriority={priority && idx === 0 ? 'high' : 'auto'}
          decoding="async"
        />
      ))}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
      {images.length > 1 && (
        <>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center gap-2" aria-label="Slideshow progress">
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  aria-label={`Show image ${index + 1}`}
                  aria-current={index === activeIndex}
                  onClick={() => goTo(index)}
                  className={`h-1.5 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/55 hover:bg-white/80'}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Previous image" onClick={() => goTo(activeIndex - 1)} className="rounded-full bg-black/35 p-2 text-white backdrop-blur-sm hover:bg-black/55 focus:outline-none focus:ring-2 focus:ring-white">
                <ChevronLeft size={18} />
              </button>
              <button type="button" aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'} onClick={() => setIsPlaying((playing) => !playing)} className="rounded-full bg-black/35 p-2 text-white backdrop-blur-sm hover:bg-black/55 focus:outline-none focus:ring-2 focus:ring-white">
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button type="button" aria-label="Next image" onClick={() => goTo(activeIndex + 1)} className="rounded-full bg-black/35 p-2 text-white backdrop-blur-sm hover:bg-black/55 focus:outline-none focus:ring-2 focus:ring-white">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AssetSlideshow;
export type { AssetSlideshowProps };
