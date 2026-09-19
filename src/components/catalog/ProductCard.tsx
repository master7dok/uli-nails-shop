"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check, ChevronDown } from "lucide-react";
import { Product } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { initialCategories } from "@/lib/initialData";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { locale, dict } = useLanguage();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const title = locale === "pl" ? product.titlePl : product.titleUa;
  const currency = locale === "pl" ? "zł" : "₴";
  const inWishlist = isInWishlist(product.id);

  // Fallback / main photo
  const mainImage = product.images[0] || "/images/cat_bases.jpg";

  // Category name lookup
  const category = initialCategories.find((c) => c.id === product.categoryId);
  const categoryLabel = category
    ? locale === "pl"
      ? category.namePl
      : category.nameUa
    : product.isHit
    ? locale === "pl"
      ? "Bestseller"
      : "Хіт продажу"
    : locale === "pl"
    ? "Materiały"
    : "Матеріали";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: `${product.id}_${selectedVariant?.id || "default"}`,
      productId: product.id,
      variantId: selectedVariant?.id,
      title,
      variantName: selectedVariant ? (locale === "pl" ? selectedVariant.namePl : selectedVariant.nameUa) : undefined,
      image: mainImage,
      price: Number(selectedVariant?.price || 0),
      oldPrice: selectedVariant?.oldPrice ? Number(selectedVariant.oldPrice) : null,
      quantity: 1,
      sku: selectedVariant?.sku || product.sku,
      maxStock: selectedVariant?.stock || 50,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedVariantIndex(Number(e.target.value));
  };

  return (
    <div className="group relative bg-white rounded-3xl border border-pink-100/70 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden p-3 sm:p-4 h-full justify-between">
      
      <div>
        {/* Top Photo Container with soft pastel backdrop */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-[#FFF5F8] to-[#F0F7FF] flex items-center justify-center mb-3">
          <Link href={`/${locale}/product/${product.slug}`} className="relative w-full h-full block">
            <Image
              src={mainImage}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </Link>

          {/* Wishlist Button top-right */}
          <button
            onClick={handleToggleWishlist}
            aria-label={inWishlist ? dict.product.removeFromWishlist : dict.product.addToWishlist}
            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 ${
              inWishlist
                ? "bg-white text-brand-pink shadow-md"
                : "bg-white/80 backdrop-blur-xs text-slate-400 hover:text-brand-pink hover:bg-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? "fill-brand-pink text-brand-pink" : ""}`} />
          </button>
        </div>

        {/* Pill Badges Row */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          {product.isNew && (
            <span className="px-2.5 py-0.5 rounded-full bg-brand-cyan text-white text-[10px] font-extrabold uppercase tracking-wide shadow-2xs">
              New
            </span>
          )}
          {product.isHit && (
            <span className="px-2.5 py-0.5 rounded-full bg-brand-pink text-white text-[10px] font-extrabold uppercase tracking-wide shadow-2xs">
              Top
            </span>
          )}
          {selectedVariant?.oldPrice && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#EF4444] text-white text-[10px] font-extrabold uppercase tracking-wide shadow-2xs">
              -11%
            </span>
          )}
          {product.isSeason && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#F43F5E] text-white text-[10px] font-extrabold uppercase tracking-wide shadow-2xs">
              Сезонний
            </span>
          )}
        </div>

        {/* Muted category label */}
        <span className="text-[11px] text-slate-400 font-medium block">
          {categoryLabel}
        </span>

        {/* Product Title */}
        <Link
          href={`/${locale}/product/${product.slug}`}
          className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-brand-pink transition-colors line-clamp-2 leading-snug mt-0.5"
        >
          {title}
        </Link>
      </div>

      {/* Pricing and Action Buttons matching Screenshot 4 */}
      <div className="pt-3 mt-2 border-t border-slate-100 space-y-2.5">
        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl sm:text-2xl font-black text-brand-pink tracking-tight">
            {selectedVariant?.price} {currency}
          </span>
          {selectedVariant?.oldPrice && (
            <span className="text-xs text-slate-400 line-through font-medium">
              {selectedVariant.oldPrice} {currency}
            </span>
          )}
        </div>

        {/* Actions Row: [ Volume ▾ ] [ В КОШИК 🛍️ ] [ ♡ ] */}
        <div className="flex items-center gap-1.5">
          {/* Volume Selector Pill Button */}
          {product.variants.length > 1 ? (
            <div className="relative">
              <select
                value={selectedVariantIndex}
                onChange={handleVariantChange}
                className="appearance-none bg-white border border-slate-200 hover:border-brand-pink text-slate-800 text-[11px] font-bold rounded-full pl-3 pr-6 py-2 cursor-pointer focus:outline-none transition-colors"
              >
                {product.variants.map((v, i) => (
                  <option key={v.id} value={i}>
                    {locale === "pl" ? v.namePl : v.nameUa}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          ) : (
            <span className="bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-semibold rounded-full px-2.5 py-1.5 whitespace-nowrap">
              {locale === "pl" ? selectedVariant?.namePl || "15ml" : selectedVariant?.nameUa || "15мл"}
            </span>
          )}

          {/* Navy [ В КОШИК 🛍️ ] Button */}
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-2 px-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 shadow-xs ${
              isAdded
                ? "bg-emerald-600 text-white"
                : "bg-brand-navy hover:bg-slate-900 text-white"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="text-[11px] whitespace-nowrap">
              {isAdded
                ? locale === "pl"
                  ? "DODANO"
                  : "ДОДАНО"
                : locale === "pl"
                ? "W KOSZYKU"
                : "В КОШИК"}
            </span>
          </button>

          {/* Wishlist quick toggle icon */}
          <button
            onClick={handleToggleWishlist}
            className="p-2 rounded-full border border-slate-200 hover:border-brand-pink text-slate-400 hover:text-brand-pink transition-colors"
            aria-label="Wishlist"
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                inWishlist ? "fill-brand-pink text-brand-pink" : ""
              }`}
            />
          </button>
        </div>
      </div>

    </div>
  );
}
