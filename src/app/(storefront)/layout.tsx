import React from "react";
import { OperationalTicker } from "@/components/storefront/navigation/operational-ticker";
import { StorefrontHeader } from "@/components/storefront/navigation/storefront-header";
import { MainFooter } from "@/components/storefront/footer/main-footer";
import { WhatsAppFloatingPill } from "@/components/storefront/navigation/whatsapp-floating-pill";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-[#0b3b60] selection:text-white">
      {/* Top operational announcement banner */}
      <OperationalTicker />

      {/* Responsive Storefront Header */}
      <StorefrontHeader />

      {/* Fully responsive container (removing artificial mobile constraints) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* Responsive Main Footer */}
      <MainFooter />

      {/* Floating WhatsApp Chat & Order pill */}
      <WhatsAppFloatingPill />
    </div>
  );
}
