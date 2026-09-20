"use client";

import React from "react";
import { Droplet, MessageSquare } from "lucide-react";
import { useCatalogFilterStore } from "@/store/use-catalog-filter-store";
import { buildWhatsAppCustomROPayload } from "@/lib/whatsapp/payload-builder";

export function CustomRoCard() {
  const resetFilters = useCatalogFilterStore((state) => state.resetFilters);

  const customRoWhatsAppUrl = buildWhatsAppCustomROPayload(
    "Custom water treatment inquiry (Borewell / Salt-free / High-TDS assembly)"
  );

  return (
    <div className="mt-6 bg-[#eaf3fa] rounded-2xl p-5 border border-[#c6e0f3] text-center shadow-2xs">
      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-white text-[#0b3b60] flex items-center justify-center mx-auto shadow-2xs">
        <Droplet className="w-6 h-6 fill-[#0b3b60]" />
      </div>

      {/* Headline & Description */}
      <h3 className="text-sm font-black text-[#0b3b60] mt-3">
        Looking for specialized purification?
      </h3>
      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed max-w-xs mx-auto">
        No direct models matching &ldquo;Salt-free RO&rdquo; in current stock, but our technicians custom-assemble water softeners &amp; bespoke units daily!
      </p>

      {/* Dual Actions */}
      <div className="mt-4 flex flex-col sm:flex-row items-center gap-2">
        <button
          onClick={resetFilters}
          className="w-full sm:flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold py-2.5 px-3 rounded-xl text-xs transition-colors cursor-pointer"
        >
          Clear all filters
        </button>

        <a
          href={customRoWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:flex-1 bg-[#0b3b60] hover:bg-[#072a46] text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Order Custom RO
        </a>
      </div>
    </div>
  );
}
