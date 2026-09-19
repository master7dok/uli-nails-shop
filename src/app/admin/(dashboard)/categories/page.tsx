"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, FolderPlus, X } from "lucide-react";
import { Category, SubCategory } from "@/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Add category modal
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [nameUa, setNameUa] = useState("");
  const [namePl, setNamePl] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [descriptionUa, setDescriptionUa] = useState("");
  const [descriptionPl, setDescriptionPl] = useState("");

  // Subcategory modal
  const [subModalTargetCat, setSubModalTargetCat] = useState<string | null>(null);
  const [subNameUa, setSubNameUa] = useState("");
  const [subNamePl, setSubNamePl] = useState("");
  const [subSlug, setSubSlug] = useState("");

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        setCategories(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameUa,
          namePl,
          slug: slug || nameUa.toLowerCase().replace(/[^a-z0-9]/g, "-"),
          image: image || "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800",
          descriptionUa,
          descriptionPl,
          subCategories: [],
        }),
      });

      if (res.ok) {
        setIsCatModalOpen(false);
        setNameUa("");
        setNamePl("");
        setSlug("");
        setImage("");
        setDescriptionUa("");
        setDescriptionPl("");
        await loadCategories();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddSubCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subModalTargetCat) return;

    const targetCat = categories.find((c) => c.id === subModalTargetCat);
    if (!targetCat) return;

    const newSub: SubCategory = {
      id: `sub-${Date.now()}`,
      categoryId: targetCat.id,
      nameUa: subNameUa,
      namePl: subNamePl,
      slug: subSlug || subNameUa.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    };

    const updatedCat: Category = {
      ...targetCat,
      subCategories: [...targetCat.subCategories, newSub],
    };

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCat),
      });

      if (res.ok) {
        setSubModalTargetCat(null);
        setSubNameUa("");
        setSubNamePl("");
        setSubSlug("");
        await loadCategories();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Ви впевнені, що бажаєте видалити цю категорію?")) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        await loadCategories();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal">
            Категорії та підкатегорії
          </h1>
          <p className="text-xs text-nude-600 mt-1">
            Керування структурою каталогу та деревом навігації
          </p>
        </div>

        <button
          onClick={() => setIsCatModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-nude-900 hover:bg-gold-dark text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Додати категорію</span>
        </button>
      </div>

      {/* Grid of Categories */}
      {isLoading ? (
        <div className="p-12 text-center text-xs text-nude-500">Завантаження категорій...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-3xl border border-nude-200 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 w-full bg-nude-100">
                  <Image
                    src={cat.image || "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800"}
                    alt={cat.nameUa}
                    fill
                    sizes="350px"
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="p-1.5 bg-white/90 hover:bg-rose-600 hover:text-white rounded-full text-charcoal transition-colors shadow-sm"
                      title="Видалити"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-gold-dark font-bold uppercase tracking-wider">
                      /{cat.slug}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-charcoal">
                      {cat.nameUa}
                    </h3>
                    <p className="text-xs text-nude-500 italic">{cat.namePl}</p>
                  </div>

                  {/* Subcategories list */}
                  <div className="pt-2 border-t border-nude-100 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-charcoal">
                      <span>Підкатегорії ({cat.subCategories.length})</span>
                      <button
                        onClick={() => setSubModalTargetCat(cat.id)}
                        className="text-[11px] text-gold-dark hover:text-charcoal flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Додати</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cat.subCategories.map((sub) => (
                        <span
                          key={sub.id}
                          className="px-2.5 py-1 rounded-lg bg-nude-100 text-charcoal text-[11px] font-medium"
                        >
                          {sub.nameUa}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Category Modal */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-nude-200 max-w-lg w-full p-6 shadow-luxury-lg relative space-y-4">
            <button
              onClick={() => setIsCatModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-nude-400 hover:text-charcoal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-charcoal">
              Створення категорії
            </h3>

            <form onSubmit={handleCreateCategory} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Назва (UA) *</label>
                <input
                  type="text"
                  required
                  value={nameUa}
                  onChange={(e) => setNameUa(e.target.value)}
                  className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Назва (PL) *</label>
                <input
                  type="text"
                  required
                  value={namePl}
                  onChange={(e) => setNamePl(e.target.value)}
                  className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">URL Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="bases"
                  className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">URL Фотографії</label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCatModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-nude-300"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-nude-900 text-white font-semibold"
                >
                  Зберегти
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Subcategory Modal */}
      {subModalTargetCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-nude-200 max-w-sm w-full p-6 shadow-luxury-lg relative space-y-4">
            <button
              onClick={() => setSubModalTargetCat(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-nude-400 hover:text-charcoal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-lg font-bold text-charcoal">
              Додати підкатегорію
            </h3>

            <form onSubmit={handleAddSubCategory} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Назва підкатегорії (UA) *</label>
                <input
                  type="text"
                  required
                  value={subNameUa}
                  onChange={(e) => setSubNameUa(e.target.value)}
                  placeholder="Колекція CAT EYE"
                  className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Назва підкатегорії (PL) *</label>
                <input
                  type="text"
                  required
                  value={subNamePl}
                  onChange={(e) => setSubNamePl(e.target.value)}
                  placeholder="Kolekcja CAT EYE"
                  className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">URL Slug</label>
                <input
                  type="text"
                  value={subSlug}
                  onChange={(e) => setSubSlug(e.target.value)}
                  placeholder="cat-eye-bases"
                  className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSubModalTargetCat(null)}
                  className="px-4 py-2 rounded-full border border-nude-300"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-nude-900 text-white font-semibold"
                >
                  Додати
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
