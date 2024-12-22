// // components/layout/SearchOverlay.jsx
// export default function SearchOverlay({ isOpen, onClose }) {
//   return (
//     <div 
//       className={`
//         fixed inset-0 bg-black/95 z-50 transition-all duration-500
//         ${isOpen 
//           ? 'opacity-100 visible scale-100' 
//           : 'opacity-0 invisible scale-95'
//         }
//       `}
//     >
//       <button 
//         onClick={onClose}
//         className="absolute top-5 right-5 w-[70px] h-[70px] bg-[#1e3a8a] text-white text-4xl 
//                    flex items-center justify-center cursor-pointer hover:bg-[#1e4599] transition-colors"
//       >
//         ×
//       </button>
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] min-w-[50px]">
//         <div className="relative border-b border-[#1e3a8a]">
//           <input 
//             type="text"
//             placeholder="Start Typing..."
//             className="w-full h-[60px] bg-transparent text-white text-4xl outline-none 
//                      font-[Josefin Sans] placeholder:text-white/50"
//           />
//           <button 
//             type="submit" 
//             className="absolute right-0 top-[30px] text-2xl text-white hover:text-[#1e3a8a] transition-colors"
//           >
//             <i className="ion-ios-search"></i>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client";

import { useState } from "react";

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Please enter a search term.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch search results: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("search data", data);

      // Ensure the data is an array before setting the state
      if (Array.isArray(data.results)) {
        setResults(data.results);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`
        fixed inset-0 bg-black/95 z-50 transition-all duration-500
        ${isOpen 
          ? 'opacity-100 visible scale-100' 
          : 'opacity-0 invisible scale-95'
        }
      `}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-[70px] h-[70px] bg-[#1e3a8a] text-white text-4xl 
                   flex items-center justify-center cursor-pointer hover:bg-[#1e4599] transition-colors"
      >
        ×
      </button>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] min-w-[50px]">
        <form onSubmit={handleSearch} className="relative border-b border-[#1e3a8a]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Start Typing..."
            className="w-full h-[60px] bg-transparent text-white text-4xl outline-none 
                     font-[Josefin Sans] placeholder:text-white/50"
          />
          <button
            type="submit"
            className="absolute right-0 top-[30px] text-2xl text-white hover:text-[#1e3a8a] transition-colors"
          >
            <i className="ion-ios-search"></i>
          </button>
        </form>
        {loading && <p className="text-white mt-3">Loading...</p>}
        {error && <p className="text-red-500 mt-3">{error}</p>}
        <div className="mt-5">
          {results.length > 0 && (
            <ul className="text-white">
              {results.map((item, index) => (
                <li key={index} className="mb-2">
                  {item.title || item.name} - {item.country || item.country_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}