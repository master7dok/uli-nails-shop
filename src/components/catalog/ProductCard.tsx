"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check } from "lucide-react";
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

  return (
    <div className="group relative bg-white rounded-3xl border border-pink-100/70 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden p-3 sm:p-4">
      
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

      {/* Pill Badges Row matching Screenshot 3 */}
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

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between space-y-2">
        <div>
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

        {/* Pricing in Vibrant Pink & Add to Cart button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
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

          <button
            onClick={handleAddToCart}
            aria-label={dict.catalog.addToCart}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm ${
              isAdded
                ? "bg-emerald-600 text-white"
                : "bg-brand-navy hover:bg-brand-pink text-white"
            }`}
          >
            {isAdded ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
