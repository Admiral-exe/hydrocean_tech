"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";
import { CapacityVariant } from "@/types/product.types";
import { cn } from "@/lib/utils";

interface ProductVariantSelectorProps {
  variants: CapacityVariant[];
  selectedVariant: CapacityVariant;
  onSelectVariant: (variant: CapacityVariant) => void;
  quantity: number;
  onQuantityChange: (qty: number) => void;
}

export function ProductVariantSelector({
  variants,
  selectedVariant,
  onSelectVariant,
  quantity,
  onQuantityChange,
}: ProductVariantSelectorProps) {
  return (
    <div className="mt-5 px-1 space-y-4">
      {/* Variant Header */}
      <div>
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-slate-800 tracking-tight">
            Select Storage Tank Capacity
          </label>
          <span className="text-[11px] font-semibold text-[#0284c7]">
            Optimal for 3–5 members
          </span>
        </div>

        {/* Variant Cards */}
        <div className="grid grid-cols-2 gap-2.5 mt-2">
          {variants.map((v) => {
            const isSelected = selectedVariant.capacity === v.capacity;
            return (
              <button
                key={v.capacity}
                onClick={() => onSelectVariant(v)}
                className={cn(
                  "p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer",
                  isSelected
                    ? "bg-[#0b3b60] border-[#0b3b60] text-white shadow-xs"
                    : "bg-white border-slate-200 text-slate-800 hover:border-slate-300"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold">{v.capacity}</span>
                  <div
                    className={cn(
                      "w-3.5 h-3.5 rounded-full border flex items-center justify-center",
                      isSelected ? "border-white" : "border-slate-300"
                    )}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-cyan-400" />}
                  </div>
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium mt-1",
                    isSelected ? "text-cyan-200" : "text-slate-500"
                  )}
                >
                  {v.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity Counter */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 flex items-center justify-between shadow-2xs">
        <div>
          <span className="text-xs font-black text-slate-800 block">Quantity</span>
          <span className="text-[10px] text-slate-500">
            Residential or Business count
          </span>
        </div>

        <div className="flex items-center gap-3 bg-slate-100 px-2 py-1 rounded-xl border border-slate-200">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="w-7 h-7 rounded-lg bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center active:scale-95 transition-transform"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-sm font-black text-[#0b3b60] w-6 text-center">
            {quantity}
          </span>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="w-7 h-7 rounded-lg bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center active:scale-95 transition-transform"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
