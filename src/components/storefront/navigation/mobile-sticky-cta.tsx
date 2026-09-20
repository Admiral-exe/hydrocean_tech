"use client";

import React, { useState } from "react";
import { ShoppingCart, MessageCircle, Check } from "lucide-react";
import { Product, CapacityVariant } from "@/types/product.types";
import { useCartStore } from "@/store/use-cart-store";
import { buildWhatsAppDirectProductPayload } from "@/lib/whatsapp/payload-builder";

interface MobileStickyCTAProps {
  product: Product;
  selectedVariant: CapacityVariant;
  quantity: number;
}

export function MobileStickyCTA({
  product,
  selectedVariant,
  quantity,
}: MobileStickyCTAProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const effectivePrice = product.price + selectedVariant.price_diff;

  const handleAddToCart = () => {
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

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappUrl = buildWhatsAppDirectProductPayload(
    product.name,
    selectedVariant.capacity,
    effectivePrice,
    quantity
  );

  return (
    <aside aria-label="Purchase actions" className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] py-3 px-4">
      <div className="max-w-md mx-auto flex items-center gap-3">
        {/* Button 1: Add to Cart (Light Blue) */}
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-[#e0f2fe] hover:bg-[#bae6fd] text-[#0369a1] active:scale-[0.98] transition-all font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-xs cursor-pointer"
        >
          {added ? (
            <>
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span className="text-emerald-700">Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 text-[#0369a1]" />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        {/* Button 2: Order on WhatsApp (Bright Green) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#25d366] hover:bg-[#20ba5a] text-white active:scale-[0.98] transition-all font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-white text-white" />
          <span>Order on WhatsApp</span>
        </a>
      </div>
    </aside>
  );
}
