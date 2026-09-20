export const SITE_NAME = "Hydrocean";
export const SITE_TAGLINE = "Pure water, delivered to your home";
export const DEFAULT_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
export const CONTACT_PHONE = "+91 98765 43210";

export const COUPONS = {
  HYDROFREE: {
    code: "HYDROFREE",
    discountAmount: 500,
    minOrderAmount: 5000,
    description: "₹500 Instant Store Discount",
  },
};

export const NAVIGATION_TABS = [
  { label: "Home", href: "/", icon: "Home" },
  { label: "Products", href: "/catalog", icon: "Droplets" },
  { label: "Services", href: "/services", icon: "Wrench" },
  { label: "Cart", href: "/cart", icon: "ShoppingBag" },
  { label: "Contact", href: "/book-demo", icon: "Phone" },
];
