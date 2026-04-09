'use client';

import React, { useState } from 'react';
import { ImageModal } from './ImageModal';

interface DesktopGalleryProps {
  title: string;
  images: string[];
}

export function DesktopGallery({ title, images }: DesktopGalleryProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const mainImage = images[0] || '/placeholder.jpg';
  const galleryImages = images.slice(1, 5);
  const hasMore = images.length > 5;

  const handleOpen = (index: number) => {
    setStartIndex(index);
    setModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-2 overflow-hidden rounded-2xl">
        <div className="col-span-2 row-span-2 relative">
          <img
            src={mainImage}
            alt={title}
            onClick={() => handleOpen(0)}
            className="h-full w-full cursor-pointer object-cover transition hover:opacity-90"
          />
        </div>

        {galleryImages.map((img, i) => {
          const isLast = i === 3 && hasMore;
          return (
            <div key={i} className="relative h-full w-full">
              <img
                src={img}
                alt={`${title} ${i + 2}`}
                onClick={() => handleOpen(i + 1)}
                className="h-full w-full cursor-pointer object-cover transition hover:opacity-90"
              />
              {isLast && (
                <div 
                  onClick={() => handleOpen(4)}
                  className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 transition hover:bg-black/50"
                >
                  <span className="text-base font-semibold text-white">Ver todas las fotos</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <ImageModal
          images={images}
          initialIndex={startIndex}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
