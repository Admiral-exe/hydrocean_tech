"use client";

import React from "react";
import { MessageCircle, ShieldCheck, Clock } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { formatINR } from "@/lib/utils";
import { buildWhatsAppOrderPayload } from "@/lib/whatsapp/payload-builder";

interface CartBillSummaryProps {
  onToggleEmptyState?: () => void;
}

export function CartBillSummary({ onToggleEmptyState }: CartBillSummaryProps) {
  const items = useCartStore((state) => state.items);
  const coupon = useCartStore((state) => state.coupon);
  const deliveryPincode = useCartStore((state) => state.deliveryPincode);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getDiscount = useCartStore((state) => state.getDiscount);
  const getTotalPayable = useCartStore((state) => state.getTotalPayable);
  const totalCount = useCartStore((state) => state.getTotalCount());

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const totalPayable = getTotalPayable();

  const whatsappUrl = buildWhatsAppOrderPayload({
    items,
    pincode: deliveryPincode || "560034",
    couponApplied: coupon?.code,
    discountAmount: discount,
    subtotal,
    totalPayable,
  });

  return (
    <div className="space-y-4">
      {/* Bill Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
          Order Bill Summary
        </h3>

        <div className="space-y-2 text-xs divide-y divide-slate-100">
          <div className="flex justify-between items-center pt-1 font-semibold text-slate-600">
            <span>Subtotal ({totalCount} items)</span>
            <span className="font-bold text-slate-800">{formatINR(subtotal)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between items-center pt-2 font-semibold text-[#0284c7]">
              <span>Instant Store Discount</span>
              <span className="font-extrabold">- {formatINR(discount)}</span>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <span>Standard Installation</span>
              <span className="text-[10px] text-slate-400 line-through">₹750</span>
            </span>
            <span className="font-extrabold text-emerald-600 uppercase text-[11px]">
              FREE
            </span>
          </div>

          <div className="flex justify-between items-center pt-2 font-semibold text-slate-600">
            <span>Express Delivery</span>
            <span className="font-extrabold text-emerald-600 uppercase text-[11px]">
              FREE
            </span>
          </div>

          <div className="flex justify-between items-baseline pt-3">
            <div>
              <span className="text-sm font-black text-slate-800 block">
                Total Payable
              </span>
              <span className="text-[10px] text-slate-400">
                Includes all taxes &amp; onsite labor
              </span>
            </div>
            <span className="text-xl font-black text-[#0b3b60]">
              {formatINR(totalPayable)}
            </span>
          </div>
        </div>
      </div>

      {/* Primary WhatsApp CTA Button */}
      <div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-white text-white" />
          <span>Proceed to Order via WhatsApp</span>
        </a>
      </div>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-6 text-[11px] font-bold text-slate-600">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#0b3b60]" />
          <span>Genuine Water Quality</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-[#0b3b60]" />
          <span>24h Technician Visit</span>
        </div>
      </div>

      {/* Preview Toggle for Empty State */}
      {onToggleEmptyState && (
        <div className="text-center pt-2">
          <button
            onClick={onToggleEmptyState}
            className="text-xs font-bold text-[#0284c7] hover:underline cursor-pointer"
          >
            Preview Empty Cart Screen
          </button>
        </div>
      )}
    </div>
  );
}
