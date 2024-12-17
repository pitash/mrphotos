
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Pause,
  Play,
  Search,
  ExternalLink,
} from "lucide-react";

export default function PortfolioGrid() {
  const [items, setItems] = useState([]); // Gallery items
  const [filteredItems, setFilteredItems] = useState([]); // Filtered items
  const [currentIndex, setCurrentIndex] = useState(null); // Modal state
  const [isPaused, setIsPaused] = useState(true);
  const [slideshowInterval, setSlideshowInterval] = useState(null);
  const [showSearch, setShowSearch] = useState(false); // Search toggle
  const [searchQuery, setSearchQuery] = useState("");
  const imageRefs = useRef([]); // Intersection Observer Ref

  // Fetch data from API
  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/galleries");
        if (!response.ok) throw new Error("Failed to fetch galleries");
        const data = await response.json();
        setItems(data.data);
        setFilteredItems(data.data);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };
    fetchGalleries();
  }, []);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("fade-in");
        });
      },
      { threshold: 0.2 }
    );

    imageRefs.current.forEach((el) => el && observer.observe(el));

    return () => {
      imageRefs.current.forEach((el) => el && observer.unobserve(el));
    };
  }, [filteredItems]);

  // Slideshow controls
  const startSlideshow = () => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    }, 2000);
    setSlideshowInterval(interval);
    setIsPaused(false);
  };

  const stopSlideshow = () => {
    if (slideshowInterval) clearInterval(slideshowInterval);
    setIsPaused(true);
  };

  const toggleSlideshow = () => {
    if (isPaused) startSlideshow();
    else stopSlideshow();
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    stopSlideshow();
  };

  const closeModal = () => {
    setCurrentIndex(null);
    stopSlideshow();
  };

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  const prevImage = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
    );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (imageRefs.current[index] = el)} // Intersection Observer Ref
            className="opacity-0 transform translate-y-10 transition-all duration-1000 group cursor-pointer"
            onClick={() => openModal(index)}
          >
            {/* Image */}
            <div className="relative h-[300px] w-full overflow-hidden rounded-md">
              <Image
                src={`http://127.0.0.1:8000/${item?.image_path}`}
                alt={item.title || "Gallery Image"}
                layout="fill"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Title and Description */}
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title || "Untitled"}
              </h3>
              <p className="text-sm text-gray-500">
                {item.description || "No description available"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal with Slideshow */}
      {currentIndex !== null && filteredItems[currentIndex]?.image_path && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          {/* Modal Content */}
          <div className="relative">
            <button
              className="absolute top-1/2 left-[-30px] sm:left-[-50px] transform -translate-y-1/2 text-white p-2 text-lg sm:text-xl lg:text-sm"
              onClick={prevImage}
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 lg:w-6 lg:h-6" />
            </button>

            <Image
            
              src={`http://127.0.0.1:8000/${filteredItems[currentIndex]?.image_path}`}
              alt={filteredItems[currentIndex]?.title || "Image"}
              width={600}
              height={100}
              className="object-contain rounded-sm sm:w-[80vw] sm:h-[60vh] lg:w-[70vw] lg:h-[60vh] w-[90vw] h-[50vh]"
            />

            <button
              className="absolute top-1/2 right-[-30px] sm:right-[-50px] transform -translate-y-1/2 text-white p-2 text-lg sm:text-xl lg:text-sm"
              onClick={nextImage}
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 lg:w-6 lg:h-6" />
            </button>
          </div>

          {/* Controls */}
          <div className="absolute top-4 right-4 flex space-x-4 text-white">
            <button onClick={() => setShowSearch(!showSearch)}>
              <Search className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" />
            </button>
            <button onClick={toggleSlideshow}>
              {isPaused ? <Play className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" /> : <Pause className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" />}
            </button>
            <button
              onClick={() => window.open("https://flickr.com", "_blank")}
            >
              <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" />
            </button>
            <button onClick={closeModal}>
              <X className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search for photos..."
              className="w-60 p-2 border border-gray-300 rounded-md"
            />
            <button
              className="absolute top-1 right-2 text-gray-600"
              onClick={() => setShowSearch(false)}
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}




