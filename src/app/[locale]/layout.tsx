import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSlideOver from "@/components/cart/CartSlideOver";
import CookieBanner from "@/components/layout/CookieBanner";
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
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartSlideOver />
            <CookieBanner />
          </div>
        </WishlistProvider>
      </CartProvider>
    </LanguageProvider>
  );
}
