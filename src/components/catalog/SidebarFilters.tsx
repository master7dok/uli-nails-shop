"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Filter, RotateCcw, Check } from "lucide-react";
import { Category } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface SidebarFiltersProps {
  categories: Category[];
  selectedCategory?: string;
  selectedSubCategory?: string;
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
  inStockOnly: boolean;
  onInStockChange: (val: boolean) => void;
  selectedTags: {
    hit: boolean;
    new: boolean;
    sale: boolean;
    season: boolean;
  };
  onTagChange: (tag: "hit" | "new" | "sale" | "season") => void;
  onReset: () => void;
}

export default function SidebarFilters({
  categories,
  selectedCategory,
  selectedSubCategory,
  minPrice,
  maxPrice,
  onPriceChange,
  inStockOnly,
  onInStockChange,
  selectedTags,
  onTagChange,
  onReset,
}: SidebarFiltersProps) {
  const { locale, dict } = useLanguage();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    [selectedCategory || ""]: true,
    bases: true,
  });

  const toggleCategory = (slug: string) => {
    setOpenCategories((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const currency = locale === "pl" ? "zł" : "грн";

  return (
    <aside className="w-full lg:w-72 bg-white rounded-3xl p-6 border border-nude-200 shadow-sm space-y-6 flex-shrink-0 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-nude-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gold-dark" />
          <h3 className="font-serif text-lg font-semibold text-charcoal">
            {dict.catalog.filters}
          </h3>
        </div>
        <button
          onClick={onReset}
          title={dict.catalog.resetFilters}
          className="text-xs text-nude-500 hover:text-gold-dark flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{dict.catalog.resetFilters}</span>
        </button>
      </div>

      {/* 1. Category Tree */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-nude-700">
          {dict.catalog.categories}
        </h4>

        <div className="space-y-1 text-sm">
          {/* All products link */}
          <Link
            href={`/${locale}/catalog`}
            className={`block py-1.5 px-3 rounded-xl transition-colors ${
              !selectedCategory
                ? "bg-gradient-to-r from-gold to-gold-dark text-white font-semibold shadow-xs"
                : "text-charcoal hover:bg-nude-100"
            }`}
          >
            {dict.catalog.allProducts}
          </Link>

          {categories.map((cat) => {
            const isCatSelected = selectedCategory === cat.slug;
            const isOpen = openCategories[cat.slug] || isCatSelected;

            return (
              <div key={cat.id} className="space-y-1">
                <div className="flex items-center justify-between group">
                  <Link
                    href={`/${locale}/catalog?category=${cat.slug}`}
                    className={`flex-1 py-1.5 px-3 rounded-xl transition-colors text-sm ${
                      isCatSelected && !selectedSubCategory
                        ? "bg-nude-100 text-gold-dark font-semibold"
                        : "text-charcoal hover:text-gold-dark hover:bg-nude-50"
                    }`}
                  >
                    {locale === "pl" ? cat.namePl : cat.nameUa}
                  </Link>
                  {cat.subCategories.length > 0 && (
                    <button
                      onClick={() => toggleCategory(cat.slug)}
                      className="p-1.5 text-nude-400 hover:text-charcoal"
                    >
                      {isOpen ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>

                {/* Subcategories tree */}
                {isOpen && cat.subCategories.length > 0 && (
                  <div className="pl-4 space-y-1 border-l border-nude-200 ml-3 py-1">
                    {cat.subCategories.map((sub) => {
                      const isSubSelected = selectedSubCategory === sub.slug;
                      return (
                        <Link
                          key={sub.id}
                          href={`/${locale}/catalog?category=${cat.slug}&subCategory=${sub.slug}`}
                          className={`block py-1 px-2.5 rounded-lg text-xs transition-colors ${
                            isSubSelected
                              ? "bg-gradient-to-r from-gold to-gold-dark text-white font-semibold shadow-xs"
                              : "text-nude-600 hover:text-gold-dark hover:bg-nude-100/60"
                          }`}
                        >
                          {locale === "pl" ? sub.namePl : sub.nameUa}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Price Range */}
      <div className="space-y-3 pt-4 border-t border-nude-200">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-nude-700">
          {dict.catalog.priceRange} ({currency})
        </h4>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <span className="text-[11px] text-nude-500 block mb-1">{dict.catalog.from}</span>
            <input
              type="number"
              min={0}
              max={maxPrice}
              value={minPrice}
              onChange={(e) => onPriceChange(Number(e.target.value), maxPrice)}
              className="w-full bg-nude-50 border border-nude-200 rounded-xl px-2.5 py-1.5 text-xs text-charcoal focus:outline-none focus:border-gold"
            />
          </div>
          <span className="text-nude-400 pt-5">-</span>
          <div className="flex-1">
            <span className="text-[11px] text-nude-500 block mb-1">{dict.catalog.to}</span>
            <input
              type="number"
              min={minPrice}
              max={3000}
              value={maxPrice}
              onChange={(e) => onPriceChange(minPrice, Number(e.target.value))}
              className="w-full bg-nude-50 border border-nude-200 rounded-xl px-2.5 py-1.5 text-xs text-charcoal focus:outline-none focus:border-gold"
            />
          </div>
        </div>
      </div>

      {/* 3. In Stock Switch */}
      <div className="pt-4 border-t border-nude-200">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="w-4 h-4 rounded text-gold focus:ring-gold accent-gold-dark cursor-pointer"
          />
          <span className="text-xs font-medium text-charcoal">
            {dict.catalog.inStockOnly}
          </span>
        </label>
      </div>

      {/* 4. Badges / Tags Filter */}
      <div className="space-y-2.5 pt-4 border-t border-nude-200">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-nude-700">
          Особливості
        </h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTagChange("hit")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${
              selectedTags.hit
                ? "bg-gold text-white border-gold shadow-sm"
                : "bg-nude-50 text-charcoal border-nude-200 hover:border-gold"
            }`}
          >
            {selectedTags.hit && <Check className="w-3 h-3" />}
            <span>{dict.catalog.badges.hit}</span>
          </button>

          <button
            onClick={() => onTagChange("new")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${
              selectedTags.new
                ? "bg-blush-dark text-white border-blush-dark shadow-sm"
                : "bg-nude-50 text-charcoal border-nude-200 hover:border-blush-dark"
            }`}
          >
            {selectedTags.new && <Check className="w-3 h-3" />}
            <span>{dict.catalog.badges.new}</span>
          </button>

          <button
            onClick={() => onTagChange("sale")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${
              selectedTags.sale
                ? "bg-charcoal text-white border-charcoal shadow-sm"
                : "bg-nude-50 text-charcoal border-nude-200 hover:border-charcoal"
            }`}
          >
            {selectedTags.sale && <Check className="w-3 h-3" />}
            <span>{dict.catalog.badges.sale}</span>
          </button>

          <button
            onClick={() => onTagChange("season")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${
              selectedTags.season
                ? "bg-amber-700 text-white border-amber-700 shadow-sm"
                : "bg-nude-50 text-charcoal border-nude-200 hover:border-amber-700"
            }`}
          >
            {selectedTags.season && <Check className="w-3 h-3" />}
            <span>{dict.catalog.badges.season}</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
