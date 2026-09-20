export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon_name: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
