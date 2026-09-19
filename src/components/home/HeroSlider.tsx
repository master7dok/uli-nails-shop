"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { HeroBanner } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSliderProps {
  banners: HeroBanner[];
}

export default function HeroSlider({ banners }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { locale, dict } = useLanguage();

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (!banners || banners.length === 0) return null;

  const currentBanner = banners[currentIndex];
  const title = locale === "pl" ? currentBanner.titlePl : currentBanner.titleUa;
  const sub = locale === "pl" ? currentBanner.subPl : currentBanner.subUa;
  const btnText = locale === "pl" ? currentBanner.buttonPl : currentBanner.buttonUa;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="relative w-full h-[520px] md:h-[620px] rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-luxury-lg bg-nude-900 my-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={currentBanner.imageUrl}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.78]"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center">
        <div className="max-w-2xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-gold-light text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{dict.hero.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-wide leading-tight"
          >
            {title}
          </motion.h1>

          {sub && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm sm:text-base text-nude-100/90 leading-relaxed font-light max-w-xl"
            >
              {sub}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link
              href={currentBanner.link ? `/${locale}${currentBanner.link}` : `/${locale}/catalog`}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gold hover:bg-gold-dark text-nude-900 font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-luxury hover:shadow-gold-glow group"
            >
              <span>{btnText || dict.hero.cta}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href={`/${locale}/catalog`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/15 backdrop-blur-md hover:bg-white/25 border border-white/30 text-white font-medium text-xs tracking-wider uppercase transition-all"
            >
              {dict.hero.exploreCatalog}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Slider Controls */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-gold hover:text-nude-900 transition-all"
            title="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-gold hover:text-nude-900 transition-all"
            title="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === i ? "w-8 bg-gold" : "w-2 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
