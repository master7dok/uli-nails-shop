import React, { Suspense } from "react";
import AccountView from "@/components/account/AccountView";
import { store } from "@/lib/store";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const initialTab = params.tab === "wishlist" ? "wishlist" : "orders";
  const allProducts = store.getProducts();

  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Завантаження кабінету...</div>}>
      <AccountView allProducts={allProducts} initialTab={initialTab} />
    </Suspense>
  );
}
