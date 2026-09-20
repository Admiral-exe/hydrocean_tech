"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit2, Plus, Search, CheckCircle2, XCircle } from "lucide-react";
import { Product } from "@/types/product.types";
import { formatINR } from "@/lib/utils";
import { toggleProductStockAction, toggleProductPublishAction } from "@/actions/product.actions";

interface AdminProductTableProps {
  initialProducts: Product[];
}

export function AdminProductTable({ initialProducts }: AdminProductTableProps) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleStock = async (product: Product) => {
    const nextVal = !product.is_in_stock;
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, is_in_stock: nextVal } : p))
    );
    await toggleProductStockAction(product.id, nextVal);
  };

  const handleTogglePublish = async (product: Product) => {
    const nextVal = !product.is_published;
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, is_published: nextVal } : p))
    );
    await toggleProductPublishAction(product.id, nextVal);
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search catalog products..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b3b60]"
          />
        </div>

        <Link
          href="/admin/products/new"
          className="bg-[#0b3b60] hover:bg-[#072a46] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Product</span>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Technology</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Visibility</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 relative shrink-0 overflow-hidden border border-slate-200">
                        <Image
                          src={product.images[0] || "/images/products/hydropure-main.webp"}
                          alt={product.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-800 block line-clamp-1">
                          {product.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {product.slug}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-bold text-slate-800">
                    {formatINR(product.price)}
                  </td>

                  <td className="py-3 px-4 text-slate-600 font-medium">
                    {product.purification_tech}
                  </td>

                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggleStock(product)}
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                        product.is_in_stock
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                      }`}
                    >
                      {product.is_in_stock ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>In Stock</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-amber-600" />
                          <span>Out of Stock</span>
                        </>
                      )}
                    </button>
                  </td>

                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleTogglePublish(product)}
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                        product.is_published
                          ? "bg-cyan-50 text-[#0b3b60] hover:bg-cyan-100"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {product.is_published ? "Published (Live)" : "Draft (Hidden)"}
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="inline-flex items-center gap-1 text-slate-600 hover:text-[#0b3b60] font-bold px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
