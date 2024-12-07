"use client";

import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const filters = [
  { key: 'all', label: 'All works', count: 15 },
  { key: 'fashion', label: 'Fashion', count: 4 },
  { key: 'lifestyle', label: 'Lifestyle', count: 3 },
  { key: 'travel', label: 'Travel', count: 5 },
  { key: 'gadgets', label: 'Gadgets', count: 2 },
  { key: 'trends', label: 'Trends', count: 1 }
];

export default function TopicFilter({ activeFilter, onFilterChange }) {
  const scrollRef = useRef(null);
  const [showControls, setShowControls] = useState(false);

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
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative bg-neutral-900 py-8">
      {/* Scroll Controls */}
      {showControls && (
        <>
          <button 
            onClick={() => scroll('left')}
            className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-neutral-800/80 p-2 rounded-full shadow hover:bg-neutral-700/80 transition-colors"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-neutral-800/80 p-2 rounded-full shadow hover:bg-neutral-700/80 transition-colors"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </>
      )}

      {/* Filters */}
      <div 
        ref={scrollRef}
        className="flex items-center gap-8 overflow-x-auto no-scrollbar px-20"
      >
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`whitespace-nowrap text-sm font-medium tracking-wider relative
              ${activeFilter === filter.key 
                ? 'text-white border-b-2 border-white pb-2' 
                : 'text-neutral-400 hover:text-neutral-200 transition-colors pb-2'
              }
            `}
          >
            {filter.label}
            <span 
              className={`ml-1 text-xs text-neutral-500 absolute -right-4 top-0
                transition-all duration-300 
                ${activeFilter === filter.key 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-2'
                }`}
            >
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}