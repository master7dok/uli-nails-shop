import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Locale } from "@/types";

const ARTICLES = [
  {
    slug: "top-coat-mistakes",
    titleUa: "5 помилок при нанесенні глянцевого топу без липкого шару",
    titlePl: "5 błędów podczas aplikacji topu No Wipe",
    excerptUa: "Чому тьмяніє глянець, як уникнути сколів на торцях та як правильно охолоджувати топ після полімеризації.",
    excerptPl: "Dlaczego połysk matowieje, jak uniknąć odprysków na wolnym brzegu i jak prawidłowo chłodzić top po wyjęciu z lampy.",
    image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800",
    date: "14.01.2025",
    readTime: "4 хв",
  },
  {
    slug: "cat-eye-technique",
    titleUa: "Як створити ідеальний 3D блік у колекції Cat Eye Champagne",
    titlePl: "Jak uzyskać idealny błysk 3D z kolekcją Cat Eye Champagne",
    excerptUa: "Покрокова техніка роботи з неодимовим циліндричним магнітом для створення коштовного оксамитового ефекту.",
    excerptPl: "Instrukcja krok po kroku z magnesem neodymowym dla uzyskania aksamitnego, luksusowego efektu głębi.",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800",
    date: "10.01.2025",
    readTime: "6 хв",
  },
  {
    slug: "bottle-gel-vs-poly-gel",
    titleUa: "Bottle Gel чи Акрилгель: що обрати для зміцнення тонких нігтів?",
    titlePl: "Bottle Gel czy Akrylożel: co wybrać do wzmocnienia cienkich paznokci?",
    excerptUa: "Порівняльний аналіз пластичності, адгезії та швидкості роботи для майстрів різного досвіду.",
    excerptPl: "Analiza porównawcza elastyczności, przyczepności i tempa pracy dla salonów stylizacji paznokci.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800",
    date: "04.01.2025",
    readTime: "5 хв",
  },
];

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const isPl = rawLocale === "pl";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
          {isPl ? "Blog ekspercki UliNail" : "Експертний блог для майстрів"}
        </h1>
        <p className="text-sm text-nude-600 max-w-xl mx-auto">
          {isPl
            ? "Wskazówki technologiczne, trendy w stylizacji paznokci oraz sekrety trwałości od naszych instruktorów."
            : "Поради технологів, аналіз формул, тренди нейл-арту та секрети носіння матеріалів без відшарувань."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ARTICLES.map((art) => (
          <article
            key={art.slug}
            className="group bg-white rounded-3xl border border-nude-200 overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col"
          >
            <div className="relative h-56 w-full bg-nude-100 overflow-hidden">
              <Image
                src={art.image}
                alt={isPl ? art.titlePl : art.titleUa}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-nude-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {art.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {art.readTime}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-gold-dark transition-colors leading-snug">
                  {isPl ? art.titlePl : art.titleUa}
                </h3>

                <p className="text-xs text-nude-600 leading-relaxed line-clamp-3">
                  {isPl ? art.excerptPl : art.excerptUa}
                </p>
              </div>

              <div className="pt-2 border-t border-nude-100">
                <span className="text-xs font-semibold text-gold-dark group-hover:text-charcoal flex items-center gap-1.5 transition-colors">
                  <span>{isPl ? "Czytaj artykuł" : "Читати статтю"}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
