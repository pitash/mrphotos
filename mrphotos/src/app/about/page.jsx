import AboutInfo from '@/components/about/AboutInfo'
import PhotoGrid from '@/components/about/PhotoGrid'

// app/about/page.jsx
export default function About() {
    return (
      <div className="relative min-h-screen px-5 md:px-20 pb-24 bg-gray-100">
        {/* Side text */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
          <span className="block -rotate-90 text-sm font-semibold uppercase tracking-wider text-primary">
            About Me
          </span>
        </div>
  
        {/* Main content */}
        <div className="pt-32">
            <AboutInfo />
            <PhotoGrid />
        </div>

      </div>
    )
  }