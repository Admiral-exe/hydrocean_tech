"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, ChevronRight, Heart, Star } from "lucide-react";
import { Product } from "@/types/product.types";
import { useCartStore } from "@/store/use-cart-store";
import { formatINR } from "@/lib/utils";

interface TopRatedCarouselProps {
  products: Product[];
}

export function TopRatedCarousel({ products }: TopRatedCarouselProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <section className="mb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#0b3b60]">
            Top Rated RO Purifiers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Lab tested multi-barrier purification for homes &amp; modular kitchens
          </p>
        </div>
        <Link
          href="/catalog"
          className="text-xs sm:text-sm font-bold text-[#0b3b60] hover:underline flex items-center gap-1 bg-[#e8f2fa] px-3 py-1.5 rounded-xl transition-colors"
        >
          <span>View all</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Responsive Grid on Desktop / Carousel on Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.slice(0, 4).map((product) => {
          const handleQuickAdd = (e: React.MouseEvent) => {
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
          };

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <Link href={`/product/${product.slug}`} className="block relative p-4">
                {/* Discount & Wishlist */}
                <div className="flex items-center justify-between mb-2">
                  {product.discount_percent > 0 ? (
                    <span className="bg-amber-500 text-white text-[11px] font-black px-2 py-0.5 rounded-md">
                      {product.discount_percent}% OFF
                    </span>
                  ) : (
                    <span />
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors"
                    aria-label="Save to wishlist"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Visual */}
                <div className="relative w-full h-44 my-2 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center">
                  <Image
                    src={product.images[0] || "/images/products/hydropure-main.webp"}
                    alt={product.name}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Tech Tag & Rating */}
                <div className="flex items-center justify-between mt-2 text-[11px]">
                  <span className="font-bold text-[#0b3b60] bg-[#e8f2fa] px-2 py-0.5 rounded-md">
                    {product.purification_tech}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-slate-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {product.rating} ({product.review_count})
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-sm font-extrabold text-slate-800 mt-2 line-clamp-1 leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-medium">
                  {product.storage_capacity} Tank • 15L/hr Flow Rate
                </p>
              </Link>

              {/* Price & Add Button */}
              <div className="p-4 pt-0 flex items-center justify-between mt-2 border-t border-slate-100 pt-3">
                <div>
                  <div className="text-base font-black text-[#0b3b60]">
                    {formatINR(product.price)}
                  </div>
                  {product.compare_at_price && (
                    <div className="text-xs text-slate-400 line-through font-semibold">
                      {formatINR(product.compare_at_price)}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleQuickAdd}
                  className="bg-[#0b3b60] hover:bg-[#072a46] text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
