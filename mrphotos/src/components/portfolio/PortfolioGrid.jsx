// "use client";

// import { useEffect, useState, useRef } from "react";
// import dynamic from "next/dynamic";
// import Image from "next/image";
// import Loading from "@/components/loading/loading";

// const ImageModal = dynamic(() => import("./ImageModal"), { ssr: false }); // Lazy-loaded

// export default function PortfolioGrid({ countryId, countryButtons }) {
//   const [items, setItems] = useState([]); // All items from the API
//   const [currentIndex, setCurrentIndex] = useState(null); // Modal state
//   const [loading, setLoading] = useState(false);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     lastPage: 1,
//     totalItems: 0,
//     itemsPerPage: 3, // Default items per page
//   });
//   const imageRefs = useRef([]);

//   useEffect(() => {
//     const fetchItems = async () => {
//       setLoading(true);
//       try {
//         const endpoint = countryId
//           ? `http://127.0.0.1:8000/api/galleries/${countryId}`
//           : `http://127.0.0.1:8000/api/galleries`;

//         const response = await fetch(endpoint, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ page: pagination.currentPage, per_page: pagination.itemsPerPage }),
//         });

//         const data = await response.json();
//         const galleryItems = Array.isArray(data?.data?.data)
//           ? data.data.data
//           : [];

