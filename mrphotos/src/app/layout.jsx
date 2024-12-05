// app/layout.jsx
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <div className="light_mode">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}