"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Truck,
  CreditCard,
  ShieldCheck,
  Star,
  ChevronRight,
} from "lucide-react";
import { Product, ProductVariant } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductGallery from "./ProductGallery";
import ProductTabs from "./ProductTabs";
import ProductCarousel from "@/components/home/ProductCarousel";

interface ProductDetailViewProps {
  product: Product;
  categoryName: string;
  categorySlug: string;
  relatedProducts: Product[];
}

export default function ProductDetailView({
  product,
  categoryName,
  categorySlug,
  relatedProducts,
}: ProductDetailViewProps) {
  const { locale, dict } = useLanguage();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Dynamic variant selection
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Recently viewed products tracking
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ulinail_recently_viewed");
      let list: string[] = stored ? JSON.parse(stored) : [];
      list = [product.id, ...list.filter((id) => id !== product.id)].slice(0, 8);
      localStorage.setItem("ulinail_recently_viewed", JSON.stringify(list));
    } catch {}
  }, [product.id]);

  const title = locale === "pl" ? product.titlePl : product.titleUa;
  const description = locale === "pl" ? product.descriptionPl : product.descriptionUa;
  const usage = locale === "pl" ? product.usagePl : product.usageUa;
  const currency = locale === "pl" ? "zł" : "грн";
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}_${selectedVariant.id}`,
      productId: product.id,
      variantId: selectedVariant.id,
      title,
      variantName: locale === "pl" ? selectedVariant.namePl : selectedVariant.nameUa,
      image: product.images[0],
      price: Number(selectedVariant.price),
      oldPrice: selectedVariant.oldPrice ? Number(selectedVariant.oldPrice) : null,
      quantity,
      sku: selectedVariant.sku,
      maxStock: selectedVariant.stock || 50,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-nude-500 mb-8 overflow-x-auto whitespace-nowrap">
        <Link href={`/${locale}`} className="hover:text-gold transition-colors">
          Головна
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/${locale}/catalog`} className="hover:text-gold transition-colors">
          {dict.nav.catalog}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          href={`/${locale}/catalog?category=${categorySlug}`}
          className="hover:text-gold transition-colors"
        >
          {categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-charcoal font-medium truncate max-w-xs">{title}</span>
      </nav>

      {/* 2. Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Gallery */}
        <ProductGallery images={product.images} title={title} />

        {/* Info & Purchase Controls */}
        <div className="space-y-6">
          {/* Top metadata */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-nude-200 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-nude-500 font-mono">
                {dict.product.sku} <strong className="text-charcoal font-semibold">{selectedVariant.sku}</strong>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                ● {dict.product.inStock} ({selectedVariant.stock} шт.)
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5 text-xs text-gold">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                ))}
              </div>
              <span className="font-bold text-charcoal">5.0</span>
              <span className="text-nude-500">
                ({product.reviews?.filter((r) => r.isApproved).length || 1} {dict.product.reviewsCount})
              </span>
            </div>
          </div>

          {/* Title & Badges */}
          <div className="space-y-2">
            <div className="flex gap-2">
              {product.isHit && (
                <span className="px-2.5 py-0.5 rounded-full bg-gold text-white text-[11px] font-bold uppercase tracking-wider">
                  {dict.catalog.badges.hit}
                </span>
              )}
              {product.isNew && (
                <span className="px-2.5 py-0.5 rounded-full bg-blush-dark text-white text-[11px] font-bold uppercase tracking-wider">
                  {dict.catalog.badges.new}
                </span>
              )}
              {selectedVariant.oldPrice && (
                <span className="px-2.5 py-0.5 rounded-full bg-charcoal text-white text-[11px] font-bold uppercase tracking-wider">
                  {dict.catalog.badges.sale}
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal leading-tight">
              {title}
            </h1>
          </div>

          {/* Dynamic Price Display */}
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-nude-100/70 border border-nude-200">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-nude-900">
              {selectedVariant.price} {currency}
            </span>
            {selectedVariant.oldPrice && (
              <span className="text-base text-nude-500 line-through">
                {selectedVariant.oldPrice} {currency}
              </span>
            )}
            {selectedVariant.oldPrice && (
              <span className="text-xs px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 font-bold">
                -{Math.round(((selectedVariant.oldPrice - selectedVariant.price) / selectedVariant.oldPrice) * 100)}%
              </span>
            )}
          </div>

          {/* 3. Variant Selector (Volumes / Shades) */}
          {product.variants.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal block">
                {dict.product.selectVariant}
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((variant) => {
                  const isSelected = selectedVariant.id === variant.id;
                  const vName = locale === "pl" ? variant.namePl : variant.nameUa;

                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-semibold border transition-all flex items-center gap-2 ${
                        isSelected
                          ? "bg-gradient-to-r from-gold to-gold-dark text-white border-gold shadow-sm"
                          : "bg-white text-charcoal border-nude-200 hover:border-gold/60"
                      }`}
                    >
                      {variant.colorCode && (
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm"
                          style={{ backgroundColor: variant.colorCode }}
                        />
                      )}
                      <span>{vName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Quantity & Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-nude-200 rounded-2xl bg-white p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="p-2 text-nude-500 hover:text-charcoal transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-charcoal">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="p-2 text-nude-500 hover:text-charcoal transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Big Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-luxury ${
                  isAdded
                    ? "bg-emerald-700 text-white"
                    : "bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-[#96774E] text-white hover:shadow-gold-glow"
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
                    <span>{dict.product.addToCart}</span>
                  </>
                )}
              </button>

              {/* Wishlist Heart */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                title={inWishlist ? dict.product.removeFromWishlist : dict.product.addToWishlist}
                className={`p-3.5 rounded-2xl border transition-all shadow-sm ${
                  inWishlist
                    ? "bg-rose-50 border-rose-200 text-rose-600"
                    : "bg-white border-nude-200 text-charcoal hover:border-gold hover:text-gold"
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "fill-rose-500" : ""}`} />
              </button>
            </div>
          </div>

          {/* 5. Trust Badges (Shipping & Payment) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-nude-200">
            <div className="p-3.5 rounded-2xl bg-nude-50 border border-nude-200 flex items-start gap-3">
              <Truck className="w-5 h-5 text-gold-dark flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-semibold text-charcoal mb-0.5">Доставка</h5>
                <p className="text-[11px] text-nude-600 leading-tight">
                  Нова Пошта, InPost або кур'єрська адресна доставка
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-nude-50 border border-nude-200 flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-gold-dark flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-semibold text-charcoal mb-0.5">Оплата</h5>
                <p className="text-[11px] text-nude-600 leading-tight">
                  Онлайн Visa/Mastercard, BLIK, або при отриманні
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Tabs: Description, Usage, Ingredients, Reviews */}
      <ProductTabs
        productId={product.id}
        description={description}
        usage={usage}
        ingredients={product.ingredients}
        reviews={product.reviews}
      />

      {/* 7. Related / Recommended Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <ProductCarousel
            title={dict.product.relatedTitle}
            subtitle={dict.home.bestsellersSubtitle}
            products={relatedProducts}
          />
        </div>
      )}
    </div>
  );
}
