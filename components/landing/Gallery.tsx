import React from 'react';
import Image from 'next/image';

interface GalleryProps {
  images: string[];
}

export function Gallery({ images }: GalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {images.map((src, index) => (
        <div key={index} className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-gray-100 shadow-sm border border-gray-200">
          <Image 
            src={src} 
            alt={`Property image ${index + 1}`} 
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );
}
