// hooks/useHeader.js (not in the pages directory)

'use client'

import { useState } from 'react'

export function useHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return {
    isSearchOpen,
    isMobileMenuOpen,
    toggleSearch,
    toggleMobileMenu
  }
}