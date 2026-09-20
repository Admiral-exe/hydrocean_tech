import React from "react";
import { Zap } from "lucide-react";

export function OperationalTicker() {
  return (
    <div className="bg-[#e8f2fa] text-[#0b3b60] text-xs font-semibold py-1.5 px-4 flex items-center justify-center gap-2 border-b border-[#d0e3f2]">
      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      <span>Open Today: 9:00 AM – 9:00 PM</span>
      <span className="text-slate-400">•</span>
      <span className="flex items-center gap-1 text-emerald-700 font-bold">
        <Zap className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
        Express Dispatch
      </span>
    </div>
  );
}
