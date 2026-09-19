import React from "react";
import HeroSlider from "@/components/home/HeroSlider";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductCarousel from "@/components/home/ProductCarousel";
import MasterGuideBlock from "@/components/home/MasterGuideBlock";
import InstagramFeed from "@/components/home/InstagramFeed";
import { store } from "@/lib/store";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/types";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "pl" ? "pl" : "ua";
  const dict = getDictionary(locale);

  const banners = store.getBanners().filter((b) => b.isActive);
  const categories = store.getCategories();
  const allProducts = store.getProducts().filter((p) => p.isActive !== false);

  const bestsellers = allProducts.filter((p) => p.isHit);
  const newArrivals = allProducts.filter((p) => p.isNew);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8">
      {/* 1. Hero Banner Slider */}
      <HeroSlider banners={banners} />

      {/* 2. Category Grid */}
      <CategoryGrid categories={categories} />

      {/* 3. Bestsellers Carousel */}
      <ProductCarousel
        title={dict.home.bestsellersTitle}
        subtitle={dict.home.bestsellersSubtitle}
        products={bestsellers.length > 0 ? bestsellers : allProducts.slice(0, 4)}
      />

      {/* 4. Fresh Arrivals Carousel */}
      <ProductCarousel
        title={dict.home.newTitle}
        subtitle={dict.home.newSubtitle}
        products={newArrivals.length > 0 ? newArrivals : allProducts.slice(2, 6)}
      />

      {/* 5. Master Guide & Materials Block */}
      <MasterGuideBlock />

      {/* 6. Instagram Feed */}
      <InstagramFeed />
    </div>
  );
}
