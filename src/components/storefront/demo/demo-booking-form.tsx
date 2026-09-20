"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { demoBookingSchema, DemoBookingInput } from "@/lib/schemas/demo.schema";
import { createDemoBookingAction } from "@/actions/demo.actions";
import { buildWhatsAppDemoBookingPayload } from "@/lib/whatsapp/payload-builder";
import { CheckCircle2, FlaskConical, MessageCircle } from "lucide-react";

export function DemoBookingForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DemoBookingInput>({
    resolver: zodResolver(demoBookingSchema),
    defaultValues: {
      water_source: "Borewell",
      preferred_time_slot: "Morning (9 AM - 12 PM)",
      pincode: "560034",
    },
  });

  const onSubmit = async (data: DemoBookingInput) => {
    setServerError(null);
    const result = await createDemoBookingAction(data);

    if (result.success) {
      setIsSuccess(true);
      const url = buildWhatsAppDemoBookingPayload({
        fullName: data.full_name,
        phoneNumber: data.phone_number,
        address: data.address,
        pincode: data.pincode,
        waterSource: data.water_source,
        preferredDate: data.preferred_date || undefined,
        preferredTimeSlot: data.preferred_time_slot,
        notes: data.notes || undefined,
      });
      setWhatsappUrl(url);
      reset();
    } else {
      setServerError(result.error);
    }
  };

  if (isSuccess && whatsappUrl) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-base font-black text-slate-800">
            Booking Request Received!
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Our certified water specialist will contact you to confirm the appointment.
          </p>
        </div>

        <div className="pt-2 space-y-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-white text-white" />
            <span>Confirm Visit via WhatsApp</span>
          </a>

          <button
            onClick={() => setIsSuccess(false)}
            className="text-xs font-semibold text-[#0b3b60] underline cursor-pointer"
          >
            Book Another Demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-4"
    >
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <FlaskConical className="w-4 h-4 text-[#0284c7]" />
        <h2 className="text-xs font-black text-[#0b3b60] uppercase tracking-wider">
          Doorstep TDS Test &amp; Purifier Demo
        </h2>
      </div>

      {serverError && (
        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
          {serverError}
        </div>
      )}

      {/* Full Name */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1">
          Full Name <span className="text-rose-500">*</span>
        </label>
        <input
          {...register("full_name")}
          placeholder="e.g. Ramesh Kumar"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b3b60]"
        />
        {errors.full_name && (
          <p className="text-[11px] text-rose-500 mt-0.5">{errors.full_name.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1">
          Mobile Number <span className="text-rose-500">*</span>
        </label>
        <input
          {...register("phone_number")}
          placeholder="e.g. 9876543210"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b3b60]"
        />
        {errors.phone_number && (
          <p className="text-[11px] text-rose-500 mt-0.5">{errors.phone_number.message}</p>
        )}
      </div>

      {/* Delivery Address & Pincode */}
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2">
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Address <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("address")}
            placeholder="Flat / Building / Street"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b3b60]"
          />
          {errors.address && (
            <p className="text-[11px] text-rose-500 mt-0.5">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Pincode <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("pincode")}
            placeholder="560034"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b3b60]"
          />
          {errors.pincode && (
            <p className="text-[11px] text-rose-500 mt-0.5">{errors.pincode.message}</p>
          )}
        </div>
      </div>

      {/* Current Water Source */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1">
          Current Water Source
        </label>
        <select
          {...register("water_source")}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b3b60]"
        >
          <option value="Borewell">Borewell Water (High TDS / Hard)</option>
          <option value="Municipal / Tanker">Municipal / Tanker Supply</option>
          <option value="Mixed">Mixed Water Supply</option>
        </select>
      </div>

      {/* Preferred Time Slot */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1">
          Preferred Time Slot
        </label>
        <select
          {...register("preferred_time_slot")}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b3b60]"
        >
          <option value="Morning (9 AM - 12 PM)">Morning (9:00 AM – 12:00 PM)</option>
          <option value="Afternoon (12 PM - 4 PM)">Afternoon (12:00 PM – 4:00 PM)</option>
          <option value="Evening (4 PM - 8 PM)">Evening (4:00 PM – 8:00 PM)</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#0b3b60] hover:bg-[#072a46] text-white py-3 px-4 rounded-xl font-bold text-xs shadow-xs active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
      >
        {isSubmitting ? "Submitting Request..." : "Schedule Free Water Test & Demo"}
      </button>
    </form>
  );
}
