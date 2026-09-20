"use client";

import React from "react";
import { useCatalogFilterStore } from "@/store/use-catalog-filter-store";
import { cn } from "@/lib/utils";

interface CategoryChipsBarProps {
  categories: Array<{ id: string; name: string; slug: string }>;
  activeSlug?: string;
  onSelect?: (slug: string) => void;
}

export function CategoryChipsBar({
  categories,
  activeSlug,
  onSelect,
}: CategoryChipsBarProps) {
  const storeCategory = useCatalogFilterStore((state) => state.activeCategory);
  const setStoreCategory = useCatalogFilterStore((state) => state.setActiveCategory);

  const current = activeSlug !== undefined ? activeSlug : storeCategory;

  const allCategories = [{ id: "all", name: "All", slug: "all" }, ...categories];

  const handleSelect = (slug: string) => {
    if (onSelect) {
      onSelect(slug);
    } else {
      setStoreCategory(slug);
    }
  };

  return (
    <div className="mt-4 overflow-x-auto no-scrollbar py-1">
      <div className="flex items-center gap-2 px-1 min-w-max">
        {allCategories.map((cat) => {
          const isActive = current === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.slug)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer",
                isActive
                  ? "bg-[#0b3b60] text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
              )}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
