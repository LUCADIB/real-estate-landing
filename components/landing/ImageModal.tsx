'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ImageModalProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export function ImageModal({ images, initialIndex, onClose }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const displayImages = images && images.length > 0 ? images : ['/placeholder.jpg'];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollLeft;
    const width = container.clientWidth;
    if (width > 0) {
      const index = Math.round(scrollPosition / width);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    if (modalContainerRef.current) {
      const width = modalContainerRef.current.clientWidth;
      modalContainerRef.current.scrollLeft = width * initialIndex;
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const nextIdx = (prev + 1) % displayImages.length;
      if (modalContainerRef.current) {
        modalContainerRef.current.scrollTo({ left: modalContainerRef.current.clientWidth * nextIdx, behavior: 'smooth' });
      }
      return nextIdx;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const prevIdx = prev === 0 ? displayImages.length - 1 : prev - 1;
      if (modalContainerRef.current) {
        modalContainerRef.current.scrollTo({ left: modalContainerRef.current.clientWidth * prevIdx, behavior: 'smooth' });
      }
      return prevIdx;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hideScrollbarStyle = { scrollbarWidth: 'none' as const, msOverflowStyle: 'none' as const };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black">
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />

      <button 
        onClick={onClose}
        className="absolute right-6 top-6 z-[110] rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 backdrop-blur-md"
        aria-label="Cerrar galería"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <div className="absolute left-6 top-6 z-[110] rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur-md">
         {currentIndex + 1} / {displayImages.length}
      </div>

      {/* Desktop Navigation Overlays */}
      <button
        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] hidden md:flex items-center justify-center p-3 rounded-full bg-white/80 hover:bg-white shadow-md hover:scale-105 transition text-gray-900 focus:outline-none"
        aria-label="Imagen anterior"
      >
        <span className="flex items-center justify-center font-bold text-lg leading-none select-none">❮</span>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); handleNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] hidden md:flex items-center justify-center p-3 rounded-full bg-white/80 hover:bg-white shadow-md hover:scale-105 transition text-gray-900 focus:outline-none"
        aria-label="Siguiente imagen"
      >
        <span className="flex items-center justify-center font-bold text-lg leading-none select-none">❯</span>
      </button>

      <div 
        ref={modalContainerRef}
        className="no-scrollbar relative flex h-full w-full snap-x snap-mandatory items-center justify-start overflow-x-auto"
        onScroll={handleScroll}
        style={hideScrollbarStyle}
      >
        {displayImages.map((img, idx) => (
          <div key={idx} className="flex h-full w-full shrink-0 snap-center items-center justify-center p-2 relative">
            <img 
              src={img} 
              alt={`FullScreen Imagen ${idx + 1}`} 
              className="max-h-screen w-full object-contain md:cursor-pointer select-none" 
              onClick={(e) => {
                // Determine if it's mobile or desktop essentially based on pointer behavior, 
                // but since it's md:cursor-pointer, clicking should ideally advance in desktop mode.
                handleNext();
              }}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
