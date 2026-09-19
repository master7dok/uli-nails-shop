"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Product, Category } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import ProductCard from "./ProductCard";
import SidebarFilters from "./SidebarFilters";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

interface CatalogViewProps {
  initialProducts: Product[];
  categories: Category[];
}

export default function CatalogView({
  initialProducts,
  categories,
}: CatalogViewProps) {
  const { locale, dict } = useLanguage();
  const searchParams = useSearchParams();

  const urlCategory = searchParams.get("category") || undefined;
  const urlSubCategory = searchParams.get("subCategory") || undefined;
  const urlSearch = searchParams.get("q") || "";
  const urlHit = searchParams.get("hit") === "true";

  // Filter states
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"popular" | "price_asc" | "price_desc" | "new">("popular");
  const [tags, setTags] = useState({
    hit: urlHit,
    new: false,
    sale: false,
    season: false,
  });

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleTagChange = (tag: "hit" | "new" | "sale" | "season") => {
    setTags((prev) => ({ ...prev, [tag]: !prev[tag] }));
  };

  const handleResetFilters = () => {
    setMinPrice(0);
    setMaxPrice(1500);
    setInStockOnly(false);
    setTags({ hit: false, new: false, sale: false, season: false });
  };

  // Filter logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Category filter
      if (urlCategory) {
        const cat = categories.find((c) => c.slug === urlCategory);
        if (cat && product.categoryId !== cat.id) return false;
      }

      // Subcategory filter
      if (urlSubCategory) {
        let subId: string | undefined;
        for (const c of categories) {
          const found = c.subCategories.find((s) => s.slug === urlSubCategory);
          if (found) {
            subId = found.id;
            break;
          }
        }
        if (subId && product.subCategoryId !== subId) return false;
      }

      // Search query (from text or voice search)
      if (urlSearch.trim()) {
        const q = urlSearch.toLowerCase();
        const matchesTitle =
          product.titleUa.toLowerCase().includes(q) ||
          product.titlePl.toLowerCase().includes(q) ||
          product.sku.toLowerCase().includes(q);
        if (!matchesTitle) return false;
      }

      // Price filter (check lowest variant price)
      const lowestPrice = Math.min(...product.variants.map((v) => v.price));
      if (lowestPrice < minPrice || lowestPrice > maxPrice) return false;

      // In stock
      if (inStockOnly) {
        const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
        if (totalStock <= 0) return false;
      }

      // Tags
      if (tags.hit && !product.isHit) return false;
      if (tags.new && !product.isNew) return false;
      if (tags.season && !product.isSeason) return false;
      if (tags.sale) {
        const hasSaleVariant = product.variants.some((v) => v.oldPrice && v.oldPrice > v.price);
        if (!hasSaleVariant) return false;
      }

      return true;
    });
  }, [
    initialProducts,
    categories,
    urlCategory,
    urlSubCategory,
    urlSearch,
    minPrice,
    maxPrice,
    inStockOnly,
    tags,
  ]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price_asc") {
      list.sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (sortBy === "price_desc") {
      list.sort((a, b) => b.variants[0].price - a.variants[0].price);
    } else if (sortBy === "new") {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Current category title
  const currentCategory = categories.find((c) => c.slug === urlCategory);
  const pageTitle = currentCategory
    ? locale === "pl"
      ? currentCategory.namePl
      : currentCategory.nameUa
    : dict.catalog.title;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-nude-200">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            {pageTitle}
          </h1>
          {urlSearch && (
            <p className="text-xs text-gold-dark mt-1 font-medium">
              Пошук за запитом: «{urlSearch}»
            </p>
          )}
          <p className="text-xs text-nude-500 mt-1">
            {dict.catalog.foundProducts} <strong className="text-charcoal font-semibold">{sortedProducts.length}</strong>
          </p>
        </div>

        {/* Mobile filter button & Sort selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-nude-200 text-xs font-semibold text-charcoal shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-gold" />
            <span>{dict.catalog.filters}</span>
          </button>

          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-2xl border border-nude-200 shadow-sm">
            <ArrowUpDown className="w-3.5 h-3.5 text-nude-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-medium text-charcoal focus:outline-none cursor-pointer"
            >
              <option value="popular">{dict.catalog.sortPopular}</option>
              <option value="price_asc">{dict.catalog.sortPriceAsc}</option>
              <option value="price_desc">{dict.catalog.sortPriceDesc}</option>
              <option value="new">{dict.catalog.sortNew}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + Products */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Filters Desktop */}
        <div className="hidden lg:block flex-shrink-0">
          <SidebarFilters
            categories={categories}
            selectedCategory={urlCategory}
            selectedSubCategory={urlSubCategory}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={handlePriceChange}
            inStockOnly={inStockOnly}
            onInStockChange={setInStockOnly}
            selectedTags={tags}
            onTagChange={handleTagChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* Mobile Filters Drawer */}
        {isMobileFiltersOpen && (
          <div className="lg:hidden w-full mb-6">
            <SidebarFilters
              categories={categories}
              selectedCategory={urlCategory}
              selectedSubCategory={urlSubCategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onPriceChange={handlePriceChange}
              inStockOnly={inStockOnly}
              onInStockChange={setInStockOnly}
              selectedTags={tags}
              onTagChange={handleTagChange}
              onReset={handleResetFilters}
            />
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1 w-full">
          {sortedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-nude-200 shadow-sm space-y-4">
              <p className="text-charcoal font-medium text-base">
                {dict.search.noResults}
              </p>
              <p className="text-xs text-nude-500 max-w-sm mx-auto">
                Спробуйте змінити критерії пошуку, скинути фільтри цін або вибрати іншу категорію.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-full bg-nude-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-gold-dark transition-colors"
              >
                {dict.catalog.resetFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
