import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  slug: z.string().min(2, "Category slug is required"),
  description: z.string().nullable().optional(),
  icon_name: z.string().default("Droplets"),
  sort_order: z.number().int().default(0),
});

export type CategoryInput = z.infer<typeof categorySchema>;
