'use client';

import React, { useState } from 'react';
import { ImageModal } from './ImageModal';

interface MobileGalleryProps {
  images: string[];
}

export function MobileGallery({ images }: MobileGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

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

  const hideScrollbarStyle = { scrollbarWidth: 'none' as const, msOverflowStyle: 'none' as const };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />

      {/* INLINE GALLERY */}
      <div className="relative w-full h-[55vh]">
        <div 
          className="no-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto"
          onScroll={handleScroll}
          style={hideScrollbarStyle}
        >
          {displayImages.map((img, idx) => (
            <div 
              key={idx} 
              className="relative h-full w-full shrink-0 snap-start"
              onClick={() => {
                setCurrentIndex(idx);
                setIsOpen(true);
              }}
            >
              <img 
                src={img} 
                alt={`Imagen ${idx + 1}`} 
                className="h-full w-full cursor-pointer object-cover" 
              />
              <div className="pointer-events-none absolute inset-0 bg-black/10" />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
          {currentIndex + 1} / {displayImages.length}
        </div>
      </div>

      {isOpen && (
        <ImageModal
          images={displayImages}
          initialIndex={currentIndex}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
