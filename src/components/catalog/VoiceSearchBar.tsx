"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Mic, MicOff, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

interface VoiceSearchBarProps {
  initialValue?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

export default function VoiceSearchBar({
  initialValue = "",
  className = "",
  onSearch,
}: VoiceSearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const { locale, dict } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = locale === "pl" ? "pl-PL" : "uk-UA";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setQuery(transcript);
          triggerSearch(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn("Speech recognition initialization error:", e);
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, [locale]);

  const toggleVoice = () => {
    if (!isSupported) {
      alert(dict.search.voiceUnsupported);
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        if (recognitionRef.current) {
          recognitionRef.current.lang = locale === "pl" ? "pl-PL" : "uk-UA";
          recognitionRef.current.start();
        }
      } catch (e) {
        console.error("Speech recognition start error:", e);
      }
    }
  };

  const triggerSearch = (text: string) => {
    const trimmed = text.trim();
    if (onSearch) {
      onSearch(trimmed);
    } else {
      router.push(`/${locale}/catalog?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      triggerSearch(query);
    }
  };

  const clearInput = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? dict.search.voiceListening : dict.search.placeholder}
          className={`w-full h-11 pl-10 pr-20 bg-nude-100/80 border rounded-full text-sm text-charcoal placeholder-nude-500/80 focus:outline-none focus:bg-white transition-all duration-300 shadow-sm ${
            isListening
              ? "border-gold ring-2 ring-gold/40 animate-pulse"
              : "border-nude-200/80 focus:border-gold/70 focus:ring-2 focus:ring-gold/20"
          }`}
        />
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-nude-500 pointer-events-none"
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={clearInput}
              title={dict.search.clear}
              className="p-1 text-nude-500 hover:text-charcoal transition-colors rounded-full hover:bg-nude-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={toggleVoice}
            title={dict.search.voiceSearch}
            className={`p-1.5 rounded-full transition-all duration-300 flex items-center justify-center ${
              isListening
                ? "bg-gold text-white shadow-gold-glow animate-bounce"
                : "text-nude-500 hover:text-gold hover:bg-nude-200/60"
            }`}
          >
            {isListening ? (
              <Mic className="w-4 h-4 text-white" />
            ) : isSupported ? (
              <Mic className="w-4 h-4" />
            ) : (
              <MicOff className="w-4 h-4 opacity-40" />
            )}
          </button>
        </div>
      </div>

      {isListening && (
        <span className="absolute -bottom-6 left-4 text-xs font-medium text-gold animate-pulse tracking-wide">
          ● {dict.search.voiceListening}
        </span>
      )}
    </div>
  );
}
