"use client";

import React, { useState, useEffect } from "react";
import { Order } from "@/types";
import { ShoppingBag, Truck, CreditCard, ChevronDown, CheckCircle2 } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState(true);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        setOrders(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: Order["status"]) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredOrders = orders.filter((o) =>
    filterStatus === "ALL" ? true : o.status === filterStatus
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal">
            Керування замовленнями
          </h1>
          <p className="text-xs text-nude-600 mt-1">
            Перегляд деталей покупок клієнтів та оновлення статусів доставки
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-nude-200 text-xs">
          {["ALL", "NEW", "PAID", "SHIPPED", "COMPLETED", "CANCELLED"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                filterStatus === st
                  ? "bg-nude-900 text-white shadow-sm"
                  : "text-nude-600 hover:text-charcoal hover:bg-nude-100"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {isLoading ? (
        <div className="p-12 text-center text-xs text-nude-500">Завантаження замовлень...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-nude-200 text-xs text-nude-500">
          Немає замовлень за обраним фільтром
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-nude-200 p-6 shadow-sm space-y-4"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-nude-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gold/15 text-gold-dark flex items-center justify-center font-bold">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-charcoal">
                      #{order.orderNumber}
                    </h3>
                    <span className="text-xs text-nude-500">
                      Створено: {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Status Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-nude-600">Статус:</span>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                    className={`text-xs font-bold uppercase tracking-wider rounded-xl px-3 py-1.5 border focus:outline-none cursor-pointer ${
                      order.status === "PAID"
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                        : order.status === "SHIPPED"
                        ? "bg-sky-100 text-sky-800 border-sky-300"
                        : order.status === "COMPLETED"
                        ? "bg-nude-900 text-white border-nude-900"
                        : order.status === "CANCELLED"
                        ? "bg-rose-100 text-rose-800 border-rose-300"
                        : "bg-amber-100 text-amber-800 border-amber-300"
                    }`}
                  >
                    <option value="NEW">NEW (Нове)</option>
                    <option value="PAID">PAID (Оплачено)</option>
                    <option value="SHIPPED">SHIPPED (Відправлено)</option>
                    <option value="COMPLETED">COMPLETED (Виконано)</option>
                    <option value="CANCELLED">CANCELLED (Скасовано)</option>
                  </select>
                </div>
              </div>

              {/* Customer & Delivery details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-nude-700 bg-nude-50/70 p-4 rounded-2xl border border-nude-200">
                <div>
                  <h4 className="font-semibold text-charcoal mb-1">Покупець:</h4>
                  <p className="font-medium text-charcoal">{order.customerName}</p>
                  <p>{order.customerPhone}</p>
                  <p className="text-nude-500">{order.customerEmail}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-charcoal mb-1">Доставка:</h4>
                  <p className="capitalize font-medium text-charcoal">
                    {order.deliveryMethod.replace("_", " ")}
                  </p>
                  <p className="text-nude-600">{order.deliveryAddress}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-charcoal mb-1">Оплата:</h4>
                  <p className="capitalize font-medium text-charcoal">
                    {order.paymentMethod.replace("_", " ")}
                  </p>
                  {order.notes && (
                    <p className="mt-1 text-nude-500 italic">Коментар: «{order.notes}»</p>
                  )}
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-1.5 pt-2">
                <h4 className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                  Склад замовлення:
                </h4>
                <div className="divide-y divide-nude-100">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-charcoal">{it.title}</span>
                        {it.variantName && (
                          <span className="text-gold-dark font-medium ml-2">
                            ({it.variantName})
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span>
                          {it.quantity} × {it.price} грн ={" "}
                        </span>
                        <span className="font-bold text-charcoal">
                          {it.quantity * it.price} грн
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Footer */}
              <div className="pt-3 border-t border-nude-100 flex justify-between items-baseline">
                <span className="text-xs text-nude-500">Разом до сплати з доставкою:</span>
                <span className="font-serif text-xl font-bold text-nude-900">
                  {order.totalAmount} грн
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
