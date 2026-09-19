"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

export default function ProductShowcase() {
  const { locale, dict } = useLanguage();
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const promoProduct = {
    id: "prod-top-crystal",
    title:
      locale === "pl"
        ? "Top do lakieru hybrydowego no-wipe Top Crystal 13ml"
        : "Топ для гель-лаку без липкого шару Top Crystal 13ml",
    price: locale === "pl" ? 45 : 350,
    image: "/images/promo_top_crystal.jpg",
    sku: "ULI-TC-13",
  };

  const handleAddToCart = () => {
    addItem({
      id: promoProduct.id,
      productId: promoProduct.id,
      title: promoProduct.title,
      image: promoProduct.image,
      price: promoProduct.price,
      quantity: 1,
      sku: promoProduct.sku,
      maxStock: 100,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <section className="relative my-12 py-8 sm:py-12 overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-gradient-to-r from-[#F7F9FF]/80 via-white/80 to-[#FFF5F8]/80 border border-pink-100 shadow-sm">
      
      {/* Iridescent background fluid blur blobs */}
      <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-[#C084FC]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-[#FF5E8E]/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: 3D Glossy Lavender Splashes and Bottles */}
        <div className="lg:col-span-6 relative aspect-square max-w-lg mx-auto w-full rounded-3xl overflow-hidden shadow-xl bg-white border border-purple-100">
          <Image
            src="/images/promo_top_crystal.jpg"
            alt="Top Crystal ULI NAIL"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 hover:scale-105"
            priority
          />
        </div>

        {/* Right Column: Typography & Dark Navy Button */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Big Pink Badge Header */}
          <span className="inline-block text-3xl sm:text-5xl lg:text-6xl font-black text-brand-pink tracking-tight drop-shadow-2xs">
            {dict.home.promoBadge || "НОВИНКА!"}
          </span>

          {/* Product Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {dict.home.promoTitle || "Топ для гель-лаку без липкого шару Top Crystal 13ml"}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
            <span className="font-bold text-slate-900">Top Crystal</span> — {dict.home.promoDesc || "це універсальний топ без липкого шару, який захищає покриття від пошкоджень і зберігає блиск до 4 тижнів."}
          </p>

          {/* Price */}
          <div className="pt-2">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {promoProduct.price} {locale === "pl" ? "zł" : "₴"}
            </span>
          </div>

          {/* Dark Navy Button matching Screenshot 4 */}
          <div className="pt-2">
            <button
              onClick={handleAddToCart}
              className={`px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider text-white flex items-center gap-3 transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl ${
                isAdded
                  ? "bg-emerald-600"
                  : "bg-brand-navy hover:bg-slate-900 hover:scale-102"
              }`}
            >
              <span>
                {isAdded
                  ? locale === "pl"
                    ? "DODANO DO KOSZYKA"
                    : "ДОДАНО В КОШИК"
                  : dict.home.promoAddToCart || "ДОДАТИ В КОШИК"}
              </span>
              {isAdded ? (
                <Check className="w-4 h-4" />
              ) : (
                <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
