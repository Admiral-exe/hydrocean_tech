import React from "react";
import { getProducts, getCategories } from "@/lib/data";
import { HomeHeroBanner } from "@/components/storefront/home/home-hero-banner";
import { QuickServiceActions } from "@/components/storefront/home/quick-service-actions";
import { CategoryChipsBar } from "@/components/storefront/home/category-chips-bar";
import { TopRatedCarousel } from "@/components/storefront/home/top-rated-carousel";
import { WhyChooseGrid } from "@/components/storefront/home/why-choose-grid";
import { WaterTdsSlider } from "@/components/storefront/home/water-tds-slider";
import { ServicesCardList } from "@/components/storefront/home/services-card-list";

// Issue #5: Incremental Static Regeneration for blazing fast mobile performance
export const revalidate = 60;

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="space-y-2">
      {/* 1. Hero Banner with WhatsApp & Call CTA */}
      <HomeHeroBanner />

      {/* 2. Quick Action Service Icons */}
      <QuickServiceActions />

      {/* 3. Horizontal Category Navigation Pills */}
      <CategoryChipsBar categories={categories} />

      {/* 4. Top Rated RO Purifiers Horizontal Carousel */}
      <TopRatedCarousel products={products} />

      {/* 5. Why Choose HydroOcean 2x2 Feature Grid */}
      <WhyChooseGrid />

      {/* 6. Interactive Tap Water Safety TDS Slider */}
      <WaterTdsSlider />

      {/* 7. Doorstep Purifier Care & Maintenance Services */}
      <ServicesCardList />
    </div>
  );
}
