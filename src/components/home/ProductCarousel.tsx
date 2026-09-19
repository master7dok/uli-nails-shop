"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "@/components/catalog/ProductCard";

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

export default function ProductCarousel({
  title,
  subtitle,
  products,
}: ProductCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-12">
      <div className="flex items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-charcoal tracking-wide">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-nude-500 mt-1">{subtitle}</p>
          )}
        </div>

        {/* Carousel arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full border border-nude-300 bg-white hover:bg-gold hover:border-gold hover:text-white text-charcoal flex items-center justify-center transition-all shadow-sm"
            title="Scroll Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            className="w-10 h-10 rounded-full border border-nude-300 bg-white hover:bg-gold hover:border-gold hover:text-white text-charcoal flex items-center justify-center transition-all shadow-sm"
            title="Scroll Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[280px] sm:min-w-[310px] md:min-w-[320px] max-w-[340px] flex-shrink-0 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
