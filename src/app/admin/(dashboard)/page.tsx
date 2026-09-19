import React from "react";
import Link from "next/link";
import { DollarSign, ShoppingBag, Package, Star, ArrowUpRight, Clock } from "lucide-react";
import { store } from "@/lib/store";

export default async function AdminDashboardPage() {
  const products = store.getProducts();
  const orders = store.getOrders();
  const reviews = store.getAllReviews();
  const pendingReviews = reviews.filter((r) => !r.isApproved);

  const totalSales = orders.reduce((acc, o) => acc + Number(o.totalAmount), 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal">
            Панель керування UliNail
          </h1>
          <p className="text-xs text-nude-600 mt-1">
            Огляд ключових показників магазину та швидкий доступ до замовлень
          </p>
        </div>

        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-nude-900 hover:bg-gold-dark text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
        >
          <span>Додати товар</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Sales */}
        <div className="p-6 rounded-3xl bg-white border border-nude-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-nude-500 uppercase tracking-wider">
              Загальний виторг
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-charcoal">
            {totalSales.toLocaleString()} грн
          </div>
          <p className="text-[11px] text-nude-500">За весь період роботи</p>
        </div>

        {/* Orders */}
        <div className="p-6 rounded-3xl bg-white border border-nude-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-nude-500 uppercase tracking-wider">
              Замовлень
            </span>
            <div className="w-10 h-10 rounded-2xl bg-gold/15 text-gold-dark flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-charcoal">
            {orders.length}
          </div>
          <p className="text-[11px] text-nude-500">Оформлено покупцями</p>
        </div>

        {/* Products */}
        <div className="p-6 rounded-3xl bg-white border border-nude-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-nude-500 uppercase tracking-wider">
              Товарів в базі
            </span>
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-charcoal">
            {products.length}
          </div>
          <p className="text-[11px] text-nude-500">Активних позицій</p>
        </div>

        {/* Pending Reviews */}
        <div className="p-6 rounded-3xl bg-white border border-nude-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-nude-500 uppercase tracking-wider">
              Відгуки на модерації
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Star className="w-5 h-5" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-charcoal">
            {pendingReviews.length}
          </div>
          <Link
            href="/admin/reviews"
            className="text-[11px] text-gold-dark hover:text-charcoal font-medium inline-block"
          >
            Перейти до схвалення →
          </Link>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-3xl border border-nude-200 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-charcoal">
            Останні замовлення
          </h2>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-gold-dark hover:text-charcoal transition-colors"
          >
            Всі замовлення →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-nude-50 text-nude-600 uppercase text-[10px] tracking-wider border-y border-nude-200">
              <tr>
                <th className="py-3 px-4">Номер</th>
                <th className="py-3 px-4">Клієнт</th>
                <th className="py-3 px-4">Доставка</th>
                <th className="py-3 px-4">Сума</th>
                <th className="py-3 px-4">Статус</th>
                <th className="py-3 px-4">Дата</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nude-100 text-charcoal">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-nude-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold">
                    #{order.orderNumber}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{order.customerName}</div>
                    <div className="text-[11px] text-nude-500">{order.customerPhone}</div>
                  </td>
                  <td className="py-3 px-4 text-nude-600 truncate max-w-xs">
                    {order.deliveryAddress}
                  </td>
                  <td className="py-3 px-4 font-semibold font-serif text-sm">
                    {order.totalAmount} грн
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
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
                  </td>
                  <td className="py-3 px-4 text-nude-500 text-[11px]">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
