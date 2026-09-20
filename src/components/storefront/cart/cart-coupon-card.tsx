"use client";

import React, { useState } from "react";
import { Tag, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";

export function CartCouponCard() {
  const coupon = useCartStore((state) => state.coupon);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const removeCoupon = useCartStore((state) => state.removeCoupon);

  const [code, setCode] = useState(coupon?.code || "HYDROFREE");
  const [error, setError] = useState<string | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = applyCoupon(code);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-2.5">
      {/* Header */}
      <div className="flex items-center gap-1.5 text-xs font-black text-[#0b3b60]">
        <Tag className="w-4 h-4 text-[#0284c7]" />
        <span>Coupons &amp; Instant Offers</span>
      </div>

      {/* Input Row */}
      <form onSubmit={handleApply} className="flex items-center gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setError(null);
          }}
          placeholder="Enter promo code (e.g. HYDROFREE)"
          className="flex-1 bg-[#eaf4fb]/60 border border-[#cce2f3] rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b3b60]"
        />
        <button
          type="submit"
          className="bg-[#eaf4fb] hover:bg-[#d0e3f2] text-[#0b3b60] font-bold text-xs px-4 py-2 rounded-xl transition-colors shrink-0 cursor-pointer"
        >
          {coupon ? "Applied" : "Apply"}
        </button>
      </form>

      {error && <p className="text-[11px] font-semibold text-rose-600">{error}</p>}

      {/* Applied Banner */}
      {coupon && (
        <div className="bg-[#eaf4fb] border border-[#b9daf2] rounded-xl p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
            <span className="text-[11px] font-bold text-[#0b3b60]">
              {coupon.code} applied: {coupon.description}
            </span>
          </div>
          <button
            onClick={removeCoupon}
            className="text-[11px] font-bold text-slate-500 hover:text-rose-600 cursor-pointer ml-2"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
