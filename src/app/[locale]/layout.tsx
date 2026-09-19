import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSlideOver from "@/components/cart/CartSlideOver";
import CookieBanner from "@/components/layout/CookieBanner";
import PolishBackground from "@/components/layout/PolishBackground";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Locale } from "@/types";

export function generateStaticParams() {
  return [{ locale: "ua" }, { locale: "pl" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "pl" ? "pl" : "ua";

  return (
    <LanguageProvider initialLocale={locale}>
      <CartProvider>
        <WishlistProvider>
          <div className="flex flex-col min-h-screen relative">
            <PolishBackground />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartSlideOver />
            <CookieBanner />
            <ScrollToTop />
          </div>
        </WishlistProvider>
      </CartProvider>
    </LanguageProvider>
  );
}
