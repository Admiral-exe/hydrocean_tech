"use client";

import React from "react";
import { X, Check } from "lucide-react";
import { useCatalogFilterStore, SortOption } from "@/store/use-catalog-filter-store";
import { cn } from "@/lib/utils";

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "popularity", label: "Popularity" },
  { id: "price_asc", label: "Price: Low to High" },
  { id: "price_desc", label: "Price: High to Low" },
  { id: "rating", label: "Customer Rating" },
  { id: "newest", label: "Newest" },
];

const PURIFICATION_TECHS = [
  "RO + UV + UF",
  "Alkaline + Copper",
  "Under-sink Compact",
  "Gravity / Non-Electric",
];

const TANK_CAPACITIES = ["7L - 8L", "10L", "12L+", "50L+"];

export function CatalogFilterSheet({ totalFilteredCount }: { totalFilteredCount: number }) {
  const isOpen = useCatalogFilterStore((state) => state.isFilterSheetOpen);
  const setIsOpen = useCatalogFilterStore((state) => state.setIsFilterSheetOpen);

  const sortBy = useCatalogFilterStore((state) => state.sortBy);
  const setSortBy = useCatalogFilterStore((state) => state.setSortBy);

  const selectedTech = useCatalogFilterStore((state) => state.selectedTech);
  const toggleTech = useCatalogFilterStore((state) => state.toggleTech);

  const priceRange = useCatalogFilterStore((state) => state.priceRange);
  const setPriceRange = useCatalogFilterStore((state) => state.setPriceRange);

  const selectedCapacity = useCatalogFilterStore((state) => state.selectedCapacity);
  const setSelectedCapacity = useCatalogFilterStore((state) => state.setSelectedCapacity);

  const resetFilters = useCatalogFilterStore((state) => state.resetFilters);
  const activeCount = useCatalogFilterStore((state) => state.getActiveFilterCount());

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Sheet Drag Handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3" />

        {/* Sheet Header */}
        <div className="flex items-center justify-between px-5 pt-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-black text-[#0b3b60]">Filter &amp; Sort</h2>
            {activeCount > 0 && (
              <span className="text-[10px] font-bold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded-full">
                {activeCount} applied
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-slate-500 hover:text-[#0b3b60] underline"
            >
              Reset All
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sheet Content */}
        <div className="p-5 space-y-5 flex-1">
          {/* 1. Sort By */}
          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
              Sort By
            </label>
            <div className="flex flex-wrap gap-2">
              {SORT_OPTIONS.map((opt) => {
                const isSelected = sortBy === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSortBy(opt.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5",
                      isSelected
                        ? "bg-[#0b3b60] text-white shadow-xs"
                        : "bg-[#eef5fa] text-slate-700 hover:bg-[#e2eef7]"
                    )}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Purification Technology */}
          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
              Purification Technology
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PURIFICATION_TECHS.map((tech) => {
                const isChecked = selectedTech.includes(tech);
                return (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={cn(
                      "flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all text-xs font-semibold",
                      isChecked
                        ? "bg-[#e8f2fa] border-[#0b3b60] text-[#0b3b60]"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    )}
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded-sm flex items-center justify-center border",
                        isChecked
                          ? "bg-[#0b3b60] border-[#0b3b60] text-white"
                          : "border-slate-300 bg-white"
                      )}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{tech}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Price Range Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Price Range
              </label>
              <span className="text-xs font-bold text-[#0b3b60] bg-[#e8f2fa] px-2 py-0.5 rounded-md">
                ₹{priceRange[0].toLocaleString("en-IN")} – ₹{priceRange[1].toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={30000}
              step={1000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b3b60]"
            />
            <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-1">
              <span>₹5,000 Min</span>
              <span className="text-[#0b3b60] font-bold">Current Max ₹{priceRange[1].toLocaleString("en-IN")}</span>
              <span>₹30,000+</span>
            </div>
          </div>

          {/* 4. Storage Tank Capacity */}
          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
              Storage Tank Capacity
            </label>
            <div className="grid grid-cols-4 gap-2">
              {TANK_CAPACITIES.map((cap) => {
                const isSelected = selectedCapacity === cap;
                return (
                  <button
                    key={cap}
                    onClick={() => setSelectedCapacity(cap)}
                    className={cn(
                      "py-2 rounded-xl text-xs font-bold transition-all text-center",
                      isSelected
                        ? "bg-[#0b3b60] text-white shadow-xs"
                        : "bg-[#eef5fa] text-slate-700 hover:bg-[#e2eef7]"
                    )}
                  >
                    {cap}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-4 border-t border-slate-100 flex items-center gap-3 bg-white">
          <button
            onClick={resetFilters}
            className="flex-1 bg-[#e8f2fa] hover:bg-[#d0e3f2] text-[#0b3b60] font-bold py-3 px-4 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="flex-[2] bg-[#0b3b60] hover:bg-[#072a46] text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Apply Filters ({totalFilteredCount} Products)</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
