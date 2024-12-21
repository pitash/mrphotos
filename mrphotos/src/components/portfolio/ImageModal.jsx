
// "use client";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight, X, Pause, Play, ExternalLink } from "lucide-react";

// export default function ImageModal({ items, currentIndex, onClose, onNavigate }) {
//   const [isPaused, setIsPaused] = useState(true);
//   const intervalRef = useRef(null); // Use a ref to store the interval ID
//   const currentIndexRef = useRef(currentIndex); // Keep track of current index for autoplay

//   useEffect(() => {
//     currentIndexRef.current = currentIndex; // Update the current index ref whenever it changes
//   }, [currentIndex]);

//   const startSlideshow = () => {
//     stopSlideshow(); // Clear any existing interval before starting a new one
//     intervalRef.current = setInterval(() => {
//       const nextIndex = (currentIndexRef.current + 1) % items.length;
//       onNavigate(nextIndex); // Navigate to the next image
//     }, 3000); // 3-second interval
//     setIsPaused(false);
//   };

//   const stopSlideshow = () => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     intervalRef.current = null;
//     setIsPaused(true);
//   };

//   const toggleSlideshow = () => {
//     if (isPaused) {
//       startSlideshow();
//     } else {
//       stopSlideshow();
//     }
//   };

//   useEffect(() => {
//     // Cleanup the interval on component unmount
//     return () => stopSlideshow();
//   }, []);

//   const prevImage = () =>
//     onNavigate((currentIndex - 1 + items.length) % items.length);
//   const nextImage = () =>
//     onNavigate((currentIndex + 1) % items.length);

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//       {/* Modal Content */}
//       <div className="relative w-full max-w-3xl px-4">
//         {/* Previous Button */}
//         <button
//           className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white p-2 bg-black/50 rounded-full hover:bg-black/70"
//           onClick={prevImage}
//         >
//           <ChevronLeft className="w-6 h-6" />
//         </button>

//         {/* Image */}
//         <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center">
//           <Image
//             src={`http://127.0.0.1:8000/${items[currentIndex]?.image_path}`}
//             alt={items[currentIndex]?.title || "Image"}
//             layout="fill"
//             objectFit="contain"
//             className="rounded-md"
//           />
//         </div>

//         {/* Next Button */}
//         <button
//           className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white p-2 bg-black/50 rounded-full hover:bg-black/70"
//           onClick={nextImage}
//         >
//           <ChevronRight className="w-6 h-6" />
//         </button>
//       </div>

//       {/* Controls */}
//       <div className="absolute top-4 right-4 flex space-x-4 text-white">
//         {/* Play/Pause Button */}
//         <button onClick={toggleSlideshow}>
//           {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
//         </button>

//         {/* External Link */}
//         <button onClick={() => window.open("https://flickr.com", "_blank")}>
//           <ExternalLink className="w-5 h-5" />
//         </button>

//         {/* Close Button */}
//         <button onClick={onClose}>
//           <X className="w-5 h-5" />
//         </button>
//       </div>
//     </div>
//   );
// }








"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Pause, Play, ExternalLink } from "lucide-react";

export default function ImageModal({ items, currentIndex, onClose, onNavigate }) {
  const [isPaused, setIsPaused] = useState(true);
  const intervalRef = useRef(null); // Use a ref to store the interval ID
  const currentIndexRef = useRef(currentIndex); // Keep track of current index for autoplay

  useEffect(() => {
    currentIndexRef.current = currentIndex; // Update the current index ref whenever it changes
  }, [currentIndex]);

  const startSlideshow = () => {
    stopSlideshow(); // Clear any existing interval before starting a new one
    intervalRef.current = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % items.length;
      onNavigate(nextIndex); // Navigate to the next image
    }, 3000); // 3-second interval
    setIsPaused(false);
  };

  const stopSlideshow = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsPaused(true);
  };

  const toggleSlideshow = () => {
    if (isPaused) {
      startSlideshow();
    } else {
      stopSlideshow();
    }
  };

  useEffect(() => {
    // Cleanup the interval on component unmount
    return () => stopSlideshow();
  }, []);

  const prevImage = () =>
    onNavigate((currentIndex - 1 + items.length) % items.length);
  const nextImage = () =>
    onNavigate((currentIndex + 1) % items.length);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="relative w-full max-w-3xl px-4">
        {/* Previous Button */}
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white p-2 bg-black/50 rounded-full hover:bg-black/70"
          onClick={prevImage}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Image */}
        <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center">
          <Image
            src={`http://127.0.0.1:8000/${items[currentIndex]?.image_path}`}
            alt={items[currentIndex]?.title || "Image"}
            layout="fill"
            objectFit="contain"
            className="rounded-md"
          />
        </div>

        {/* Next Button */}
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white p-2 bg-black/50 rounded-full hover:bg-black/70"
          onClick={nextImage}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 flex space-x-4 text-white">
        {/* Play/Pause Button */}
        <button onClick={toggleSlideshow}>
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>

        {/* External Link */}
        <button onClick={() => window.open("https://flickr.com", "_blank")}>
          <ExternalLink className="w-5 h-5" />
        </button>

        {/* Close Button */}
        <button onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}