"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  ChevronDown,
  X,
  Phone,
  Send,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import VoiceSearchBar from "@/components/catalog/VoiceSearchBar";
import UliNailLogo from "@/components/layout/UliNailLogo";
import { initialCategories } from "@/lib/initialData";

export default function Header() {
  const { locale, dict, setLocale } = useLanguage();
  const { openCart, totalItems } = useCart();
  const { totalWishlist } = useWishlist();
  const pathname = usePathname();

  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
      if (catalogRef.current && !catalogRef.current.contains(event.target as Node)) {
        setIsCatalogOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-pink-100/70 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* LEFT SECTION: Catalog pill button + Social icons */}
          <div className="flex items-center gap-3 sm:gap-5" ref={catalogRef}>
            {/* Pink Catalog Pill Button */}
            <div className="relative">
              <button
                onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                className="flex items-center gap-2 bg-brand-pink hover:bg-brand-pink-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                <span>{dict.header.catalogBtn || "КАТАЛОГ ПРОДУКЦІЇ"}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isCatalogOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Mega Dropdown Panel */}
              {isCatalogOpen && (
                <div className="absolute top-full left-0 mt-3 w-[320px] sm:w-[650px] lg:w-[780px] bg-white/98 backdrop-blur-xl border border-pink-100 rounded-3xl shadow-2xl p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in z-50">
                  {initialCategories.map((cat) => (
                    <div key={cat.id} className="space-y-2">
                      <Link
                        href={`/${locale}/catalog?category=${cat.slug}`}
                        onClick={() => setIsCatalogOpen(false)}
                        className="font-bold text-sm text-slate-800 hover:text-brand-pink block transition-colors border-b border-pink-100 pb-1 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-pink"></span>
                        {locale === "pl" ? cat.namePl : cat.nameUa}
                      </Link>
                      <ul className="space-y-1.5 pl-2">
                        {cat.subCategories.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              href={`/${locale}/catalog?category=${cat.slug}&subCategory=${sub.slug}`}
                              onClick={() => setIsCatalogOpen(false)}
                              className="text-xs text-slate-500 hover:text-brand-pink transition-colors block py-0.5"
                            >
                              — {locale === "pl" ? sub.namePl : sub.nameUa}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="sm:col-span-2 lg:col-span-3 pt-2 border-t border-pink-50 flex justify-end">
                    <Link
                      href={`/${locale}/catalog`}
                      onClick={() => setIsCatalogOpen(false)}
                      className="text-xs font-semibold text-brand-pink hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {dict.header.allCategories} &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Social Icons matching Screenshot 1 */}
            <div className="hidden md:flex items-center gap-2.5 text-slate-700">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-full hover:text-brand-pink hover:bg-pink-50 transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://wa.me"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-full hover:text-brand-pink hover:bg-pink-50 transition-colors"
                title="WhatsApp / Viber"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-full hover:text-brand-pink hover:bg-pink-50 transition-colors"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* CENTER SECTION: Brand Logo */}
          <div className="flex items-center justify-center">
            <Link href={`/${locale}`} className="cursor-pointer">
              <UliNailLogo size="md" />
            </Link>
          </div>

          {/* RIGHT SECTION: Language, Profile, Search, Wishlist, Round Cart, Menu */}
          <div className="flex items-center gap-1.5 sm:gap-3 text-slate-700">
            
            {/* Language Dropdown Selector (RU in screenshot, UA / PL in our app) */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider py-1.5 px-2.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <span>{locale.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-slate-100 rounded-xl shadow-lg py-1 w-24 z-50">
                  <button
                    onClick={() => {
                      setLocale("ua");
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-pink-50 hover:text-brand-pink transition-colors flex items-center justify-between ${
                      locale === "ua" ? "text-brand-pink font-bold" : "text-slate-700"
                    }`}
                  >
                    <span>UA</span>
                    <span className="text-[10px] text-slate-400">Укр</span>
                  </button>
                  <button
                    onClick={() => {
                      setLocale("pl");
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-pink-50 hover:text-brand-pink transition-colors flex items-center justify-between ${
                      locale === "pl" ? "text-brand-pink font-bold" : "text-slate-700"
                    }`}
                  >
                    <span>PL</span>
                    <span className="text-[10px] text-slate-400">Pol</span>
                  </button>
                </div>
              )}
            </div>

            {/* Profile */}
            <Link
              href={`/${locale}/account`}
              className="p-2 rounded-full hover:text-brand-pink hover:bg-pink-50 transition-colors"
              title={dict.header.account}
            >
              <User className="w-5 h-5 stroke-[1.8]" />
            </Link>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:text-brand-pink hover:bg-pink-50 transition-colors"
              title="Пошук"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* Wishlist */}
            <Link
              href={`/${locale}/account?tab=wishlist`}
              className="p-2 rounded-full hover:text-brand-pink hover:bg-pink-50 transition-colors relative"
              title={dict.header.wishlist}
            >
              <Heart className="w-5 h-5 stroke-[1.8]" />
              {totalWishlist > 0 && (
                <span className="absolute 1 top-1 right-1 w-4 h-4 rounded-full bg-brand-pink text-white text-[10px] flex items-center justify-center font-bold">
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Round Pink Cart Button matching Screenshot 1 */}
            <button
              onClick={openCart}
              aria-label={dict.header.cart}
              className="relative w-10 h-10 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 active:scale-95 group"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.2] transition-transform group-hover:scale-110" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-brand-pink text-[11px] font-extrabold border-2 border-brand-pink flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* MENU ≡ toggle button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex flex-col items-center justify-center pl-1 sm:pl-2 text-slate-800 hover:text-brand-pink transition-colors group"
              title={dict.header.menu || "МЕНЮ"}
            >
              <span className="text-[10px] font-extrabold tracking-widest uppercase mb-0.5">
                {dict.header.menu || "МЕНЮ"}
              </span>
              <div className="flex flex-col gap-1 w-5">
                <span className="h-[2px] w-full bg-slate-800 group-hover:bg-brand-pink rounded-full transition-colors"></span>
                <span className="h-[2px] w-full bg-slate-800 group-hover:bg-brand-pink rounded-full transition-colors"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Expandable Voice Search Bar if search icon is toggled or on mobile */}
        {isSearchOpen && (
          <div className="mt-3 pt-3 border-t border-pink-100 animate-fade-in">
            <VoiceSearchBar />
          </div>
        )}
      </div>

      {/* Slide-out Drawer Menu */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-pink-100 pb-4">
                <UliNailLogo size="sm" />
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/${locale}/catalog`}
                  onClick={() => setIsDrawerOpen(false)}
                  className="block text-base font-bold text-slate-800 hover:text-brand-pink py-1.5"
                >
                  {dict.nav.catalog}
                </Link>
                <Link
                  href={`/${locale}/catalog?hit=true`}
                  onClick={() => setIsDrawerOpen(false)}
                  className="block text-base font-bold text-slate-800 hover:text-brand-pink py-1.5"
                >
                  {dict.nav.bestsellers}
                </Link>
                <Link
                  href={`/${locale}/about`}
                  onClick={() => setIsDrawerOpen(false)}
                  className="block text-base font-bold text-slate-800 hover:text-brand-pink py-1.5"
                >
                  {dict.nav.about}
                </Link>
                <Link
                  href={`/${locale}/delivery`}
                  onClick={() => setIsDrawerOpen(false)}
                  className="block text-base font-bold text-slate-800 hover:text-brand-pink py-1.5"
                >
                  {dict.nav.delivery}
                </Link>
                <Link
                  href={`/${locale}/blog`}
                  onClick={() => setIsDrawerOpen(false)}
                  className="block text-base font-bold text-slate-800 hover:text-brand-pink py-1.5"
                >
                  {dict.nav.blog}
                </Link>
                <Link
                  href={`/${locale}/contacts`}
                  onClick={() => setIsDrawerOpen(false)}
                  className="block text-base font-bold text-slate-800 hover:text-brand-pink py-1.5"
                >
                  {dict.nav.contacts}
                </Link>
              </div>
            </div>

            <div className="border-t border-pink-100 pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-pink" />
                <a
                  href="tel:0956575327"
                  className="font-bold text-sm text-slate-800 hover:text-brand-pink"
                >
                  095 657 53 27
                </a>
              </div>
              <div className="flex items-center gap-4 text-slate-600">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-brand-pink">
                  Instagram
                </a>
                <span>•</span>
                <a href="https://t.me" target="_blank" rel="noreferrer" className="hover:text-brand-pink">
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
