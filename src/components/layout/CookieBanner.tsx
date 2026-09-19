"use client";

import React, { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { dict } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem("ulinail_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("ulinail_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("ulinail_cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-50 bg-white/95 backdrop-blur-md p-5 rounded-3xl border border-nude-200 shadow-luxury-lg animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-nude-100 text-gold-dark flex-shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-charcoal leading-relaxed mb-3">
            {dict.cookie.text}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="px-4 py-2 rounded-full bg-nude-900 hover:bg-gold-dark text-white text-xs font-semibold transition-colors"
            >
              {dict.cookie.accept}
            </button>
            <button
              onClick={handleDecline}
              className="px-4 py-2 rounded-full bg-nude-100 hover:bg-nude-200 text-charcoal text-xs font-medium transition-colors"
            >
              {dict.cookie.decline}
            </button>
          </div>
        </div>
        <button
          onClick={handleDecline}
          className="text-nude-400 hover:text-charcoal p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
