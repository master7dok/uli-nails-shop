"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  ArrowRight,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on path change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsCatalogOpen(false);
    setIsSearchOpen(false);
    setIsLangDropdownOpen(false);
  }, [pathname]);

  // Click outside for language and catalog dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (langRef.current && !langRef.current.contains(target)) {
        setIsLangDropdownOpen(false);
      }
      if (catalogRef.current && !catalogRef.current.contains(target)) {
        setIsCatalogOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const catalogLinks = [
    { nameUa: "БАЗИ", namePl: "BAZY", href: `/${locale}/catalog?category=bases` },
    { nameUa: "РІДКІ ГЕЛІ (LIGHT)", namePl: "ŻELE PŁYNNE (LIGHT)", href: `/${locale}/catalog?category=builder-gels` },
    { nameUa: "ГЕЛІ ДЛЯ НАРОЩУВАННЯ", namePl: "ŻELE BUDUJĄCE", href: `/${locale}/catalog?category=builder-gels` },
    { nameUa: "ТОПИ", namePl: "TOPY", href: `/${locale}/catalog?category=tops` },
    { nameUa: "БЛИСКІТКИ", namePl: "BROKATY", href: `/${locale}/catalog?category=gel-polish` },
    { nameUa: "ІНСТРУМЕНТИ", namePl: "NARZĘDZIA", href: `/${locale}/catalog?category=tools` },
    { nameUa: "ДОПОМІЖНІ МАТЕРІАЛИ", namePl: "MATERIAŁY POMOCNICZE", href: `/${locale}/catalog` },
    { nameUa: "ГЕЛЬ ЛАКИ", namePl: "LAKIERY HYBRYDOWE", href: `/${locale}/catalog?category=gel-polish` },
    { nameUa: "МЕРЧ", namePl: "MERCH", href: `/${locale}/catalog` },
    { nameUa: "ОДНОФАЗНІ ГЕЛЬ-ЛАКИ", namePl: "LAKIERY JEDNOFAZOWE", href: `/${locale}/catalog?category=gel-polish` },
  ];

  const brandLinks = [
    { nameUa: "КАТАЛОГ", namePl: "KATALOG", href: `/${locale}/catalog` },
    { nameUa: "СПІВПРАЦЯ", namePl: "WSPÓŁPRACA", href: `/${locale}/about` },
    { nameUa: "БЛОГ", namePl: "BLOG", href: `/${locale}/blog` },
    { nameUa: "ДОСТАВКА І ОПЛАТА", namePl: "DOSTAWA I PŁATNOŚĆ", href: `/${locale}/delivery` },
    { nameUa: "ПРО НАС", namePl: "O NAS", href: `/${locale}/about` },
    { nameUa: "ОБМІН ТА ПОВЕРНЕННЯ", namePl: "WYMIANA I ZWROTY", href: `/${locale}/delivery` },
    { nameUa: "ДОГОВІР ОФЕРТИ", namePl: "REGULAMIN", href: `/${locale}/privacy` },
    { nameUa: "КОНТАКТИ", namePl: "KONTAKT", href: `/${locale}/contacts` },
    { nameUa: "ULINAIL SUPPORT CENTER", namePl: "ULINAIL SUPPORT CENTER", href: `/${locale}/contacts` },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-pink-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* LEFT SECTION: Catalog pill button + Social icons */}
          <div className="flex items-center gap-3 sm:gap-5" ref={catalogRef}>
            {/* Pink Catalog Pill Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsCatalogOpen((prev) => !prev);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 bg-brand-pink hover:bg-brand-pink-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span>{dict.header.catalogBtn || "КАТАЛОГ ПРОДУКЦІЇ"}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isCatalogOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Mega Dropdown Panel: 100% Solid Opaque Background with Premium Cards */}
              {isCatalogOpen && (
                <div className="absolute top-full left-0 mt-3 w-[320px] sm:w-[680px] lg:w-[840px] bg-white border-2 border-pink-200 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in z-50">
                  {initialCategories.map((cat) => (
                    <div
                      key={cat.id}
                      className="bg-gradient-to-b from-[#FFF5F8] to-[#F8FAFC] border border-pink-100/90 rounded-2xl p-4 shadow-2xs hover:border-pink-300 hover:shadow-sm transition-all"
                    >
                      <Link
                        href={`/${locale}/catalog?category=${cat.slug}`}
                        onClick={() => setIsCatalogOpen(false)}
                        className="font-extrabold text-sm text-slate-900 hover:text-brand-pink block transition-colors border-b border-pink-200/80 pb-2 mb-2 flex items-center gap-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-brand-pink"></span>
                        <span>{locale === "pl" ? cat.namePl : cat.nameUa}</span>
                      </Link>
                      <ul className="space-y-1.5 pl-1">
                        {cat.subCategories.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              href={`/${locale}/catalog?category=${cat.slug}&subCategory=${sub.slug}`}
                              onClick={() => setIsCatalogOpen(false)}
                              className="text-xs font-semibold text-slate-700 hover:text-brand-pink hover:translate-x-1 transition-all block py-0.5"
                            >
                              — {locale === "pl" ? sub.namePl : sub.nameUa}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="sm:col-span-2 lg:col-span-3 pt-3 border-t border-pink-100 flex justify-between items-center bg-pink-50/50 p-3 rounded-xl">
                    <span className="text-xs text-slate-600 font-medium">
                      {locale === "pl" ? "Ponad 200 profesjonalnych produktów" : "Понад 200 професійних товарів для майстрів"}
                    </span>
                    <Link
                      href={`/${locale}/catalog`}
                      onClick={() => setIsCatalogOpen(false)}
                      className="text-xs font-black text-brand-pink hover:underline flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{dict.header.allCategories} &rarr;</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Social Icons */}
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
            
            {/* Language Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider py-1.5 px-2.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <span>{locale.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {isLangDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl py-1 w-28 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setLocale("ua");
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-pink-50 hover:text-brand-pink transition-colors flex items-center justify-between cursor-pointer ${
                      locale === "ua" ? "text-brand-pink font-bold bg-pink-50/60" : "text-slate-700"
                    }`}
                  >
                    <span>UA</span>
                    <span className="text-[10px] text-slate-400">Укр</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLocale("pl");
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-pink-50 hover:text-brand-pink transition-colors flex items-center justify-between cursor-pointer ${
                      locale === "pl" ? "text-brand-pink font-bold bg-pink-50/60" : "text-slate-700"
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
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:text-brand-pink hover:bg-pink-50 transition-colors cursor-pointer"
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
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-brand-pink text-white text-[10px] flex items-center justify-center font-bold">
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Round Pink Cart Button */}
            <button
              type="button"
              onClick={openCart}
              aria-label={dict.header.cart}
              className="relative w-10 h-10 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 active:scale-95 group cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.2] transition-transform group-hover:scale-110" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-brand-pink text-[11px] font-extrabold border-2 border-brand-pink flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* MENU ≡ / ЗАКРИТИ ✕ Toggle Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen((prev) => !prev);
                setIsCatalogOpen(false);
              }}
              className="flex flex-col items-center justify-center pl-1 sm:pl-2 text-slate-800 hover:text-brand-pink transition-colors group cursor-pointer select-none"
              title={isMenuOpen ? dict.header.closeMenu || "ЗАКРИТИ" : dict.header.menu || "МЕНЮ"}
            >
              <span className="text-[10px] font-black tracking-widest uppercase mb-0.5">
                {isMenuOpen ? dict.header.closeMenu || "ЗАКРИТИ" : dict.header.menu || "МЕНЮ"}
              </span>
              <div className="flex flex-col gap-1 w-5 items-center">
                {isMenuOpen ? (
                  <span className="h-[2px] w-full bg-brand-pink rounded-full"></span>
                ) : (
                  <>
                    <span className="h-[2px] w-full bg-slate-800 group-hover:bg-brand-pink rounded-full transition-colors"></span>
                    <span className="h-[2px] w-full bg-slate-800 group-hover:bg-brand-pink rounded-full transition-colors"></span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Expandable Voice Search Bar */}
        {isSearchOpen && (
          <div className="mt-3 pt-3 border-t border-pink-100 animate-fade-in">
            <VoiceSearchBar />
          </div>
        )}
      </div>

      {/* FULL LUXURY DROPDOWN MENU MODAL matching Screenshot 1 */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 top-[65px] z-50 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="max-w-7xl mx-auto bg-white rounded-b-[2.5rem] md:rounded-[2.5rem] shadow-2xl border-2 border-pink-200 p-6 sm:p-10 lg:p-12 mt-2 mx-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
              
              {/* COLUMN 1: Каталог */}
              <div className="md:col-span-4 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-black text-brand-pink tracking-tight border-b border-pink-100 pb-2">
                  {locale === "pl" ? "Katalog" : "Каталог"}
                </h3>
                <ul className="space-y-3">
                  {catalogLinks.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-xs sm:text-sm font-bold tracking-wide text-slate-800 hover:text-brand-pink transition-colors flex items-center gap-2 group"
                      >
                        <span className="text-brand-pink font-extrabold group-hover:translate-x-1.5 transition-transform">
                          —
                        </span>
                        <span>{locale === "pl" ? item.namePl : item.nameUa}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COLUMN 2: ULINAIL Links */}
              <div className="md:col-span-4 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-black text-brand-pink tracking-tight border-b border-pink-100 pb-2">
                  ULINAIL
                </h3>
                <ul className="space-y-3">
                  {brandLinks.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-xs sm:text-sm font-bold tracking-wide text-slate-800 hover:text-brand-pink transition-colors flex items-center gap-2 group"
                      >
                        <span className="text-brand-pink font-extrabold group-hover:translate-x-1.5 transition-transform">
                          —
                        </span>
                        <span>{locale === "pl" ? item.namePl : item.nameUa}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COLUMN 3: Featured Visual Card (Наші Хіти →) */}
              <div className="md:col-span-4 flex flex-col">
                <Link
                  href={`/${locale}/catalog?hit=true`}
                  onClick={() => setIsMenuOpen(false)}
                  className="group relative block w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-pink-200 focus:outline-none"
                >
                  <Image
                    src="/images/promo_top_crystal.jpg"
                    alt="Наші Хіти ULINAIL"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Dark vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/30 to-transparent" />

                  {/* Bottom Text Label matching Screenshot 1 */}
                  <div className="absolute bottom-6 inset-x-6 z-10 text-white flex flex-col items-start">
                    <span className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:text-[#FFAEC3] transition-colors drop-shadow-md">
                      {locale === "pl" ? "Nasze Hity" : "Наші Хіти"}
                    </span>
                    <div className="mt-2 w-full flex items-center gap-3">
                      <span className="h-[2px] flex-1 bg-white/70 group-hover:bg-brand-pink transition-colors"></span>
                      <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}
    </header>
  );
}
