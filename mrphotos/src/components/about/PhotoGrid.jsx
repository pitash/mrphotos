// components/about/PhotoGrid.jsx
import Image from 'next/image'

export default function PhotoGrid() {
  const photos = [
    {
      src: "/images/portfolio/details/1.jpg",
      alt: "Mountain lake reflection"
    },
    {
      src: "/images/portfolio/details/2.jpg",
      alt: "Deer in forest"
    },
    {
      src: "/images/portfolio/details/3.jpg",
      alt: "Hiker on mountain"
    },
    {
      src: "/images/portfolio/details/4.jpg",
      alt: "Desert landscape"
    },
    {
      src: "/images/portfolio/details/5.jpg",
      alt: "Deer at night"
    },
    {
      src: "/images/portfolio/details/6.jpg",
      alt: "Mountain sunset"
    },
    {
      src: "/images/portfolio/details/7.jpg",
      alt: "Deer in woods"
    },
    {
      src: "/images/portfolio/BANGLADESH/1.jpg",
      alt: "Black church"
    },
    {
      src: "/images/portfolio/BANGLADESH/2.jpg",
      alt: "River landscape"
    },
    {
        src: "/images/portfolio/BANGLADESH/3.jpg",
        alt: "Waterfall"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">
      {photos.map((photo, index) => (
        <div 
          key={index}
          className="group relative aspect-square overflow-hidden bg-black"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-80"
          />
        </div>
      ))}
    </div>
  );
}