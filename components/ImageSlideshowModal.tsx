import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface ImageSlideshowModalProps {
    images: string[];
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

const ImageSlideshowModal: React.FC<ImageSlideshowModalProps> = ({ images, isOpen, onClose, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(false);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0, 1]));

    // Preload adjacent images
    useEffect(() => {
        const imagesToLoad = new Set([currentIndex]);
        if (currentIndex > 0) imagesToLoad.add(currentIndex - 1);
        if (currentIndex < images.length - 1) imagesToLoad.add(currentIndex + 1);
        setLoadedImages((prev) => new Set([...prev, ...imagesToLoad]));
    }, [currentIndex, images.length]);

    // Reset index when modal opens
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(0);
            setLoadedImages(new Set([0, 1]));
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentIndex, images.length]);

    // Autoplay effect
    useEffect(() => {
        if (!isAutoPlay || !isOpen) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [isAutoPlay, isOpen, images.length]);

    const nextImage = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevImage = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Touch swipe support
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        setTouchEnd(e.changedTouches[0].clientX);
        if (touchStart - touchEnd > 50) {
            nextImage();
        }
        if (touchEnd - touchStart > 50) {
            prevImage();
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 backdrop-blur-sm p-4"
                onClick={onClose}
                role="dialog"
                aria-modal="true"
                aria-label={`Image gallery: ${title || 'Gallery'}`}
            >
                {/* Close Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50 p-2 hover:bg-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                    title="Close (ESC)"
                    aria-label="Close gallery"
                >
                    <X size={32} />
                </motion.button>

                {/* Main Content */}
                <div 
                    className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center" 
                    onClick={(e) => e.stopPropagation()}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Previous Button */}
                    {images.length > 1 && (
                        <motion.button
                            whileHover={{ scale: 1.1, x: -4 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prevImage}
                            className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all z-20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white"
                            title="Previous (←)"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={28} />
                        </motion.button>
                    )}

                    {/* Image Container */}
                    <div className="w-full h-full overflow-hidden flex flex-col items-center justify-center relative">
                        {/* Main Image - Only render current and preloaded images */}
                        <AnimatePresence mode="wait">
                            {loadedImages.has(currentIndex) ? (
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="max-h-[75vh] w-auto max-w-full flex items-center justify-center"
                                >
                                    <img
                                        src={images[currentIndex]}
                                        alt={`${title} - Image ${currentIndex + 1}`}
                                        loading="eager"
                                        decoding="async"
                                        className="max-h-[75vh] w-auto max-w-full object-contain shadow-2xl rounded-lg"
                                    />
                                </motion.div>
                            ) : null}
                        </AnimatePresence>

                    {/* Info Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-6 text-center w-full"
                        >
                            {title && (
                                <div className="text-white font-serif text-2xl tracking-wide mb-4">{title}</div>
                            )}
                            
                            {/* Image Counter and Progress Indicators */}
                            <div className="flex flex-col items-center gap-4">
                                <div className="text-white/70 text-sm font-light">
                                    <span className="text-white font-semibold">{currentIndex + 1}</span> / {images.length}
                                </div>
                                
                                {/* Progress Bar */}
                                <div className="w-full max-w-xs h-1 bg-white/20 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
                                        transition={{ duration: 0.3 }}
                                        className="h-full bg-gradient-to-r from-primary to-primary/70"
                                    />
                                </div>
                                
                                {/* Dot Indicators */}
                                <div className="flex gap-1 flex-wrap justify-center max-w-lg">
                                    {images.map((_, idx) => (
                                        <motion.button
                                            key={idx}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentIndex(idx);
                                            }}
                                            className={`rounded-full transition-all cursor-pointer ${
                                                idx === currentIndex ? 'bg-white w-8 h-2' : 'bg-white/40 w-2 h-2'
                                            }`}
                                            whileHover={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
                                            title={`Go to image ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Thumbnail Strip (shown for galleries with 6+ images) */}
                        {images.length > 5 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-6 w-full flex gap-2 justify-center overflow-x-auto pb-2 px-4"
                            >
                                {images.slice(Math.max(0, currentIndex - 2), Math.min(images.length, currentIndex + 3)).map((_, relIdx) => {
                                    const actualIdx = Math.max(0, currentIndex - 2) + relIdx;
                                    return (
                                        <motion.button
                                            key={actualIdx}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentIndex(actualIdx);
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                                actualIdx === currentIndex ? 'border-white shadow-lg' : 'border-white/20 hover:border-white/50'
                                            }`}
                                            title={`Thumbnail ${actualIdx + 1}`}
                                        >
                                            <img 
                                                src={images[actualIdx]} 
                                                alt={`Thumbnail ${actualIdx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.button>
                                    );
                                })}
                            </motion.div>
                        )}

                        {/* Controls */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 flex items-center gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsAutoPlay(!isAutoPlay)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    isAutoPlay
                                        ? 'bg-primary text-white'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                            >
                                {isAutoPlay ? '⏸ Pause' : '▶ Autoplay'}
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Next Button */}
                    {images.length > 1 && (
                        <motion.button
                            whileHover={{ scale: 1.1, x: 4 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={nextImage}
                            className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all z-20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white"
                            title="Next (→)"
                            aria-label="Next image"
                        >
                            <ChevronRight size={28} />
                        </motion.button>
                    )}
                </div>

                {/* Keyboard hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-4 left-4 text-white/50 text-xs font-light hidden md:block"
                >
                    <div>Use ← → to navigate • ESC to close</div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ImageSlideshowModal;
