"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Category } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const { locale, dict } = useLanguage();

  return (
    <section className="py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-charcoal tracking-wide">
            {dict.home.categoriesTitle}
          </h2>
          <p className="text-xs sm:text-sm text-nude-500 mt-1 max-w-xl">
            {dict.home.categoriesSubtitle}
          </p>
        </div>
        <Link
          href={`/${locale}/catalog`}
          className="text-xs font-semibold text-gold-dark hover:text-charcoal uppercase tracking-wider flex items-center gap-1 transition-colors"
        >
          <span>{dict.header.allCategories}</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const name = locale === "pl" ? category.namePl : category.nameUa;
          const countText =
            locale === "pl"
              ? `${category.productCount || 12} produktów`
              : `${category.productCount || 12} товарів`;

          return (
            <Link
              key={category.id}
              href={`/${locale}/catalog?category=${category.slug}`}
              className="group relative h-80 rounded-3xl overflow-hidden shadow-luxury border border-nude-200/70 hover:border-gold/50 transition-all duration-500 block"
            >
              {/* Image */}
              <Image
                src={category.image || "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800"}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent transition-opacity group-hover:opacity-90" />

              {/* Counter Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-semibold tracking-wider">
                  {countText}
                </span>
              </div>

              {/* Text info */}
              <div className="absolute bottom-0 inset-x-0 p-6 z-10 text-white flex items-end justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-semibold mb-1 group-hover:text-gold-light transition-colors">
                    {name}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-[11px] text-nude-300">
                    {category.subCategories.slice(0, 2).map((sub) => (
                      <span key={sub.id} className="bg-black/30 px-2 py-0.5 rounded-md">
                        {locale === "pl" ? sub.namePl : sub.nameUa}
                      </span>
                    ))}
                    {category.subCategories.length > 2 && (
                      <span className="text-gold-light">+{category.subCategories.length - 2}</span>
                    )}
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-gold group-hover:text-nude-900 transition-all duration-300 transform group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
