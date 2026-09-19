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

  // Featured 4 primary categories matching Screenshot 2
  const featuredCards = [
    {
      id: "bases",
      slug: "bases",
      nameUa: "Бази",
      namePl: "Bazy",
      countUa: "63 товари",
      countPl: "63 produkty",
      image: "/images/cat_bases.jpg",
    },
    {
      id: "liquid-gels",
      slug: "builder-gels",
      nameUa: "Рідкі гелі (LIGHT)",
      namePl: "Żele płynne (LIGHT)",
      countUa: "66 товарів",
      countPl: "66 produktów",
      image: "/images/cat_liquid_gel.jpg",
    },
    {
      id: "builder-gels",
      slug: "builder-gels",
      nameUa: "Гелі для нарощування",
      namePl: "Żele do przedłużania",
      countUa: "86 товарів",
      countPl: "86 produktów",
      image: "/images/cat_builder_gel.jpg",
    },
    {
      id: "tops",
      slug: "tops",
      nameUa: "Топи",
      namePl: "Topy",
      countUa: "54 товари",
      countPl: "54 produkty",
      image: "/images/cat_tops.jpg",
    },
  ];

  return (
    <section className="py-8">
      {/* 4 Cards Grid exactly matching Screenshot 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredCards.map((card) => {
          const title = locale === "pl" ? card.namePl : card.nameUa;
          const count = locale === "pl" ? card.countPl : card.countUa;

          return (
            <Link
              key={card.id}
              href={`/${locale}/catalog?category=${card.slug}`}
              className="group flex flex-col focus:outline-none"
            >
              {/* Image Container with 3D product render on podium */}
              <div className="relative aspect-[4/5] w-full rounded-3xl md:rounded-[2rem] overflow-hidden bg-slate-100 shadow-md group-hover:shadow-xl transition-all duration-300 border border-pink-100/60">
                <Image
                  src={card.image}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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

      {/* Secondary Categories Quick Pills matching Screenshots */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-6 mt-4">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-brand-pink hover:text-white text-slate-700 text-xs font-bold border border-pink-100 shadow-2xs transition-all duration-200 group"
          >
            <span>{locale === "pl" ? sec.namePl : sec.nameUa}</span>
            <span className="px-2 py-0.5 rounded-full bg-pink-50 group-hover:bg-white/20 text-brand-pink group-hover:text-white text-[10px] font-extrabold transition-colors">
              {sec.count}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
