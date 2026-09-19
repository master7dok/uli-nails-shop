"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CartSlideOver() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const { locale, dict } = useLanguage();

  const freeThreshold = locale === "pl" ? 200 : 1500;
  const currency = locale === "pl" ? "zł" : "грн";
  const progressPercent = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
  const diffToFree = Math.max(0, freeThreshold - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-nude-50 shadow-2xl flex flex-col border-l border-nude-200"
            >
              {/* Header */}
              <div className="p-6 border-b border-nude-200 flex items-center justify-between bg-white/60">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-gold-dark" />
                  <h2 className="font-serif text-xl font-medium text-charcoal">
                    {dict.cart.title}
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blush text-charcoal font-medium">
                    {totalItems}
                  </span>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 text-nude-500 hover:text-charcoal hover:bg-nude-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress */}
              <div className="bg-nude-100/90 px-6 py-3 border-b border-nude-200 text-xs text-charcoal">
                {diffToFree === 0 ? (
                  <span className="font-medium text-emerald-800 flex items-center gap-1.5">
                    ✨ {dict.cart.freeShippingNote}
                  </span>
                ) : (
                  <div>
                    <p className="mb-1.5 text-nude-800 font-medium">
                      {dict.cart.freeShippingProgress.replace("{amount}", diffToFree.toString())}
                    </p>
                    <div className="w-full bg-nude-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gold h-full rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-nude-100 flex items-center justify-center mx-auto mb-4 text-nude-400">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="text-charcoal font-medium mb-1">{dict.cart.empty}</p>
                    <p className="text-xs text-nude-500 max-w-xs mx-auto mb-6">
                      {dict.cart.emptySubtitle}
                    </p>
                    <button
                      onClick={closeCart}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-[#96774E] text-white text-xs tracking-wider uppercase font-semibold transition-all duration-300 shadow-sm"
                    >
                      {dict.cart.startShopping}
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-3 bg-white rounded-2xl border border-nude-200/70 shadow-sm relative group hover:border-gold/40 transition-all"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-nude-100 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <h4 className="text-sm font-medium text-charcoal line-clamp-1">
                            {item.title}
                          </h4>
                          {item.variantName && (
                            <span className="inline-block text-[11px] font-medium text-gold-dark bg-nude-100 px-2 py-0.5 rounded-md mt-0.5">
                              {item.variantName}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-nude-200 rounded-full bg-nude-50">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:text-gold transition-colors text-charcoal"
                              title="Minus"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-charcoal">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:text-gold transition-colors text-charcoal"
                              title="Plus"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-sm font-semibold text-charcoal">
                              {item.price * item.quantity} {currency}
                            </span>
                            {item.oldPrice && (
                              <span className="block text-[11px] text-nude-500 line-through">
                                {item.oldPrice * item.quantity} {currency}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-2 right-2 p-1 text-nude-400 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100"
                        title={dict.cart.remove}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Checkout CTA */}
              {items.length > 0 && (
                <div className="p-6 border-t border-nude-200 bg-white/90 space-y-4">
                  <div className="flex items-center justify-between text-base font-medium text-charcoal">
                    <span>{dict.cart.subtotal}</span>
                    <span className="font-serif text-xl font-semibold text-nude-900">
                      {subtotal} {currency}
                    </span>
                  </div>

                  <Link
                    href={`/${locale}/checkout`}
                    onClick={closeCart}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-[#96774E] text-white font-semibold text-sm tracking-wide transition-all duration-300 shadow-luxury hover:shadow-gold-glow"
                  >
                    <span>{dict.cart.checkoutBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={closeCart}
                    className="w-full text-center text-xs text-nude-500 hover:text-charcoal transition-colors underline"
                  >
                    {dict.cart.continueShopping}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
