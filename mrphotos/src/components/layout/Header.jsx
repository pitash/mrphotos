// components/layout/Header.jsx
"use client"

import Link from 'next/link'
import Navigation from './Navigation'
import SearchOverlay from './SearchOverlay'
import { useState } from 'react'
import { Search, Menu } from 'lucide-react'

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="absolute w-full left-0 top-0 z-50 px-4 sm:px-8 md:px-12 lg:px-20 py-7">
        <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="min-w-[130px]">
            <img src="/images/logo.png" alt="MR Photography" className="w-auto h-12" /> {/* Increased height */}
        </Link>

        {/* Navigation */}
        <div className="hidden md:block">
          <Navigation />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-6">
        <button 
            onClick={() => setIsSearchOpen(true)} 
            className="text-gray-700 hover:text-[#1e3a8a] transition-colors"
            >
            <Search size={20} className="text-[#1e3a8a]" />
        </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-[#c19b76] transition-colors md:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu */}
      <div 
      className={`
        fixed inset-0 bg-black/95 z-50 md:hidden transition-all duration-500
        ${isMobileMenuOpen 
          ? 'opacity-100 visible translate-x-0' 
          : 'opacity-0 invisible translate-x-full'
        }
      `}
    >
      <button 
        onClick={() => setIsMobileMenuOpen(false)}
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-white text-4xl hover:text-[#1e3a8a] transition-colors"
      >
        ×
      </button>
      <div className="flex items-center justify-center h-full">
        <Navigation isMobile={true} onItemClick={() => setIsMobileMenuOpen(false)} />
      </div>
    </div>
  </header>
  )
}