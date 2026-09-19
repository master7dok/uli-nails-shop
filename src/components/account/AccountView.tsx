"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, Heart, Package, LogOut, ArrowRight, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useWishlist } from "@/context/WishlistContext";
import { Product, Order } from "@/types";
import ProductCard from "@/components/catalog/ProductCard";

interface AccountViewProps {
  allProducts: Product[];
  initialTab?: "orders" | "wishlist";
}

export default function AccountView({ allProducts, initialTab = "orders" }: AccountViewProps) {
  const { locale, dict } = useLanguage();
  const { wishlistIds } = useWishlist();
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist">(initialTab);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  const wishlistProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch("/api/orders");
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (e) {
        console.error("Failed to load orders", e);
      } finally {
        setIsLoadingOrders(false);
      }
    }
    loadOrders();
  }, []);

  const currency = locale === "pl" ? "zł" : "грн";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar user card */}
        <aside className="w-full md:w-80 bg-white rounded-3xl p-6 border border-nude-200 shadow-sm space-y-6 flex-shrink-0">
          <div className="flex items-center gap-4 border-b border-nude-100 pb-6">
            <div className="w-16 h-16 rounded-full bg-nude-100 border-2 border-gold/40 flex items-center justify-center text-charcoal font-serif text-xl font-bold">
              UN
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-charcoal">Кабінет майстра</h3>
              <p className="text-xs text-nude-500">master@ulinail.com</p>
              <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gold/20 text-gold-dark">
                VIP Master
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-semibold transition-all ${
                activeTab === "orders"
                  ? "bg-nude-900 text-white shadow-sm"
                  : "text-charcoal hover:bg-nude-100"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>Історія замовлень</span>
              </div>
              <span className="text-xs">{orders.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("wishlist")}
              className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-semibold transition-all ${
                activeTab === "wishlist"
                  ? "bg-nude-900 text-white shadow-sm"
                  : "text-charcoal hover:bg-nude-100"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4" />
                <span>Обрані товари</span>
              </div>
              <span className="text-xs">{wishlistIds.length}</span>
            </button>
          </nav>

          <div className="pt-4 border-t border-nude-100">
            <Link
              href={`/${locale}`}
              className="w-full flex items-center gap-2 p-3 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-2xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>На головну</span>
            </Link>
          </div>
        </aside>

        {/* Content area */}
        <main className="flex-1 w-full">
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-charcoal">
                Мої замовлення
              </h2>

              {isLoadingOrders ? (
                <p className="text-xs text-nude-500">Завантаження замовлень...</p>
              ) : orders.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-nude-200">
                  <Package className="w-12 h-12 mx-auto text-nude-400 mb-3" />
                  <p className="font-medium text-charcoal">У вас ще немає замовлень</p>
                  <p className="text-xs text-nude-500 mt-1 mb-4">
                    Оберіть потрібні матеріали у нашому каталозі
                  </p>
                  <Link
                    href={`/${locale}/catalog`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-nude-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-gold-dark transition-colors"
                  >
                    <span>До каталогу</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-6 rounded-3xl bg-white border border-nude-200 shadow-sm space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-nude-100 pb-3">
                        <div>
                          <span className="font-serif text-base font-bold text-charcoal">
                            #{order.orderNumber}
                          </span>
                          <span className="text-xs text-nude-500 ml-3">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            order.status === "PAID"
                              ? "bg-emerald-100 text-emerald-800"
                              : order.status === "SHIPPED"
                              ? "bg-sky-100 text-sky-800"
                              : order.status === "COMPLETED"
                              ? "bg-nude-900 text-white"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-xs text-charcoal">
                            <span>
                              {item.title} {item.variantName ? `(${item.variantName})` : ""} × {item.quantity}
                            </span>
                            <span className="font-semibold">
                              {item.price * item.quantity} {currency}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-nude-100 flex justify-between items-center text-sm">
                        <span className="text-nude-600">Разом:</span>
                        <span className="font-serif font-bold text-base text-nude-900">
                          {order.totalAmount} {currency}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-charcoal">
                Список улюблених товарів
              </h2>

              {wishlistProducts.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-nude-200">
                  <Heart className="w-12 h-12 mx-auto text-nude-400 mb-3" />
                  <p className="font-medium text-charcoal">У вашому списку обраного ще немає товарів</p>
                  <p className="text-xs text-nude-500 mt-1 mb-4">
                    Натискайте сердечко на картці товару, щоб зберегти улюблені відтінки
                  </p>
                  <Link
                    href={`/${locale}/catalog`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-nude-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-gold-dark transition-colors"
                  >
                    <span>Переглянути каталог</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
