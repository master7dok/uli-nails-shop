"use client";

import React, { useState } from "react";
import { Star, MessageSquare, ShieldCheck, Check } from "lucide-react";
import { ProductReview } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface ProductTabsProps {
  productId: string;
  description: string;
  usage?: string;
  ingredients?: string;
  reviews?: ProductReview[];
}

export default function ProductTabs({
  productId,
  description,
  usage,
  ingredients,
  reviews = [],
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"desc" | "usage" | "ingredients" | "reviews">("desc");
  const { dict } = useLanguage();

  // Review submission state
  const [authorName, setAuthorName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const approvedReviews = reviews.filter((r) => r.isApproved);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          authorName,
          rating,
          comment,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setAuthorName("");
        setComment("");
      }
    } catch (e) {
      console.error("Failed to submit review:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-14 pt-8 border-t border-nude-200">
      {/* Tabs Switcher */}
      <div className="flex flex-wrap gap-2 sm:gap-3 border-b border-nude-200 pb-3">
        <button
          onClick={() => setActiveTab("desc")}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all ${
            activeTab === "desc"
              ? "bg-nude-900 text-white shadow-sm"
              : "bg-nude-100/80 text-charcoal hover:bg-nude-200"
          }`}
        >
          {dict.product.tabs.description}
        </button>

        {usage && (
          <button
            onClick={() => setActiveTab("usage")}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all ${
              activeTab === "usage"
                ? "bg-nude-900 text-white shadow-sm"
                : "bg-nude-100/80 text-charcoal hover:bg-nude-200"
            }`}
          >
            {dict.product.tabs.usage}
          </button>
        )}

        {ingredients && (
          <button
            onClick={() => setActiveTab("ingredients")}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all ${
              activeTab === "ingredients"
                ? "bg-nude-900 text-white shadow-sm"
                : "bg-nude-100/80 text-charcoal hover:bg-nude-200"
            }`}
          >
            {dict.product.tabs.ingredients}
          </button>
        )}

        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all flex items-center gap-1.5 ${
            activeTab === "reviews"
              ? "bg-nude-900 text-white shadow-sm"
              : "bg-nude-100/80 text-charcoal hover:bg-nude-200"
          }`}
        >
          <span>{dict.product.tabs.reviews}</span>
          <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-gold text-nude-900 font-bold">
            {approvedReviews.length}
          </span>
        </button>
      </div>

      {/* Tabs Content */}
      <div className="py-8 text-charcoal text-sm leading-relaxed max-w-3xl">
        {activeTab === "desc" && (
          <div className="space-y-4">
            <p className="whitespace-pre-line text-nude-700">{description}</p>
          </div>
        )}

        {activeTab === "usage" && usage && (
          <div className="p-6 rounded-3xl bg-nude-100/60 border border-nude-200 space-y-3">
            <h4 className="font-serif text-base font-semibold text-charcoal">
              {dict.product.tabs.usage}
            </h4>
            <p className="whitespace-pre-line text-nude-700">{usage}</p>
          </div>
        )}

        {activeTab === "ingredients" && ingredients && (
          <div className="p-6 rounded-3xl bg-nude-100/60 border border-nude-200 space-y-3">
            <div className="flex items-center gap-2 text-gold-dark font-medium text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Формула 9-Free безпечна для нігтів</span>
            </div>
            <p className="font-mono text-xs text-nude-600 leading-relaxed bg-white p-4 rounded-2xl border border-nude-200">
              {ingredients}
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-8">
            {/* Reviews list */}
            {approvedReviews.length === 0 ? (
              <p className="text-xs text-nude-500 italic">{dict.product.noReviews}</p>
            ) : (
              <div className="space-y-4">
                {approvedReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-white border border-nude-200/80 shadow-sm space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-charcoal text-sm">
                        {rev.authorName}
                      </span>
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
                    <p className="text-xs text-nude-600">{rev.comment}</p>
                    <span className="text-[10px] text-nude-400 block">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Submit review form */}
            <div className="p-6 rounded-3xl bg-nude-100/70 border border-nude-200 space-y-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gold-dark" />
                <h4 className="font-serif text-base font-semibold text-charcoal">
                  {dict.product.writeReview}
                </h4>
              </div>

              {isSubmitted ? (
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{dict.product.reviewSuccess}</span>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs text-nude-600 block mb-1">
                      {dict.product.reviewAuthor}
                    </label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full bg-white border border-nude-200 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-nude-600 block mb-1">
                      {dict.product.reviewRating}
                    </label>
                    <div className="flex items-center gap-1 text-gold">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= rating ? "fill-gold text-gold" : "text-nude-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-nude-600 block mb-1">
                      {dict.product.reviewComment}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full bg-white border border-nude-200 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-full bg-nude-900 hover:bg-gold-dark text-white text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Надсилаємо..." : dict.product.submitReview}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
