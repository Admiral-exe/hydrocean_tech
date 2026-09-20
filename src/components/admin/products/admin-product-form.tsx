"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductInput } from "@/lib/schemas/product.schema";
import { createProductAction, updateProductAction } from "@/actions/product.actions";
import { Product } from "@/types/product.types";
import { Category } from "@/types/category.types";
import { ArrowLeft, Save, UploadCloud } from "lucide-react";
import Link from "next/link";
import { uploadProductImageAction } from "@/actions/storage.actions";

interface AdminProductFormProps {
  product?: Product;
  categories: Category[];
}

export function AdminProductForm({ product, categories }: AdminProductFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);

  const isEditing = Boolean(product);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          slug: product.slug,
          category_id: product.category_id,
          short_description: product.short_description || "",
          full_description: product.full_description || "",
          price: product.price,
          compare_at_price: product.compare_at_price || undefined,
          images: product.images || [],
          badge_text: product.badge_text || "",
          tag_badge: product.tag_badge || "RO+UV",
          purification_tech: product.purification_tech,
          storage_capacity: product.storage_capacity,
          capacity_variants: product.capacity_variants,
          specifications: product.specifications,
          features: product.features,
          filtration_stages: product.filtration_stages,
          is_featured: product.is_featured,
          is_in_stock: product.is_in_stock,
          is_published: product.is_published,
        }
      : {
          name: "",
          slug: "",
          category_id: categories[0]?.id || null,
          short_description: "",
          full_description: "",
          price: 9999,
          compare_at_price: 14999,
          images: ["/images/products/hydropure-main.webp"],
          badge_text: "NEW",
          tag_badge: "RO+UV",
          purification_tech: "RO + UV + UF",
          storage_capacity: "10L",
          capacity_variants: [
            { capacity: "10 Litres", price_diff: 0, label: "Recommended Standard", is_default: true },
            { capacity: "12 Litres", price_diff: 1500, label: "+₹1,500 High Demand", is_default: false },
          ],
          specifications: { "Filtration": "7 Stages", "Capacity": "10L", "Warranty": "1 Year" },
          features: ["PureMolecular filtration", "TDS display", "Doorstep installation"],
          filtration_stages: [],
          is_featured: false,
          is_in_stock: true,
          is_published: true,
        },
  });

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    const res = await uploadProductImageAction(fd);
    if (res.success) {
      const currentImages = watch("images") || [];
      setValue("images", [...currentImages, res.data.url]);
    } else {
      alert(`Upload failed: ${res.error}`);
    }
    setImageUploading(false);
  };

  const onSubmit = async (data: ProductInput) => {
    setServerError(null);

    let result;
    if (isEditing && product) {
      result = await updateProductAction(product.id, data);
    } else {
      result = await createProductAction(data);
    }

    if (result.success) {
      router.push("/admin/products");
      router.refresh();
    } else {
      setServerError(result.error);
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2">
        <Link
          href="/admin/products"
          className="text-xs font-bold text-slate-500 hover:text-[#0b3b60] flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-5"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h1 className="text-base font-black text-[#0b3b60]">
              {isEditing ? `Edit: ${product?.name}` : "Create New Product"}
            </h1>
            <p className="text-xs text-slate-500">
              Fill in product specifications, pricing, and visual assets
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#0b3b60] hover:bg-[#072a46] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? "Saving..." : "Save Product"}</span>
          </button>
        </div>

        {serverError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-bold">
            {serverError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Name */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Product Title <span className="text-rose-500">*</span>
            </label>
            <input
              {...register("name")}
              placeholder="e.g. HydroPure 7-Stage RO+UV+UF"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#0b3b60] focus:outline-none"
            />
            {errors.name && (
              <p className="text-[11px] text-rose-500 mt-0.5">{errors.name.message}</p>
            )}
          </div>

          {/* Product Slug */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              URL Slug <span className="text-rose-500">*</span>
            </label>
            <input
              {...register("slug")}
              placeholder="hydropure-7-stage-ro-uv-uf"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono focus:ring-2 focus:ring-[#0b3b60] focus:outline-none"
            />
            {errors.slug && (
              <p className="text-[11px] text-rose-500 mt-0.5">{errors.slug.message}</p>
            )}
          </div>

          {/* Pricing Row */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Selling Price (₹) <span className="text-rose-500">*</span>
            </label>
            <input
              {...register("price", { valueAsNumber: true })}
              type="number"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#0b3b60] focus:outline-none"
            />
            {errors.price && (
              <p className="text-[11px] text-rose-500 mt-0.5">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Compare-at Price (MRP ₹)
            </label>
            <input
              {...register("compare_at_price", { valueAsNumber: true })}
              type="number"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#0b3b60] focus:outline-none"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
            <select
              {...register("category_id")}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#0b3b60] focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Purification Tech */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Purification Technology
            </label>
            <select
              {...register("purification_tech")}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#0b3b60] focus:outline-none"
            >
              <option value="RO + UV + UF">RO + UV + UF</option>
              <option value="Alkaline + Copper">Alkaline + Copper</option>
              <option value="Under-sink Compact">Under-sink Compact</option>
              <option value="Gravity / Non-Electric">Gravity / Non-Electric</option>
            </select>
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Short Tagline
          </label>
          <input
            {...register("short_description")}
            placeholder="TDS Controller • Mineral Infuser • Free Installation included"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#0b3b60] focus:outline-none"
          />
        </div>

        {/* Supabase Storage Image Upload Zone */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Supabase Storage Image Upload
          </label>
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center bg-slate-50 hover:bg-slate-100 transition-colors">
            <UploadCloud className="w-6 h-6 text-[#0b3b60] mx-auto mb-1" />
            <span className="text-xs font-bold text-slate-700 block">
              {imageUploading ? "Uploading to product-images bucket..." : "Upload New Image"}
            </span>
            <span className="text-[10px] text-slate-400 block mb-2">
              JPG, PNG, WEBP up to 5MB (Saved with strict Storage RLS)
            </span>
            <input
              type="file"
              accept="image/*"
              disabled={imageUploading}
              onChange={handleImageFile}
              className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0b3b60] file:text-white cursor-pointer"
            />
          </div>
        </div>

        {/* Stock & Visibility Toggles */}
        <div className="pt-2 flex flex-wrap gap-6 text-xs font-bold text-slate-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("is_in_stock")}
              className="rounded-sm text-[#0b3b60] focus:ring-[#0b3b60]"
            />
            <span>In Stock (Ready to Dispatch)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("is_published")}
              className="rounded-sm text-[#0b3b60] focus:ring-[#0b3b60]"
            />
            <span>Published on Storefront (Live)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("is_featured")}
              className="rounded-sm text-[#0b3b60] focus:ring-[#0b3b60]"
            />
            <span>Featured on Homepage</span>
          </label>
        </div>
      </form>
    </div>
  );
}
