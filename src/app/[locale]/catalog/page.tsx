import React, { Suspense } from "react";
import CatalogView from "@/components/catalog/CatalogView";
import { store } from "@/lib/store";

export default function CatalogPage() {
  const products = store.getProducts().filter((p) => p.isActive !== false);
  const categories = store.getCategories();

  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-8 py-20 text-center text-xs text-nude-500">
          Завантаження каталогу товарів...
        </div>
      }
    >
      <CatalogView initialProducts={products} categories={categories} />
    </Suspense>
  );
}
