"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, ShieldCheck, Truck, RefreshCw, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { locale, dict } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#F7F3EE] via-[#FAF8F5] to-[#EFE7DE] text-charcoal border-t border-[#E0D4C5] pt-16 pb-12 mt-20">
      {/* 1. Value Badges Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-14 border-b border-[#E0D4C5]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 bg-white/70 backdrop-blur-sm p-4 rounded-3xl border border-[#EAE1D7] shadow-sm hover:border-gold/50 transition-all">
            <div className="w-11 h-11 rounded-2xl bg-[#F5EFEB] border border-gold/30 flex items-center justify-center text-gold-dark flex-shrink-0 shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-charcoal">9-Free Formula</h4>
              <p className="text-[11px] text-[#736357]">Безпечні складові для нігтів</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/70 backdrop-blur-sm p-4 rounded-3xl border border-[#EAE1D7] shadow-sm hover:border-gold/50 transition-all">
            <div className="w-11 h-11 rounded-2xl bg-[#F5EFEB] border border-gold/30 flex items-center justify-center text-gold-dark flex-shrink-0 shadow-xs">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-charcoal">Швидка доставка</h4>
              <p className="text-[11px] text-[#736357]">Нова Пошта / InPost 1-2 дні</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/70 backdrop-blur-sm p-4 rounded-3xl border border-[#EAE1D7] shadow-sm hover:border-gold/50 transition-all">
            <div className="w-11 h-11 rounded-2xl bg-[#F5EFEB] border border-gold/30 flex items-center justify-center text-gold-dark flex-shrink-0 shadow-xs">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-charcoal">Легкий обмін</h4>
              <p className="text-[11px] text-[#736357]">14 днів на повернення</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/70 backdrop-blur-sm p-4 rounded-3xl border border-[#EAE1D7] shadow-sm hover:border-gold/50 transition-all">
            <div className="w-11 h-11 rounded-2xl bg-[#F5EFEB] border border-gold/30 flex items-center justify-center text-gold-dark flex-shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-charcoal">100% Оригінал</h4>
              <p className="text-[11px] text-[#736357]">Сертифікати відповідності</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={`/${locale}`} className="inline-block">
              <span className="font-serif text-3xl font-semibold tracking-wider text-charcoal">
                Uli<span className="text-gold italic font-serif">Nail</span>
              </span>
            </Link>
            <p className="text-xs text-[#736357] leading-relaxed max-w-sm">
              {dict.footer.aboutText}
            </p>

            <div className="pt-2">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-gold-dark mb-2">
                {dict.footer.subscribeTitle}
              </h5>
              <p className="text-xs text-[#736357] mb-3">{dict.footer.subscribeSubtitle}</p>
              {subscribed ? (
                <p className="text-xs text-emerald-700 font-medium">{dict.footer.subscribeSuccess}</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm shadow-xs">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={dict.footer.subscribePlaceholder}
                    className="flex-1 bg-white border border-[#DED3C4] rounded-l-full px-4 py-2.5 text-xs text-charcoal placeholder-nude-500/80 focus:outline-none focus:border-gold"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-[#96774E] text-white font-semibold px-4 py-2.5 rounded-r-full text-xs transition-all flex items-center justify-center shadow-xs"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Catalog Links */}
          <div className="space-y-3">
            <h5 className="font-serif text-base font-semibold text-charcoal">
              {dict.footer.shopTitle}
            </h5>
            <ul className="space-y-2 text-xs text-[#736357]">
              <li>
                <Link href={`/${locale}/catalog?category=bases`} className="hover:text-gold-dark transition-colors">
                  {locale === "pl" ? "Bazy hybrydowe" : "Бази для нігтів"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/catalog?category=tops`} className="hover:text-gold-dark transition-colors">
                  {locale === "pl" ? "Topy hybrydowe" : "Топи для манікюру"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/catalog?category=builder-gels`} className="hover:text-gold-dark transition-colors">
                  {locale === "pl" ? "Żele budujące" : "Гелі для нарощення"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/catalog?category=gel-polish`} className="hover:text-gold-dark transition-colors">
                  {locale === "pl" ? "Lakiery hybrydowe" : "Гель-лаки"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/catalog?category=tools`} className="hover:text-gold-dark transition-colors">
                  {locale === "pl" ? "Narzędzia" : "Інструменти & Фрези"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/catalog?category=care`} className="hover:text-gold-dark transition-colors">
                  {locale === "pl" ? "Pielęgnacja" : "Доглядова косметика"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Links */}
          <div className="space-y-3">
            <h5 className="font-serif text-base font-semibold text-charcoal">
              {dict.footer.clientsTitle}
            </h5>
            <ul className="space-y-2 text-xs text-[#736357]">
              <li>
                <Link href={`/${locale}/delivery`} className="hover:text-gold-dark transition-colors">
                  {dict.nav.delivery}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/cooperation`} className="hover:text-gold-dark transition-colors">
                  {dict.nav.cooperation}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-gold-dark transition-colors">
                  {dict.nav.blog}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-gold-dark transition-colors">
                  {dict.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-gold-dark transition-colors">
                  {dict.footer.termsOfService}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/returns`} className="hover:text-gold-dark transition-colors">
                  {dict.footer.returns}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h5 className="font-serif text-base font-semibold text-charcoal">
              {dict.footer.contactsTitle}
            </h5>
            <div className="space-y-2 text-xs text-[#736357]">
              <p className="text-charcoal font-semibold">{dict.topBar.phone}</p>
              <p>info@ulinail.com</p>
              <p>{dict.topBar.schedule}</p>
              <p className="pt-1 text-nude-600">
                {locale === "pl" ? "Warszawa, ul. Marszałkowska 100" : "Київ, вул. Хрещатик 22"}
              </p>
              <div className="pt-3">
                <Link
                  href="/admin"
                  className="inline-block text-[11px] text-[#736357] hover:text-gold-dark hover:border-gold transition-colors border border-[#DED3C4] bg-white/70 px-3 py-1 rounded-full shadow-xs"
                >
                  Адмін-панель
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar: Payment Logos & Copyright */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-8 border-t border-[#E0D4C5] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8A7C73]">
        <p>© {new Date().getFullYear()} UliNail Beauty Studio. {dict.footer.allRights}</p>

        {/* Payment Systems Badges */}
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E0D4C5] font-semibold text-[10px] text-charcoal/70 tracking-wider shadow-xs">
            VISA
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E0D4C5] font-semibold text-[10px] text-charcoal/70 tracking-wider shadow-xs">
            MASTERCARD
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E0D4C5] font-semibold text-[10px] text-charcoal/70 tracking-wider shadow-xs">
            APPLE PAY
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E0D4C5] font-semibold text-[10px] text-charcoal/70 tracking-wider shadow-xs">
            GOOGLE PAY
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E0D4C5] font-semibold text-[10px] text-charcoal/70 tracking-wider shadow-xs">
            BLIK
          </span>
        </div>
      </div>
    </footer>
  );
}
