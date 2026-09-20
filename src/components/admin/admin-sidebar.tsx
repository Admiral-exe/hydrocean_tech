"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Users, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Demo Inquiries", href: "/admin/leads", icon: Users },
  ];

  return (
    <aside className="w-60 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between p-4 min-h-[calc(100vh-3.5rem)]">
      <div className="space-y-1">
        <span className="text-[10px] font-black uppercase text-slate-400 px-3 tracking-wider">
          Management
        </span>
        <div className="mt-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin/dashboard"
                ? pathname === "/admin/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs transition-colors",
                  isActive
                    ? "bg-[#0b3b60] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-[#0b3b60] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Storefront</span>
        </Link>
      </div>
    </aside>
  );
}
