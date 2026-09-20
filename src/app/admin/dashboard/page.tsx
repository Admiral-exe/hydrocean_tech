import React from "react";
import Link from "next/link";
import { getProducts } from "@/lib/data";
import { Package, Users, Plus, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { formatINR } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const products = await getProducts();

  const totalProducts = products.length;
  const inStockProducts = products.filter((p) => p.is_in_stock).length;
  const outOfStockProducts = totalProducts - inStockProducts;

  const stats = [
    {
      title: "Total Purifiers & Spares",
      value: totalProducts,
      subtitle: "Catalog items",
      icon: Package,
      color: "text-[#0b3b60] bg-[#e8f2fa]",
    },
    {
      title: "Active In-Stock",
      value: inStockProducts,
      subtitle: "Ready for dispatch",
      icon: CheckCircle,
      color: "text-emerald-700 bg-emerald-50",
    },
    {
      title: "Attention Required",
      value: outOfStockProducts,
      subtitle: "Out of stock items",
      icon: AlertCircle,
      color: "text-amber-700 bg-amber-50",
    },
    {
      title: "Demo Leads Pipeline",
      value: "5 Pending",
      subtitle: "Doorstep TDS tests",
      icon: Users,
      color: "text-[#0284c7] bg-cyan-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-[#0b3b60]">Admin Dashboard</h1>
          <p className="text-xs text-slate-500 font-medium">
            Live catalog inventory and customer lead monitoring
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/products/new"
            className="bg-[#0b3b60] hover:bg-[#072a46] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.title}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">{st.title}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${st.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl font-black text-slate-900">{st.value}</div>
              <div className="text-[10px] text-slate-400 font-semibold">{st.subtitle}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Catalog Items */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-black text-[#0b3b60]">Catalog Overview</h2>
            <p className="text-[11px] text-slate-500">Live inventory items on public storefront</p>
          </div>
          <Link
            href="/admin/products"
            className="text-xs font-bold text-[#0b3b60] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {products.slice(0, 5).map((p) => (
            <div key={p.id} className="py-3 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-slate-800">{p.name}</span>
                  {p.tag_badge && (
                    <span className="text-[9px] font-bold bg-[#e8f2fa] text-[#0b3b60] px-1.5 py-0.5 rounded-sm">
                      {p.tag_badge}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {p.purification_tech} • {p.storage_capacity}
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <span className="text-xs font-bold text-[#0b3b60] block">
                    {formatINR(p.price)}
                  </span>
                  <span
                    className={`text-[10px] font-bold ${
                      p.is_in_stock ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {p.is_in_stock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
