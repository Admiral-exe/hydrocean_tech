"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Search, ShoppingBag, User, Droplets, Wrench, Phone, Home } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { cn } from "@/lib/utils";

export function StorefrontHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const totalCount = useCartStore((state) => state.getTotalCount());

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "RO Purifiers", href: "/catalog", icon: Droplets },
    { label: "Service", href: "/services", icon: Wrench },
    { label: "Book Water Test", href: "/book-demo", icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo with official Hydrocean logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Image
            src="/logo.png"
            alt="Hydrocean Tech"
            width={160}
            height={44}
            className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            priority
          />
        </Link>

        {/* Center: Desktop Navigation Bar (hidden on mobile, visible on md+) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-bold transition-all",
                  isActive
                    ? "bg-[#e8f2fa] text-[#0b3b60] shadow-2xs"
                    : "text-slate-600 hover:text-[#0b3b60] hover:bg-slate-100/80"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions (Search, Cart with Live Count, Admin Portal) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => router.push("/catalog")}
            className="p-2 text-slate-700 hover:text-[#0b3b60] rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Search purifiers"
            title="Search Products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Icon with Live Badge */}
          <Link
            href="/cart"
            className="p-2 relative text-slate-700 hover:text-[#0b3b60] rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Shopping Cart"
            title="View Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#0b3b60] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center ring-2 ring-white">
                {totalCount}
              </span>
            )}
          </Link>

          {/* User Avatar / Admin Portal */}
          <Link
            href="/admin/dashboard"
            className="w-8 h-8 rounded-full bg-[#0b3b60] hover:bg-[#072a46] text-white flex items-center justify-center ml-1 active:scale-95 transition-all shadow-xs"
            aria-label="Admin Portal"
            title="Admin Login & Management"
          >
            <User className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Mobile Top Navigation Bar: Smooth, 1-tap navigation for mobile screens */}
      <div className="md:hidden border-t border-slate-100 bg-slate-50/90 backdrop-blur-xs px-2 py-1.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-around gap-1 min-w-full">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-[#0b3b60] text-white shadow-2xs"
                    : "text-slate-700 hover:bg-slate-200/60"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
