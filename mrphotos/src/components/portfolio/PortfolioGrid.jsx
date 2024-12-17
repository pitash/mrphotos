
// "use client";

// import { useEffect, useState, useRef } from "react";
// import Image from "next/image";
// import {
//   ChevronLeft,
//   ChevronRight,
//   X,
//   Pause,
//   Play,
//   Search,
//   ExternalLink,
//   Loader, // Import the Loader icon from lucide-react
// } from "lucide-react";

// export default function PortfolioGrid() {
//   const [items, setItems] = useState([]); // Gallery items
//   const [filteredItems, setFilteredItems] = useState([]); // Filtered items
//   const [currentIndex, setCurrentIndex] = useState(null); // Modal state
//   const [isPaused, setIsPaused] = useState(true);
//   const [slideshowInterval, setSlideshowInterval] = useState(null);
//   const [showSearch, setShowSearch] = useState(false); // Search toggle
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true); // Loading state
//   const imageRefs = useRef([]); // Intersection Observer Ref

//   // Fetch data from API
//   useEffect(() => {
//     const fetchGalleries = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/galleries");
//         if (!response.ok) throw new Error("Failed to fetch galleries");
//         const data = await response.json();
//         setItems(data.data);
//         setFilteredItems(data.data);
//         setLoading(false); // Set loading to false once data is fetched
//       } catch (error) {
//         console.error("Error fetching gallery data:", error);
//         setLoading(false); // Set loading to false if there's an error
//       }
//     };
//     fetchGalleries();
//   }, []);

//   // Intersection Observer for fade-in animation
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) entry.target.classList.add("fade-in");
//         });
//       },
//       { threshold: 0.2 }
//     );

//     imageRefs.current.forEach((el) => el && observer.observe(el));

//     return () => {
//       imageRefs.current.forEach((el) => el && observer.unobserve(el));
//     };
//   }, [filteredItems]);

//   // Slideshow controls
//   const startSlideshow = () => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
//     }, 2000);
//     setSlideshowInterval(interval);
//     setIsPaused(false);
//   };

//   const stopSlideshow = () => {
//     if (slideshowInterval) clearInterval(slideshowInterval);
//     setIsPaused(true);
//   };

//   const toggleSlideshow = () => {
//     if (isPaused) startSlideshow();
//     else stopSlideshow();
//   };

//   const openModal = (index) => {
//     setCurrentIndex(index);
//     stopSlideshow();
//   };

//   const closeModal = () => {
//     setCurrentIndex(null);
//     stopSlideshow();
//   };

