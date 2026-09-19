"use client";

import React, { useState } from "react";
import { FileText, CheckCircle2, X, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MasterGuideBlock() {
  const { locale, dict } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-10 my-6">
      <div className="relative rounded-3xl md:rounded-[2.5rem] bg-gradient-to-br from-white/95 via-[#FFF5F8]/95 to-[#F0F8FF]/95 backdrop-blur-md border border-pink-100/80 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-md">
        
        {/* Iridescent background fluid blur blobs */}
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[#00B4D8]/12 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-[#FF5E8E]/12 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200/80 text-brand-pink text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ULINAIL Pro Education</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            {dict.home.masterGuideTitle}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {dict.home.masterGuideSubtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 py-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-pink flex-shrink-0" />
              <span>
                {locale === "pl"
                  ? "Prawidłowa adhezja bez zapowietrzeń"
                  : "Правильна адгезія без відшарувань"}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-pink flex-shrink-0" />
              <span>
                {locale === "pl"
                  ? "Praca z płytką nadpotliwą"
                  : "Робота з гіпергідрозними нігтями"}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-pink flex-shrink-0" />
              <span>
                {locale === "pl"
                  ? "Szybkie modelowanie bez piłowania"
                  : "Швидкісне моделювання без опилу"}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-pink flex-shrink-0" />
              <span>
                {locale === "pl"
                  ? "Zachowanie lustrzanego błysku 30+ dni"
                  : "Збереження глянцю 30+ днів"}
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white font-black text-xs tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-pink-300 hover:scale-105 active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>{dict.home.downloadPdf}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Guide Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-pink-100 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-brand-pink hover:bg-pink-50 transition-colors"
              aria-label="Закрити"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-pink-50 text-brand-pink">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {locale === "pl"
                    ? "Protokół technologiczny ULINAIL Pro"
                    : "Технологічний протокол ULINAIL Pro"}
                </h3>
                <p className="text-xs text-slate-500">
                  {locale === "pl"
                    ? "Przewodnik po aplikacji i utwardzaniu materiałów"
                    : "Керівництво з підготовки та нанесення матеріалів"}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100">
                <h4 className="font-bold text-slate-900 mb-1">
                  {locale === "pl"
                    ? "Krok 1. Przygotowanie płytki paznokcia"
                    : "Крок 1. Підготовка нігтьової пластини"}
                </h4>
                <p className="text-slate-600">
                  {locale === "pl"
                    ? "Wykonaj manicure kombinowany lub frezarkowy. Zmatuj płytkę blokiem 180/240. Odtłuść dehydratorem ULINAIL Dehydrator."
                    : "Виконайте апаратний або комбінований манікюр. Забафте поверхню бафом 180/240 грит. Ретельно знежирте дегідратором ULINAIL Dehydrator."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100">
                <h4 className="font-bold text-slate-900 mb-1">
                  {locale === "pl"
                    ? "Krok 2. Warstwa podkładowa (Wcierka)"
                    : "Крок 2. Ґрунтувальний шар (Підкладка)"}
                </h4>
                <p className="text-slate-600">
                  {locale === "pl"
                    ? "Wmasuj cienką warstwę Rubber Base jako podkład. Utwardzaj w lampie LED 60 sekund. Nie przemywaj warstwy dyspersyjnej!"
                    : "Нанесіть втираючими рухами прозору еластичну базу Rubber Base. Полімеризуйте в LED лампі 60 секунд. Липкий шар не знімати!"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100">
                <h4 className="font-bold text-slate-900 mb-1">
                  {locale === "pl"
                    ? "Krok 3. Wyrównanie bazą Cover Base lub Light Acrylgel"
                    : "Крок 3. Вирівнювання Cover Base або Light Acrylgel"}
                </h4>
                <p className="text-slate-600">
                  {locale === "pl"
                    ? "Nałóż kroplę materiału na środek paznokcia, rozprowadź pędzelkiem i odwróć dłoń na 5 sekund do uzyskania idealnego bliku."
                    : "Нанесіть краплю матеріалу на зону апексу, розподіліть тонким пензлем по поверхні та переверніть пальчик на 5 секунд для створення ідеального бліку."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100">
                <h4 className="font-bold text-slate-900 mb-1">
                  {locale === "pl"
                    ? "Krok 4. Krystaliczne wykończenie Top Crystal No Wipe"
                    : "Крок 4. Кришталевий фініш Top Crystal No Wipe"}
                </h4>
                <p className="text-slate-600">
                  {locale === "pl"
                    ? "Zaaplikuj średnią warstwę Top Crystal. Utwardzaj w lampie UV/LED 48W przez 60-90 sekund. Odczekaj 30 sekund do ostygnięcia."
                    : "Нанесіть рівномірний середній шар Top Crystal. Полімеризуйте в UV/LED лампі 48W протягом 60-90 секунд. Дайте охолонути 30 секунд для бездоганного дзеркального блиску."}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-brand-pink text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                {locale === "pl" ? "Zamknij" : "Зрозуміло"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
