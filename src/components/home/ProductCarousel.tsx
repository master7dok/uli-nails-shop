"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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

        {/* End Card: Всі товари → matching Screenshot 4 */}
        <div className="w-[240px] sm:w-[260px] flex-shrink-0 snap-start">
          <Link
            href={`/${locale}/catalog`}
            className="group relative h-full min-h-[380px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#FF5E8E] via-[#E11D48] to-[#9F1239] p-6 text-white flex flex-col justify-end shadow-md hover:shadow-xl transition-all duration-300 block"
          >
            <div className="absolute inset-0 opacity-25 group-hover:opacity-35 transition-opacity pointer-events-none">
              <Image
                src="/images/cat_tops.jpg"
                alt="Каталог"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 space-y-3">
              <span className="text-[11px] uppercase tracking-widest font-extrabold text-pink-200 block">
                ULINAIL COLLECTION
              </span>
              <h3 className="text-2xl font-black text-white group-hover:text-pink-100 transition-colors leading-tight">
                {locale === "pl" ? "Wszystkie produkty" : "Всі товари"}
              </h3>
              <div className="w-full flex items-center gap-2 pt-2 border-t border-white/30">
                <span className="h-[2px] flex-1 bg-white/70 group-hover:bg-white transition-colors"></span>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
