"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Star,
  Settings,
  LogOut,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const navItems = [
    { label: "Огляд (Дашборд)", href: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Товари та варіанти", href: "/admin/products", icon: Package },
    { label: "Категорії", href: "/admin/categories", icon: FolderTree },
    { label: "Замовлення", href: "/admin/orders", icon: ShoppingBag },
    { label: "Модерація відгуків", href: "/admin/reviews", icon: Star },
    { label: "Банери та налаштування", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-nude-900 text-nude-200 min-h-screen p-6 flex flex-col justify-between border-r border-nude-800 flex-shrink-0">
      <div className="space-y-8">
        {/* Brand */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-wider text-white">
              Uli<span className="text-gold italic font-serif">Nail</span>
            </span>
            <span className="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-full font-bold uppercase">
              Admin
            </span>
          </div>
          <p className="text-[11px] text-nude-400">Система керування магазином</p>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-gold text-nude-900 shadow-sm font-bold"
                    : "text-nude-300 hover:text-white hover:bg-nude-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="space-y-3 pt-6 border-t border-nude-800 text-xs">
        <Link
          href="/ua"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-nude-800 hover:bg-nude-700 text-white transition-colors"
        >
          <span>Перейти на сайт</span>
          <ExternalLink className="w-3.5 h-3.5 text-gold" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Вийти з панелі</span>
        </button>
      </div>
    </aside>
  );
}
