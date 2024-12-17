
"use client";

import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Pause,
  Play,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PortfolioGrid({ category }) {
  const [items, setItems] = useState([]); // State to store gallery items from API
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [slideshowInterval, setSlideshowInterval] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data from API
  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/galleries");
        if (!response.ok) {
          throw new Error("Failed to fetch galleries");
        }
        const data = await response.json();
        console.log("the data is", data);
        setItems(data.data);
        setFilteredItems(data.data); // Initially, all items are displayed
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    fetchGalleries();
  }, []);

  // Slideshow logic
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
    if (isPaused) {
      startSlideshow();
    } else {
      stopSlideshow();
    }
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

  useEffect(() => {
    if (currentIndex === null) {
      stopSlideshow();
    }
    return () => {
      if (slideshowInterval) clearInterval(slideshowInterval);
    };
  }, [currentIndex]);

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
      <div className="grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16 md:mb-0">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => openModal(index)}
            className="group relative cursor-pointer"
          >
            <div className="relative h-[300px] w-full transition-all duration-300">
              <Image
                src={`http://127.0.0.1:8000/${item?.image_path}`}
                alt={item.title || "Gallery Image"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-gray-500">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Slideshow */}
      {currentIndex !== null && filteredItems[currentIndex]?.image_path && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative">
            <button
              className="absolute top-1/2 left-[-250px] transform -translate-y-1/2 text-white text-2xl p-2"
              onClick={prevImage}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <Image
              src={`http://127.0.0.1:8000/${filteredItems[currentIndex]?.image_path}`}
              alt={filteredItems[currentIndex]?.title || "Image"}
              width={800}
              height={600}
              className="object-cover rounded-sm"
            />
            <button
              className="absolute top-1/2 right-[-250px] transform -translate-y-1/2 text-white text-2xl p-2"
              onClick={nextImage}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute bg-[#343434] py-2 px-2 top-4 right-4 flex space-x-4 items-center text-white">
            <button onClick={() => setShowSearch(!showSearch)}>
              <Search className="w-4 h-4" />
            </button>
            <button onClick={toggleSlideshow}>
              {isPaused ? (
                <Play className="w-4 h-4" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </button>
            <button onClick={() => window.open("https://flickr.com", "_blank")}>
              <ExternalLink className="w-4 h-4" />
            </button>
            <button onClick={closeModal}>
              <X className="w-4 h-4" />
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
              className="w-60 p-1 border border-gray-300 rounded-md"
            />
            <button
              className="absolute top-1 right-2 text-gray-600"
              onClick={() => setShowSearch(false)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
