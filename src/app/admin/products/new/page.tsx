import React from "react";
import { getCategories } from "@/lib/data";
import { AdminProductForm } from "@/components/admin/products/admin-product-form";

export const metadata = {
  title: "Create Product | Hydrocean Admin",
};

export default async function NewProductPage() {
  const categories = await getCategories();

  return <AdminProductForm categories={categories} />;
}
