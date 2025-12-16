import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

interface ImageSlideshowModalProps {
    images: string[];
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

const ImageSlideshowModal: React.FC<ImageSlideshowModalProps> = ({ images, isOpen, onClose, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    // Reset index when modal opens
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(0);
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
        setImageLoading(true);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevImage = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
        e?.stopPropagation();
        setImageLoading(true);
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
            >
                {/* Close Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50 p-2 hover:bg-white/10 rounded-full"
                    title="Close (ESC)"
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
                            className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all z-20 backdrop-blur-sm"
                            title="Previous (←)"
                        >
                            <ChevronLeft size={28} />
                        </motion.button>
                    )}

                    {/* Image Container */}
                    <div className="w-full h-full overflow-hidden flex flex-col items-center justify-center relative">
                        {/* Loading State */}
                        <AnimatePresence>
                            {imageLoading && (
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-30"
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="w-12 h-12 border-3 border-white/30 border-t-white rounded-full"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Image with stagger animation */}
                        <motion.img
                            key={currentIndex}
                            src={images[currentIndex]}
                            alt={`${title} - Image ${currentIndex + 1}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="max-h-[75vh] w-auto max-w-full object-contain shadow-2xl rounded-lg"
                            onLoadingComplete={() => setImageLoading(false)}
                            onLoad={() => setImageLoading(false)}
                        />

                        {/* Info Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-6 text-center"
                        >
                            {title && (
                                <div className="text-white font-serif text-2xl tracking-wide mb-3">{title}</div>
                            )}
                            <div className="flex items-center justify-center gap-4 text-white/70 text-sm font-light">
                                <span>{currentIndex + 1} / {images.length}</span>
                                <div className="flex gap-1">
                                    {images.map((_, idx) => (
                                        <motion.button
                                            key={idx}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setImageLoading(true);
                                                setCurrentIndex(idx);
                                            }}
                                            className={`h-1 rounded-full transition-all cursor-pointer ${
                                                idx === currentIndex ? 'bg-white w-6' : 'bg-white/40 w-1'
                                            }`}
                                            whileHover={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

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
                            className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all z-20 backdrop-blur-sm"
                            title="Next (→)"
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
