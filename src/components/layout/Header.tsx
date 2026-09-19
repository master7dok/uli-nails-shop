"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  User,
  Phone,
  Clock,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Send,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import VoiceSearchBar from "@/components/catalog/VoiceSearchBar";
import { initialCategories } from "@/lib/initialData";

export default function Header() {
  const { locale, dict, setLocale } = useLanguage();
  const { openCart, totalItems } = useCart();
  const { totalWishlist } = useWishlist();
  const pathname = usePathname();

  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE1D7] transition-all duration-300">
      {/* 1. TOP BAR: Delicately warm ivory/champagne luxury nude */}
      <div className="bg-gradient-to-r from-[#F5EFEB] via-[#FAF8F5] to-[#F5EFEB] text-charcoal/80 text-xs py-2 px-4 sm:px-8 border-b border-[#EAE1D7]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold-dark" />
              <span className="font-medium text-charcoal/90">{dict.topBar.schedule}</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gold-dark" />
              <a
                href={`tel:${dict.topBar.phone.replace(/[^0-9+]/g, "")}`}
                className="font-medium text-charcoal hover:text-gold-dark transition-colors"
              >
                {dict.topBar.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden lg:inline-flex items-center gap-1.5 text-gold-dark font-semibold text-[11px] bg-white/80 px-3 py-0.5 rounded-full border border-gold/30 shadow-xs">
              ✨ {dict.topBar.consultation}
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-charcoal/70 hover:text-gold-dark transition-colors"
                title="Instagram"
              >
                <span className="sr-only">Instagram</span>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="text-charcoal/70 hover:text-gold-dark transition-colors"
                title="Telegram"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://viber.click"
                target="_blank"
                rel="noreferrer"
                className="text-charcoal/70 hover:text-gold-dark transition-colors"
                title="Viber"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-charcoal hover:text-gold-dark"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href={`/${locale}`} className="flex flex-col group">
            <span className="font-serif text-2xl md:text-3xl font-semibold tracking-wider text-charcoal group-hover:text-gold-dark transition-colors">
              Uli<span className="text-gold font-serif italic">Nail</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-nude-500 font-sans -mt-1 font-medium">
              Luxury Beauty
            </span>
          </Link>

          {/* Smart Voice Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <VoiceSearchBar />
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#F5EFEB] rounded-full p-1 border border-[#EAE1D7]">
              <button
                onClick={() => setLocale("ua")}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                  locale === "ua"
                    ? "bg-gradient-to-r from-gold to-gold-dark text-white shadow-xs"
                    : "text-nude-600 hover:text-charcoal"
                }`}
              >
                UA
              </button>
              <button
                onClick={() => setLocale("pl")}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                  locale === "pl"
                    ? "bg-gradient-to-r from-gold to-gold-dark text-white shadow-xs"
                    : "text-nude-600 hover:text-charcoal"
                }`}
              >
                PL
              </button>
            </div>

            {/* Account */}
            <Link
              href={`/${locale}/account`}
              className="p-2.5 rounded-full text-charcoal hover:text-gold-dark hover:bg-nude-100 transition-all"
              title={dict.header.account}
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist */}
            <Link
              href={`/${locale}/account?tab=wishlist`}
              className="p-2.5 rounded-full text-charcoal hover:text-gold-dark hover:bg-nude-100 transition-all relative"
              title={dict.header.wishlist}
            >
              <Heart className="w-5 h-5" />
              {totalWishlist > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gold-dark text-white text-[10px] flex items-center justify-center font-bold">
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Cart Button with Luxury Gold Gradient */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 py-2 px-3.5 sm:px-4 rounded-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-[#96774E] text-white transition-all duration-300 shadow-luxury hover:shadow-gold-glow relative"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">
                {dict.header.cart}
              </span>
              <span className="w-5 h-5 rounded-full bg-white text-nude-900 text-xs font-extrabold flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 md:hidden">
          <VoiceSearchBar />
        </div>
      </div>

      {/* 3. NAVIGATION MENU (Dropdown Tree & Mega Menu) */}
      <nav className="hidden lg:block border-t border-[#EAE1D7] bg-white/60">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Mega Menu Catalog Dropdown */}
            <div
              className="relative py-3"
              onMouseEnter={() => setIsCatalogOpen(true)}
              onMouseLeave={() => setIsCatalogOpen(false)}
            >
              <Link
                href={`/${locale}/catalog`}
                className="flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-gold-dark transition-colors py-1"
              >
                <Sparkles className="w-4 h-4 text-gold-dark" />
                <span>{dict.nav.catalog}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isCatalogOpen ? "rotate-180 text-gold-dark" : ""
                  }`}
                />
              </Link>

              {/* Mega Dropdown Panel */}
              {isCatalogOpen && (
                <div className="absolute top-full left-0 w-[840px] bg-[#FAF8F5]/98 backdrop-blur-xl border border-[#EAE1D7] rounded-3xl shadow-luxury-lg p-6 grid grid-cols-3 gap-6 animate-fade-in z-50">
                  {initialCategories.map((cat) => (
                    <div key={cat.id} className="space-y-2">
                      <Link
                        href={`/${locale}/catalog?category=${cat.slug}`}
                        onClick={() => setIsCatalogOpen(false)}
                        className="font-serif text-base font-semibold text-charcoal hover:text-gold-dark block transition-colors border-b border-[#EAE1D7] pb-1"
                      >
                        {locale === "pl" ? cat.namePl : cat.nameUa}
                      </Link>
                      <ul className="space-y-1.5 pl-1">
                        {cat.subCategories.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              href={`/${locale}/catalog?category=${cat.slug}&subCategory=${sub.slug}`}
                              onClick={() => setIsCatalogOpen(false)}
                              className="text-xs text-nude-600 hover:text-gold-dark transition-colors block"
                            >
                              • {locale === "pl" ? sub.namePl : sub.nameUa}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Static Nav Links */}
            <Link
              href={`/${locale}/catalog?hit=true`}
              className="text-sm font-medium text-charcoal hover:text-gold-dark transition-colors py-3"
            >
              {dict.nav.bestsellers}
            </Link>
            <Link
              href={`/${locale}/cooperation`}
              className="text-sm font-medium text-charcoal hover:text-gold-dark transition-colors py-3"
            >
              {dict.nav.cooperation}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="text-sm font-medium text-charcoal hover:text-gold-dark transition-colors py-3"
            >
              {dict.nav.blog}
            </Link>
            <Link
              href={`/${locale}/delivery`}
              className="text-sm font-medium text-charcoal hover:text-gold-dark transition-colors py-3"
            >
              {dict.nav.delivery}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-sm font-medium text-charcoal hover:text-gold-dark transition-colors py-3"
            >
              {dict.nav.about}
            </Link>
            <Link
              href={`/${locale}/contacts`}
              className="text-sm font-medium text-charcoal hover:text-gold-dark transition-colors py-3"
            >
              {dict.nav.contacts}
            </Link>
          </div>

          <div className="text-xs text-gold-dark font-medium tracking-wider uppercase">
            Formula 9-Free • Professional Quality
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE1D7] bg-[#FAF8F5] p-6 space-y-4 shadow-lg">
          <Link
            href={`/${locale}/catalog`}
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-base font-semibold text-charcoal"
          >
            {dict.nav.catalog}
          </Link>
          <div className="pl-4 space-y-2 border-l border-nude-200">
            {initialCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/${locale}/catalog?category=${cat.slug}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm text-nude-700 hover:text-gold-dark"
              >
                {locale === "pl" ? cat.namePl : cat.nameUa}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-nude-200 space-y-3">
            <Link
              href={`/${locale}/catalog?hit=true`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-charcoal hover:text-gold-dark"
            >
              {dict.nav.bestsellers}
            </Link>
            <Link
              href={`/${locale}/cooperation`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-charcoal hover:text-gold-dark"
            >
              {dict.nav.cooperation}
            </Link>
            <Link
              href={`/${locale}/blog`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-charcoal hover:text-gold-dark"
            >
              {dict.nav.blog}
            </Link>
            <Link
              href={`/${locale}/delivery`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-charcoal hover:text-gold-dark"
            >
              {dict.nav.delivery}
            </Link>
            <Link
              href={`/${locale}/about`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-charcoal hover:text-gold-dark"
            >
              {dict.nav.about}
            </Link>
            <Link
              href={`/${locale}/contacts`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-charcoal hover:text-gold-dark"
            >
              {dict.nav.contacts}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
