"use client";

import React from "react";
import Image from "next/image";
import { Instagram, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const INSTAGRAM_POSTS = [
  {
    id: "ig-1",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800",
    likes: "1.4k",
  },
  {
    id: "ig-2",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800",
    likes: "980",
  },
  {
    id: "ig-3",
    image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800",
    likes: "2.1k",
  },
  {
    id: "ig-4",
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=800",
    likes: "1.8k",
  },
  {
    id: "ig-5",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=800",
    likes: "740",
  },
  {
    id: "ig-6",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800",
    likes: "3.2k",
  },
];

export default function InstagramFeed() {
  const { dict } = useLanguage();

  return (
    <section className="py-14">
      <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-gold-dark text-xs font-semibold tracking-widest uppercase">
          <Instagram className="w-4 h-4" />
          <span>Social Community</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-charcoal tracking-wide">
          {dict.home.instagramTitle}
        </h2>
        <p className="text-xs sm:text-sm text-nude-500">
          {dict.home.instagramSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {INSTAGRAM_POSTS.map((post) => (
          <a
            key={post.id}
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-nude-100 block shadow-sm border border-nude-200/60"
          >
            <Image
              src={post.image}
              alt="Instagram nail art"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Hover overlay with heart & likes */}
            <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-1 backdrop-blur-[2px]">
              <Heart className="w-5 h-5 fill-white" />
              <span className="text-xs font-semibold">{post.likes}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-nude-100 hover:bg-gold text-charcoal hover:text-white font-medium text-xs tracking-wider uppercase transition-all duration-300 border border-nude-200"
        >
          <Instagram className="w-4 h-4" />
          <span>{dict.home.followInstagram}</span>
        </a>
      </div>
    </section>
  );
}
