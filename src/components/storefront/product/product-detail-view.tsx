"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, MessageCircle, Check } from "lucide-react";
import { Product, CapacityVariant } from "@/types/product.types";
import { ProductGallery } from "./product-gallery";
import { ProductPricingBox } from "./product-pricing-box";
import { ProductVariantSelector } from "./product-variant-selector";
import { ProductTabs } from "./product-tabs";
import { MobileStickyCTA } from "../navigation/mobile-sticky-cta";
import { useCartStore } from "@/store/use-cart-store";
import { buildWhatsAppDirectProductPayload } from "@/lib/whatsapp/payload-builder";

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  // Default variant
  const defaultVariant =
    product.capacity_variants.find((v) => v.is_default) ||
    product.capacity_variants[0] || {
      capacity: product.storage_capacity,
      price_diff: 0,
      label: "Standard",
      is_default: true,
    };

  const [selectedVariant, setSelectedVariant] = useState<CapacityVariant>(defaultVariant);
  const [quantity, setQuantity] = useState(1);
  const [desktopAdded, setDesktopAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const effectivePrice = product.price + selectedVariant.price_diff;

  const handleDesktopAddToCart = () => {
    addItem(
      {
        id: `${product.id}-${selectedVariant.capacity}`,
        productId: product.id,
        name: product.name,
        slug: product.slug,
        image: product.images[0] || "/images/products/hydropure-main.webp",
        price: effectivePrice,
        compareAtPrice: product.compare_at_price
          ? product.compare_at_price + selectedVariant.price_diff
          : null,
        variant: selectedVariant.capacity,
        tagBadge: product.tag_badge || "RO+UV",
        subDescription: product.short_description || undefined,
        freeInstallationIncluded: true,
      },
      quantity
    );

    setDesktopAdded(true);
    setTimeout(() => setDesktopAdded(false), 2000);
  };

  const whatsappUrl = buildWhatsAppDirectProductPayload(
    product.name,
    selectedVariant.capacity,
    effectivePrice,
    quantity
  );

  return (
    <div className="relative pb-16 md:pb-0">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between py-2 border-b border-slate-200 mb-6">
        <Link
          href="/catalog"
          className="text-slate-600 hover:text-[#0b3b60] flex items-center gap-1.5 text-xs font-bold transition-colors"
          aria-label="Back to purifiers"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to RO Purifiers</span>
        </Link>
        <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
          Home / RO Purifiers / {product.name}
        </span>
      </div>

      {/* Responsive 2-Column Product Layout (Mobile: Stacked, Desktop: Side-by-side) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery (Sticky on Desktop) */}
        <div className="lg:col-span-6 lg:sticky lg:top-24">
          <ProductGallery
            images={product.images}
            productName={product.name}
            badgeText={product.badge_text}
          />
        </div>

        {/* Right Column: Information, Pricing, Variants, and Actions */}
        <div className="lg:col-span-6 space-y-6">
          <ProductPricingBox product={product} selectedVariant={selectedVariant} />

          <ProductVariantSelector
            variants={product.capacity_variants}
            selectedVariant={selectedVariant}
            onSelectVariant={setSelectedVariant}
            quantity={quantity}
            onQuantityChange={setQuantity}
          />

          {/* Desktop Dual Action Buttons (hidden on mobile, visible on md+) */}
          <div className="hidden md:flex items-center gap-3 pt-2">
            <button
              onClick={handleDesktopAddToCart}
              className="flex-1 bg-[#e0f2fe] hover:bg-[#bae6fd] text-[#0369a1] active:scale-98 transition-all font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 text-sm shadow-xs cursor-pointer"
            >
              {desktopAdded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span className="text-emerald-700">Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 text-[#0369a1]" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#25d366] hover:bg-[#20ba5a] text-white active:scale-98 transition-all font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg cursor-pointer"
            >
              <MessageCircle className="w-4.5 h-4.5 fill-white text-white" />
              <span>Order on WhatsApp</span>
            </a>
          </div>

          {/* 3-Segment Tab Bar (7 Stages | Specs | Installation) */}
          <ProductTabs product={product} />
        </div>
      </div>

      {/* Mobile-Only Sticky Bottom CTA Bar */}
      <div className="md:hidden">
        <MobileStickyCTA
          product={product}
          selectedVariant={selectedVariant}
          quantity={quantity}
        />
      </div>
    </div>
  );
}
