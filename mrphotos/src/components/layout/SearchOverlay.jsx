"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

// Utility to debounce the search input
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState({});

  // Debounce query for optimized search
  const debouncedQuery = useDebounce(query, 300); // Reduced debounce delay to 300ms

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim() || debouncedQuery.length < 3) {
        setResults([]);
        setError("Please enter at least 3 characters.");
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
          body: JSON.stringify({ query: debouncedQuery }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("search data", data);
        setResults(data.galleries || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError(`Error fetching search results: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const toggleDescription = (index) => {
    setShowFullDescription((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const truncateDescription = (description, index) => {
    const words = description.split(" ");
    if (words.length > 100) {
      return (
        <>
          {showFullDescription[index]
            ? description
            : words.slice(0, 100).join(" ") + "... "}
          <button
            onClick={() => toggleDescription(index)}
            className="text-blue-500"
          >
            {showFullDescription[index] ? "Read less" : "Read more"}
          </button>
        </>
      );
    }
    return description;
  };

  const handleItemClick = () => {
    setResults([]); // Clear the search results when an item is clicked
    setQuery(""); // Clear the search field when an item is clicked
    onClose(); // Close the overlay
  };

  return (
    <div
      className={`fixed inset-0 bg-black z-50 transition-all duration-500 ${
        isOpen ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-[70px] h-[70px] bg-[#1e3a8a] text-white text-4xl flex items-center justify-center cursor-pointer hover:bg-[#1e4599] transition-colors"
      >
        ×
      </button>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] min-w-[50px]">
        <form className="relative border-b border-[#1e3a8a]">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLoading(true); // Show loading indicator immediately
            }}
            placeholder="Start Typing..."
            className="w-full h-[60px] bg-transparent text-white text-4xl outline-none font-[Josefin Sans] placeholder:text-white/50"
          />
          <button
            type="button"
            className="absolute right-0 top-[30px] text-2xl text-white hover:text-[#1e3a8a] transition-colors"
          >
            <Search size={24} />
          </button>
        </form>
        {loading && <p className="text-white mt-3">Loading...</p>}
        {error && <p className="text-red-500 mt-3">{error}</p>}
        <div className="mt-5 max-h-[300px] space-y-5 overflow-y-auto scrollbar-thin scrollbar-thumb-[#1e3a8a] scrollbar-track-[#1e3a8a]/30">
          {results.length > 0 ? (
            <ul className="text-white">
              {results.map((item, index) => (
                <li key={index} className="mb-2">
                  <Link href={`/search/${item.id}`}>
                    <div onClick={handleItemClick} className="flex gap-y-24 p-4 cursor-pointer">
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.title || "Gallery Image"}
                          className="w-16 h-16 object-cover rounded-md mr-3"
                        />
                      )}
                      <div className="flex flex-col">
                        <div>
                          <strong>{item.title || "Untitled"}</strong>
                        </div>
                        <div className="text-justify">
                          {truncateDescription(item.description || "No description", index)}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p className="text-white">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}