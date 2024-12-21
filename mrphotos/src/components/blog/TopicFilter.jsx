
////..Get Method---////
// "use client";

// import { useRef, useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// export default function TopicFilter({ activeFilter, onFilterChange }) {
//   const scrollRef = useRef(null);
//   const [showControls, setShowControls] = useState(false);
//   const [filters, setFilters] = useState([]); // Filter data

//   const [error, setError] = useState(null);

//   // Fetch filter data
//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/countries");
//         if (!response.ok) throw new Error("Failed to fetch filters");
//         const data = await response.json();
//         setFilters(data.data); // Adjust 'data.data' to match your API response
//       } catch (err) {
//         setError(err.message);
//       }
//     };
//     fetchFilters();
//   }, []);

//   useEffect(() => {
//     const checkScroll = () => {
//       if (scrollRef.current) {
//         setShowControls(
//           scrollRef.current.scrollWidth > scrollRef.current.clientWidth
//         );
//       }
//     };

//     checkScroll();
//     window.addEventListener("resize", checkScroll);
//     return () => window.removeEventListener("resize", checkScroll);
//   }, [filters]);

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const scrollAmount = 200;
//       scrollRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

 
//   if (error) return <div className="text-red-500 py-8">{error}</div>;

//   return (
//     <div className="relative bg-neutral-900 py-8 my-8">
//       {/* Scroll Controls */}
//       {showControls && (
//         <>
//           <button
//             onClick={() => scroll("left")}
//             className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-neutral-800/80 p-2 rounded-full shadow hover:bg-neutral-700/80 transition-colors"
//           >
//             <ChevronLeft size={20} className="text-white" />
//           </button>
//           <button
//             onClick={() => scroll("right")}
//             className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-neutral-800/80 p-2 rounded-full shadow hover:bg-neutral-700/80 transition-colors"
//           >
//             <ChevronRight size={20} className="text-white" />
//           </button>
//         </>
//       )}

//       {/* Filter Buttons */}
//       <div
//         ref={scrollRef}
//         className="flex items-center gap-8 overflow-x-auto no-scrollbar px-20"
//       >
//         {filters.map((filter) => (
//           <button
//             key={filter.id}
//             onClick={() => onFilterChange(filter.id)} // Update active filter
//             className={`whitespace-nowrap text-sm font-medium tracking-wider relative
//               ${
//                 activeFilter === filter.id
//                   ? "text-white border-b-2 border-white pb-2"
//                   : "text-neutral-400 hover:text-neutral-200 transition-colors pb-2"
//               }
//             `}
//           >
//             {filter.name}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }






////Post Method/////

"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TopicFilter({ activeFilter, onFilterChange }) {
  const scrollRef = useRef(null);
  const [showControls, setShowControls] = useState(false);
  const [filters, setFilters] = useState([]); // Filter data

  const [error, setError] = useState(null);

  // Fetch filter data
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/countries", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
        if (!response.ok) throw new Error("Failed to fetch filters");
        const data = await response.json();
        setFilters(data.data); // Adjust 'data.data' to match your API response
      } catch (err) {
        setError(err.message);
      }
    };
    fetchFilters();
  }, []);

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
  }, [filters]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (error) return <div className="text-red-500 py-8">{error}</div>;

  return (
    <div className="relative bg-neutral-900 py-8 my-8">
      {/* Scroll Controls */}
      {showControls && (
        <>
          <button
            onClick={() => scroll("left")}
            className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-neutral-800/80 p-2 rounded-full shadow hover:bg-neutral-700/80 transition-colors"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-neutral-800/80 p-2 rounded-full shadow hover:bg-neutral-700/80 transition-colors"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </>
      )}

      {/* Filter Buttons */}
      <div
        ref={scrollRef}
        className="flex items-center gap-8 overflow-x-auto no-scrollbar px-20"
      >
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)} // Update active filter
            className={`whitespace-nowrap text-sm font-medium tracking-wider relative
              ${
                activeFilter === filter.id
                  ? "text-white border-b-2 border-white pb-2"
                  : "text-neutral-400 hover:text-neutral-200 transition-colors pb-2"
              }
            `}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
}