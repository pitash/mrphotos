// // components/portfolio/CategoryFilter.jsx
// "use client"

// import { useRef, useEffect, useState } from 'react'
// import { ChevronLeft, ChevronRight } from 'lucide-react'

// export default function CategoryFilter({ activeCategory, onCategoryChange }) {
//   const scrollRef = useRef(null)
//   const [showControls, setShowControls] = useState(false)
  
//   const categories = [
//     { name: 'ALL WORKS', count: 15 },
//     { name: 'BANGLADESH', count: 3 },
//     { name: 'NORWAY', count: 4 },
//     { name: 'GERMANY', count: 2 },
//     { name: 'ITALY', count: 6 }
//   ]

//   useEffect(() => {
//     const checkScroll = () => {
//       if (scrollRef.current) {
//         setShowControls(
//           scrollRef.current.scrollWidth > scrollRef.current.clientWidth
//         )
//       }
//     }

//     checkScroll()
//     window.addEventListener('resize', checkScroll)
//     return () => window.removeEventListener('resize', checkScroll)
//   }, [])

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const scrollAmount = 200
//       scrollRef.current.scrollBy({
//         left: direction === 'left' ? -scrollAmount : scrollAmount,
//         behavior: 'smooth'
//       })
//     }
//   }

//   return (
//     <div className="relative bg-white">
//       {/* Scroll Controls */}
//       {showControls && (
//         <>
//             <button 
//             onClick={() => scroll('left')}
//             className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow"
//             >
//             <ChevronLeft size={20} />
//             </button>
//             <button 
//             onClick={() => scroll('right')}
//             className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow"
//             >
//             <ChevronRight size={20} />
//             </button>
//         </>
//         )}

//         {/* Categories */}
//         <div 
//         ref={scrollRef}
//         className="flex items-center gap-8 overflow-x-auto no-scrollbar py-2"
//         >
//         {categories.map((category) => (
//             <button
//             key={category.name}
//             onClick={() => onCategoryChange(category.name)}
//             className={`whitespace-nowrap text-sm font-medium tracking-wider relative
//                 ${activeCategory === category.name 
//                 ? 'text-primary border-b-2 border-primary pb-2' 
//                 : 'text-gray-500 hover:text-primary transition-colors pb-2'
//                 }
//             `}
//             >
//             {category.name}
//             <span 
//                 className={`ml-1 text-xs text-gray-400 absolute -right-4 top-0
//                 transition-all duration-300 
//                 ${activeCategory === category.name 
//                     ? 'opacity-100 translate-x-0' 
//                     : 'opacity-0 -translate-x-2'
//                 }`}
//             >
//                 {category.count}
//             </span>
//             </button>
//         ))}
//         </div>
//     </div>
//   )
// }




"use client";

import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  const scrollRef = useRef(null);
  const [showControls, setShowControls] = useState(false);
  
  const categories = [
    { name: 'ALL WORKS', count: 15 },
    { name: 'BANGLADESH', count: 3 },
    { name: 'NORWAY', count: 4 },
    { name: 'GERMANY', count: 2 },
    { name: 'ITALY', count: 6 },
  ];

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        setShowControls(
          scrollRef.current.scrollWidth > scrollRef.current.clientWidth
        );
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative bg-white">
      {/* Scroll Controls */}
      {showControls && (
        <>
          <button
            onClick={() => scroll('left')}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Left Gradient */}
      {showControls && (
        <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      )}

      {/* Right Gradient */}
      {showControls && (
        <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      )}

      {/* Categories */}
      <div
        ref={scrollRef}
        className="flex items-center gap-8 overflow-x-auto no-scrollbar py-2"
      >
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={`whitespace-nowrap text-sm font-medium tracking-wider relative
                ${
                  activeCategory === category.name
                    ? 'text-primary border-b-2 border-primary pb-2'
                    : 'text-gray-500 hover:text-primary transition-colors pb-2'
                }
            `}
          >
            {category.name}
            <span
              className={`ml-1 text-xs text-gray-400 absolute -right-4 top-0
                transition-all duration-300 
                ${
                  activeCategory === category.name
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-2'
                }`}
            >
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