//   const nextImage = () =>
//     setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
//   const prevImage = () =>
//     setCurrentIndex(
//       (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
//     );

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     const filtered = items.filter((item) =>
//       item.title.toLowerCase().includes(e.target.value.toLowerCase())
//     );
//     setFilteredItems(filtered);
//   };

//   // Pagination (load more items)
//   const loadMoreItems = () => {
//     const nextIndex = displayedItems.length;
//     const newItems = items.slice(nextIndex, nextIndex + 3);
//     setDisplayedItems([...displayedItems, ...newItems]);
//   };

//   return (
//     <div>
//       {/* Loading Spinner */}
//       {loading && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <Loader
//             className="animate-spin w-10 h-10 text-gray-300" // Add spinning animation
//           />
//         </div>
//       )}

//       {/* Gallery Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {filteredItems.map((item, index) => (
//           <div
//             key={item.id} // Ensure you are using a unique identifier (e.g., item.id) as the key
//             ref={(el) => (imageRefs.current[index] = el)} // Intersection Observer Ref
//             className="opacity-0 transform translate-y-10 transition-all duration-1000 group cursor-pointer"
//             onClick={() => openModal(index)}
//           >
//             {/* Image */}
//             <div className="relative h-[300px] w-full overflow-hidden rounded-md">
//               <Image
//                 src={`http://127.0.0.1:8000/${item?.image_path}`}
//                 alt={item.title || "Gallery Image"}
//                 layout="fill"
//                 className="object-cover transition-transform duration-500 group-hover:scale-105"
//               />
//             </div>
//             {/* Title and Description */}
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

//       {/* Modal with Slideshow */}
//       {currentIndex !== null && filteredItems[currentIndex]?.image_path && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           {/* Modal Content */}
//           <div className="relative">
//             <button
//               className="absolute top-1/2 left-[-30px] sm:left-[-50px] transform -translate-y-1/2 text-white p-2 text-lg sm:text-xl lg:text-sm"
//               onClick={prevImage}
//             >
//               <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 lg:w-6 lg:h-6" />
//             </button>

//             <Image
//               src={`http://127.0.0.1:8000/${filteredItems[currentIndex]?.image_path}`}
//               alt={filteredItems[currentIndex]?.title || "Image"}
//               width={600}
//               height={100}
//               className="object-contain rounded-sm sm:w-[80vw] sm:h-[60vh] lg:w-[70vw] lg:h-[60vh] w-[90vw] h-[50vh]"
//             />

//             <button
//               className="absolute top-1/2 right-[-30px] sm:right-[-50px] transform -translate-y-1/2 text-white p-2 text-lg sm:text-xl lg:text-sm"
//               onClick={nextImage}
//             >
//               <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 lg:w-6 lg:h-6" />
//             </button>
//           </div>

//           {/* Controls */}
//           <div className="absolute top-4 right-4 flex space-x-4 text-white">
//             <button onClick={() => setShowSearch(!showSearch)}>
//               <Search className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" />
//             </button>
//             <button onClick={toggleSlideshow}>
//               {isPaused ? (
//                 <Play className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" />
//               ) : (
//                 <Pause className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" />
//               )}
//             </button>
//             <button onClick={() => window.open("https://flickr.com", "_blank")}>
//               <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" />
//             </button>
//             <button onClick={closeModal}>
//               <X className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Search Modal */}
//       {showSearch && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="relative bg-white p-4 rounded-lg">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={handleSearch}
//               placeholder="Search for photos..."
//               className="w-60 p-2 border border-gray-300 rounded-md"
//             />
//             <button
//               className="absolute top-1 right-2 text-gray-600"
//               onClick={() => setShowSearch(false)}
//             >
//               <X />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






// components/portfolio/PortfolioGrid.jsx
// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { Loader } from "lucide-react";

// export default function PortfolioGrid({ countryId }) {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch data based on selected country
//   useEffect(() => {
//     const fetchItems = async () => {
//       setLoading(true);
//       try {
//         const endpoint = countryId
//           ? `http://127.0.0.1:8000/api/galleries/${countryId}`
//           : "http://127.0.0.1:8000/api/galleries";

//         const response = await fetch(endpoint);
//         const data = await response.json();

//         if (Array.isArray(data.data)) {
//           setItems(data.data);
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
//       {loading ? (
//         <div className="flex items-center justify-center h-64">
//           <Loader className="animate-spin w-10 h-10 text-gray-300" />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {items.map((item) => (
//             <div key={item.id} className="group">
//               {/* Image */}
//               <div className="relative h-[300px] w-full overflow-hidden rounded-md">
//                 <Image
//                   src={`http://127.0.0.1:8000/${item.image_path}`}
//                   alt={item.title || "Gallery Image"}
//                   layout="fill"
//                   className="object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//               </div>
//               {/* Title */}
//               <div className="mt-4 text-center">
//                 <h3 className="text-lg font-semibold">{item.title || "Untitled"}</h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }






// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { Loader, ChevronLeft, ChevronRight, X } from "lucide-react";

// export default function PortfolioGrid({ countryId }) {
//   const [items, setItems] = useState([]); // Holds fetched gallery items
//   const [loading, setLoading] = useState(true); // Loading state
//   const [currentIndex, setCurrentIndex] = useState(null); // Tracks modal index

//   // Fetch gallery data based on countryId
//   useEffect(() => {
//     const fetchItems = async () => {
//       setLoading(true);
//       try {
//         const endpoint = countryId
//           ? `http://127.0.0.1:8000/api/galleries/${countryId}`
//           : "http://127.0.0.1:8000/api/galleries";

//         const response = await fetch(endpoint);
//         const data = await response.json();

//         if (Array.isArray(data.data)) {
//           setItems(data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching gallery data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, [countryId]);

//   // Modal functions
//   const openModal = (index) => {
//     setCurrentIndex(index);
//   };

//   const closeModal = () => {
//     setCurrentIndex(null);
//   };

//   const nextImage = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
//   };

//   const prevImage = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? items.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div>
//       {/* Loading Spinner */}
//       {loading ? (
//         <div className="flex items-center justify-center h-64">
//           <Loader className="animate-spin w-10 h-10 text-gray-300" />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {items.map((item, index) => (
//             <div
//               key={item.id}
//               className="group cursor-pointer"
//               onClick={() => openModal(index)}
//             >
//               {/* Image */}
//               <div className="relative h-[300px] w-full overflow-hidden rounded-md">
//                 <Image
//                   src={`http://127.0.0.1:8000/${item.image_path}`}
//                   alt={item.title || "Gallery Image"}
//                   layout="fill"
//                   className="object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//               </div>
//               {/* Title */}
//               <div className="mt-4 text-center">
//                 <h3 className="text-lg font-semibold">{item.title || "Untitled"}</h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       {currentIndex !== null && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//           {/* Close Button */}
//           <button
//             onClick={closeModal}
//             className="absolute top-5 right-5 text-white text-3xl"
//           >
//             <X className="w-8 h-8" />
//           </button>

//           {/* Previous Button */}
//           <button
//             onClick={prevImage}
//             className="absolute left-10 text-white text-3xl"
//           >
//             <ChevronLeft className="w-10 h-10" />
//           </button>

//           {/* Image Display */}
//           <div className="relative w-[80vw] h-[70vh]">
//             <Image
//               src={`http://127.0.0.1:8000/${items[currentIndex]?.image_path}`}
//               alt={items[currentIndex]?.title || "Image"}
//               layout="fill"
//               className="object-contain rounded-md"
//             />
//           </div>

//           {/* Next Button */}
//           <button
//             onClick={nextImage}
//             className="absolute right-10 text-white text-3xl"
//           >
//             <ChevronRight className="w-10 h-10" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }




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
  Loader, // Import the Loader icon from lucide-react
} from "lucide-react";

export default function PortfolioGrid({ countryId }) {
  const [items, setItems] = useState([]); // Gallery items
  const [filteredItems, setFilteredItems] = useState([]); // Filtered items
  const [currentIndex, setCurrentIndex] = useState(null); // Modal state
  const [isPaused, setIsPaused] = useState(true);
  const [slideshowInterval, setSlideshowInterval] = useState(null);
  const [showSearch, setShowSearch] = useState(false); // Search toggle
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const imageRefs = useRef([]); // Intersection Observer Ref

  // Fetch data from API
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const endpoint = countryId
          ? `http://127.0.0.1:8000/api/galleries/${countryId}`
          : "http://127.0.0.1:8000/api/galleries";

        const response = await fetch(endpoint);
        const data = await response.json();

        if (Array.isArray(data.data)) {
          setItems(data.data);
          setFilteredItems(data.data);
        }
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [countryId]);

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
      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Loader
            className="animate-spin w-10 h-10 text-gray-300" // Add spinning animation
          />
        </div>
      )}

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
              {isPaused ? (
                <Play className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" />
              ) : (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5" />
              )}
            </button>
            <button onClick={() => window.open("https://flickr.com", "_blank")}>
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

