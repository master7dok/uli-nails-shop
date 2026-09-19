"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check, Star } from "lucide-react";
import { Product } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { locale, dict } = useLanguage();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Selected variant in the inline selector
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const title = locale === "pl" ? product.titlePl : product.titleUa;
  const currency = locale === "pl" ? "zł" : "грн";
  const inWishlist = isInWishlist(product.id);

  // Photos
  const mainImage = product.images[0] || "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800";
  const hoverImage = product.images[1] || mainImage;

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

  const handleVariantSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedVariantIndex(Number(e.target.value));
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-3xl border border-nude-200/80 hover:border-gold/60 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Photo Container */}
      <Link
        href={`/${locale}/product/${product.slug}`}
        className="relative w-full pt-[105%] bg-nude-100 overflow-hidden block"
      >
        <Image
          src={isHovered ? hoverImage : mainImage}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isHit && (
            <span className="px-2.5 py-0.5 rounded-full bg-gold text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
              {dict.catalog.badges.hit}
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-0.5 rounded-full bg-blush-dark text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
              {dict.catalog.badges.new}
            </span>
          )}
          {selectedVariant?.oldPrice && (
            <span className="px-2.5 py-0.5 rounded-full bg-charcoal text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
              {dict.catalog.badges.sale}
            </span>
          )}
          {product.isSeason && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-700 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
              {dict.catalog.badges.season}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          title={inWishlist ? dict.product.removeFromWishlist : dict.product.addToWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10 shadow-sm ${
            inWishlist
              ? "bg-rose-50 text-rose-600"
              : "bg-white/80 backdrop-blur-sm text-charcoal hover:text-gold hover:bg-white"
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 text-gold text-xs mb-1.5">
            <Star className="w-3.5 h-3.5 fill-gold" />
            <span className="font-semibold text-charcoal text-xs">5.0</span>
            <span className="text-nude-500 text-[11px]">
              ({product.reviews?.length || 1})
            </span>
          </div>

          {/* Title */}
          <Link
            href={`/${locale}/product/${product.slug}`}
            className="font-serif text-base font-semibold text-charcoal hover:text-gold-dark transition-colors line-clamp-2 block leading-snug"
          >
            {title}
          </Link>
        </div>

        {/* Pricing & Inline Variant Select */}
        <div className="space-y-3 pt-2 border-t border-nude-100">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-nude-900 font-serif">
              {selectedVariant?.price} {currency}
            </span>
            {selectedVariant?.oldPrice && (
              <span className="text-xs text-nude-500 line-through">
                {selectedVariant.oldPrice} {currency}
              </span>
            )}
          </div>

          {/* Inline Variant Selector (Select volume or color) */}
          {product.variants.length > 1 && (
            <div className="flex items-center gap-2">
              <label className="text-[11px] font-medium text-nude-500 whitespace-nowrap">
                {dict.catalog.selectVolume}
              </label>
              <select
                value={selectedVariantIndex}
                onChange={handleVariantSelect}
                className="flex-1 bg-nude-100/90 text-charcoal border border-nude-200 rounded-xl px-2 py-1 text-xs font-medium focus:outline-none focus:border-gold cursor-pointer"
              >
                {product.variants.map((v, i) => (
                  <option key={v.id} value={i}>
                    {locale === "pl" ? v.namePl : v.nameUa} — {v.price} {currency}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Add To Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-2xl text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-sm ${
              isAdded
                ? "bg-emerald-700 text-white"
                : "bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-[#96774E] text-white shadow-luxury hover:shadow-gold-glow"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>{dict.catalog.inCart}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-gold-light" />
                <span>{dict.catalog.addToCart}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
