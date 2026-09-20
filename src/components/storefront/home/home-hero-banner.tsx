import React from "react";
import Image from "next/image";
import { MessageCircle, PhoneCall, ShieldCheck, CheckCircle2 } from "lucide-react";
import { DEFAULT_WHATSAPP_NUMBER, CONTACT_PHONE } from "@/lib/constants";

export function HomeHeroBanner() {
  const whatsappUrl = `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Hydrocean! I would like to inquire about same-day RO purifier installation."
  )}`;

  return (
    <section className="mt-2 mb-8">
      <div className="bg-gradient-to-br from-[#e8f2fa] via-[#f0f7fd] to-white rounded-3xl p-6 sm:p-8 md:p-12 border border-[#cbe2f4] shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="space-y-4">
            {/* Top Feature Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b3b60] bg-white px-3 py-1 rounded-full border border-[#d0e3f2] shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#0b3b60]" />
                Certified 7-Stage RO
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Same-Day Fix
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0b3b60] leading-tight tracking-tight">
              Pure water, delivered to your home
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-xl">
              Certified multi-stage RO purifiers, same-day doorstep installation, and authentic NSF food-grade replacement filters across the city.
            </p>

            {/* Dual Hero CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25d366] hover:bg-[#20ba5a] text-white py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4.5 h-4.5 fill-white text-white" />
                <span>Order on WhatsApp</span>
              </a>

              <a
                href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
                className="bg-[#0b3b60] hover:bg-[#072a46] text-white py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <PhoneCall className="w-4.5 h-4.5 text-white" />
                <span>Call Now: {CONTACT_PHONE}</span>
              </a>
            </div>

            {/* Trust Micro-notes */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Zero-Cost Installation
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                1-Year Full On-Site Warranty
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Digital TDS Verification
              </span>
            </div>
          </div>

          {/* Right Column: Hero Purifier Visual Card */}
          <div className="relative">
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 shadow-lg border border-white">
              <Image
                src="/images/products/lexcru-lexzon.jpg"
                alt="Lexcru Lexzon RO Water Purifier"
                width={500}
                height={500}
                className="w-full max-w-[360px] sm:max-w-[420px] h-auto object-contain mx-auto drop-shadow-xl group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                priority
              />

              {/* Floating Feature Tags on Image */}
              <div className="absolute top-4 right-4 bg-cyan-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                100% Microbial Free
              </div>

              <div className="absolute bottom-4 left-4 bg-white/95 text-[#0b3b60] text-xs font-extrabold px-3.5 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-2 shadow-md border border-slate-100">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                TDS: 15–50 Optimal Range
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
