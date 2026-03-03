"use client";

import React, { useState } from "react";
import LoginModal from "@/components/auth/LoginModal";

import HomeGlobalStyles from "@/components/home/HomeGlobalStyles";
import HomeHeroSlider from "@/components/home/HomeHeroSlider";
import HomeBrandsAlliesSection from "@/components/home/HomeBrandsAlliesSection";
import HomeFeaturedProductsSection from "@/components/home/HomeFeaturedProductsSection";
import HomeStoryPhonesSection from "@/components/home/HomeStoryPhonesSection";
import HomeOtherAlliesAndCorporateSection from "@/components/home/HomeOtherAlliesAndCorporateSection";

import { BRANDS, QUICK_CATEGORIES, ALLIES, CORPORATE } from "@/components/home/home.data";

export default function HomePage() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="relative">
      <HomeGlobalStyles />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

      <HomeHeroSlider brands={BRANDS} />

      <HomeBrandsAlliesSection items={QUICK_CATEGORIES} />

      <HomeFeaturedProductsSection />

      <HomeStoryPhonesSection />

      <HomeOtherAlliesAndCorporateSection allies={ALLIES} corporate={CORPORATE} />
    </div>
  );
}