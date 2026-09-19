import React from "react";
import { Sparkles, Award, HeartHandshake } from "lucide-react";
import { Locale } from "@/types";

export default async function AboutPage({
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
          {isPl ? "O naszej marce" : "Про наш бренд"}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
          UliNail Luxury Beauty
        </h1>
        <p className="text-sm text-nude-600 max-w-2xl mx-auto leading-relaxed">
          {isPl
            ? "Tworzymy profesjonalne produkty do stylizacji paznokci, łącząc innowacyjne formuły 9-Free z wysublimowaną estetyką nude & gold."
            : "Ми створюємо преміальні матеріали для нігтьової естетики нового покоління. Наша філософія — бездоганна якість формул 9-Free, легкість у роботі для майстрів та витончений нюдовий стиль."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-nude-200 shadow-sm text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-nude-100 mx-auto text-gold-dark flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-base font-bold text-charcoal">
            {isPl ? "Czyste formuły" : "Формули нового покоління"}
          </h3>
          <p className="text-xs text-nude-600">
            {isPl ? "9-Free bez szkodliwych substancji, bezpieczne dla naturalnej płytki." : "Гіпоалергенний безпечний склад без токсичних компонентів."}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-nude-200 shadow-sm text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-nude-100 mx-auto text-gold-dark flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-base font-bold text-charcoal">
            {isPl ? "Standard instruktorski" : "Стандарти топ-інструкторів"}
          </h3>
          <p className="text-xs text-nude-600">
            {isPl ? "Testowane i udoskonalane przez najlepsze stylistki w Europie." : "Розроблено та протестовано практикуючими чемпіонами нейл-індустрії."}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-nude-200 shadow-sm text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-nude-100 mx-auto text-gold-dark flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-base font-bold text-charcoal">
            {isPl ? "Wsparcie społeczności" : "Підтримка майстрів"}
          </h3>
          <p className="text-xs text-nude-600">
            {isPl ? "Bezpłatne protokoły technologiczne i konsultacje." : "Безкоштовні технологічні карти, вебінари та постійний зв'язок з технологом."}
          </p>
        </div>
      </div>
    </div>
  );
}
