"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, ExternalLink } from "lucide-react";
import { logoutAdminAction } from "@/actions/auth.actions";

export function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdminAction();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Hydrocean Tech"
          width={130}
          height={32}
          className="h-7 w-auto object-contain"
        />
        <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full border border-slate-200">
          Admin Portal
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="text-xs font-semibold text-slate-600 hover:text-[#0b3b60] flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          <span>Live Store</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        <button
          onClick={handleLogout}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <LogOut className="w-3 h-3" />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}
