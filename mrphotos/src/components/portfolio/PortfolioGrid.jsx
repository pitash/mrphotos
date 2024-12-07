// components/portfolio/PortfolioGrid.jsx
"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function PortfolioGrid({ category }) {
  const items = [
    {
      id: 1,
      image: "/images/portfolio/BANGLADESH/1.jpg",
      title: "HEARTBEATS OF HOPE",
      category: "NATURE & LIFE",
      location: "BANGLADESH"
    },
    {
      id: 2,
      image: "/images/portfolio/GERMANY/1.jpg",
      title: "GERMAN CLOCK TOWER",
      category: "NATURE & LIFE",
      location: "GERMANY"
    },
    {
      id: 3,
      image: "/images/portfolio/GERMANY/2.jpg",
      title: "STATELY SYMMETRY",
      category: "NATURE & LIFE",
      location: "GERMANY"
    },
    {
        id: 4,
        image: "/images/portfolio/GERMANY/2.jpg",
        title: "STATELY SYMMETRY",
        category: "NATURE & LIFE",
        location: "GERMANY"
      },
      {
        id: 5,
        image: "/images/portfolio/GERMANY/2.jpg",
        title: "STATELY SYMMETRY",
        category: "NATURE & LIFE",
        location: "GERMANY"
      },
    
  ]

  const [filteredItems, setFilteredItems] = useState(items)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    
    const timer = setTimeout(() => {
      if (category === 'ALL WORKS') {
        setFilteredItems(items)
      } else {
        setFilteredItems(items.filter(item => item.location === category))
      }
      setIsAnimating(false)
    }, 300) // Match this with animation duration

    return () => clearTimeout(timer)
  }, [category])

  return (
    <div className="grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16 md:mb-0">
      {filteredItems.map((item) => (
        <div 
          key={item.id} 
          className={`group relative overflow-hidden
            ${isAnimating ? 'grid-item-exit' : 'grid-item-enter'}`}
        >
          <div className="relative h-[300px] w-full transition-all duration-300">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          
          <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h3 className="text-xl font-semibold transition-transform duration-300">
                {item.title}
              </h3>
              <p className="mt-2 text-sm uppercase tracking-wider transition-transform duration-300">
                {item.category}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}