import React from "react";
import { Handshake, CheckCircle2, Award, Percent } from "lucide-react";
import { Locale } from "@/types";

export default async function CooperationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const isPl = rawLocale === "pl";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">
          B2B & Partners
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
          {isPl ? "Współpraca dla salonów i instruktorów" : "Співпраця для салонів та інструкторів"}
        </h1>
        <p className="text-sm text-nude-600 max-w-xl mx-auto">
          {isPl
            ? "Oferujemy specjalne warunki hurtowe dla salonów kosmetycznych, szkół stylizacji paznokci oraz dystrybutorów."
            : "Спеціальні гуртові знижки, партнерські програми для шкіл манікюру та підтримка брендових студій."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-nude-200 shadow-sm space-y-3">
          <Percent className="w-8 h-8 text-gold-dark" />
          <h3 className="font-serif text-lg font-bold text-charcoal">
            {isPl ? "Zniżki hurtowe do 40%" : "Гуртові знижки до 40%"}
          </h3>
          <p className="text-xs text-nude-600 leading-relaxed">
            {isPl
              ? "Elastyczna skala rabatowa w zależności od miesięcznych obrotów salonu."
              : "Гнучка дисконтна сітка залежно від щомісячних обсягів замовлень вашої студії."}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-nude-200 shadow-sm space-y-3">
          <Award className="w-8 h-8 text-gold-dark" />
          <h3 className="font-serif text-lg font-bold text-charcoal">
            {isPl ? "Wsparcie dla instruktorów" : "Програма для викладачів"}
          </h3>
          <p className="text-xs text-nude-600 leading-relaxed">
            {isPl
              ? "Darmowe pakiety startowe dla kursantek oraz certyfikaty partnerskie."
              : "Набори матеріалів для учнів за спеццінами, сертифікати партнерських курсів."}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-nude-200 shadow-sm space-y-3">
          <Handshake className="w-8 h-8 text-gold-dark" />
          <h3 className="font-serif text-lg font-bold text-charcoal">
            {isPl ? "Osobisty opiekun" : "Персональний менеджер"}
          </h3>
          <p className="text-xs text-nude-600 leading-relaxed">
            {isPl
              ? "Priorytetowa obsługa zamówień i szybkie dostawy prosto do salonu."
              : "Пріоритетна комплектація, резервування рідкісних новинок та швидка відправка."}
          </p>
        </div>
      </div>
    </div>
  );
}
