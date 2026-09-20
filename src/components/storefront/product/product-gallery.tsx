"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Droplet, Heart, Share2 } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  badgeText?: string | null;
}

export function ProductGallery({
  images,
  productName,
  badgeText = "BEST SELLER",
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const displayImages =
    images && images.length > 0
      ? images
      : ["/images/products/hydropure-main.webp"];

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: `Check out ${productName} on Hydrocean`,
          url: window.location.href,
        });
      } catch {
        // Ignored if cancelled
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="pt-2 px-1">
      {/* Top Banner (Verified & Actions) */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#0284c7]">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span>VERIFIED HYDROTECH PURE GRADE</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-1.5 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Share product"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="p-1.5 text-slate-500 hover:text-rose-500 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Wishlist product"
          >
            <Heart
              className={`w-4 h-4 ${
                isWishlisted ? "fill-rose-500 text-rose-500" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="relative mt-2 w-full h-72 rounded-2xl bg-gradient-to-b from-[#f8fafc] to-[#e8f2fa] border border-slate-200 overflow-hidden flex items-center justify-center p-4 shadow-2xs">
        {/* Badges */}
        {badgeText && (
          <span className="absolute top-3 left-3 bg-amber-500 text-white text-[11px] font-black px-2.5 py-1 rounded-md shadow-2xs">
            {badgeText}
          </span>
        )}

        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#0b3b60] flex items-center justify-center shadow-xs">
          <Droplet className="w-4 h-4 fill-[#0b3b60]" />
        </div>

        <Image
          src={displayImages[activeIndex]}
          alt={productName}
          fill
          priority
          className="object-contain p-4"
        />

        {/* Carousel Pagination Dots */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {displayImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === idx ? "w-6 bg-[#0b3b60]" : "w-2 bg-slate-300"
                }`}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
