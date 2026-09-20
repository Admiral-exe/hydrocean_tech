import React from "react";
import { getProducts } from "@/lib/data";
import { AdminProductTable } from "@/components/admin/products/admin-product-table";

export const metadata = {
  title: "Manage Products | Hydrocean Admin",
};

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-black text-[#0b3b60]">Product Inventory</h1>
        <p className="text-xs text-slate-500 font-medium">
          Manage prices, stock availability, and storefront publication
        </p>
      </div>

      <AdminProductTable initialProducts={products} />
    </div>
  );
}
