import React from "react";
import { Clock, Shield, ShieldCheck, Zap } from "lucide-react";

export function WhyChooseGrid() {
  const guarantees = [
    {
      title: "Free Installation",
      desc: "Doorstep certified engineer arrival within 4 hours",
      icon: Clock,
    },
    {
      title: "1-Year Full Warranty",
      desc: "100% comprehensive on-site cover including electricals",
      icon: Shield,
    },
    {
      title: "Genuine Spares",
      desc: "Authentic NSF food-grade certified replacement filters",
      icon: ShieldCheck,
    },
    {
      title: "Quick 24h Service",
      desc: "Instant WhatsApp desk & fast doorstep breakdown resolution",
      icon: Zap,
    },
  ];

  return (
    <section className="mb-10">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-black text-[#0b3b60]">
          Why Choose HydroOcean
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Direct factory genuine components, ISO quality control &amp; certified doorstep care
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {guarantees.map((g) => {
          const Icon = g.icon;
          return (
            <div
              key={g.title}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-xl bg-[#e8f2fa] text-[#0b3b60] flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-800 tracking-tight">
                  {g.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                  {g.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
