import { z } from "zod";

export const capacityVariantSchema = z.object({
  capacity: z.string().min(1, "Capacity label is required"),
  price_diff: z.number(),
  label: z.string().min(1, "Variant sub-label is required"),
  is_default: z.boolean(),
});

export const filtrationStageSchema = z.object({
  stage: z.number().int().positive(),
  title: z.string().min(2, "Stage title is required"),
  description: z.string().min(5, "Stage description is required"),
});

export const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  slug: z.string().min(3, "Product slug is required"),
  category_id: z.string().uuid("Invalid category ID").nullable().optional(),
  short_description: z.string().nullable().optional(),
  full_description: z.string().nullable().optional(),
  price: z.number().positive("Price must be greater than zero"),
  compare_at_price: z.number().positive().nullable().optional(),
  images: z.array(z.string()),
  badge_text: z.string().nullable().optional(),
  tag_badge: z.string().nullable().optional(),
  purification_tech: z.string(),
  storage_capacity: z.string(),
  capacity_variants: z.array(capacityVariantSchema),
  specifications: z.record(z.string(), z.string()),
  features: z.array(z.string()),
  filtration_stages: z.array(filtrationStageSchema),
  is_featured: z.boolean(),
  is_in_stock: z.boolean(),
  is_published: z.boolean(),
});

export type ProductInput = z.infer<typeof productSchema>;
