"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Save, Sparkles, Sliders, Check } from "lucide-react";
import { HeroBanner, SiteSettings } from "@/types";

export default function AdminSettingsPage() {
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // New banner form
  const [newTitleUa, setNewTitleUa] = useState("");
  const [newTitlePl, setNewTitlePl] = useState("");
  const [newSubUa, setNewSubUa] = useState("");
  const [newSubPl, setNewSubPl] = useState("");
  const [newLink, setNewLink] = useState("/catalog");
  const [newImageUrl, setNewImageUrl] = useState("");

  const loadAll = async () => {
    setIsLoading(true);
    try {
      const [banRes, setRes] = await Promise.all([
        fetch("/api/banners"),
        fetch("/api/settings"),
      ]);
      const [bannersData, settingsData] = await Promise.all([
        banRes.json(),
        setRes.json(),
      ]);
      setBanners(bannersData);
      setSettings(settingsData);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl || !newTitleUa) return;

    try {
      const res = await fetch("/api/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titleUa: newTitleUa,
          titlePl: newTitlePl || newTitleUa,
          subUa: newSubUa,
          subPl: newSubPl || newSubUa,
          link: newLink,
          imageUrl: newImageUrl,
          isActive: true,
        }),
      });

      if (res.ok) {
        setNewTitleUa("");
        setNewTitlePl("");
        setNewSubUa("");
        setNewSubPl("");
        setNewImageUrl("");
        await loadAll();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteBanner = async (id: string) => {
    if (!confirm("Видалити цей слайд?")) return;
    try {
      const res = await fetch("/api/banners", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setBanners((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div>
        <h1 className="font-serif text-3xl font-bold text-charcoal">
          Банери та налаштування сайту
        </h1>
        <p className="text-xs text-nude-600 mt-1">
          Керування слайдером головної сторінки, контактними даними та лімітом безкоштовної доставки
        </p>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-xs text-nude-500">Завантаження налаштувань...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Hero Banners Manager */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-xl font-bold text-charcoal">
              Слайдер головної сторінки
            </h2>

            {/* List of existing banners */}
            <div className="space-y-4">
              {banners.map((ban) => (
                <div
                  key={ban.id}
                  className="p-4 rounded-3xl bg-white border border-nude-200 shadow-sm flex items-center gap-4"
                >
                  <div className="relative w-28 h-20 rounded-2xl overflow-hidden bg-nude-100 flex-shrink-0 border border-nude-200">
                    <Image
                      src={ban.imageUrl}
                      alt={ban.titleUa}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-bold text-charcoal truncate">
                      {ban.titleUa}
                    </h4>
                    <p className="text-[11px] text-nude-500 truncate">{ban.subUa}</p>
                    <span className="text-[10px] font-mono text-gold-dark">{ban.link}</span>
                  </div>

                  <button
                    onClick={() => handleDeleteBanner(ban.id)}
                    className="p-2 text-nude-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Видалити слайд"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Banner Form */}
            <div className="p-6 rounded-3xl bg-white border border-nude-200 shadow-sm space-y-4">
              <h3 className="font-serif text-base font-bold text-charcoal">
                + Додати новий банер у слайдер
              </h3>

              <form onSubmit={handleAddBanner} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">URL зображення *</label>
                  <input
                    type="url"
                    required
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Заголовок (UA) *</label>
                    <input
                      type="text"
                      required
                      value={newTitleUa}
                      onChange={(e) => setNewTitleUa(e.target.value)}
                      className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Заголовок (PL) *</label>
                    <input
                      type="text"
                      required
                      value={newTitlePl}
                      onChange={(e) => setNewTitlePl(e.target.value)}
                      className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Підзаголовок (UA)</label>
                    <input
                      type="text"
                      value={newSubUa}
                      onChange={(e) => setNewSubUa(e.target.value)}
                      className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Підзаголовок (PL)</label>
                    <input
                      type="text"
                      value={newSubPl}
                      onChange={(e) => setNewSubPl(e.target.value)}
                      className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Посилання (URL)</label>
                  <input
                    type="text"
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    placeholder="/catalog?category=bases"
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-nude-900 text-white font-semibold text-xs tracking-wider uppercase hover:bg-gold-dark transition-colors"
                >
                  Додати слайд
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Site Settings */}
          {settings && (
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-serif text-xl font-bold text-charcoal">
                Контакти та ліміти
              </h2>

              <form
                onSubmit={handleSaveSettings}
                className="p-6 rounded-3xl bg-white border border-nude-200 shadow-sm space-y-4 text-xs"
              >
                <div>
                  <label className="font-semibold block mb-1">Контактний телефон</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Email магазину</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Графік роботи (UA)</label>
                  <input
                    type="text"
                    value={settings.workingHoursUa}
                    onChange={(e) =>
                      setSettings({ ...settings, workingHoursUa: e.target.value })
                    }
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Графік роботи (PL)</label>
                  <input
                    type="text"
                    value={settings.workingHoursPl}
                    onChange={(e) =>
                      setSettings({ ...settings, workingHoursPl: e.target.value })
                    }
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Адреса (Україна)</label>
                  <input
                    type="text"
                    value={settings.addressUa}
                    onChange={(e) => setSettings({ ...settings, addressUa: e.target.value })}
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Адреса (Польща)</label>
                  <input
                    type="text"
                    value={settings.addressPl}
                    onChange={(e) => setSettings({ ...settings, addressPl: e.target.value })}
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">
                    Поріг безкоштовної доставки (грн)
                  </label>
                  <input
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        freeShippingThreshold: Number(e.target.value),
                      })
                    }
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                  />
                </div>

                <div className="pt-3 border-t border-nude-100 flex items-center justify-between">
                  {isSaved ? (
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>Збережено!</span>
                    </span>
                  ) : (
                    <span />
                  )}

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-nude-900 hover:bg-gold-dark text-white font-semibold text-xs tracking-wider uppercase transition-colors shadow-sm"
                  >
                    Зберегти налаштування
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
