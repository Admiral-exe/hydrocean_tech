"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Wrench, Check } from "lucide-react";
import { CartItem } from "@/types/cart.types";
import { useCartStore } from "@/store/use-cart-store";
import { formatINR } from "@/lib/utils";

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs flex gap-3 relative">
      {/* Product Image & Tag */}
      <div className="relative w-22 h-22 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
        {item.tagBadge && (
          <span className="absolute top-1 left-1 bg-cyan-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-xs z-10">
            {item.tagBadge}
          </span>
        )}
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain p-1.5"
        />
      </div>

      {/* Item Details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-1">
            <Link
              href={`/product/${item.slug}`}
              className="text-xs font-black text-slate-800 hover:text-[#0b3b60] line-clamp-1 leading-snug"
            >
              {item.name}
            </Link>
            <button
              onClick={() => removeItem(item.id)}
              className="text-slate-400 hover:text-rose-500 p-0.5 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {item.subDescription && (
            <p className="text-[10px] text-slate-500 mt-0.5 truncate font-medium">
              {item.subDescription}
            </p>
          )}

          {/* Service / Feature Pill */}
          <div className="mt-1">
            {item.freeInstallationIncluded ? (
              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#0284c7] bg-[#eaf4fb] px-2 py-0.5 rounded-full">
                <Wrench className="w-2.5 h-2.5" />
                Free Installation included
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                <Check className="w-2.5 h-2.5" />
                Genuine Spare
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Quantity Row */}
        <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-black text-[#0b3b60]">
              {formatINR(item.price)}
            </span>
            {item.compareAtPrice && (
              <span className="text-[10px] text-slate-400 line-through">
                {formatINR(item.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Compact Quantity Selector */}
          <div className="flex items-center gap-2 bg-slate-100 px-1.5 py-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-5 h-5 rounded-md bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center text-xs"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs font-black text-slate-800 w-4 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-5 h-5 rounded-md bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center text-xs"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
