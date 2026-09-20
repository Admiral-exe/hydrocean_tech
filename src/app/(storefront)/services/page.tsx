import React from "react";
import { ServicesCardList } from "@/components/storefront/home/services-card-list";
import { Wrench, ShieldCheck, CheckCircle2, Clock, MessageCircle } from "lucide-react";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";

export const metadata = {
  title: "Purifier Care & Maintenance Services | Hydrocean Tech",
  description: "Doorstep technician booking, filter changes, and AMC plans.",
};

export default function ServicesPage() {
  const whatsappUrl = `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Hydrocean! I would like to book a certified technician visit for purifier service."
  )}`;

  return (
    <div className="pt-2 px-1 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-[#e8f2fa] text-[#0b3b60] flex items-center justify-center mx-auto shadow-2xs">
          <Wrench className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0b3b60]">
          Purifier Care &amp; Maintenance
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Doorstep certified technician bookings, genuine filter replacements, and complete AMC coverage
        </p>
      </div>

      {/* Services List (Responsive 3-column grid) */}
      <ServicesCardList />

      {/* Service Guarantees Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
        <div className="text-center sm:text-left">
          <h3 className="text-sm sm:text-base font-black text-[#0b3b60] uppercase tracking-wider">
            Our Service Guarantees &amp; Standards
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Every technician visit adheres to strict water safety and hygiene protocols
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">100% Genuine Parts</span>
              <span className="text-slate-500 text-[11px]">NSF certified food-grade filter media</span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <Clock className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Fast Response</span>
              <span className="text-slate-500 text-[11px]">Technician arrives within 4 hours</span>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <ShieldCheck className="w-5 h-5 text-[#0b3b60] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">30-Day Guarantee</span>
              <span className="text-slate-500 text-[11px]">Post-service free callback assurance</span>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-center sm:justify-start">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#25d366] hover:bg-[#20ba5a] text-white py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-white text-white" />
            <span>Book Technician via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
