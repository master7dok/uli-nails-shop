"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeImage = images[selectedIndex] || images[0] || "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800";

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-nude-100 border border-nude-200/80 shadow-luxury">
        <Image
          src={activeImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-all duration-500 hover:scale-105"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-nude-100 flex-shrink-0 border-2 transition-all ${
                selectedIndex === idx
                  ? "border-gold shadow-md scale-105"
                  : "border-nude-200 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
