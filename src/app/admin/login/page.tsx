"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, ShieldAlert } from "lucide-react";
import { adminLoginSchema, AdminLoginInput } from "@/lib/schemas/auth.schema";
import { loginAdminAction } from "@/actions/auth.actions";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin/dashboard";

  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginInput>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "admin@hydrocean.tech",
      password: "",
    },
  });

  const onSubmit = async (data: AdminLoginInput) => {
    setAuthError(null);
    const result = await loginAdminAction(data);

    if (result.success) {
      router.push(redirect);
      router.refresh();
    } else {
      setAuthError(result.error);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-lg space-y-5">
      {/* Brand Lock Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center mx-auto mb-2">
          <Image
            src="/logo.png"
            alt="Hydrocean Tech"
            width={160}
            height={44}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>
        <div>
          <h1 className="text-lg font-black text-[#0b3b60]">
            Admin Authentication
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Hydrocean Tech Secure Control Panel
          </p>
        </div>
      </div>

      {authError && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2 text-xs text-rose-700 font-semibold">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{authError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Admin Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              {...register("email")}
              type="email"
              placeholder="admin@hydrocean.tech"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b3b60]"
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-rose-500 mt-0.5">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Master Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b3b60]"
            />
          </div>
          {errors.password && (
            <p className="text-[11px] text-rose-500 mt-0.5">{errors.password.message}</p>
          )}
        </div>

        {/* Login CTA */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#0b3b60] hover:bg-[#072a46] text-white py-3 rounded-xl font-bold text-xs shadow-md active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Authenticating Session..." : "Secure Sign In"}
        </button>
      </form>

      <div className="pt-2 text-center text-[11px] text-slate-400">
        Defense-in-depth protection enabled (Edge JWT + App Server role verification)
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-8">
      <Suspense fallback={<div className="text-xs text-slate-400">Loading admin portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
