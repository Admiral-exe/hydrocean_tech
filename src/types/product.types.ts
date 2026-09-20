export interface CapacityVariant {
  capacity: string;
  price_diff: number;
  label: string;
  is_default: boolean;
}

export interface FiltrationStage {
  stage: number;
  title: string;
  description: string;
}

export interface Product {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  price: number;
  compare_at_price: number | null;
  discount_percent: number;
  images: string[];
  badge_text: string | null;
  tag_badge: string | null;
  rating: number;
  review_count: number;
  purification_tech: string;
  storage_capacity: string;
  capacity_variants: CapacityVariant[];
  specifications: Record<string, string>;
  features: string[];
  filtration_stages: FiltrationStage[];
  is_featured: boolean;
  is_in_stock: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
