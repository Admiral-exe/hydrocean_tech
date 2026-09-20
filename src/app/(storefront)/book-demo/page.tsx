import React from "react";
import { DemoBookingForm } from "@/components/storefront/demo/demo-booking-form";
import { ShieldCheck, Sparkles, Clock } from "lucide-react";

export const metadata = {
  title: "Book Free Water Test & RO Demo | Hydrocean Tech",
  description: "Schedule a doorstep TDS measurement and live purifier demonstration.",
};

export default function BookDemoPage() {
  return (
    <div className="max-w-2xl mx-auto pt-4 px-1 space-y-6">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-[#0b3b60]">
          Book a Free Water Test &amp; Demo
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Certified water specialist doorstep visit • 100% Free &amp; No Obligation
        </p>
      </div>

      {/* Trust Highlights */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200 shadow-2xs">
          <Sparkles className="w-5 h-5 text-[#0284c7] mx-auto mb-1.5" />
          <span className="text-xs font-bold text-slate-700 block">Doorstep TDS Test</span>
          <span className="text-[11px] text-slate-400">Digital analysis</span>
        </div>
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200 shadow-2xs">
          <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1.5" />
          <span className="text-xs font-bold text-slate-700 block">Zero Cost</span>
          <span className="text-[11px] text-slate-400">100% Free visit</span>
        </div>
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200 shadow-2xs">
          <Clock className="w-5 h-5 text-[#0b3b60] mx-auto mb-1.5" />
          <span className="text-xs font-bold text-slate-700 block">Fast Slot</span>
          <span className="text-[11px] text-slate-400">Within 24 Hours</span>
        </div>
      </div>

      {/* Booking Form */}
      <DemoBookingForm />
    </div>
  );
}
