import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSlideshowModalProps {
    images: string[];
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

const ImageSlideshowModal: React.FC<ImageSlideshowModalProps> = ({ images, isOpen, onClose, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

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

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                onClick={onClose}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-50"
                >
                    <X size={32} />
                </button>

                <div className="relative w-full max-w-6xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                    {images.length > 1 && (
                        <button
                            onClick={prevImage}
                            className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-white hover:text-black rounded-full transition-all z-20"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}

                    <div className="w-full h-full overflow-hidden flex flex-col items-center">
                        <motion.img
                            key={currentIndex}
                            src={images[currentIndex]}
                            alt={`Slide ${currentIndex + 1}`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="max-h-[85vh] w-auto max-w-full object-contain shadow-2xl rounded-sm"
                        />

                        {title && (
                            <div className="mt-4 text-white font-serif text-xl tracking-wide">{title}</div>
                        )}
                        <div className="mt-2 text-white/60 text-sm font-light">
                            {currentIndex + 1} / {images.length}
                        </div>
                    </div>

                    {images.length > 1 && (
                        <button
                            onClick={nextImage}
                            className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-white hover:text-black rounded-full transition-all z-20"
                        >
                            <ChevronRight size={24} />
                        </button>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ImageSlideshowModal;
