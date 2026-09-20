import React from "react";
import { notFound } from "next/navigation";
import { getProducts, getCategories } from "@/lib/data";
import { AdminProductForm } from "@/components/admin/products/admin-product-form";

export const metadata = {
  title: "Edit Product | Hydrocean Admin",
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const product = products.find((p) => p.id === id);
  if (!product) {
    notFound();
  }

  return <AdminProductForm product={product} categories={categories} />;
}
