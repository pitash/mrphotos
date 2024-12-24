
"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import ImageModal from "./ImageModal"; // Import the modal component
import Loading from "@/components/loading/loading"; // Import the Loading component
import { Search } from "lucide-react"; // Import the search icon from react-lucide

export default function PortfolioGrid({ countryId, countryButtons }) {
  const [items, setItems] = useState([]); // All items from the API
  const [filteredItems, setFilteredItems] = useState([]); // Filtered items based on search query
  const [currentIndex, setCurrentIndex] = useState(null); // Manages modal visibility and current image
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(""); // Search query
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    totalItems: 0,
  });
  const [searchActive, setSearchActive] = useState(false); // State to manage search input visibility
  const imageRefs = useRef([]);
  const searchRef = useRef(null); // Ref for the search input and icon container

  useEffect(() => {
    const fetchAllItems = async () => {
      setLoading(true);
      try {
        const endpoint = countryId
          ? `http://127.0.0.1:8000/api/galleries/${countryId}`
          : `http://127.0.0.1:8000/api/galleries`;

        let allItems = [];
        let currentPage = 1;
        let lastPage = 1;

        do {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ page: currentPage }),
          });
          const rawData = await response.json();
          const galleryItems = Array.isArray(rawData.data.data) ? rawData.data.data : Array.isArray(rawData.data) ? rawData.data : [];

          allItems = [...allItems, ...galleryItems];
          currentPage = rawData.data.current_page + 1;
          lastPage = rawData.data.last_page;
        } while (currentPage <= lastPage);

        setItems(allItems);
        setFilteredItems(allItems); // Initialize filtered items
        setPagination({
          currentPage: 1,
          lastPage: Math.ceil(allItems.length / 3), // Calculate the number of pages based on 3 items per page
          totalItems: allItems.length,
        });
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllItems();
  }, [countryId]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.lastPage) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    const filtered = items.filter(item =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
      item.description.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchActive(false);
    }
  };

  useEffect(() => {
    if (searchActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchActive]);

  const handleImageClick = (index) => {
    const itemsPerPage = 3; // Adjust this value based on your pagination settings
    const page = Math.floor(index / itemsPerPage) + 1;
    setPagination((prev) => ({ ...prev, currentPage: page }));
    setCurrentIndex(index);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative">
      {/* Buttons Container and Search Input */}
      <div className="flex justify-between mb-4 space-x-2">
        <div className="flex space-x-2">
          {countryButtons}
        </div>
        <div ref={searchRef} className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search..."
            className={`p-1 border border-gray-300 rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              searchActive ? "w-60 opacity-100" : "w-0 opacity-0"
            }`}
          />
          <Search
            className={`h-5 text-gray-500 cursor-pointer transition-all duration-300 ease-in-out ${
              searchActive ? "absolute right-2" : ""
            }`}
            onClick={toggleSearch}
          />
        </div>
      </div>

      {/* Gallery Grid */}
      {!loading && filteredItems.length === 0 && (
        <div className="text-center text-gray-500">No images found.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.slice((pagination.currentPage - 1) * 3, pagination.currentPage * 3).map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (imageRefs.current[index] = el)}
            className="cursor-pointer transform transition-transform duration-500 hover:scale-105 animate-fadeIn"
            onClick={() => handleImageClick(index)} // Open modal on click
          >
            {/* Image */}
            <div className="relative h-[300px] w-full overflow-hidden rounded-md">
              <Image
                src={`http://127.0.0.1:8000/storage/${item?.image_path}`}
                alt={item.title || "Gallery Image"}
                layout="fill"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            {/* Title */}
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

      {/* Pagination Controls */}
      {filteredItems.length > 0 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            className="px-4 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
            disabled={pagination.currentPage === 1}
            onClick={() => handlePageChange(pagination.currentPage - 1)}
          >
            Previous
          </button>
          {[...Array(pagination.lastPage)].map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-sm rounded-md ${
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
            className="px-4 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
            disabled={pagination.currentPage === pagination.lastPage}
            onClick={() => handlePageChange(pagination.currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* Image Modal */}
      {currentIndex !== null && (
        <ImageModal
          items={filteredItems}
          currentIndex={currentIndex}
          onClose={() => setCurrentIndex(null)}
          onNavigate={(index) => setCurrentIndex(index)}
        />
      )}
    </div>
  );
}