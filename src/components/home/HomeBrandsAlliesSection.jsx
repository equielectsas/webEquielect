"use client";

import React from "react";
import Reveal from "@/components/ui/reveal";
import Allies360Carousel from "@/components/home/Allies360Carousel";

export default function HomeBrandsAlliesSection({ items = [] }) {
  return (
    <Reveal delay={80}>
      <section className="bg-white border-b border-gray-200">
        <Allies360Carousel
          title="Marcas Aliadas"
          items={items.map((c) => ({ name: c.title, icon: c.icon, href: c.href }))}
          speedSeconds={26}
        />
      </section>
    </Reveal>
  );
}