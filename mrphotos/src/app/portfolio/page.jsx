// app/portfolio/page.jsx
"use client";

import CategoryFilter from "@/components/portfolio/CategoryFilter";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import { useState } from "react";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("ALL WORKS");

  return (
    <div className="relative min-h-screen px-5 pb-48 md:pb-32 md:px-20 pt-32 bg-gray-100">
      {/* Side text - similar to "Last Works" */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <span className="block -rotate-90 text-sm font-semibold uppercase tracking-wider text-primary">
          Portfolio
        </span>
      </div>

      {/* Main Content */}
      <div className="space-y-12 pb-24 bg-white p-5 sm:pb-16">
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <PortfolioGrid category={activeCategory} />
      </div>
    </div>
  );
}
