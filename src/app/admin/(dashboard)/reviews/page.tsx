"use client";

import React, { useState, useEffect } from "react";
import { Star, Check, Trash2, ShieldCheck, AlertCircle } from "lucide-react";
import { ProductReview } from "@/types";

type ReviewWithTitle = ProductReview & { productTitleUa: string };

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewWithTitle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadReviews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        setReviews(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch("/api/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "approve" }),
      });
      if (res.ok) {
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, isApproved: true } : r))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Видалити цей відгук?")) return;
    try {
      const res = await fetch("/api/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "delete" }),
      });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-charcoal">
          Модерація відгуків
        </h1>
        <p className="text-xs text-nude-600 mt-1">
          Перевірка та публікація відгуків, залишених клієнтами до товарів
        </p>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-xs text-nude-500">Завантаження відгуків...</div>
      ) : reviews.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-nude-200 text-xs text-nude-500">
          Наразі немає відгуків для модерації
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className={`p-6 rounded-3xl border transition-all space-y-3 ${
                rev.isApproved
                  ? "bg-white border-nude-200"
                  : "bg-amber-50/50 border-amber-200"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-semibold text-gold-dark block">
                    До товару: «{rev.productTitleUa}»
                  </span>
                  <h4 className="font-semibold text-charcoal text-sm">{rev.authorName}</h4>
                </div>

                <div className="flex items-center text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? "fill-gold" : "text-nude-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-nude-700 bg-nude-50 p-3 rounded-2xl border border-nude-100 leading-relaxed">
                «{rev.comment}»
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-nude-100 text-xs">
                <span className="text-[11px] text-nude-500">
                  {new Date(rev.createdAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-2">
                  {!rev.isApproved && (
                    <button
                      onClick={() => handleApprove(rev.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-[11px] transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Схвалити</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(rev.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-[11px] transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Видалити</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
