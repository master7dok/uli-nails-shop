"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import UliNailLogo from "@/components/layout/UliNailLogo";

export default function Footer() {
  const { locale } = useLanguage();

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
    { nameUa: "СПІВПРАЦЯ", namePl: "WSPÓŁPRACA", href: `/${locale}/about` },
    { nameUa: "БЛОГ", namePl: "BLOG", href: `/${locale}/blog` },
    { nameUa: "ДОСТАВКА І ОПЛАТА", namePl: "DOSTAWA I PŁATNOŚĆ", href: `/${locale}/delivery` },
    { nameUa: "ПРО НАС", namePl: "O NAS", href: `/${locale}/about` },
    { nameUa: "ОБМІН ТА ПОВЕРНЕННЯ", namePl: "WYMIANA I ZWROTY", href: `/${locale}/delivery` },
    { nameUa: "ДОГОВІР ОФЕРТИ", namePl: "REGULAMIN", href: `/${locale}/privacy` },
    { nameUa: "ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ", namePl: "POLITYKA PRYWATNOŚCI", href: `/${locale}/privacy` },
    { nameUa: "КОНТАКТИ", namePl: "KONTAKT", href: `/${locale}/contacts` },
    { nameUa: "ULINAIL SUPPORT CENTER", namePl: "ULINAIL SUPPORT CENTER", href: `/${locale}/contacts` },
  ];

  return (
    <footer className="relative bg-[#0F1118] text-white overflow-hidden mt-16 border-t border-slate-800">
      
      {/* 3D Night Landscape Background matching Screenshot 5 */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <Image
          src="/images/footer_bg.jpg"
          alt="ULI NAIL Night landscape"
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1118] via-[#0F1118]/85 to-[#0F1118]/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          
          {/* COLUMN 1: Contact, Phone, Payment, Instagram, Logo */}
          <div className="md:col-span-4 space-y-6">
            
            {/* Payment Systems Row (VISA, Mastercard, Google Pay, Apple Pay) */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-white text-[#1A1F71] font-black text-xs tracking-wider shadow-sm">
                VISA
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white text-[#EB001B] font-black text-xs tracking-wider flex items-center gap-1 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EB001B] inline-block -mr-1.5 opacity-90"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] inline-block opacity-90"></span>
                <span className="text-slate-900 font-bold ml-1 text-[10px]">Mastercard</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white text-slate-800 font-bold text-xs tracking-wide shadow-sm flex items-center gap-1">
                <span className="text-blue-500 font-black">G</span>Pay
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white text-slate-900 font-bold text-xs tracking-wide shadow-sm flex items-center gap-0.5">
                Pay
              </span>
            </div>

            {/* Schedule */}
            <div>
              <p className="text-xs text-slate-400 font-medium">
                {locale === "pl" ? "Pn-Pt: od 10:00 do 19:00" : "Пн-Пт: з 10:00 до 19:00"}
              </p>
              {/* Big Phone Number */}
              <a
                href="tel:0956575327"
                className="text-2xl sm:text-3xl font-black text-white hover:text-brand-pink transition-colors tracking-tight block mt-1"
              >
                095 657 53 27
              </a>
            </div>

            {/* Email */}
            <div>
              <a
                href="mailto:ulinail.cooperation@gmail.com"
                className="text-xs sm:text-sm text-slate-300 hover:text-brand-pink transition-colors"
              >
                ulinail.cooperation@gmail.com
              </a>
            </div>

            {/* Pink Instagram Pill Button */}
            <div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-black uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>INSTAGRAM</span>
              </a>
            </div>

            {/* Brand Logo Inverted */}
            <div className="pt-2">
              <UliNailLogo inverted={true} size="md" />
            </div>
          </div>

          {/* COLUMN 2: Catalog Links */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {locale === "pl" ? "Katalog" : "Каталог"}
            </h3>
            <ul className="space-y-2.5">
              {catalogLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-xs font-bold tracking-wide text-slate-300 hover:text-brand-pink transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-brand-pink font-extrabold group-hover:translate-x-1 transition-transform">
                      —
                    </span>
                    <span>{locale === "pl" ? item.namePl : item.nameUa}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: ULINAIL Brand Links */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              ULINAIL
            </h3>
            <ul className="space-y-2.5">
              {brandLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-xs font-bold tracking-wide text-slate-300 hover:text-brand-pink transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-brand-pink font-extrabold group-hover:translate-x-1 transition-transform">
                      —
                    </span>
                    <span>{locale === "pl" ? item.namePl : item.nameUa}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="mt-14 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            {locale === "pl"
              ? '© 2026 "ULINAIL" — profesjonalny producent systemów hybrydowych'
              : '© 2026 "ULINAIL" — український виробник гель-лакових систем'}
          </p>
          <div className="flex items-center gap-2 text-slate-400 font-semibold tracking-wider uppercase text-[10px]">
            <span className="text-brand-pink">♦</span>
            <span>ULINAIL EXCELLENCE STUDIO</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
