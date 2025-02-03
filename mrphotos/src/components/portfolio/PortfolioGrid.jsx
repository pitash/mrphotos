
"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Pagination from "./Pagination"; // Import the Pagination component

const ImageModal = dynamic(() => import("./ImageModal"), { ssr: false }); // Lazy-loaded

export default function PortfolioGrid({ countryId, countryButtons }) {
  const [items, setItems] = useState([]); // All items from the API
  const [currentIndex, setCurrentIndex] = useState(null); // Modal state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    totalItems: 0,
    itemsPerPage: 3, // Default items per page
  });
  const [loading, setLoading] = useState(true); // Loading state
  const imageRefs = useRef([]);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const endpoint = countryId
          ? `${process.env.baseUrl}/galleries/${countryId}`
          : `${process.env.baseUrl}/galleries`;

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page: pagination.currentPage, per_page: pagination.itemsPerPage }),
        });

        const data = await response.json();
        console.log("Portfolio data", data);
        const galleryItems = Array.isArray(data?.data?.data)
          ? data.data.data
          : [];

        setItems(galleryItems);
        setPagination((prev) => ({
          ...prev,
          currentPage: data?.data?.current_page || 1,
          lastPage: data?.data?.last_page || 1,
          totalItems: data?.data?.total || 0,
        }));
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchItems();
  }, [countryId, pagination.currentPage, pagination.itemsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.lastPage) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setPagination((prev) => ({
      ...prev,
      itemsPerPage: newItemsPerPage,
      currentPage: 1, // Reset to the first page
    }));
  };

  const handleImageClick = (index) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="relative">
          {/* Placeholder Logo */}
          <Image
            src="/images/logo_1.png"
            alt="Loading..."
            width={100}
            height={100}
            priority
          />
          {/* Loading Bar */}
          <div className="absolute bottom-0 left-0 w-full">
            <div className="bg-gray-200 rounded-full overflow-hidden w-[100px]">
              <div className="bg-gray-800 h-2 rounded-full animate-barLoader"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex justify-between mb-4 space-x-2">
        <div className="flex space-x-2">{countryButtons}</div>
      </div>

      {items.length === 0 && (
        <div className="text-center text-gray-500">No photos found for the selected category.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (imageRefs.current[index] = el)}
            className="cursor-pointer transform transition-transform duration-500 hover:scale-105 animate-fadeIn"
            onClick={() => handleImageClick(index)}
          >
            <div className="relative h-[300px] w-full overflow-hidden rounded-md">
              <Image
                src={`${process.env.ImagebaseUrl}/${item?.thumbnail_path}`}
                alt={item.title || "Gallery Image"}
                layout="fill"
                className="object-cover"
                loading="lazy"
                unoptimized // Handle large images
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title || "Untitled"}
              </h3>
              <p className="text-sm text-gray-500 text-justify">
                {item.description || "No description available"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <Pagination
          currentPage={pagination.currentPage}
          lastPage={pagination.lastPage}
          onPageChange={handlePageChange}
          itemsPerPage={pagination.itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}

      {currentIndex !== null && (
        <ImageModal
          items={items}
          currentIndex={currentIndex}
          onClose={() => setCurrentIndex(null)}
          onNavigate={(index) => setCurrentIndex(index)}
        />
      )}
    </div>
  );
}
