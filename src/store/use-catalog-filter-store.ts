import { create } from "zustand";

export type SortOption = "popularity" | "price_asc" | "price_desc" | "rating" | "newest";

interface CatalogFilterState {
  searchQuery: string;
  activeCategory: string;
  sortBy: SortOption;
  selectedTech: string[];
  priceRange: [number, number];
  selectedCapacity: string | null;
  isFilterSheetOpen: boolean;

  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
  setSortBy: (sort: SortOption) => void;
  toggleTech: (tech: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSelectedCapacity: (capacity: string | null) => void;
  setIsFilterSheetOpen: (open: boolean) => void;
  resetFilters: () => void;
  getActiveFilterCount: () => number;
}

export const useCatalogFilterStore = create<CatalogFilterState>((set, get) => ({
  searchQuery: "",
  activeCategory: "all",
  sortBy: "popularity",
  selectedTech: ["RO + UV + UF", "Alkaline + Copper"],
  priceRange: [8000, 16000],
  selectedCapacity: "10L",
  isFilterSheetOpen: false,

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  setSortBy: (sortBy) => set({ sortBy }),

  toggleTech: (tech) =>
    set((state) => {
      const exists = state.selectedTech.includes(tech);
      return {
        selectedTech: exists
          ? state.selectedTech.filter((t) => t !== tech)
          : [...state.selectedTech, tech],
      };
    }),

  setPriceRange: (priceRange) => set({ priceRange }),
  setSelectedCapacity: (selectedCapacity) =>
    set((state) => ({
      selectedCapacity: state.selectedCapacity === selectedCapacity ? null : selectedCapacity,
    })),

  setIsFilterSheetOpen: (isFilterSheetOpen) => set({ isFilterSheetOpen }),

  resetFilters: () =>
    set({
      selectedTech: [],
      priceRange: [5000, 30000],
      selectedCapacity: null,
      sortBy: "popularity",
    }),

  getActiveFilterCount: () => {
    const { selectedTech, priceRange, selectedCapacity } = get();
    let count = 0;
    if (selectedTech.length > 0) count += selectedTech.length;
    if (priceRange[0] > 5000 || priceRange[1] < 30000) count += 1;
    if (selectedCapacity) count += 1;
    return count;
  },
}));
