// "use client";

// import { useEffect, useState, useRef } from "react";
// import Image from "next/image";
// import { Loader } from "lucide-react";
// import ImageModal from "./ImageModal"; // Import the modal component

// export default function PortfolioGrid({ countryId }) {
//   const [items, setItems] = useState([]); // All items from the API
//   const [currentIndex, setCurrentIndex] = useState(null); // Manages modal visibility and current image
//   const [loading, setLoading] = useState(true);
//   const imageRefs = useRef([]);

//   useEffect(() => {
//     const fetchItems = async () => {
//       setLoading(true);
//       try {
//         const endpoint = countryId
//           ? `http://127.0.0.1:8000/api/galleries/${countryId}`
//           : "http://127.0.0.1:8000/api/galleries";

//         const response = await fetch(endpoint);
//         const rawData = await response.json();
//         console.log("Raw API response:", rawData.data);

//         // Use the appropriate key based on the API response structure
//         const galleryItems = Array.isArray(rawData.data.data) ? rawData.data.data : Array.isArray(rawData.data) ? rawData.data : [];
//         if (galleryItems.length) {
//           setItems(galleryItems);
//         } else {
//           console.error("Unexpected data format or no items found.");
//         }
//       } catch (error) {
//         console.error("Error fetching gallery data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, [countryId]);

//   return (
//     <div>
//       {/* Loading Spinner */}
//       {loading && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <Loader className="animate-spin w-10 h-10 text-gray-300" />
//         </div>
//       )}

//       {/* Gallery Grid */}
//       {!loading && items.length === 0 && (
//         <div className="text-center text-gray-500">No images found.</div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {items.map((item, index) => (
//           <div
//             key={item.id}
//             ref={(el) => (imageRefs.current[index] = el)}
//             className="cursor-pointer"
//             onClick={() => setCurrentIndex(index)} // Open modal on click
//           >
//             {/* Image */}
//             <div className="relative h-[300px] w-full overflow-hidden rounded-md">
//               <Image
//                 src={`http://127.0.0.1:8000/${item?.image_path}`}
//                 alt={item.title || "Gallery Image"}
//                 layout="fill"
//                 className="object-cover transition-transform duration-500 hover:scale-105"
//               />
//             </div>
//             {/* Title */}
//             <div className="mt-4 text-center">
//               <h3 className="text-lg font-semibold text-gray-800">
//                 {item.title || "Untitled"}
//               </h3>
//               <p className="text-sm text-gray-500">
//                 {item.description || "No description available"}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Image Modal */}
//       {currentIndex !== null && (
//         <ImageModal
//           items={items}
//           currentIndex={currentIndex}
//           onClose={() => setCurrentIndex(null)}
//           onNavigate={(index) => setCurrentIndex(index)}
//         />
//       )}
//     </div>
//   );
// }




"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Loader } from "lucide-react";
import ImageModal from "./ImageModal"; // Import the modal component

export default function PortfolioGrid({ countryId, countryButtons }) {
  const [items, setItems] = useState([]); // All items from the API
  const [allItems, setAllItems] = useState([]); // All items for "All Images" view
  const [currentIndex, setCurrentIndex] = useState(null); // Manages modal visibility and current image
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    totalItems: 0,
  });
  const [viewAll, setViewAll] = useState(false); // State to manage view mode
  const imageRefs = useRef([]);

  useEffect(() => {
    const fetchItems = async (page = 1) => {
      setLoading(true);
      try {
        const endpoint = countryId
          ? `http://127.0.0.1:8000/api/galleries/${countryId}?page=${page}`
          : `http://127.0.0.1:8000/api/galleries?page=${page}`;

        const response = await fetch(endpoint);
        const rawData = await response.json();
        console.log("Raw API response:", rawData.data);

        // Use the appropriate key based on the API response structure
        const galleryItems = Array.isArray(rawData.data.data) ? rawData.data.data : Array.isArray(rawData.data) ? rawData.data : [];
        if (galleryItems.length) {
          setItems(galleryItems);
          setPagination({
            currentPage: rawData.data.current_page,
            lastPage: rawData.data.last_page,
            totalItems: rawData.data.total,
          });
        } else {
          console.error("Unexpected data format or no items found.");
        }
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllItems = async () => {
      setLoading(true);
      try {
        const endpoint = `http://127.0.0.1:8000/api/galleries`;

        const response = await fetch(endpoint);
        const rawData = await response.json();
        console.log("Raw API response:", rawData.data);

        // Use the appropriate key based on the API response structure
        const galleryItems = Array.isArray(rawData.data.data) ? rawData.data.data : Array.isArray(rawData.data) ? rawData.data : [];
        if (galleryItems.length) {
          setAllItems(galleryItems);
        } else {
          console.error("Unexpected data format or no items found.");
        }
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (viewAll) {
      fetchAllItems();
    } else {
      fetchItems(pagination.currentPage);
    }
  }, [countryId, pagination.currentPage, viewAll]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.lastPage) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  const handleViewAllToggle = () => {
    setViewAll((prevViewAll) => {
      if (!prevViewAll) {
        // Reset pagination when switching to "All Images" view
        setPagination({
          currentPage: 1,
          lastPage: 1,
          totalItems: 0,
        });
      }
      return !prevViewAll;
    });
  };

  return (
    <div>
      {/* Buttons Container */}
      <div className="flex justify-start mb-4 space-x-2">
        {countryButtons}
        <button
          className="px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={handleViewAllToggle}
        >
          {viewAll ? "Paginated View" : "All Images"}
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Loader className="animate-spin w-10 h-10 text-gray-300" />
        </div>
      )}

      {/* Gallery Grid */}
      {!loading && (viewAll ? allItems : items).length === 0 && (
        <div className="text-center text-gray-500">No images found.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {(viewAll ? allItems : items).map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (imageRefs.current[index] = el)}
            className="cursor-pointer"
            onClick={() => setCurrentIndex(index)} // Open modal on click
          >
            {/* Image */}
            <div className="relative h-[300px] w-full overflow-hidden rounded-md">
              <Image
                src={`http://127.0.0.1:8000/${item?.image_path}`}
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
      {!viewAll && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
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
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
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
          items={viewAll ? allItems : items}
          currentIndex={currentIndex}
          onClose={() => setCurrentIndex(null)}
          onNavigate={(index) => setCurrentIndex(index)}
        />
      )}
    </div>
  );
}














































