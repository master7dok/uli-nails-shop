"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "@/components/catalog/ProductCard";
import { useLanguage } from "@/context/LanguageContext";

interface ProductCarouselProps {
  title?: string;
  highlightTitle?: string;
  subtitle?: string;
  products: Product[];
}

export default function ProductCarousel({
  title,
  highlightTitle,
  subtitle,
  products,
}: ProductCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale, dict } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filterOptions = [
    { id: "all", labelUa: "Всі товари —", labelPl: "Wszystkie —" },
    { id: "bases", labelUa: "Бази —", labelPl: "Bazy —" },
    { id: "tops", labelUa: "Топи —", labelPl: "Topy —" },
    { id: "gel-polish", labelUa: "Гель лаки —", labelPl: "Lakiery —" },
  ];

  const filteredProducts = products.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "bases") return p.categoryId === "cat-bases";
    if (activeFilter === "tops") return p.categoryId === "cat-tops";
    if (activeFilter === "gel-polish") return p.categoryId === "cat-gel-polish";
    return true;
  });

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-10">
      {/* Title & Filter Pills Section matching Screenshot 3 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          {/* Two-tone Title */}
          <div className="space-y-0.5">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-pink tracking-tight">
              {highlightTitle || dict.home.bestsellersHighlight || "Хіти матеріалів"}
            </h3>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              {title || dict.home.bestsellersSubtitlePart || "для манікюру"}
            </h2>
          </div>

          {/* Dark Navy Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mt-5">
            {filterOptions.map((filter) => {
              const label = locale === "pl" ? filter.labelPl : filter.labelUa;
              const isActive = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 active:scale-95 ${
                    isActive
                      ? "bg-brand-pink text-white shadow-md"
                      : "bg-brand-navy hover:bg-slate-700 text-white shadow-xs"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full border border-pink-200 bg-white hover:bg-brand-pink hover:border-brand-pink hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-xs active:scale-90"
            aria-label="Назад"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollRight}
            className="w-10 h-10 rounded-full border border-pink-200 bg-white hover:bg-brand-pink hover:border-brand-pink hover:text-white text-slate-700 flex items-center justify-center transition-all shadow-xs active:scale-90"
            aria-label="Вперед"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Products Horizontal Carousel */}
      <div
        ref={containerRef}
        className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {displayProducts.map((product) => (
          <div
            key={product.id}
            className="w-[270px] sm:w-[290px] md:w-[305px] flex-shrink-0 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
