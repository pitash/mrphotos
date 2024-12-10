// // components/about/PhotoGrid.jsx
// import Image from 'next/image'

// export default function PhotoGrid() {
//   const photos = [
//     {
//       src: "/images/portfolio/details/1.jpg",
//       alt: "Mountain lake reflection"
//     },
//     {
//       src: "/images/portfolio/details/2.jpg",
//       alt: "Deer in forest"
//     },
//     {
//       src: "/images/portfolio/details/3.jpg",
//       alt: "Hiker on mountain"
//     },
//     {
//       src: "/images/portfolio/details/4.jpg",
//       alt: "Desert landscape"
//     },
//     {
//       src: "/images/portfolio/details/5.jpg",
//       alt: "Deer at night"
//     },
//     {
//       src: "/images/portfolio/details/4.jpg",
//       alt: "Mountain sunset"
//     },
//     {
//       src: "/images/portfolio/details/7.jpg",
//       alt: "Deer in woods"
//     },
//     {
//       src: "/images/portfolio/BANGLADESH/1.jpg",
//       alt: "Black church"
//     },
//     {
//       src: "/images/portfolio/BANGLADESH/2.jpg",
//       alt: "River landscape"
//     },
//     {
//         src: "/images/portfolio/BANGLADESH/3.jpg",
//         alt: "Waterfall"
//     }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">
//       {photos.map((photo, index) => (
//         <div
//           key={index}
//           className="group relative aspect-square overflow-hidden bg-black"
//         >
//           <Image
//             src={photo.src}
//             alt={photo.alt}
//             fill
//             className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-80"
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// components/about/PhotoGrid.jsx
import { Facebook, ExternalLink, Instagram, Twitter } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link"; 

export default function PhotoGrid() {
  const photos = [
    {
      src: "/images/portfolio/details/1.jpg",
      alt: "Mountain lake reflection",
      title: "Mountain Lake",
      subtitle: "Reflection in Nature",
      socialLinks: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        flickr: "https://flickr.com", // Flickr URL
      },
    },
    {
      src: "/images/portfolio/details/2.jpg",
      alt: "Deer in forest",
      title: "Forest Deer",
      subtitle: "Calm in the Wild",
      socialLinks: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        flickr: "https://flickr.com", // Flickr URL
      },
    },
    {
      src: "/images/portfolio/details/3.jpg",
      alt: "Hiker on mountain",
      title: "Mountain Hiker",
      subtitle: "Adventure Awaits",
      socialLinks: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        flickr: "https://flickr.com", // Flickr URL
      },
    },
    {
      src: "/images/portfolio/details/4.jpg",
      alt: "Desert landscape",
      title: "Desert View",
      subtitle: "Golden Sands",
      socialLinks: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        flickr: "https://flickr.com", // Flickr URL
      },
    },
    {
      src: "/images/portfolio/details/5.jpg",
      alt: "Deer at night",
      title: "Night Deer",
      subtitle: "Serenity Under the Stars",
      socialLinks: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        flickr: "https://flickr.com", // Flickr URL
      },
    },
    {
      src: "/images/portfolio/details/6.jpg",
      alt: "Mountain sunset",
      title: "Sunset Glow",
      subtitle: "Beauty of Dusk",
      socialLinks: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        flickr: "https://flickr.com", // Flickr URL
      },
    },
    {
      src: "/images/portfolio/details/7.jpg",
      alt: "Deer in woods",
      title: "Woods Deer",
      subtitle: "Hidden in Nature",
      socialLinks: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        flickr: "https://flickr.com", // Flickr URL
      },
    },
    {
      src: "/images/portfolio/BANGLADESH/1.jpg",
      alt: "Black church",
      title: "Black Church",
      subtitle: "Timeless Heritage",
      socialLinks: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        flickr: "https://flickr.com", // Flickr URL
      },
    },
    {
      src: "/images/portfolio/BANGLADESH/2.jpg",
      alt: "River landscape",
      title: "River Calm",
      subtitle: "Flow of Serenity",
      socialLinks: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        flickr: "https://flickr.com", // Flickr URL
      },
    },
    {
      src: "/images/portfolio/BANGLADESH/3.jpg",
      alt: "Waterfall",
      title: "Waterfall Bliss",
      subtitle: "Nature's Power",
      socialLinks: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        flickr: "https://flickr.com", // Flickr URL
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
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover transition-opacity duration-500 group-hover:opacity-80"
          />
          <div className="absolute inset-x-0 bottom-0 h-full flex flex-col justify-center items-center bg-black bg-opacity-60 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 p-6 text-white">
            <h3 className="text-xl font-bold">{photo.title}</h3>
            <p className="text-sm mt-2 mb-4">{photo.subtitle}</p>
            <div className="flex gap-3 mt-4">
              <Link href={photo.socialLinks.facebook} passHref>
                <Facebook className="w-4 h-4 text-white hover:text-blue-600 transition-colors duration-300" />
              </Link>
              <Link href={photo.socialLinks.instagram} passHref>
                <Instagram className="w-4 h-4 text-white hover:text-pink-500 transition-colors duration-300" />
              </Link>
              <Link href={photo.socialLinks.twitter} passHref>
                <Twitter className="w-4 h-4 text-white hover:text-sky-500 transition-colors duration-300" />
              </Link>
              <Link href={photo.socialLinks.flickr} passHref>
                <ExternalLink className="w-4 h-4 text-white hover:text-blue-400 transition-colors duration-300" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
