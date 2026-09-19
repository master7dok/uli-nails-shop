import React from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { store } from "@/lib/store";
import { Locale } from "@/types";

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const isPl = rawLocale === "pl";
  const settings = store.getSettings();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
          {isPl ? "Kontakt" : "Контакти"}
        </h1>
        <p className="text-sm text-nude-600 max-w-md mx-auto">
          {isPl
            ? "Chętnie odpowiemy na wszystkie Twoje pytania i doradzimy w doborze materiałów."
            : "Ми завжди раді відповісти на будь-які ваші запитання та підібрати ідеальні матеріали."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-nude-200 shadow-sm space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-nude-100 text-gold-dark">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-nude-500 uppercase">{isPl ? "Telefon" : "Телефон"}</h4>
              <a href={`tel:${settings.phone}`} className="text-sm font-bold text-charcoal hover:text-gold transition-colors">
                {settings.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-nude-100 text-gold-dark">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-nude-500 uppercase">E-mail</h4>
              <a href={`mailto:${settings.email}`} className="text-sm font-bold text-charcoal hover:text-gold transition-colors">
                {settings.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-nude-100 text-gold-dark">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-nude-500 uppercase">{isPl ? "Godziny pracy" : "Графік роботи"}</h4>
              <p className="text-sm text-charcoal font-medium">
                {isPl ? settings.workingHoursPl : settings.workingHoursUa}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-nude-100 text-gold-dark">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-nude-500 uppercase">{isPl ? "Adres" : "Адреса"}</h4>
              <p className="text-sm text-charcoal font-medium">
                {isPl ? settings.addressPl : settings.addressUa}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Message Card */}
        <div className="p-8 rounded-3xl bg-nude-100/70 border border-nude-200 shadow-sm space-y-4">
          <h3 className="font-serif text-xl font-bold text-charcoal">
            {isPl ? "Szybki kontakt w komunikatorze" : "Швидкий зв'язок у месенджерах"}
          </h3>
          <p className="text-xs text-nude-600 leading-relaxed">
            {isPl
              ? "Napisz do nas na Telegram lub Viber, aby uzyskać natychmiastową odpowiedź od technologa."
              : "Напишіть нашому черговому технологу в Telegram або Viber, щоб отримати миттєву консультацію."}
          </p>

          <div className="pt-2 space-y-3">
            <a
              href={settings.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-[#229ED9] text-white text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" />
              <span>Telegram Chat</span>
            </a>

            <a
              href={settings.viberUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-[#7360F2] text-white text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Viber Chat</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
