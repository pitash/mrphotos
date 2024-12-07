// app/layout.jsx
'use client'

import { useEffect, useState } from 'react'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function RootLayout({ children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <html lang="en">
      <body className={mounted ? 'light_mode' : ''}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}