"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface CategoryGridProps {
  categories?: Category[];
}

export default function CategoryGrid({ categories = [] }: CategoryGridProps) {
  const { locale, dict } = useLanguage();

  // ROW 1: Minimalist Rectangular Cuboid & Cube Jar Series
  const row1Cards = [
    {
      id: "bases-cuboid",
      slug: "bases",
      nameUa: "Бази",
      namePl: "Bazy",
      countUa: "63 товари",
      countPl: "63 produkty",
      image: "/images/cat_bases.jpg",
    },
    {
      id: "liquid-gels-cuboid",
      slug: "builder-gels",
      nameUa: "Рідкі гелі (LIGHT)",
      namePl: "Żele płynne (LIGHT)",
      countUa: "66 товарів",
      countPl: "66 produktów",
      image: "/images/cat_liquid_gel.jpg",
    },
    {
      id: "builder-gels-cube",
      slug: "builder-gels",
      nameUa: "Гелі для нарощування",
      namePl: "Żele do przedłużania",
      countUa: "86 товарів",
      countPl: "86 produktów",
      image: "/images/cat_builder_gel.jpg",
    },
    {
      id: "tops-cuboid",
      slug: "tops",
      nameUa: "Топи",
      namePl: "Topy",
      countUa: "54 товари",
      countPl: "54 produkty",
      image: "/images/cat_tops.jpg",
    },
  ];

  // ROW 2: Surreal 3D Dream Edition Series (All images with '2' ending)
  const row2Cards = [
    {
      id: "bases-dream",
      slug: "bases",
      nameUa: "Каучукові бази",
      namePl: "Bazy kauczukowe",
      countUa: "48 товарів",
      countPl: "48 produktów",
      image: "/images/cat_bases2.jpg",
    },
    {
      id: "liquid-gels-dream",
      slug: "builder-gels",
      nameUa: "LIGHT Acrylgel 49",
      namePl: "LIGHT Acrylgel 49",
      countUa: "72 товари",
      countPl: "72 produkty",
      image: "/images/cat_liquid_gel2.jpg",
    },
    {
      id: "builder-gels-prism",
      slug: "builder-gels",
      nameUa: "Моделюючі гелі",
      namePl: "Żele modelujące",
      countUa: "95 товарів",
      countPl: "95 produktów",
      image: "/images/cat_builder_gel2.jpg",
    },
    {
      id: "tops-sakura",
      slug: "tops",
      nameUa: "Топи без липкого шару",
      namePl: "Topy no-wipe",
      countUa: "60 товарів",
      countPl: "60 produktów",
      image: "/images/cat_tops2.jpg",
    },
  ];

  return (
    <section className="py-8 space-y-8">
      
      {/* ROW 1: 4 Cards Grid */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {row1Cards.map((card) => {
            const title = locale === "pl" ? card.namePl : card.nameUa;
            const count = locale === "pl" ? card.countPl : card.countUa;

            return (
              <Link
                key={card.id}
                href={`/${locale}/catalog?category=${card.slug}`}
                className="group flex flex-col focus:outline-none"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] w-full rounded-3xl md:rounded-[2rem] overflow-hidden bg-slate-100 shadow-md group-hover:shadow-2xl transition-all duration-300 border-2 border-pink-100">
                  <Image
                    src={card.image}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Pink Pill Badge Counter */}
                <div className="mt-3.5 mb-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-brand-pink text-white text-[11px] font-bold tracking-wider shadow-xs">
                    {count}
                  </span>
                </div>

                {/* Bold Category Title */}
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-brand-pink transition-colors tracking-tight leading-snug">
                  {title}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ROW 2: 4 Cards Grid (Using all cat_*2.jpg images) */}
      <div className="pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {row2Cards.map((card) => {
            const title = locale === "pl" ? card.namePl : card.nameUa;
            const count = locale === "pl" ? card.countPl : card.countUa;

            return (
              <Link
                key={card.id}
                href={`/${locale}/catalog?category=${card.slug}`}
                className="group flex flex-col focus:outline-none"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] w-full rounded-3xl md:rounded-[2rem] overflow-hidden bg-slate-100 shadow-md group-hover:shadow-2xl transition-all duration-300 border-2 border-pink-100">
                  <Image
                    src={card.image}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Pink Pill Badge Counter */}
                <div className="mt-3.5 mb-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-brand-pink text-white text-[11px] font-bold tracking-wider shadow-xs">
                    {count}
                  </span>
                </div>

                {/* Bold Category Title */}
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-brand-pink transition-colors tracking-tight leading-snug">
                  {title}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Secondary Categories Quick Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-4 border-t border-pink-100/80">
        {[
          { id: "glitter", slug: "gel-polish", nameUa: "Блискітки", namePl: "Brokaty", count: "24" },
          { id: "tools", slug: "tools", nameUa: "Інструменти", namePl: "Narzędzia", count: "35" },
          { id: "aux", slug: "care", nameUa: "Допоміжні матеріали", namePl: "Materiały pomocnicze", count: "50" },
          { id: "polish", slug: "gel-polish", nameUa: "Гель лаки", namePl: "Lakiery hybrydowe", count: "206" },
          { id: "onestep", slug: "gel-polish", nameUa: "Однофазні гель-лаки", namePl: "Lakiery 1-fazowe", count: "19" },
        ].map((sec) => (
          <Link
            key={sec.id}
            href={`/${locale}/catalog?category=${sec.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-brand-pink hover:text-white text-slate-800 text-xs font-bold border-2 border-pink-200/80 shadow-xs transition-all duration-200 group"
          >
            <span>{locale === "pl" ? sec.namePl : sec.nameUa}</span>
            <span className="px-2 py-0.5 rounded-full bg-pink-100 group-hover:bg-white/20 text-brand-pink group-hover:text-white text-[10px] font-black transition-colors">
              {sec.count}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
