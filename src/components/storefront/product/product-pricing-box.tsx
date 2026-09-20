import React from "react";
import { Star, CheckCircle2, Droplets, Monitor, Shield, Box } from "lucide-react";
import { Product, CapacityVariant } from "@/types/product.types";
import { formatINR } from "@/lib/utils";

interface ProductPricingBoxProps {
  product: Product;
  selectedVariant: CapacityVariant;
}

export function ProductPricingBox({ product, selectedVariant }: ProductPricingBoxProps) {
  const currentPrice = product.price + selectedVariant.price_diff;
  const comparePrice = product.compare_at_price
    ? product.compare_at_price + selectedVariant.price_diff
    : null;
  const savings = comparePrice ? comparePrice - currentPrice : 0;
  const discountPercent = comparePrice
    ? Math.round((savings / comparePrice) * 100)
    : product.discount_percent;

  const specBadges = [
    { label: "7-Stage Purification", icon: Droplets },
    { label: "Real-time TDS Display", icon: Monitor },
    { label: "1-Year Full Warranty", icon: Shield },
    { label: `${selectedVariant.capacity} Tank`, icon: Box },
  ];

  return (
    <div className="mt-4 px-1">
      {/* Title */}
      <h1 className="text-xl font-black text-[#0b3b60] leading-tight tracking-tight">
        {product.name}
      </h1>

      {/* Rating & Stock Status */}
      <div className="flex flex-wrap items-center gap-3 mt-2">
        <span className="flex items-center gap-1 text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
          <span className="text-slate-400">({product.review_count} verified)</span>
        </span>

        <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>In Stock • Ready for Same-Day Installation</span>
        </span>
      </div>

      {/* Pricing Container */}
      <div className="mt-3.5 bg-[#eaf3fa] rounded-2xl p-4 border border-[#cbe2f4] shadow-2xs">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-[#0b3b60]">
            {formatINR(currentPrice)}
          </span>
          {comparePrice && (
            <span className="text-sm font-semibold text-slate-400 line-through">
              {formatINR(comparePrice)}
            </span>
          )}
        </div>

        {savings > 0 && (
          <div className="mt-1.5">
            <span className="bg-amber-500 text-white text-[11px] font-black px-2 py-0.5 rounded-md">
              SAVE {formatINR(savings)} ({discountPercent}% OFF)
            </span>
          </div>
        )}

        <div className="flex items-start gap-1.5 mt-3 pt-2.5 border-t border-[#c6e0f3] text-[11px] text-slate-600 font-medium leading-snug">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#0284c7] shrink-0 mt-0.5" />
          <span>
            Inclusive of all taxes, 1-year filters &amp; free certified doorstep installation
          </span>
        </div>
      </div>

      {/* 4 Quick Spec Badges */}
      <div className="grid grid-cols-2 gap-2 mt-3.5">
        {specBadges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.label}
              className="bg-white rounded-xl p-2.5 border border-slate-200 flex items-center gap-2 shadow-2xs"
            >
              <Icon className="w-4 h-4 text-[#0284c7] shrink-0" />
              <span className="text-xs font-bold text-slate-800 truncate">
                {badge.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