//         setItems(galleryItems);
//         setPagination((prev) => ({
//           ...prev,
//           currentPage: data?.data?.current_page || 1,
//           lastPage: data?.data?.last_page || 1,
//           totalItems: data?.data?.total || 0,
//         }));
//       } catch (error) {
//         console.error("Error fetching gallery data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, [countryId, pagination.currentPage, pagination.itemsPerPage]);

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= pagination.lastPage) {
//       setPagination((prev) => ({ ...prev, currentPage: newPage }));
//     }
//   };

//   const handleItemsPerPageChange = (e) => {
//     const newItemsPerPage = parseInt(e.target.value, 10);
//     setPagination((prev) => ({
//       ...prev,
//       itemsPerPage: newItemsPerPage,
//       currentPage: 1, // Reset to the first page
//     }));
//   };

//   const handleImageClick = (index) => {
//     setCurrentIndex(index);
//   };

//   const renderPagination = () => {
//     const { currentPage, lastPage } = pagination;
//     const maxVisiblePages = 5; // Maximum number of visible page buttons
//     let pages = [];

//     if (lastPage <= maxVisiblePages) {
//       pages = Array.from({ length: lastPage }, (_, i) => i + 1);
//     } else {
//       const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//       const endPage = Math.min(lastPage, startPage + maxVisiblePages - 1);

//       if (startPage > 1) {
//         pages.push(1);
//         if (startPage > 2) {
//           pages.push("start-ellipsis");
//         }
//       }

//       for (let i = startPage; i <= endPage; i++) {
//         pages.push(i);
//       }

//       if (endPage < lastPage) {
//         if (endPage < lastPage - 1) {
//           pages.push("end-ellipsis");
//         }
//         pages.push(lastPage);
//       }
//     }

//     return (
//       <div className="flex justify-center items-center space-x-1 mt-6">
//         <button
//           className="px-2 py-1 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(currentPage - 1)}
//         >
//           Previous
//         </button>
//         {pages.map((page, index) =>
//           typeof page === "string" ? (
//             <span key={page + index} className="px-2 py-1 text-sm">
//               ...
//             </span>
//           ) : (
//             <button
//               key={page}
//               className={`px-2 py-1 text-sm rounded-md ${
//                 currentPage === page
//                   ? "bg-gray-800 text-white"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//               onClick={() => handlePageChange(page)}
//             >
//               {page}
//             </button>
//           )
//         )}
//         <button
//           className="px-2 py-1 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
//           disabled={currentPage === lastPage}
//           onClick={() => handlePageChange(currentPage + 1)}
//         >
//           Next
//         </button>
//       </div>
//     );
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <div className="relative">
//       <div className="flex justify-between mb-4 space-x-2">
//         <div className="flex space-x-2">{countryButtons}</div>
//         <div className="flex items-center space-x-2">
//           <label htmlFor="itemsPerPage" className="text-sm font-semibold text-gray-700">Items per page:</label>
//           <select
//             id="itemsPerPage"
//             value={pagination.itemsPerPage}
//             onChange={handleItemsPerPageChange}
//             className="p-1 border border-gray-300 rounded-md transition-all duration-300 ease-in-out focus:border-gray-800 animate-fade-in"
//           >
//             <option value={3}>3</option>
//             <option value={6}>6</option>
//             <option value={9}>9</option>
//             <option value={12}>12</option>
//           </select>
//         </div>
//       </div>

//       {!loading && items.length === 0 && (
//         <div className="text-center text-gray-500">No images found.</div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {items.map((item, index) => (
//           <div
//             key={item.id}
//             ref={(el) => (imageRefs.current[index] = el)}
//             className="cursor-pointer transform transition-transform duration-500 hover:scale-105 animate-fadeIn"
//             onClick={() => handleImageClick(index)}
//           >
//             <div className="relative h-[300px] w-full overflow-hidden rounded-md">
//               <Image
//                 src={`http://127.0.0.1:8000/storage/${item?.image_path}`}
//                 alt={item.title || "Gallery Image"}
//                 layout="fill"
//                 className="object-cover"
//                 loading="lazy"
//               />
//             </div>
//             <div className="mt-4 text-center">
//               <h3 className="text-lg font-semibold text-gray-800">
//                 {item.title || "Untitled"}
//               </h3>
//               <p className="text-sm text-gray-500 text-justify">
//                 {item.description || "No description available"}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {items.length > 0 && renderPagination()}

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






// "use client";

// import { useEffect, useState, useRef } from "react";
// import dynamic from "next/dynamic";
// import Image from "next/image";
// import Loading from "@/components/loading/loading";
// import Pagination from "./Pagination"; // Import the Pagination component

// const ImageModal = dynamic(() => import("./ImageModal"), { ssr: false }); // Lazy-loaded

// export default function PortfolioGrid({ countryId, countryButtons }) {
//   const [items, setItems] = useState([]); // All items from the API
//   const [currentIndex, setCurrentIndex] = useState(null); // Modal state
//   const [loading, setLoading] = useState(false);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     lastPage: 1,
//     totalItems: 0,
//     itemsPerPage: 3, // Default items per page
//   });
//   const imageRefs = useRef([]);

//   useEffect(() => {
//     const fetchItems = async () => {
//       setLoading(true);
//       try {
//         const endpoint = countryId
//           ? `http://127.0.0.1:8000/api/galleries/${countryId}`
//           : `http://127.0.0.1:8000/api/galleries`;

//         const response = await fetch(endpoint, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ page: pagination.currentPage, per_page: pagination.itemsPerPage }),
//         });

//         const data = await response.json();
//         console.log("portfolio data", data);
//         const galleryItems = Array.isArray(data?.data?.data)
//           ? data.data.data
//           : [];

//         setItems(galleryItems);
//         console.log("gallery data", galleryItems);
//         setPagination((prev) => ({
//           ...prev,
//           currentPage: data?.data?.current_page || 1,
//           lastPage: data?.data?.last_page || 1,
//           totalItems: data?.data?.total || 0,
//         }));
//       } catch (error) {
//         console.error("Error fetching gallery data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, [countryId, pagination.currentPage, pagination.itemsPerPage]);

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= pagination.lastPage) {
//       setPagination((prev) => ({ ...prev, currentPage: newPage }));
//     }
//   };

//   const handleItemsPerPageChange = (e) => {
//     const newItemsPerPage = parseInt(e.target.value, 10);
//     setPagination((prev) => ({
//       ...prev,
//       itemsPerPage: newItemsPerPage,
//       currentPage: 1, // Reset to the first page
//     }));
//   };

//   const handleImageClick = (index) => {
//     setCurrentIndex(index);
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <div className="relative">
//       <div className="flex justify-between mb-4 space-x-2">
//         <div className="flex space-x-2">{countryButtons}</div>
//         <div className="flex items-center space-x-2">
//           <label htmlFor="itemsPerPage" className="text-sm font-semibold text-gray-700">Items per page:</label>
//           <select
//             id="itemsPerPage"
//             value={pagination.itemsPerPage}
//             onChange={handleItemsPerPageChange}
//             className="p-1 border border-gray-300 rounded-md transition-all duration-300 ease-in-out focus:border-gray-800 animate-fade-in"
//           >
//             <option value={3}>3</option>
//             <option value={6}>6</option>
//             <option value={9}>9</option>
//             <option value={12}>12</option>
//           </select>
//         </div>
//       </div>

//       {!loading && items.length === 0 && (
//         <div className="text-center text-gray-500">No images found.</div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {items.map((item, index) => (
//           <div
//             key={item.id}
//             ref={(el) => (imageRefs.current[index] = el)}
//             className="cursor-pointer transform transition-transform duration-500 hover:scale-105 animate-fadeIn"
//             onClick={() => handleImageClick(index)}
//           >
//             <div className="relative h-[300px] w-full overflow-hidden rounded-md">
//               <Image
//                 src={`http://127.0.0.1:8000/storage/${item?.image_path}`}
//                 alt={item.title || "Gallery Image"}
//                 layout="fill"
//                 className="object-cover"
//                 loading="lazy"
//               />
//             </div>
//             <div className="mt-4 text-center">
//               <h3 className="text-lg font-semibold text-gray-800">
//                 {item.title || "Untitled"}
//               </h3>
//               <p className="text-sm text-gray-500 text-justify">
//                 {item.description || "No description available"}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {items.length > 0 && (
//         <Pagination
//           currentPage={pagination.currentPage}
//           lastPage={pagination.lastPage}
//           onPageChange={handlePageChange}
//         />
//       )}

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
import dynamic from "next/dynamic";
import Image from "next/image";
import Loading from "@/components/loading/loading";
import Pagination from "./Pagination"; // Import the Pagination component

const ImageModal = dynamic(() => import("./ImageModal"), { ssr: false }); // Lazy-loaded

export default function PortfolioGrid({ countryId, countryButtons }) {
  const [items, setItems] = useState([]); // All items from the API
  const [currentIndex, setCurrentIndex] = useState(null); // Modal state
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    totalItems: 0,
    itemsPerPage: 3, // Default items per page
  });
  const imageRefs = useRef([]);

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
          body: JSON.stringify({ page: pagination.currentPage, per_page: pagination.itemsPerPage }),
        });

        const data = await response.json();
        console.log("portfolio data", data);
        const galleryItems = Array.isArray(data?.data?.data)
          ? data.data.data
          : [];

        setItems(galleryItems);
        console.log("gallery data", galleryItems);
        setPagination((prev) => ({
          ...prev,
          currentPage: data?.data?.current_page || 1,
          lastPage: data?.data?.last_page || 1,
          totalItems: data?.data?.total || 0,
        }));
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
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
    return <Loading />;
  }

  return (
    <div className="relative">
      <div className="flex justify-between mb-4 space-x-2">
        <div className="flex space-x-2">{countryButtons}</div>
      </div>

      {!loading && items.length === 0 && (
        <div className="text-center text-gray-500">Mr Photos......</div>
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