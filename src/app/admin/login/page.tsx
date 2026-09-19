"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Sparkles, AlertCircle, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Невірний пароль");
      }
    } catch {
      setError("Помилка з'єднання");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nude-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-nude-200 shadow-luxury-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-nude-900 text-gold mx-auto flex items-center justify-center shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-charcoal">
            UliNail Control Panel
          </h1>
          <p className="text-xs text-nude-500">
            Введіть пароль адміністратора для керування магазином
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-charcoal block mb-1">
              Пароль доступу
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введіть пароль (за замовчуванням: admin)"
              className="w-full bg-nude-50 border border-nude-200 rounded-2xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-gold"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl bg-nude-900 hover:bg-gold-dark text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-luxury hover:shadow-gold-glow flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? "Перевірка..." : "Увійти в панель"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <a
            href="/ua"
            className="text-xs text-nude-500 hover:text-charcoal transition-colors"
          >
            ← Повернутися на сайт магазину
          </a>
        </div>
      </div>
    </div>
  );
}
