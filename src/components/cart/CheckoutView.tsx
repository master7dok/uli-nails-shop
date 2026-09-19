"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Truck, CreditCard, ShieldCheck, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function CheckoutView() {
  const { items, subtotal, clearCart } = useCart();
  const { locale, dict } = useLanguage();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"nova_poshta" | "inpost" | "courier">("nova_poshta");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card_online" | "invoice" | "cod">("card_online");
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrderNumber, setCompletedOrderNumber] = useState<string | null>(null);

  const currency = locale === "pl" ? "zł" : "грн";
  const freeThreshold = locale === "pl" ? 200 : 1500;
  const deliveryCost = subtotal >= freeThreshold ? 0 : locale === "pl" ? 15 : 80;
  const totalAmount = subtotal + deliveryCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerEmail,
          deliveryMethod,
          deliveryAddress,
          paymentMethod,
          totalAmount,
          notes,
          items: items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            title: item.title,
            variantName: item.variantName,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setCompletedOrderNumber(data.orderNumber);
        clearCart();
      } else {
        alert("Помилка створення замовлення. Спробуйте ще раз.");
      }
    } catch (e) {
      console.error(e);
      alert("Помилка з'єднання. Спробуйте пізніше.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completedOrderNumber) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-charcoal mb-3">
          {dict.checkout.successTitle}
        </h1>
        <p className="text-sm text-nude-600 max-w-md mx-auto mb-8 leading-relaxed">
          {dict.checkout.successText.replace("{orderNumber}", completedOrderNumber)}
        </p>

        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-nude-900 hover:bg-gold-dark text-white font-medium text-xs tracking-wider uppercase transition-all shadow-luxury"
        >
          {dict.checkout.backHome}
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-nude-100 flex items-center justify-center mx-auto mb-4 text-nude-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-semibold text-charcoal mb-2">
          {dict.cart.empty}
        </h2>
        <p className="text-xs text-nude-500 mb-6">{dict.cart.emptySubtitle}</p>
        <Link
          href={`/${locale}/catalog`}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-nude-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-gold-dark transition-all"
        >
          {dict.cart.startShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <Link
        href={`/${locale}/catalog`}
        className="inline-flex items-center gap-2 text-xs font-medium text-nude-500 hover:text-charcoal mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{dict.cart.continueShopping}</span>
      </Link>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-8">
        {dict.checkout.title}
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left column: Checkout fields */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Customer Information */}
          <div className="p-6 rounded-3xl bg-white border border-nude-200 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-semibold text-charcoal border-b border-nude-100 pb-3">
              {dict.checkout.contactInfo}
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-nude-600 block mb-1">
                  {dict.checkout.fullName} *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-nude-50 border border-nude-200 rounded-2xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                  placeholder="Олена Ковальчук"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-nude-600 block mb-1">
                    {dict.checkout.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-nude-50 border border-nude-200 rounded-2xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                    placeholder="+38 (098) 123-45-67"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-nude-600 block mb-1">
                    {dict.checkout.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-nude-50 border border-nude-200 rounded-2xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
                    placeholder="client@gmail.com"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Delivery Method */}
          <div className="p-6 rounded-3xl bg-white border border-nude-200 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-semibold text-charcoal border-b border-nude-100 pb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-gold-dark" />
              <span>{dict.checkout.deliveryStep}</span>
            </h3>

            <div className="space-y-2">
              <label
                className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  deliveryMethod === "nova_poshta"
                    ? "border-nude-900 bg-nude-50 font-medium"
                    : "border-nude-200 hover:border-gold/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMethod === "nova_poshta"}
                    onChange={() => setDeliveryMethod("nova_poshta")}
                    className="text-nude-900 accent-nude-900"
                  />
                  <span className="text-xs text-charcoal">
                    {dict.checkout.deliveryNovaPoshta}
                  </span>
                </div>
                <span className="text-xs text-nude-500 font-semibold">
                  {deliveryCost === 0 ? "Безкоштовно" : `80 ${currency}`}
                </span>
              </label>

              <label
                className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  deliveryMethod === "inpost"
                    ? "border-nude-900 bg-nude-50 font-medium"
                    : "border-nude-200 hover:border-gold/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMethod === "inpost"}
                    onChange={() => setDeliveryMethod("inpost")}
                    className="text-nude-900 accent-nude-900"
                  />
                  <span className="text-xs text-charcoal">
                    {dict.checkout.deliveryInpost}
                  </span>
                </div>
                <span className="text-xs text-nude-500 font-semibold">
                  {deliveryCost === 0 ? "0 zł" : `15 ${currency}`}
                </span>
              </label>

              <label
                className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  deliveryMethod === "courier"
                    ? "border-nude-900 bg-nude-50 font-medium"
                    : "border-nude-200 hover:border-gold/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryMethod === "courier"}
                    onChange={() => setDeliveryMethod("courier")}
                    className="text-nude-900 accent-nude-900"
                  />
                  <span className="text-xs text-charcoal">
                    {dict.checkout.deliveryCourier}
                  </span>
                </div>
                <span className="text-xs text-nude-500 font-semibold">
                  120 {currency}
                </span>
              </label>
            </div>

            <div className="pt-2">
              <label className="text-xs font-medium text-nude-600 block mb-1">
                {dict.checkout.cityAndBranch} *
              </label>
              <input
                type="text"
                required
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="напр., Київ, Відділення №45 (вул. Антоновича 10)"
                className="w-full bg-nude-50 border border-nude-200 rounded-2xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="p-6 rounded-3xl bg-white border border-nude-200 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-semibold text-charcoal border-b border-nude-100 pb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gold-dark" />
              <span>{dict.checkout.paymentStep}</span>
            </h3>

            <div className="space-y-2">
              <label
                className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === "card_online"
                    ? "border-nude-900 bg-nude-50 font-medium"
                    : "border-nude-200 hover:border-gold/50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "card_online"}
                  onChange={() => setPaymentMethod("card_online")}
                  className="text-nude-900 accent-nude-900"
                />
                <span className="text-xs text-charcoal">{dict.checkout.payCard}</span>
              </label>

              <label
                className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === "invoice"}
                    ? "border-nude-900 bg-nude-50 font-medium"
                    : "border-nude-200 hover:border-gold/50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "invoice"}
                  onChange={() => setPaymentMethod("invoice")}
                  className="text-nude-900 accent-nude-900"
                />
                <span className="text-xs text-charcoal">{dict.checkout.payInvoice}</span>
              </label>

              <label
                className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === "cod"
                    ? "border-nude-900 bg-nude-50 font-medium"
                    : "border-nude-200 hover:border-gold/50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="text-nude-900 accent-nude-900"
                />
                <span className="text-xs text-charcoal">{dict.checkout.payCod}</span>
              </label>
            </div>

            <div className="pt-2">
              <label className="text-xs font-medium text-nude-600 block mb-1">
                {dict.checkout.comment}
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Побажання щодо упаковки або часу доставки..."
                className="w-full bg-nude-50 border border-nude-200 rounded-2xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-gold"
              />
            </div>
          </div>
        </div>

        {/* Right column: Order Summary Card */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-3xl bg-white border border-nude-200 shadow-luxury space-y-6 sticky top-28">
            <h3 className="font-serif text-xl font-semibold text-charcoal border-b border-nude-200 pb-3">
              {dict.checkout.orderSummary}
            </h3>

            {/* List of items */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-nude-100 flex-shrink-0 border border-nude-200">
                    <Image src={item.image} alt={item.title} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-charcoal truncate">{item.title}</p>
                    {item.variantName && (
                      <span className="text-[11px] text-nude-500">{item.variantName}</span>
                    )}
                    <p className="text-xs text-nude-600">
                      {item.quantity} × {item.price} {currency}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-charcoal">
                    {item.price * item.quantity} {currency}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculation */}
            <div className="border-t border-nude-200 pt-4 space-y-2 text-xs text-nude-600">
              <div className="flex justify-between">
                <span>Вартість товарів:</span>
                <span className="font-semibold text-charcoal">{subtotal} {currency}</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка:</span>
                <span className="font-semibold text-charcoal">
                  {deliveryCost === 0 ? "Безкоштовно" : `${deliveryCost} ${currency}`}
                </span>
              </div>
              <div className="border-t border-nude-200 pt-3 flex justify-between items-baseline text-sm">
                <span className="font-serif font-bold text-charcoal">{dict.checkout.total}</span>
                <span className="font-serif text-2xl font-bold text-nude-900">
                  {totalAmount} {currency}
                </span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-[#96774E] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-luxury hover:shadow-gold-glow disabled:opacity-50"
            >
              {isSubmitting ? "Обробка замовлення..." : dict.checkout.confirmOrder}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-nude-500">
              <ShieldCheck className="w-4 h-4 text-gold-dark" />
              <span>Безпечна оплата та гарантія захисту даних</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
