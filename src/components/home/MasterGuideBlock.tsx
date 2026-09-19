"use client";

import React, { useState } from "react";
import { FileText, Download, CheckCircle2, X, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MasterGuideBlock() {
  const { locale, dict } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-14 my-8">
      <div className="relative rounded-3xl md:rounded-[2.5rem] bg-gradient-to-br from-nude-100 via-nude-100 to-blush/60 border border-nude-200/90 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-luxury">
        {/* Background decorative accent */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold-dark text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pro Education</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal leading-tight">
            {dict.home.masterGuideTitle}
          </h2>

          <p className="text-sm sm:text-base text-nude-800 leading-relaxed">
            {dict.home.masterGuideSubtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2 text-xs font-medium text-charcoal">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold-dark" />
              <span>Правильна адгезія без відшарувань</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold-dark" />
              <span>Робота з гіпергідрозними нігтями</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold-dark" />
              <span>Швидкісне моделювання без опилу</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold-dark" />
              <span>Збереження глянцю 30+ днів</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-[#96774E] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-luxury hover:shadow-gold-glow"
            >
              <FileText className="w-4 h-4 text-gold" />
              <span>{dict.home.downloadPdf}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Guide Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-nude-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-luxury-lg relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-nude-400 hover:text-charcoal hover:bg-nude-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gold/15 text-gold-dark">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-charcoal">
                  Технологічний протокол UliNail Pro
                </h3>
                <p className="text-xs text-nude-500">Керівництво з підготовки та нанесення матеріалів</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-charcoal leading-relaxed">
              <div className="p-4 rounded-2xl bg-nude-50 border border-nude-200">
                <h4 className="font-semibold text-nude-900 mb-1">Крок 1. Підготовка нігтьової пластини</h4>
                <p className="text-nude-600">
                  Виконайте апаратний або комбінований манікюр. Забафте поверхню бафом 180/240 грит. Ретельно знежирте дегідратором UliNail Dehydrator.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-nude-50 border border-nude-200">
                <h4 className="font-semibold text-nude-900 mb-1">Крок 2. Ґрунтувальний шар (Підкладка)</h4>
                <p className="text-nude-600">
                  Нанесіть втираючими рухами прозору еластичну базу Rubber Base. Полімеризуйте в LED лампі 60 секунд. Липкий шар не знімати!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-nude-50 border border-nude-200">
                <h4 className="font-semibold text-nude-900 mb-1">Крок 3. Моделювання або камуфляж</h4>
                <p className="text-nude-600">
                  Нанесіть Cover Base або рідкий гель Bottle Gel краплею з вирівнюванням апексу. Полімеризуйте 60-90 сек.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-nude-50 border border-nude-200">
                <h4 className="font-semibold text-nude-900 mb-1">Крок 4. Закріплення топом Crystal No Wipe</h4>
                <p className="text-nude-600">
                  Перекрийте топом без липкого шару, просушіть 60 сек у лампі. Залиште нігті охолонути на 30-40 сек перед нанесенням сухої олії з шимером.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-nude-200 flex items-center justify-between">
              <span className="text-xs text-nude-500">PDF Версія готова до друку</span>
              <button
                onClick={() => {
                  alert("Завантаження інструкції UliNail_Protocol_2025.pdf розпочато!");
                  setIsOpen(false);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold hover:bg-gold-dark text-nude-900 font-semibold text-xs transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Завантажити PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
