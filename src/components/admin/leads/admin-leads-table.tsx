"use client";

import React, { useState } from "react";
import { DemoBooking } from "@/types/demo.types";
import { updateDemoStatusAction } from "@/actions/demo.actions";
import { Phone, Calendar, MapPin, Droplets } from "lucide-react";

const INITIAL_SAMPLE_LEADS: DemoBooking[] = [
  {
    id: "lead-1",
    full_name: "Ramesh Sharma",
    phone_number: "9876543210",
    email: "ramesh@example.com",
    address: "Apt 402, Green Glen Layout, Bellandur",
    pincode: "560103",
    water_source: "Borewell",
    preferred_date: "2026-09-22",
    preferred_time_slot: "Morning (9 AM - 12 PM)",
    notes: "Very salty tasting tap water, TDS meter reading above 950 PPM.",
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "lead-2",
    full_name: "Pooja Reddy",
    phone_number: "9123456780",
    email: "pooja.r@example.com",
    address: "Villa 12, Rainbow Drive, Sarjapur Road",
    pincode: "560035",
    water_source: "Municipal / Tanker",
    preferred_date: "2026-09-23",
    preferred_time_slot: "Afternoon (12 PM - 4 PM)",
    notes: "Interested in HydroPure 7-Stage with copper infuser.",
    status: "scheduled",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "lead-3",
    full_name: "Vikram Malhotra",
    phone_number: "9988776655",
    email: null,
    address: "4th Cross, Indiranagar 2nd Stage",
    pincode: "560038",
    water_source: "Mixed",
    preferred_date: "2026-09-21",
    preferred_time_slot: "Evening (4 PM - 8 PM)",
    notes: "Needs under-sink compact unit inspection.",
    status: "contacted",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function AdminLeadsTable() {
  const [leads, setLeads] = useState<DemoBooking[]>(INITIAL_SAMPLE_LEADS);

  const handleStatusChange = async (leadId: string, newStatus: DemoBooking["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    await updateDemoStatusAction(leadId, newStatus);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Location &amp; Water</th>
              <th className="py-3 px-4">Preferred Slot</th>
              <th className="py-3 px-4">Notes</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-extrabold text-slate-800">{lead.full_name}</div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mt-0.5">
                    <Phone className="w-3 h-3 text-[#0284c7]" />
                    <span>{lead.phone_number}</span>
                  </div>
                </td>

                <td className="py-3 px-4">
                  <div className="flex items-start gap-1 text-slate-700 font-medium">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                    <span className="truncate max-w-[180px]">
                      {lead.address} ({lead.pincode})
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#0b3b60] font-bold mt-0.5">
                    <Droplets className="w-3 h-3 text-[#0284c7]" />
                    <span>{lead.water_source}</span>
                  </div>
                </td>

                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 text-slate-700 font-semibold">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{lead.preferred_date || "Flexible"}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {lead.preferred_time_slot}
                  </span>
                </td>

                <td className="py-3 px-4 max-w-[200px]">
                  <p className="text-[11px] text-slate-600 truncate font-medium">
                    {lead.notes || "—"}
                  </p>
                </td>

                <td className="py-3 px-4 text-right">
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      handleStatusChange(lead.id, e.target.value as DemoBooking["status"])
                    }
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                      lead.status === "completed"
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                        : lead.status === "scheduled"
                        ? "bg-cyan-50 border-cyan-300 text-cyan-800"
                        : lead.status === "contacted"
                        ? "bg-blue-50 border-blue-300 text-blue-700"
                        : "bg-amber-50 border-amber-300 text-amber-800"
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
