import React from "react";
import { Truck, CreditCard, ShieldCheck, Clock } from "lucide-react";
import { Locale } from "@/types";

export default async function DeliveryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const isPl = rawLocale === "pl";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
          {isPl ? "Dostawa i płatność" : "Доставка і оплата"}
        </h1>
        <p className="text-sm text-nude-600 max-w-xl mx-auto">
          {isPl
            ? "Szybka i bezpieczna wysyłka profesjonalnych kosmetyków w Polsce i Europie"
            : "Швидка та надійна доставка професійних матеріалів для манікюру по всій Україні та Європі"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-nude-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold-dark flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-xl font-bold text-charcoal">
            {isPl ? "Metody dostawy" : "Способи доставки"}
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-nude-700 leading-relaxed">
            <li>
              <strong>Нова Пошта:</strong> {isPl ? "1-2 dni robocze do paczkomatu lub oddziału." : "1-2 робочі дні у відділення або поштомат по всій Україні."}
            </li>
            <li>
              <strong>InPost Paczkomat:</strong> {isPl ? "Wysyłka w 24h w całej Polsce (darmowa od 200 zł)." : "Швидка доставка поштоматами InPost у Польщі та країнах ЄС."}
            </li>
            <li>
              <strong>Кур'єр:</strong> {isPl ? "Dostawa pod drzwi kurierem DPD / DHL." : "Адресна доставка кур'єром до дверей вашої студії чи дому."}
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-nude-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold-dark flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-xl font-bold text-charcoal">
            {isPl ? "Formy płatności" : "Способи оплати"}
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-nude-700 leading-relaxed">
            <li>
              <strong>Онлайн-оплата:</strong> {isPl ? "Karty Visa/Mastercard, BLIK, Apple Pay, Google Pay." : "Банківською карткою Visa / Mastercard, Apple Pay, Google Pay без комісії."}
            </li>
            <li>
              <strong>Оплата за реквізитами:</strong> {isPl ? "Faktura proforma i przelew tradycyjny (IBAN)." : "Безготівковий розрахунок на розрахунковий рахунок ФОП (IBAN)."}
            </li>
            <li>
              <strong>Післяплата:</strong> {isPl ? "Płatność przy odbiorze (Pobranie)." : "Оплата при отриманні у відділенні або кур'єру."}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
