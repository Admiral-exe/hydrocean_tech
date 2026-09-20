import React from "react";
import { RefreshCw, Filter, Briefcase } from "lucide-react";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";

export function ServicesCardList() {
  const services = [
    {
      title: "Annual Maintenance (AMC)",
      desc: "3 scheduled filter changes + unlimited breakdown visits included across 12 months.",
      price: "From ₹2,499/yr",
      icon: RefreshCw,
      query: "Inquiry regarding Hydrocean Annual Maintenance Contract (AMC)",
    },
    {
      title: "Filter & Membrane Replacement",
      desc: "Genuine NSF sediment, high-iodine carbon & thin-film RO membrane refresh.",
      price: "From ₹1,499",
      icon: Filter,
      query: "Inquiry regarding genuine filter & RO membrane replacement service",
    },
    {
      title: "RO Repair & Relocation",
      desc: "Booster pump replacement, leakage fix & modular kitchen uninstallation/setup.",
      price: "From ₹399",
      icon: Briefcase,
      query: "Inquiry regarding RO Purifier repair, booster pump check, or relocation",
    },
  ];

  return (
    <section className="mb-10">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-black text-[#0b3b60]">
          Purifier Care &amp; Maintenance
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Doorstep certified technician bookings across all neighborhoods
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((svc) => {
          const Icon = svc.icon;
          const whatsappUrl = `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
            `Hello Hydrocean! ${svc.query}`
          )}`;

          return (
            <div
              key={svc.title}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#e8f2fa] text-[#0b3b60] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800 leading-snug">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                    {svc.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-100">
                <span className="text-sm font-black text-[#0b3b60]">
                  {svc.price}
                </span>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#e8f2fa] hover:bg-[#0b3b60] text-[#0b3b60] hover:text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all active:scale-95"
                >
                  Enquire via WhatsApp
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
