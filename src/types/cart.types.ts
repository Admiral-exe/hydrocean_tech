export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  compareAtPrice: number | null;
  quantity: number;
  variant?: string;
  tagBadge?: string; // e.g. "RO+UV", "OEM FILTER"
  subDescription?: string; // e.g. "TDS Controller • Mineral Infuser"
  freeInstallationIncluded?: boolean;
}

export interface Coupon {
  code: string;
  discountAmount: number;
  description: string;
}
