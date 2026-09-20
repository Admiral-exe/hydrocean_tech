import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Phone, MapPin, ShieldCheck, Clock } from "lucide-react";
import { DEFAULT_WHATSAPP_NUMBER, CONTACT_PHONE } from "@/lib/constants";

export function MainFooter() {
  const whatsappUrl = `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Hydrocean! I would like to inquire about water purifiers and doorstep service."
  )}`;

  return (
    <footer className="bg-[#0b2e4c] text-white mt-12 border-t border-slate-800">
      {/* Top Value Banner */}
      <div className="border-b border-white/10 bg-[#07243c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-tight text-white">
                Certified Doorstep Water Purification &amp; Service
              </h3>
              <p className="text-xs text-slate-300">
                100% Genuine NSF certified filters, same-day installation &amp; digital TDS verification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25d366] hover:bg-[#20ba5a] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95 shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Support</span>
            </a>

            <a
              href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>{CONTACT_PHONE}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-white rounded-xl p-1.5 shadow-xs inline-flex">
                <Image
                  src="/logo.png"
                  alt="Hydrocean Tech"
                  width={140}
                  height={38}
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pioneering pure molecular water filtration for homes, modular kitchens, and commercial enterprises. Certified 7-stage cascade systems for high-TDS sources.
            </p>
            <div className="flex items-center gap-2 pt-1 text-slate-400 text-xs">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Open: 9:00 AM – 9:00 PM (Everyday)</span>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-cyan-300 mb-3">
              Purification Systems
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/product/lexcru-lexzon" className="hover:text-white transition-colors">
                  Lexcru Lexzon RO+UV (10L)
                </Link>
              </li>
              <li>
                <Link href="/product/aqua-mars" className="hover:text-white transition-colors">
                  AQUA MARS Alkaline (12L)
                </Link>
              </li>
              <li>
                <Link href="/product/aqua-c3" className="hover:text-white transition-colors">
                  AQUA C3 Under-sink Compact RO
                </Link>
              </li>
              <li>
                <Link href="/product/commercial-30-to-50-lph-ro" className="hover:text-white transition-colors">
                  COMMERCIAL 30 to 50 LPH RO Plant
                </Link>
              </li>
              <li>
                <Link href="/product/ro-with-cooler" className="hover:text-white transition-colors">
                  Commercial RO with Water Cooler
                </Link>
              </li>
              <li>
                <Link href="/product/all-filters" className="hover:text-white transition-colors">
                  All Filters Complete Replacement Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-cyan-300 mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors">
                  RO Purifiers
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Service
                </Link>
              </li>
              <li>
                <Link href="/book-demo" className="hover:text-white transition-colors">
                  Free Water Test Booking
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="hover:text-white transition-colors text-slate-400">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Service Coverage */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-cyan-300 mb-3">
              Service Coverage
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Doorstep express delivery and certified installation across major tech hubs, apartments, and suburbs.
            </p>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Central Hub: Bengaluru, Karnataka 560034</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-5">
                Certified water engineer visits in 4 hours
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© 2026 Hydrocean Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>NSF / ANSI Certified Filters</span>
            <span>•</span>
            <span>Food-Grade Antibacterial Tanks</span>
            <span>•</span>
            <span>Bespoke Water Softening</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
