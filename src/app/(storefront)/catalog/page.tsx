import React from "react";
import { getProducts, getCategories } from "@/lib/data";
import { ProductGrid } from "@/components/storefront/catalog/product-grid";

export const revalidate = 60;

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="pt-1">
      <ProductGrid initialProducts={products} categories={categories} />
    </div>
  );
}
