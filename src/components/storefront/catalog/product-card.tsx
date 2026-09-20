"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types/product.types";
import { useCartStore } from "@/store/use-cart-store";
import { formatINR } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: `${product.id}-default`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0] || "/images/products/hydropure-main.webp",
      price: product.price,
      compareAtPrice: product.compare_at_price,
      variant: product.capacity_variants[0]?.capacity || "Standard",
      tagBadge: product.tag_badge || "RO+UV",
      subDescription: product.short_description || undefined,
      freeInstallationIncluded: true,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
      <Link href={`/product/${product.slug}`} className="block relative p-3 pb-2">
        {/* Top Badges (Discount & Wishlist) */}
        <div className="flex items-center justify-between">
          {product.discount_percent > 0 ? (
            <span className="bg-cyan-500 text-white text-[10px] font-black px-2 py-0.5 rounded-sm shadow-2xs">
              {product.discount_percent}% OFF
            </span>
          ) : (
            <span />
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            aria-label="Wishlist toggle"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isWishlisted ? "fill-rose-500 text-rose-500" : "text-slate-500"
              }`}
            />
          </button>
        </div>

        {/* Product Visual */}
        <div className="relative w-full h-32 my-2 rounded-lg overflow-hidden bg-slate-50 flex items-center justify-center">
          <Image
            src={product.images[0] || "/images/products/hydropure-main.webp"}
            alt={product.name}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Capacity & Rating Badges */}
        <div className="flex items-center justify-between text-[10px] mt-1 text-slate-500 font-semibold">
          <span className="bg-[#e8f2fa] text-[#0b3b60] px-1.5 py-0.5 rounded-sm font-bold truncate max-w-[90px]">
            {product.storage_capacity}
          </span>
          <span className="flex items-center gap-0.5 text-slate-700 font-bold">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {product.rating} ({product.review_count})
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-xs font-bold text-slate-800 mt-2 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {/* Price Row */}
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-sm font-black text-[#0b3b60]">
            {formatINR(product.price)}
          </span>
          {product.compare_at_price && (
            <span className="text-[10px] text-slate-400 line-through">
              {formatINR(product.compare_at_price)}
            </span>
          )}
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="p-3 pt-0">
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#0b3b60] hover:bg-[#072a46] text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.98] transition-all cursor-pointer"
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-400" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
