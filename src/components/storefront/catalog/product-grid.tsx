"use client";

import React, { useMemo } from "react";
import { Product } from "@/types/product.types";
import { Category } from "@/types/category.types";
import { useCatalogFilterStore } from "@/store/use-catalog-filter-store";
import { CatalogSearchBar } from "./catalog-search-bar";
import { ActiveFiltersBar } from "./active-filters-bar";
import { CatalogFilterSheet } from "./catalog-filter-sheet";
import { ProductCard } from "./product-card";
import { CustomRoCard } from "./custom-ro-card";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  initialProducts: Product[];
  categories: Category[];
}

export function ProductGrid({ initialProducts, categories }: ProductGridProps) {
  const searchQuery = useCatalogFilterStore((state) => state.searchQuery);
  const activeCategory = useCatalogFilterStore((state) => state.activeCategory);
  const setActiveCategory = useCatalogFilterStore((state) => state.setActiveCategory);
  const sortBy = useCatalogFilterStore((state) => state.sortBy);
  const selectedTech = useCatalogFilterStore((state) => state.selectedTech);
  const priceRange = useCatalogFilterStore((state) => state.priceRange);
  const selectedCapacity = useCatalogFilterStore((state) => state.selectedCapacity);

  // Compute category counts
  const categoryChips = useMemo(() => {
    const allCount = initialProducts.length;
    const chips = [
      { id: "all", name: `All (${allCount})`, slug: "all" },
      ...categories.map((c) => {
        const count = initialProducts.filter((p) => p.category_id === c.id).length;
        return { id: c.id, name: `${c.name} (${count})`, slug: c.slug };
      }),
    ];
    return chips;
  }, [initialProducts, categories]);

  // Dynamic filter & sort
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    // 1. Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.purification_tech.toLowerCase().includes(q) ||
          (p.short_description && p.short_description.toLowerCase().includes(q))
      );
    }

    // 2. Category
    if (activeCategory !== "all") {
      const cat = categories.find((c) => c.slug === activeCategory);
      if (cat) {
        list = list.filter((p) => p.category_id === cat.id);
      }
    }

    // 3. Purification Technology
    if (selectedTech.length > 0) {
      list = list.filter((p) => selectedTech.includes(p.purification_tech));
    }

    // 4. Price range
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // 5. Storage Capacity
    if (selectedCapacity) {
      list = list.filter(
        (p) =>
          p.storage_capacity.includes(selectedCapacity) ||
          (selectedCapacity === "10L" && p.storage_capacity.includes("10L")) ||
          (selectedCapacity === "7L - 8L" && (p.storage_capacity.includes("7L") || p.storage_capacity.includes("8L")))
      );
    }

    // 6. Sort
    switch (sortBy) {
      case "price_asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "popularity":
      default:
        list.sort((a, b) => b.review_count - a.review_count);
        break;
    }

    return list;
  }, [
    initialProducts,
    categories,
    searchQuery,
    activeCategory,
    selectedTech,
    priceRange,
    selectedCapacity,
    sortBy,
  ]);

  return (
    <div className="space-y-3">
      {/* 1. Search Bar & Filter Drawer Trigger */}
      <CatalogSearchBar />

      {/* 2. Category Chips with Count Badges */}
      <div className="overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-2 px-1 min-w-max">
          {categoryChips.map((chip) => {
            const isActive = activeCategory === chip.slug;
            return (
              <button
                key={chip.id}
                onClick={() => setActiveCategory(chip.slug)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer",
                  isActive
                    ? "bg-[#0b3b60] text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
                )}
              >
                {chip.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Active Filters & Count Display */}
      <ActiveFiltersBar totalCount={filteredProducts.length} />

      {/* 4. Responsive Product Grid (Mobile: 2 cols, Tablet: 3 cols, Desktop: 4 cols) */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 mt-3">
          <p className="text-sm font-bold text-slate-800">No purifiers match your filter criteria</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting the price slider or tech selection.</p>
        </div>
      )}

      {/* 5. Specialized Custom RO Inquiry Card */}
      <CustomRoCard />

      {/* 6. Filter & Sort Bottom Sheet Drawer */}
      <CatalogFilterSheet totalFilteredCount={filteredProducts.length} />
    </div>
  );
}
