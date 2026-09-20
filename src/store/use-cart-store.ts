import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Coupon } from "@/types/cart.types";
import { COUPONS } from "@/lib/constants";

interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
  deliveryPincode: string;
  pincodeVerified: boolean;
  pincodeMessage: string | null;

  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  setDeliveryPincode: (pincode: string) => void;
  checkPincode: (pincode: string) => { available: boolean; message: string };

  getSubtotal: () => number;
  getDiscount: () => number;
  getTotalPayable: () => number;
  getTotalCount: () => number;
  resetToSampleCart: () => void;
}

const INITIAL_SAMPLE_ITEMS: CartItem[] = [
  {
    id: "p1000000-0000-0000-0000-000000000001-10L",
    productId: "p1000000-0000-0000-0000-000000000001",
    name: "Lexcru Lexzon (10L)",
    slug: "lexcru-lexzon",
    image: "/images/products/lexcru-lexzon.jpg",
    price: 6800,
    compareAtPrice: 11000,
    quantity: 1,
    variant: "10 Litres",
    tagBadge: "RO+UV",
    subDescription: "Free Installation • 1-Year Comprehensive Warranty",
    freeInstallationIncluded: true,
  },
  {
    id: "p1000000-0000-0000-0000-000000000004-universal",
    productId: "p1000000-0000-0000-0000-000000000004",
    name: "All Filters Complete Spares Kit",
    slug: "all-filters",
    image: "/images/products/all-filters.jpg",
    price: 750,
    compareAtPrice: 1500,
    quantity: 1,
    variant: "Universal Fit",
    tagBadge: "OEM FILTER",
    subDescription: "Sediment + Carbon Block + Inline Spun Media",
    freeInstallationIncluded: false,
  },
];

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: INITIAL_SAMPLE_ITEMS,
      coupon: {
        code: "HYDROFREE",
        discountAmount: 500,
        description: "₹500 Instant Store Discount",
      },
      deliveryPincode: "560034",
      pincodeVerified: true,
      pincodeMessage: "Available in your area! Certified Engineer Delivery by Tomorrow, 2:00 PM",

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.productId === item.productId && i.variant === item.variant
          );
          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += quantity;
            return { items: updated };
          }
          return { items: [...state.items, { ...item, quantity }] };
        });
      },

      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        }));
      },

      clearCart: () => {
        set({ items: [], coupon: null });
      },

      resetToSampleCart: () => {
        set({
          items: INITIAL_SAMPLE_ITEMS,
          coupon: {
            code: "HYDROFREE",
            discountAmount: 500,
            description: "₹500 Instant Store Discount",
          },
          deliveryPincode: "560034",
          pincodeVerified: true,
          pincodeMessage:
            "Available in your area! Certified Engineer Delivery by Tomorrow, 2:00 PM",
        });
      },

      applyCoupon: (code: string) => {
        const clean = code.trim().toUpperCase();
        if (clean === "HYDROFREE") {
          const subtotal = get().getSubtotal();
          if (subtotal < COUPONS.HYDROFREE.minOrderAmount) {
            return {
              success: false,
              message: `Minimum order amount of ₹${COUPONS.HYDROFREE.minOrderAmount} required`,
            };
          }
          set({
            coupon: {
              code: "HYDROFREE",
              discountAmount: 500,
              description: "₹500 Instant Store Discount",
            },
          });
          return { success: true, message: "HYDROFREE coupon applied successfully!" };
        }
        return { success: false, message: "Invalid coupon code" };
      },

      removeCoupon: () => {
        set({ coupon: null });
      },

      setDeliveryPincode: (pincode: string) => {
        set({ deliveryPincode: pincode, pincodeVerified: false, pincodeMessage: null });
      },

      checkPincode: (pincode: string) => {
        const clean = pincode.trim();
        if (clean.length !== 6 || !/^\d+$/.test(clean)) {
          const message = "Please enter a valid 6-digit postal code";
          set({ pincodeVerified: false, pincodeMessage: message });
          return { available: false, message };
        }

        // Mock verification
        const message = "Available in your area! Certified Engineer Delivery by Tomorrow, 2:00 PM";
        set({ pincodeVerified: true, pincodeMessage: message, deliveryPincode: clean });
        return { available: true, message };
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getDiscount: () => {
        const coupon = get().coupon;
        if (!coupon) return 0;
        return coupon.discountAmount;
      },

      getTotalPayable: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        return Math.max(0, subtotal - discount);
      },

      getTotalCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "hydrocean-cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
