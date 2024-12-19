
// components/portfolio/CategoryFilter.jsx
"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  const scrollRef = useRef(null);
  const [showControls, setShowControls] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/countries");
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Check if scroll controls are needed
  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        setShowControls(
          scrollRef.current.scrollWidth > scrollRef.current.clientWidth
        );
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative bg-white">
      {showControls && (
        <>
          <button
            onClick={() => scroll("left")}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Categories */}
      <div
        ref={scrollRef}
        className="flex items-center gap-8 overflow-x-auto no-scrollbar py-2"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange({ id: category.id, name: category.name })}
            className={`whitespace-nowrap text-sm font-medium tracking-wider relative
                ${
                  activeCategory.id === category.id
                    ? "text-primary border-b-2 border-primary pb-2"
                    : "text-gray-500 hover:text-primary transition-colors pb-2"
                }
            `}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}




