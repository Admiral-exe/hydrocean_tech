"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight, RotateCcw } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { CartGiftProgress } from "./cart-gift-progress";
import { CartItemCard } from "./cart-item-card";
import { CartPincodeChecker } from "./cart-pincode-checker";
import { CartCouponCard } from "./cart-coupon-card";
import { CartBillSummary } from "./cart-bill-summary";

export function CartView() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const resetToSampleCart = useCartStore((state) => state.resetToSampleCart);
  const totalCount = useCartStore((state) => state.getTotalCount());

  const [previewEmpty, setPreviewEmpty] = useState(false);

  const isCartEmpty = items.length === 0 || previewEmpty;

  if (isCartEmpty) {
    return (
      <div className="pt-4 px-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-black text-[#0b3b60] flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0b3b60]" />
            <span>Your Cart (0 items)</span>
          </h1>
        </div>

        {/* Empty State Card */}
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-2xs space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#eaf4fb] text-[#0b3b60] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-800">Your Cart is Currently Empty</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Explore our certified 7-stage RO purifiers and genuine filter maintenance kits.
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Link
              href="/catalog"
              className="w-full bg-[#0b3b60] hover:bg-[#072a46] text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => {
                setPreviewEmpty(false);
                resetToSampleCart();
              }}
              className="w-full bg-[#eaf4fb] hover:bg-[#d0e3f2] text-[#0b3b60] font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Load Design Sample Cart (2 items)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-2 px-1 space-y-6">
      {/* Cart Screen Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <h1 className="text-xl sm:text-2xl font-black text-[#0b3b60] flex items-center gap-2.5">
          <ShoppingBag className="w-6 h-6 text-[#0b3b60]" />
          <span>Shopping Cart ({totalCount} {totalCount === 1 ? "item" : "items"})</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: items, incentives, pincode, coupons */}
        <div className="lg:col-span-7 space-y-4">
          {/* 1. Free On-site Filter Kit Incentive Progress Bar */}
          <CartGiftProgress />

          {/* 2. Cart Items List */}
          <div className="space-y-3">
            {items.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}
          </div>

          {/* 3. Delivery & Installation Service Availability */}
          <CartPincodeChecker />

          {/* 4. Coupons & Instant Offers */}
          <CartCouponCard />
        </div>

        {/* Right Column: Sticky Bill Summary & Checkout */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          {/* 5. Order Bill Summary & WhatsApp Checkout CTA */}
          <CartBillSummary onToggleEmptyState={() => setPreviewEmpty(true)} />
        </div>
      </div>
    </div>
  );
}
