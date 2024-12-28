// // // app/portfolio/page.jsx
// // "use client";

// import SearchOverlay from "@/components/layout/SearchOverlay";


// // import SearchResult from "@/components/layout/SearchResult";
// // import CategoryFilter from "@/components/portfolio/CategoryFilter";
// // import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
// // import { useState } from "react";

// // export default function Portfolio() {
// //   const [activeCategory, setActiveCategory] = useState("ALL WORKS");

// //   return (
// //     <div className="relative min-h-screen px-5 pb-48 md:pb-32 md:px-20 pt-32 bg-gray-100">
// //       {/* Side text - similar to "Last Works" */}
// //       <div className="fixed left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
// //         <span className="block -rotate-90 text-sm font-semibold uppercase tracking-wider text-primary">
// //           Portfolio
// //         </span>
// //       </div>

// //       {/* Main Content */}
// //       <div className="space-y-12 pb-24 bg-white p-5 sm:pb-16">
// //         <SearchResult/>
// //       </div>
// //     </div>
// //   );
// // }


// export default function Result(){
//     return (
//         <SearchOverlay/>
//     );
// }


"use client";

import SearchOverlay from "@/components/layout/SearchOverlay";
import { useState } from "react";

export default function Portfolio() {
    const [isSearchOpen, setSearchOpen] = useState(false);

  return (
    <div className="relative min-h-screen px-5 pb-48 md:pb-32 md:px-20 pt-32 bg-gray-100">
      {/* Side text - similar to "Last Works" */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <span className="block -rotate-90 text-sm font-semibold uppercase tracking-wider text-primary">
          Searching Result
        </span>
      </div>

   {/* Main Content */}
   <div className="space-y-12 pb-24 bg-white p-5 sm:pb-16">
        <button
          onClick={() => setSearchOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Open Search
        </button>
      </div>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}