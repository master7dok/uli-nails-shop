"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Вгору"
      className="fixed bottom-8 right-6 z-50 w-12 h-12 rounded-full bg-white text-brand-pink shadow-xl hover:shadow-2xl border border-pink-100 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
    >
      <ArrowUp className="w-5 h-5 text-brand-pink stroke-[2.5] transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
}
