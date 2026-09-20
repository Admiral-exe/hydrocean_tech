import React from "react";
import { AdminLeadsTable } from "@/components/admin/leads/admin-leads-table";

export const metadata = {
  title: "Demo & Service Inquiries | Hydrocean Admin",
};

export default function AdminLeadsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-black text-[#0b3b60]">
          Water Test &amp; Demo Inquiries
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Doorstep customer leads and certified technician assignments
        </p>
      </div>

      <AdminLeadsTable />
    </div>
  );
}
