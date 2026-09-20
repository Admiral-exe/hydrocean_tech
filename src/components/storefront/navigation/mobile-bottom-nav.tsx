"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Droplets, Wrench, ShoppingBag, Phone } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();
  const totalCount = useCartStore((state) => state.getTotalCount());

  // Rule 1: Suppress the 5-tab navigation on product detail page to give mobile-sticky-cta full dock space
  if (pathname.startsWith("/product/")) {
    return null;
  }

  const tabs = [
    { label: "Home", href: "/", icon: Home },
    { label: "Products", href: "/catalog", icon: Droplets },
    { label: "Services", href: "/services", icon: Wrench },
    { label: "Cart", href: "/cart", icon: ShoppingBag, badge: totalCount },
    { label: "Contact", href: "/book-demo", icon: Phone },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto h-16 flex items-center justify-around px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-1 transition-colors relative",
                isActive ? "text-[#0b3b60] font-bold" : "text-slate-500 hover:text-slate-800"
              )}
            >
              <div className="relative">
                <Icon
                  className={cn(
                    "w-5 h-5 transition-transform",
                    isActive ? "stroke-[2.4] scale-105" : "stroke-[1.8]"
                  )}
                />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#0b3b60] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">{tab.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#0b3b60] mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
