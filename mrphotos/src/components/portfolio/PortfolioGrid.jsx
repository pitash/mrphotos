
// PortfolioGrid.js
// "use client";

// import { useEffect, useState, useRef } from "react";
// import Image from "next/image";
// import { Loader } from "lucide-react";
// import ImageModal from "./ImageModal"; // Import the modal component

// export default function PortfolioGrid({ countryId }) {
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
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
//         const data = await response.json();
//         console.log("Fetched data:", data);
//         if (Array.isArray(data.data)) {
//           setItems(data.data);
//           setFilteredItems(data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching gallery data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, [countryId]);

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     const filtered = items.filter((item) =>
//       item.title.toLowerCase().includes(query)
//     );
//     setFilteredItems(filtered);
//   };

//   return (
//     <div>
//       {loading && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <Loader className="animate-spin w-10 h-10 text-gray-300" />
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {filteredItems.map((item, index) => (
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

//       {/* Show modal if currentIndex is not null */}
//       {currentIndex !== null && (
//         <ImageModal
//           items={filteredItems}
//           currentIndex={currentIndex}
//           onClose={() => setCurrentIndex(null)}
//           onNavigate={(index) => setCurrentIndex(index)}
//           onSearch={handleSearch}
//         />
//       )}
//     </div>
//   );
// }



//////// Pagination code/////

// "use client";

// import { useEffect, useState, useRef } from "react";
// import Image from "next/image";
// import { Loader } from "lucide-react";
// import ImageModal from "./ImageModal"; // Import the modal component

// export default function PortfolioGrid({ countryId }) {
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(null); // Manages modal visibility and current image
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1); // Track the current page
//   const itemsPerPage = 3; // Number of items per page
//   const imageRefs = useRef([]);

//   useEffect(() => {
//     const fetchItems = async () => {
//       setLoading(true);
//       try {
//         const endpoint = countryId
//           ? `http://127.0.0.1:8000/api/galleries/${countryId}`
//           : "http://127.0.0.1:8000/api/galleries";

//         const response = await fetch(endpoint);
//         const data = await response.json();
//         console.log("Fetched data:", data);
//         if (Array.isArray(data.data)) {
//           setItems(data.data);
//           setFilteredItems(data.data); // In this case, filteredItems = items
//         }
//       } catch (error) {
//         console.error("Error fetching gallery data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, [countryId]);

//   // Calculate the paginated items
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedItems = filteredItems.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   // Total pages
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div>
//       {loading && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <Loader className="animate-spin w-10 h-10 text-gray-300" />
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {paginatedItems.map((item, index) => (
//           <div
//             key={item.id}
//             ref={(el) => (imageRefs.current[index] = el)}
//             className="cursor-pointer"
//             onClick={() => setCurrentIndex(index + startIndex)} // Adjust index for modal
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

//       {/* Pagination */}
//       <div className="mt-6 flex justify-center items-center space-x-2">
//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//           <button
//             key={page}
//             onClick={() => handlePageChange(page)}
//             className={`px-3 py-1 border rounded-md ${
//               page === currentPage
//                 ? "bg-gray-800 text-white"
//                 : "bg-white text-gray-800"
//             }`}
//           >
//             {page}
//           </button>
//         ))}
//       </div>

//       {/* Show modal if currentIndex is not null */}
//       {currentIndex !== null && (
//         <ImageModal
//           items={filteredItems}
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

export default function PortfolioGrid({ countryId }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null); // Manages modal visibility and current image
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const itemsPerPage = 3; // Number of items per page
  const imageRefs = useRef([]);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const endpoint = countryId
          ? `http://127.0.0.1:8000/api/galleries/${countryId}`
          : "http://127.0.0.1:8000/api/galleries";

        const response = await fetch(endpoint);
        const data = await response.json();
        console.log("Fetched data:", data);
        if (Array.isArray(data.data)) {
          setItems(data.data);
          setFilteredItems(data.data); // In this case, filteredItems = items
        }
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [countryId]);

  // Calculate the paginated items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Total pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Handle page change logic (previous/next)
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Loader className="animate-spin w-10 h-10 text-gray-300" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginatedItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (imageRefs.current[index] = el)}
            className="cursor-pointer"
            onClick={() => setCurrentIndex(index + startIndex)} // Adjust index for modal
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

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center space-x-2">
        {/* Left Arrow */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded-md ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-white"
          }`}
        >
          &lt;
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 border rounded-md ${
              page === currentPage
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Right Arrow */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-white"
          }`}
        >
          &gt;
        </button>
      </div>

      {/* Show modal if currentIndex is not null */}
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
