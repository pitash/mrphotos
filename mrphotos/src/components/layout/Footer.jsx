import { Facebook, Instagram, Twitter, Linkedin, Dribbble } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 w-full px-5 md:px-20 py-7 z-10">
      <div className="footer_inner flex items-center justify-between">
        <div className="copyright text-xs text-primary opacity-80">
          ©Paragon Group 2024. All rights reserved
        </div>
        
        <div className="social-icon">
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="https://facebook.com" className="text-primary hover:text-primary/80 transition-colors">
                <Facebook size={16} />
              </Link>
            </li>
            <li>
              <Link href="https://instagram.com" className="text-primary hover:text-primary/80 transition-colors">
                <Instagram size={16} />
              </Link>
            </li>
            <li>
              <Link href="https://twitter.com" className="text-primary hover:text-primary/80 transition-colors">
                <Twitter size={16} />
              </Link>
            </li>
            <li>
              <Link href="https://linkedin.com" className="text-primary hover:text-primary/80 transition-colors">
                <Linkedin size={16} />
              </Link>
            </li>
            <li>
              <Link href="https://dribbble.com" className="text-primary hover:text-primary/80 transition-colors">
                <Dribbble size={16} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}