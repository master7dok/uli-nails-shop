"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, X, Check, Star, Sparkles, Image as ImageIcon } from "lucide-react";
import { Product, ProductVariant, Category } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form fields
  const [sku, setSku] = useState("");
  const [slug, setSlug] = useState("");
  const [titleUa, setTitleUa] = useState("");
  const [titlePl, setTitlePl] = useState("");
  const [descriptionUa, setDescriptionUa] = useState("");
  const [descriptionPl, setDescriptionPl] = useState("");
  const [usageUa, setUsageUa] = useState("");
  const [usagePl, setUsagePl] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isHit, setIsHit] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isSeason, setIsSeason] = useState(false);
  const [isActive, setIsActive] = useState(true);

  // Dynamic variants
  const [variants, setVariants] = useState<
    Omit<ProductVariant, "productId">[]
  >([
    {
      id: "v-temp-1",
      nameUa: "15 мл",
      namePl: "15 ml",
      sku: "SKU-15",
      price: 290,
      oldPrice: null,
      stock: 50,
      colorCode: "",
    },
  ]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/categories"),
      ]);
      if (prodRes.ok && catRes.ok) {
        setProducts(await prodRes.json());
        setCategories(await catRes.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setEditingProductId(null);
    setSku("");
    setSlug("");
    setTitleUa("");
    setTitlePl("");
    setDescriptionUa("");
    setDescriptionPl("");
    setUsageUa("");
    setUsagePl("");
    setIngredients("");
    setCategoryId(categories[0]?.id || "");
    setSubCategoryId("");
    setImages([
      "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=800",
    ]);
    setNewImageUrl("");
    setIsHit(false);
    setIsNew(false);
    setIsSeason(false);
    setIsActive(true);
    setVariants([
      {
        id: `v-${Date.now()}-1`,
        nameUa: "15 мл",
        namePl: "15 ml",
        sku: "ULI-NEW-15",
        price: 290,
        oldPrice: null,
        stock: 50,
        colorCode: "",
      },
    ]);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod: Product) => {
    setEditingProductId(prod.id);
    setSku(prod.sku);
    setSlug(prod.slug);
    setTitleUa(prod.titleUa);
    setTitlePl(prod.titlePl);
    setDescriptionUa(prod.descriptionUa);
    setDescriptionPl(prod.descriptionPl);
    setUsageUa(prod.usageUa || "");
    setUsagePl(prod.usagePl || "");
    setIngredients(prod.ingredients || "");
    setCategoryId(prod.categoryId);
    setSubCategoryId(prod.subCategoryId || "");
    setImages(prod.images || []);
    setIsHit(!!prod.isHit);
    setIsNew(!!prod.isNew);
    setIsSeason(!!prod.isSeason);
    setIsActive(prod.isActive !== false);
    setVariants(
      prod.variants.map((v) => ({
        id: v.id,
        nameUa: v.nameUa,
        namePl: v.namePl,
        sku: v.sku,
        price: Number(v.price),
        oldPrice: v.oldPrice ? Number(v.oldPrice) : null,
        stock: v.stock,
        colorCode: v.colorCode || "",
      }))
    );
    setIsModalOpen(true);
  };

  const handleAddVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        id: `v-${Date.now()}`,
        nameUa: "30 мл",
        namePl: "30 ml",
        sku: `${sku || "ULI"}-30`,
        price: 490,
        oldPrice: null,
        stock: 30,
        colorCode: "",
      },
    ]);
  };

  const handleRemoveVariant = (id: string) => {
    if (variants.length <= 1) {
      alert("Товар повинен мати щонайменше 1 варіант.");
      return;
    }
    setVariants((prev) => prev.filter((v) => v.id !== id));
  };

  const handleUpdateVariant = (
    id: string,
    field: keyof Omit<ProductVariant, "productId">,
    val: any
  ) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: val } : v))
    );
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages((prev) => [...prev, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productPayload = {
      id: editingProductId || `prod-${Date.now()}`,
      sku,
      slug: slug || sku.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      titleUa,
      titlePl,
      descriptionUa,
      descriptionPl,
      usageUa,
      usagePl,
      ingredients,
      categoryId,
      subCategoryId: subCategoryId || null,
      images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800"],
      isHit,
      isNew,
      isSeason,
      isActive,
      variants: variants.map((v) => ({
        ...v,
        productId: editingProductId || "",
      })),
    };

    try {
      const url = editingProductId
        ? `/api/products/${editingProductId}`
        : "/api/products";
      const method = editingProductId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productPayload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        await loadData();
      } else {
        alert("Помилка збереження товару.");
      }
    } catch (e) {
      console.error(e);
      alert("Помилка мережі.");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Ви впевнені, що бажаєте видалити цей товар?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        await loadData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const selectedCatObj = categories.find((c) => c.id === categoryId);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal">
            Товари та варіанти
          </h1>
          <p className="text-xs text-nude-600 mt-1">
            Керування асортиментом, об'ємами (8ml, 15ml, 30ml), цінами та залишками на складі
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-nude-900 hover:bg-gold-dark text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Створити новий товар</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-nude-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-nude-500">Завантаження списку товарів...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-nude-50 text-nude-600 uppercase text-[10px] tracking-wider border-b border-nude-200">
                <tr>
                  <th className="py-3.5 px-4">Фото</th>
                  <th className="py-3.5 px-4">SKU / Назва (UA/PL)</th>
                  <th className="py-3.5 px-4">Категорія</th>
                  <th className="py-3.5 px-4">Варіанти & Ціни</th>
                  <th className="py-3.5 px-4">Статуси</th>
                  <th className="py-3.5 px-4 text-right">Дії</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-nude-100 text-charcoal">
                {products.map((prod) => {
                  const cat = categories.find((c) => c.id === prod.categoryId);
                  return (
                    <tr key={prod.id} className="hover:bg-nude-50/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-nude-100 border border-nude-200 flex-shrink-0">
                          <Image
                            src={prod.images[0] || "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800"}
                            alt={prod.titleUa}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-mono text-[11px] text-gold-dark font-semibold">
                          {prod.sku}
                        </div>
                        <div className="font-semibold text-charcoal line-clamp-1">
                          {prod.titleUa}
                        </div>
                        <div className="text-[11px] text-nude-500 line-clamp-1 italic">
                          {prod.titlePl}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-nude-700">
                        {cat ? cat.nameUa : "Без категорії"}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          {prod.variants.map((v) => (
                            <div key={v.id} className="flex items-center gap-2 text-[11px]">
                              <span className="font-medium bg-nude-100 px-1.5 py-0.5 rounded text-nude-800">
                                {v.nameUa}:
                              </span>
                              <span className="font-bold text-charcoal">{v.price} грн</span>
                              <span className="text-nude-400">({v.stock} шт)</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {prod.isHit && (
                            <span className="px-2 py-0.5 rounded-md bg-gold text-white font-bold text-[9px] uppercase">
                              Хіт
                            </span>
                          )}
                          {prod.isNew && (
                            <span className="px-2 py-0.5 rounded-md bg-blush-dark text-white font-bold text-[9px] uppercase">
                              New
                            </span>
                          )}
                          {prod.isSeason && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-700 text-white font-bold text-[9px] uppercase">
                              Сезон
                            </span>
                          )}
                          {!prod.isActive && (
                            <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 font-bold text-[9px] uppercase">
                              Приховано
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(prod)}
                            className="p-1.5 text-nude-600 hover:text-gold hover:bg-nude-100 rounded-lg transition-colors"
                            title="Редагувати"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-1.5 text-nude-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Видалити"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Product Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-nude-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-luxury-lg relative space-y-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-nude-400 hover:text-charcoal hover:bg-nude-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-2xl font-bold text-charcoal">
              {editingProductId ? "Редагування товару" : "Створення нового товару"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold block mb-1 text-charcoal">Базовий SKU *</label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="ULI-BASE-01"
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1 text-charcoal">URL Slug (унікальний)</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="cover-base-royal-nude"
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1 text-charcoal">Категорія *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameUa}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedCatObj && selectedCatObj.subCategories.length > 0 && (
                <div>
                  <label className="font-semibold block mb-1 text-charcoal">Підкатегорія</label>
                  <select
                    value={subCategoryId}
                    onChange={(e) => setSubCategoryId(e.target.value)}
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  >
                    <option value="">Не вибрано (тільки головна категорія)</option>
                    {selectedCatObj.subCategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.nameUa}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Titles UA/PL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1 text-charcoal">Назва (Українська) *</label>
                  <input
                    type="text"
                    required
                    value={titleUa}
                    onChange={(e) => setTitleUa(e.target.value)}
                    placeholder="Камуфлююча база Cover Base «Royal Nude»"
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1 text-charcoal">Назва (Польська - Nazwa PL) *</label>
                  <input
                    type="text"
                    required
                    value={titlePl}
                    onChange={(e) => setTitlePl(e.target.value)}
                    placeholder="Baza kamuflująca Cover Base «Royal Nude»"
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Descriptions UA/PL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1 text-charcoal">Опис (UA) *</label>
                  <textarea
                    rows={3}
                    required
                    value={descriptionUa}
                    onChange={(e) => setDescriptionUa(e.target.value)}
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1 text-charcoal">Опис (PL) *</label>
                  <textarea
                    rows={3}
                    required
                    value={descriptionPl}
                    onChange={(e) => setDescriptionPl(e.target.value)}
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Usage & Ingredients */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold block mb-1 text-charcoal">Спосіб застосування (UA)</label>
                  <textarea
                    rows={2}
                    value={usageUa}
                    onChange={(e) => setUsageUa(e.target.value)}
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1 text-charcoal">Спосіб застосування (PL)</label>
                  <textarea
                    rows={2}
                    value={usagePl}
                    onChange={(e) => setUsagePl(e.target.value)}
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1 text-charcoal">Склад (INCI)</label>
                  <textarea
                    rows={2}
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="Di-HEMA, Acrylates Copolymer, Silica..."
                    className="w-full bg-nude-50 border border-nude-200 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Variants Section */}
              <div className="p-4 rounded-2xl bg-nude-100/60 border border-nude-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-sm font-bold text-charcoal">
                    Варіанти товару (Об'єми, розміри, кольори)
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="px-3 py-1 bg-gold text-nude-900 rounded-xl font-semibold text-[11px] hover:bg-gold-dark hover:text-white transition-colors"
                  >
                    + Додати варіант
                  </button>
                </div>

                <div className="space-y-2">
                  {variants.map((v, i) => (
                    <div
                      key={v.id}
                      className="p-3 bg-white rounded-xl border border-nude-200 grid grid-cols-2 sm:grid-cols-7 gap-2 items-center"
                    >
                      <input
                        type="text"
                        placeholder="Назва UA (15 мл)"
                        value={v.nameUa}
                        onChange={(e) => handleUpdateVariant(v.id, "nameUa", e.target.value)}
                        className="bg-nude-50 border border-nude-200 rounded-lg px-2 py-1 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Назва PL (15 ml)"
                        value={v.namePl}
                        onChange={(e) => handleUpdateVariant(v.id, "namePl", e.target.value)}
                        className="bg-nude-50 border border-nude-200 rounded-lg px-2 py-1 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="SKU"
                        value={v.sku}
                        onChange={(e) => handleUpdateVariant(v.id, "sku", e.target.value)}
                        className="bg-nude-50 border border-nude-200 rounded-lg px-2 py-1 text-xs"
                      />
                      <input
                        type="number"
                        placeholder="Ціна (грн)"
                        value={v.price}
                        onChange={(e) => handleUpdateVariant(v.id, "price", Number(e.target.value))}
                        className="bg-nude-50 border border-nude-200 rounded-lg px-2 py-1 text-xs"
                      />
                      <input
                        type="number"
                        placeholder="Стара ціна"
                        value={v.oldPrice || ""}
                        onChange={(e) =>
                          handleUpdateVariant(
                            v.id,
                            "oldPrice",
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
                        className="bg-nude-50 border border-nude-200 rounded-lg px-2 py-1 text-xs"
                      />
                      <input
                        type="number"
                        placeholder="Залишок"
                        value={v.stock}
                        onChange={(e) => handleUpdateVariant(v.id, "stock", Number(e.target.value))}
                        className="bg-nude-50 border border-nude-200 rounded-lg px-2 py-1 text-xs"
                      />
                      <div className="flex items-center justify-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveVariant(v.id)}
                          className="p-1 text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photos URLs */}
              <div className="p-4 rounded-2xl bg-nude-100/60 border border-nude-200 space-y-3">
                <h4 className="font-serif text-sm font-bold text-charcoal">
                  Фотографії товару (URL)
                </h4>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1 bg-white border border-nude-200 rounded-xl px-3 py-1.5 text-xs text-charcoal"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-4 py-1.5 rounded-xl bg-nude-900 text-white font-semibold text-xs"
                  >
                    Додати фото
                  </button>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  {images.map((img, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-nude-200 group">
                      <Image src={img} alt="Product" fill sizes="64px" className="object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(i)}
                        className="absolute inset-0 bg-rose-900/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkboxes: Flags */}
              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={isHit}
                    onChange={(e) => setIsHit(e.target.checked)}
                    className="w-4 h-4 rounded text-gold accent-gold-dark"
                  />
                  <span>Хіт продажу (isHit)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={isNew}
                    onChange={(e) => setIsNew(e.target.checked)}
                    className="w-4 h-4 rounded text-gold accent-gold-dark"
                  />
                  <span>Новинка (isNew)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={isSeason}
                    onChange={(e) => setIsSeason(e.target.checked)}
                    className="w-4 h-4 rounded text-gold accent-gold-dark"
                  />
                  <span>Сезонний (isSeason)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-gold accent-gold-dark"
                  />
                  <span>Активний для продажу</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-nude-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-nude-300 text-charcoal font-semibold text-xs hover:bg-nude-100 transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full bg-nude-900 hover:bg-gold-dark text-white font-semibold text-xs tracking-wider uppercase transition-colors shadow-luxury"
                >
                  Зберегти товар
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
