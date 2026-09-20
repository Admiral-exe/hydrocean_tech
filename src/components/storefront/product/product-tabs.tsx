"use client";

import React, { useState } from "react";
import { FlaskConical, Wrench, CheckCircle2 } from "lucide-react";
import { Product } from "@/types/product.types";
import { cn } from "@/lib/utils";

interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"stages" | "specs" | "installation">("stages");

  return (
    <div className="mt-6 px-1 mb-8">
      {/* 3-Segment Tab Bar */}
      <div className="grid grid-cols-3 gap-1 bg-slate-200/80 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab("stages")}
          className={cn(
            "py-2 text-xs font-bold rounded-lg transition-all cursor-pointer",
            activeTab === "stages"
              ? "bg-white text-[#0b3b60] shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          )}
        >
          7 Stages
        </button>
        <button
          onClick={() => setActiveTab("specs")}
          className={cn(
            "py-2 text-xs font-bold rounded-lg transition-all cursor-pointer",
            activeTab === "specs"
              ? "bg-white text-[#0b3b60] shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          )}
        >
          Specs
        </button>
        <button
          onClick={() => setActiveTab("installation")}
          className={cn(
            "py-2 text-xs font-bold rounded-lg transition-all cursor-pointer",
            activeTab === "installation"
              ? "bg-white text-[#0b3b60] shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          )}
        >
          Installation
        </button>
      </div>

      {/* Tab Content 1: 7 Stages Cascade */}
      {activeTab === "stages" && (
        <div className="mt-3.5 bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex items-start gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-[#e8f2fa] text-[#0b3b60] flex items-center justify-center shrink-0">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-[#0b3b60]">
                PureMolecular 7-Stage Cascade
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Engineered for TDS levels up to 2500 PPM
              </p>
            </div>
          </div>

          <div className="mt-3.5 space-y-3.5">
            {product.filtration_stages.map((stg) => (
              <div key={stg.stage} className="flex items-start gap-3 text-left">
                <span className="w-5 h-5 rounded-full bg-[#0b3b60] text-white text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                  {stg.stage}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">
                    {stg.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    {stg.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 2: Technical Specifications */}
      {activeTab === "specs" && (
        <div className="mt-3.5 bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <h3 className="text-xs font-black text-[#0b3b60] mb-3">
            Hardware &amp; Performance Specifications
          </h3>
          <div className="divide-y divide-slate-100 text-xs">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="py-2.5 flex justify-between gap-4">
                <span className="font-semibold text-slate-500">{key}</span>
                <span className="font-bold text-slate-800 text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 3: Installation & Delivery Details */}
      {activeTab === "installation" && (
        <div className="mt-3.5 bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-black text-slate-800">
              Zero-Cost Professional Installation
            </h3>
          </div>

          <p className="text-[11px] text-slate-600 leading-relaxed">
            All Hydrocean purifiers include zero-cost certified technician installation across Bangalore and partnered cities.
          </p>

          <ul className="space-y-2 text-[11px] text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Free inlet pre-filter housing &amp; SUS304 diverter ball valve included</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Same-day technician dispatch on orders placed before 3:00 PM</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Doorstep source water TDS measurement before &amp; after setup</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
