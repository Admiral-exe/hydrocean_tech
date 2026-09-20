"use client";

import React, { useState } from "react";
import { Truck, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";

export function CartPincodeChecker() {
  const deliveryPincode = useCartStore((state) => state.deliveryPincode);
  const setDeliveryPincode = useCartStore((state) => state.setDeliveryPincode);
  const checkPincode = useCartStore((state) => state.checkPincode);
  const pincodeVerified = useCartStore((state) => state.pincodeVerified);
  const pincodeMessage = useCartStore((state) => state.pincodeMessage);

  const [inputPin, setInputPin] = useState(deliveryPincode || "560034");

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    checkPincode(inputPin);
  };

  return (
    <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-2.5">
      {/* Header */}
      <div className="flex items-center gap-1.5 text-xs font-black text-[#0b3b60]">
        <Truck className="w-4 h-4 text-[#0284c7]" />
        <span>Delivery &amp; Installation Service Availability</span>
      </div>

      {/* Form Input & Action */}
      <form onSubmit={handleCheck} className="flex items-center gap-2">
        <input
          type="text"
          maxLength={6}
          value={inputPin}
          onChange={(e) => {
            setInputPin(e.target.value);
            setDeliveryPincode(e.target.value);
          }}
          placeholder="Enter 6-digit pincode"
          className="flex-1 bg-[#eaf4fb]/60 border border-[#cce2f3] rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b3b60]"
        />
        <button
          type="submit"
          className="bg-[#0b3b60] hover:bg-[#072a46] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0 shadow-xs active:scale-95 cursor-pointer"
        >
          Check Date
        </button>
      </form>

      {/* Result Card */}
      {pincodeVerified && pincodeMessage && (
        <div className="bg-[#eaf4fb] border border-[#b9daf2] rounded-xl p-2.5 flex items-start gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <span className="text-[11px] font-semibold text-slate-700 leading-tight">
            {pincodeMessage}
          </span>
        </div>
      )}
    </div>
  );
}
