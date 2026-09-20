"use client";

import React from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { useCatalogFilterStore } from "@/store/use-catalog-filter-store";

export function CatalogSearchBar() {
  const searchQuery = useCatalogFilterStore((state) => state.searchQuery);
  const setSearchQuery = useCatalogFilterStore((state) => state.setSearchQuery);
  const setIsFilterSheetOpen = useCatalogFilterStore(
    (state) => state.setIsFilterSheetOpen
  );
  const filterCount = useCatalogFilterStore((state) =>
    state.getActiveFilterCount()
  );

  return (
    <div className="flex items-center gap-2 pt-2 px-1">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="RO+UV, Alkaline, Under-sink..."
          className="w-full bg-white pl-9.5 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b3b60] shadow-2xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Sheet Trigger Button */}
      <button
        onClick={() => setIsFilterSheetOpen(true)}
        className="relative bg-[#0b3b60] hover:bg-[#072a46] text-white p-2.5 rounded-xl flex items-center justify-center active:scale-95 transition-transform shadow-xs cursor-pointer"
        aria-label="Open filter & sort sheet"
      >
        <SlidersHorizontal className="w-4 h-4" />
        {filterCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-cyan-400 text-[#0b3b60] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
            {filterCount}
          </span>
        )}
      </button>
    </div>
  );
}
