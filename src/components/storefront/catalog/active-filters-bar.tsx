"use client";

import React from "react";
import { X, ChevronDown } from "lucide-react";
import { useCatalogFilterStore, SortOption } from "@/store/use-catalog-filter-store";

interface ActiveFiltersBarProps {
  totalCount: number;
}

export function ActiveFiltersBar({ totalCount }: ActiveFiltersBarProps) {
  const sortBy = useCatalogFilterStore((state) => state.sortBy);
  const setSortBy = useCatalogFilterStore((state) => state.setSortBy);
  const selectedTech = useCatalogFilterStore((state) => state.selectedTech);
  const toggleTech = useCatalogFilterStore((state) => state.toggleTech);
  const priceRange = useCatalogFilterStore((state) => state.priceRange);
  const setPriceRange = useCatalogFilterStore((state) => state.setPriceRange);
  const selectedCapacity = useCatalogFilterStore((state) => state.selectedCapacity);
  const setSelectedCapacity = useCatalogFilterStore((state) => state.setSelectedCapacity);
  const resetFilters = useCatalogFilterStore((state) => state.resetFilters);
  const activeFilterCount = useCatalogFilterStore((state) => state.getActiveFilterCount());

  const isPriceFiltered = priceRange[1] < 30000;

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
  };

  return (
    <div className="mt-3 px-1 space-y-2">
      {/* Count & Sort Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-black text-[#0b3b60]">
          <span className="w-2 h-2 rounded-full bg-cyan-500" />
          <span>Showing {totalCount} Purifiers</span>
        </div>

        <div className="relative inline-flex items-center">
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="appearance-none bg-transparent text-[11px] font-bold text-slate-700 pr-5 py-1 focus:outline-none cursor-pointer"
          >
            <option value="popularity">Sort: Popularity</option>
            <option value="price_asc">Sort: Price Low to High</option>
            <option value="price_desc">Sort: Price High to Low</option>
            <option value="rating">Sort: Highest Rated</option>
            <option value="newest">Sort: Newest</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-0 pointer-events-none" />
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {isPriceFiltered && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0b3b60] bg-[#e8f2fa] px-2 py-0.5 rounded-md border border-[#cbe2f4]">
              Under ₹{priceRange[1].toLocaleString("en-IN")}
              <button
                onClick={() => setPriceRange([5000, 30000])}
                className="hover:text-rose-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedTech.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0b3b60] bg-[#e8f2fa] px-2 py-0.5 rounded-md border border-[#cbe2f4]"
            >
              {tech}
              <button onClick={() => toggleTech(tech)} className="hover:text-rose-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {selectedCapacity && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0b3b60] bg-[#e8f2fa] px-2 py-0.5 rounded-md border border-[#cbe2f4]">
              {selectedCapacity}
              <button onClick={() => setSelectedCapacity(null)} className="hover:text-rose-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={resetFilters}
            className="text-[10px] font-bold text-slate-500 hover:text-[#0b3b60] underline ml-1 cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
