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

      <div 
        ref={modalContainerRef}
        className="no-scrollbar flex h-full w-full snap-x snap-mandatory items-center justify-start overflow-x-auto"
        onScroll={handleScroll}
        style={hideScrollbarStyle}
      >
        {displayImages.map((img, idx) => (
          <div key={idx} className="flex h-full w-full shrink-0 snap-center items-center justify-center p-2">
            <img 
              src={img} 
              alt={`FullScreen Imagen ${idx + 1}`} 
              className="max-h-screen w-full object-contain" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
