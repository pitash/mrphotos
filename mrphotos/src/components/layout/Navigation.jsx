import Link from 'next/link'
import { usePathname } from 'next/navigation' // Add this import
import { useState } from 'react'

export default function Navigation({ isMobile = false, onItemClick }) {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState(null)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Gallery', href: '/portfolio' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { 
      label: 'Blog', 
      href: '/blog',
      subItems: [
        { label: 'Blog', href: '/blog' },
        { label: 'Blog Single', href: '/blog/example-post' }
      ]
    }
  ]

  const handleItemClick = (item, index) => {
    if (item.subItems && isMobile) {
      setOpenSubmenu(openSubmenu === index ? null : index)
    } else {
      onItemClick?.()
    }
  }

  return (
    <nav className={isMobile ? '' : 'relative'}>
      <ul className={
        isMobile 
          ? 'space-y-6 text-center' 
          : 'flex items-center space-x-8'
      }>
        {navItems.map((item, idx) => (
          <li key={idx} className={`relative group ${isMobile ? '' : 'hover:text-[#1e3a8a]'}`}>
            <div className="flex flex-col items-center">
              <Link 
                href={item.subItems ? '#' : item.href}
                onClick={() => handleItemClick(item, idx)}
                className={`
                  ${isMobile 
                    ? 'text-white text-xl' 
                    : 'text-sm text-gray-800'
                  }
                  uppercase tracking-wide hover:text-[#1e3a8a] transition-colors relative
                  ${item.subItems ? '' : ''}
                  ${!isMobile && `
                    after:content-[''] after:absolute after:left-0 after:bottom-0 
                    after:w-0 after:h-0.5 after:bg-[#1e3a8a]
                    after:transition-all after:duration-300
                    ${pathname === item.href ? 'after:w-full' : 'after:w-0'}
                    group-hover:after:w-full
                  `}
                `}
              >
                {item.label}
              </Link>
              
              {item.subItems && (
                <ul className={`
                  ${isMobile 
                    ? `mt-4 space-y-4 overflow-hidden transition-all duration-300
                       ${openSubmenu === idx 
                         ? 'max-h-40 opacity-100' 
                         : 'max-h-0 opacity-0'
                       }` 
                    : 'absolute left-0 mt-6 w-60 bg-[#282828] py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'
                  }
                `}>
                  {item.subItems.map((subItem, subIdx) => (
                    <li key={subIdx} 
                        className={`
                          ${isMobile 
                            ? 'my-2' 
                            : 'px-6 py-2'
                          }
                          ${isMobile && openSubmenu !== idx && 'hidden'}
                        `}
                    >
                      <Link
                        href={subItem.href}
                        className={`
                          ${isMobile 
                            ? 'text-white/80 text-base' 
                            : 'text-white text-sm'
                          }
                          hover:text-[#1e3a8a] transition-colors block
                        `}
                        onClick={onItemClick}
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  )
}