"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Locale } from "@/types";
import { getDictionary, Dictionary } from "@/lib/dictionary";
import { useRouter, usePathname } from "next/navigation";

interface LanguageContextType {
  locale: Locale;
  dict: Dictionary;
  setLocale: (newLocale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLocale = "ua",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      const segments = pathname.split("/").filter(Boolean);
      const firstSegment = segments[0];
      if (firstSegment === "ua" || firstSegment === "pl") {
        setLocaleState(firstSegment as Locale);
      }
    }
  }, [pathname]);

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    setLocaleState(newLocale);
    localStorage.setItem("ulinail_locale", newLocale);
    document.cookie = `ulinail_locale=${newLocale}; path=/; max-age=31536000`;

    if (pathname) {
      const segments = pathname.split("/").filter(Boolean);
      if (segments[0] === "ua" || segments[0] === "pl") {
        segments[0] = newLocale;
        router.push("/" + segments.join("/"));
      } else {
        router.push(`/${newLocale}${pathname}`);
      }
    } else {
      router.push(`/${newLocale}`);
    }
  };

  const dict = getDictionary(locale);

  return (
    <LanguageContext.Provider value={{ locale, dict, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
