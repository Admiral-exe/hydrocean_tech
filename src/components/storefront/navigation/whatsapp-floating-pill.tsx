"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";

export function WhatsAppFloatingPill() {
  const pathname = usePathname();

  // Suppress floating pill on product detail page because it has its own dedicated sticky action bar
  if (pathname.startsWith("/product/")) {
    return null;
  }

  const defaultUrl = `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Hydrocean, I have an inquiry regarding water purifiers and doorstep service."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 pointer-events-none">
      <a
        href={defaultUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center gap-2 bg-[#25d366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 group font-bold text-sm tracking-tight cursor-pointer"
        aria-label="Chat & Order on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white text-white group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">Chat &amp; Order</span>
      </a>
    </div>
  );
}
