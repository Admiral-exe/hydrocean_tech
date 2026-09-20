"use client";

import React, { useState } from "react";
import { FlaskConical, CheckCircle2 } from "lucide-react";

export function WaterTdsSlider() {
  const [sourceTds, setSourceTds] = useState(450);

  const getWaterClassification = (tds: number) => {
    if (tds <= 200) return "Moderate Tap Water";
    if (tds <= 600) return "Hard Water (Borewell/Municipal)";
    if (tds <= 1000) return "High Hardness Tanker Water";
    return "Severe High TDS Borewell Water";
  };

  return (
    <section className="mb-10">
      <div className="bg-gradient-to-br from-[#e8f2fa] via-[#f0f7fd] to-white rounded-3xl p-6 sm:p-8 border border-[#cbe2f4] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column: Interactive Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black tracking-wider text-[#0284c7] uppercase">
                  Interactive Lab Checker
                </span>
                <h2 className="text-base sm:text-xl font-black text-[#0b3b60] mt-0.5">
                  Check Your Tap Water Safety
                </h2>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-white text-[#0b3b60] flex items-center justify-center shadow-xs">
                <FlaskConical className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tap water TDS varies drastically by neighborhood and water source. Slide the dial to preview your doorstep purification outcome:
            </p>

            {/* Dynamic Source Value Display */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Source Tap TDS:</span>
                <span className="text-xs sm:text-sm font-black text-[#0b3b60] bg-[#e8f2fa] px-3 py-1 rounded-lg">
                  {sourceTds} PPM ({getWaterClassification(sourceTds)})
                </span>
              </div>

              {/* Range Slider */}
              <input
                type="range"
                min={100}
                max={1200}
                step={25}
                value={sourceTds}
                onChange={(e) => setSourceTds(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b3b60]"
              />
              <div className="flex justify-between text-[11px] font-bold text-slate-400">
                <span>100 PPM (Soft)</span>
                <span>600 PPM (Hard)</span>
                <span>1200 PPM (Extreme)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Output Readout Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#b9dbf3] shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-black text-slate-800">
                  Hydrocean Purification Outcome
                </span>
              </div>
              <span className="text-base sm:text-lg font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                25–35 PPM
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              PureMolecular 7-Stage Cascade reduces hazardous dissolved solids, heavy metals (lead, arsenic), and microbial contaminants by up to 95%, whilst actively infusing essential alkaline minerals and copper ions.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#e8f2fa] rounded-xl p-3 text-center">
                <span className="text-[10px] uppercase font-black text-slate-400 block">pH Level</span>
                <span className="text-sm font-extrabold text-[#0b3b60]">7.8 – 8.5 (Alkaline)</span>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3 text-center">
                <span className="text-[10px] uppercase font-black text-slate-400 block">Sterilization</span>
                <span className="text-sm font-extrabold text-emerald-700">99.99% UV-C Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
