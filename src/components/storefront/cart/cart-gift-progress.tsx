"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { formatINR } from "@/lib/utils";

export function CartGiftProgress() {
  const subtotal = useCartStore((state) => state.getSubtotal());
  const target = 15000;
  const remaining = Math.max(0, target - subtotal);
  const percentage = Math.min(100, Math.round((subtotal / target) * 100));

  return (
    <div className="bg-[#eaf4fb] rounded-2xl p-3.5 border border-[#cce2f3] space-y-2.5 shadow-2xs">
      {/* Progress Label */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-bold text-[#0b3b60]">
          <CheckCircle2 className="w-4 h-4 text-[#0284c7]" />
          <span>
            {remaining > 0
              ? `Add ${formatINR(remaining)} more for Free On-site Filter Kit!`
              : "Unlocked Free On-site Filter Kit!"}
          </span>
        </div>
        <span className="font-extrabold text-[#0284c7] text-xs">{percentage}%</span>
      </div>

      {/* Progress Track */}
      <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-cyan-400 to-[#0284c7] h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Trust Line */}
      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Qualified for Free Express Delivery &amp; Zero-Cost Installation</span>
      </div>
    </div>
  );
}
