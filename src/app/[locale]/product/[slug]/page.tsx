import React from "react";
import { notFound } from "next/navigation";
import ProductDetailView from "@/components/product/ProductDetailView";
import { store } from "@/lib/store";
import { Locale } from "@/types";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = rawLocale === "pl" ? "pl" : "ua";

  const product = store.getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const categories = store.getCategories();
  const category = categories.find((c) => c.id === product.categoryId);
  const categoryName = category
    ? locale === "pl"
      ? category.namePl
      : category.nameUa
    : "Каталог";
  const categorySlug = category?.slug || "all";

  const relatedProducts = store
    .getProducts()
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId && p.isActive !== false)
    .slice(0, 6);

  return (
    <ProductDetailView
      product={product}
      categoryName={categoryName}
      categorySlug={categorySlug}
      relatedProducts={relatedProducts}
    />
  );
}
