
"use client";

import { Facebook, ExternalLink, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic"; // Importing next/dynamic for dynamic loading

// Dynamic import of the PhotoGrid component
const PhotoGrid = dynamic(() => Promise.resolve(ActualPhotoGrid), { ssr: false });

function ActualPhotoGrid() {
  const photos = [
    {
      src: "/images/about/1.webp",
      alt: "Mountain lake reflection",
      title: "Mountain Lake",
      subtitle: "Reflection in Nature",
      socialLinks: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        flickr: "https://flickr.com",
      },
    },
    {
      src: "/images/about/2.webp",
      alt: "Deer in forest",
      title: "Forest Deer",
      subtitle: "Calm in the Wild",
      socialLinks: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        flickr: "https://flickr.com",
      },
    },
    {
      src:"/images/about/3.webp",
      alt: "Hiker on mountain",
      title: "Mountain Hiker",
      subtitle: "Adventure Awaits",
      socialLinks: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        flickr: "https://flickr.com",
      },
    },
    {
      src: "/images/about/4.webp",
      alt: "Desert landscape",
      title: "Desert View",
      subtitle: "Golden Sands",
      socialLinks: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        flickr: "https://flickr.com",
      },
    },
    
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {photos.map((photo, index) => (
        <div
          key={index}
          className="group relative aspect-square overflow-hidden bg-black rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
        >
          <Image
            src={photo.src || "/images/default.jpg"}
            alt={photo.alt || "Photo"}
            fill
            loading="lazy"
            className="object-cover transition-opacity duration-500 group-hover:opacity-80"
          />
          <div className="absolute inset-x-0 bottom-0 h-full flex flex-col justify-center items-center bg-black bg-opacity-60 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 p-6 text-white">
            <h3 className="text-xl font-bold">{photo.title || "Untitled"}</h3>
            <p className="text-sm mt-2 mb-4">
              {photo.subtitle || "No description available"}
            </p>
            <div className="flex gap-3 mt-4">
              <Link href={photo.socialLinks.facebook} passHref aria-label="Facebook">
                <Facebook className="w-4 h-4 text-white hover:text-blue-600 transition-colors duration-300" />
              </Link>
              <Link href={photo.socialLinks.instagram} passHref aria-label="Instagram">
                <Instagram className="w-4 h-4 text-white hover:text-pink-500 transition-colors duration-300" />
              </Link>
              <Link href={photo.socialLinks.twitter} passHref aria-label="Twitter">
                <Twitter className="w-4 h-4 text-white hover:text-sky-500 transition-colors duration-300" />
              </Link>
              <Link href={photo.socialLinks.flickr} passHref aria-label="Flickr">
                <ExternalLink className="w-4 h-4 text-white hover:text-blue-400 transition-colors duration-300" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PhotoGrid;

