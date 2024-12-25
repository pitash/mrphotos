"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Loading from "@/components/loading/loading";

const ImageModal = dynamic(() => import("./ImageModal"), { ssr: false }); // Lazy-loaded

export default function PortfolioGrid({ countryId, countryButtons }) {
  const [items, setItems] = useState([]); // All items from the API
  const [currentIndex, setCurrentIndex] = useState(null); // Modal state
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    totalItems: 0,
  });
  const imageRefs = useRef([]);

  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const endpoint = countryId
          ? `http://127.0.0.1:8000/api/galleries/${countryId}`
          : `http://127.0.0.1:8000/api/galleries`;

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page: pagination.currentPage, per_page: itemsPerPage }),
        });

        const data = await response.json();
        const galleryItems = Array.isArray(data?.data?.data)
          ? data.data.data
          : [];

        setItems(galleryItems);
        setPagination({
          currentPage: data?.data?.current_page || 1,
          lastPage: data?.data?.last_page || 1,
          totalItems: data?.data?.total || 0,
        });
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [countryId, pagination.currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.lastPage) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  const handleImageClick = (index) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative">
      <div className="flex justify-between mb-4 space-x-2">
        <div className="flex space-x-2">{countryButtons}</div>
      </div>

      {!loading && items.length === 0 && (
        <div className="text-center text-gray-500">No images found.</div>
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
                src={`http://127.0.0.1:8000/storage/${item?.image_path}`}
                alt={item.title || "Gallery Image"}
                layout="fill"
                className="object-cover"
                loading="lazy"
              />
            </div>
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

      {items.length > 0 && (
        <div className="flex justify-center items-center space-x-1 mt-6">
          <button
            className="px-2 py-1 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
            disabled={pagination.currentPage === 1}
            onClick={() => handlePageChange(pagination.currentPage - 1)}
          >
            Previous
          </button>
          {[...Array(pagination.lastPage)].map((_, index) => (
            <button
              key={index}
              className={`px-2 py-1 text-sm rounded-md ${
                pagination.currentPage === index + 1
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-2 py-1 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
            disabled={pagination.currentPage === pagination.lastPage}
            onClick={() => handlePageChange(pagination.currentPage + 1)}
          >
            Next
          </button>
        </div>
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

