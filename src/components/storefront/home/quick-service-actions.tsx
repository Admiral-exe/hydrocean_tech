import React from "react";
import Link from "next/link";
import { Droplets, Wrench, Sparkles, PhoneCall } from "lucide-react";

export function QuickServiceActions() {
  const actions = [
    { label: "RO Purifiers", href: "/catalog", icon: Droplets, desc: "Explore multi-stage units" },
    { label: "Book Service", href: "/services", icon: Wrench, desc: "Technician & AMC plans" },
    { label: "Free Water Test", href: "/book-demo", icon: Sparkles, desc: "Doorstep TDS analysis" },
    { label: "Direct Support", href: "/book-demo", icon: PhoneCall, desc: "Instant expert desk" },
  ];

  return (
    <section className="mb-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <Link
              key={act.label}
              href={act.href}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-md hover:border-[#0b3b60]/30 transition-all flex items-center sm:flex-col sm:text-center gap-3 sm:gap-2 group active:scale-98"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#e8f2fa] group-hover:bg-[#0b3b60] group-hover:text-white text-[#0b3b60] flex items-center justify-center transition-colors shrink-0">
                <Icon className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-extrabold text-slate-800 group-hover:text-[#0b3b60] block leading-tight">
                  {act.label}
                </span>
                <span className="text-[11px] text-slate-400 font-medium hidden sm:block mt-0.5">
                  {act.desc}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
