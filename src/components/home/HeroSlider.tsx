"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { HeroBanner } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSliderProps {
  banners?: HeroBanner[];
}

export default function HeroSlider({ banners }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { locale, dict } = useLanguage();

  const slides = [
    {
      id: "slide-1",
      titleTop: "New collection!",
      titleMain: "Rich One Color by ULINAIL",
      btnText: locale === "pl" ? "ZAMÓW NOWOŚĆ" : "ЗАМОВИТИ НОВИНКУ",
      link: `/${locale}/catalog?new=true`,
      image: "/images/hero_splash.jpg",
    },
    {
      id: "slide-2",
      titleTop: locale === "pl" ? "Profesjonalny połysk" : "Бездоганний глянець",
      titleMain: "Top Crystal & Rubber Base ULI NAIL",
      btnText: locale === "pl" ? "DO KATALOGU" : "ПЕРЕЙТИ В КАТАЛОГ",
      link: `/${locale}/catalog`,
      image: "/images/promo_top_crystal.jpg",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlide = slides[currentIndex];

  return (
    <section className="my-6">
      {/* 1. HERO SLIDER CONTAINER */}
      <div className="relative w-full h-[400px] sm:h-[460px] md:h-[500px] rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-xl bg-gradient-to-r from-[#242730] via-[#474A58] to-[#EEF5FF] border border-pink-100/50">
        
        {/* Dynamic 3D fluid imagery on right side */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={currentSlide.image}
              alt={currentSlide.titleMain}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover object-right md:object-center"
            />
            {/* Cinematic dual gradient overlay matching Screenshot 1 */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E212B]/90 via-[#2F3340]/60 to-transparent w-full md:w-[70%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
          </motion.div>
        </AnimatePresence>

        {/* Decorative Glossy Droplets on edges */}
        <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-gradient-to-tr from-[#FF5E8E]/40 to-[#A855F7]/30 blur-2xl pointer-events-none" />
        <div className="absolute -top-10 right-10 w-40 h-40 rounded-full bg-gradient-to-bl from-[#38BDF8]/40 to-transparent blur-3xl pointer-events-none" />

        {/* Hero Slider Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center">
          <div className="max-w-xl space-y-5">
            <motion.div
              key={`text-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-1 sm:space-y-2"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FFAEC3] md:text-[#FF8DA7] drop-shadow-sm tracking-tight">
                {currentSlide.titleTop}
              </h2>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                {currentSlide.titleMain}
              </h1>
            </motion.div>

            {/* Pink Pill Button CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="pt-2"
            >
              <Link
                href={currentSlide.link}
                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg hover:shadow-pink-400/50 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <span>{currentSlide.btnText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Dots Pagination (bottom left, matching Screenshot 1) */}
          <div className="absolute bottom-6 left-6 sm:left-12 flex items-center gap-2">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i % slides.length)}
                className={`transition-all duration-300 rounded-full ${
                  i === (currentIndex * 3) || (currentIndex === 0 && i === 0) || (currentIndex === 1 && i === 3)
                    ? "w-3 h-3 bg-brand-pink shadow-xs"
                    : "w-2 h-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2. SLOGAN STRIP (Matching Screenshot 1 & 2 bottom banner) */}
      <div className="pt-8 pb-4 text-center sm:text-left px-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          <span className="text-brand-pink font-black mr-2">
            {dict.home.sloganHighlight || "ULINAIL:"}
          </span>
          <span className="text-slate-800 font-extrabold">
            {dict.home.sloganText || "твій яскравий шлях до досконалості!"}
          </span>
        </h2>
      </div>
    </section>
  );
}
