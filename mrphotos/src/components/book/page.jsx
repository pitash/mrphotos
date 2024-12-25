
// "use client";

// import React from "react";
// import Link from "next/link"; // Import Link from next/link
// import Image from "next/image";
// const BookPage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 flex flex-col items-center py-12 px-6">
//       {/* Main Book Section */}
//       <div className="max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 animate-fadeIn">
//         {/* Cover Section */}
//         <div className="h-80 bg-cover bg-center" style={{ backgroundImage: "url('/book-cover.jpg')" }}>
//           {/* Overlay */}
//           <div className="h-full w-full bg-black bg-opacity-50 flex items-center justify-center">
//             <h1 className="text-5xl font-bold text-white drop-shadow-lg text-center animate-fadeInDown">
//               "The World of Imagination"
//             </h1>
//           </div>
//         </div>

//         {/* Content Section */}
//         <div className="p-8 animate-fadeInUp">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-4">Welcome, Book Lover!</h2>
//           <p className="text-lg text-gray-600 leading-relaxed mb-6">
//             Books open a window to new worlds, transporting us through time, space, and ideas.
//             Whether you're lost in the fantasy realms of Tolkien or unraveling the mysteries of
//             Sherlock Holmes, every page you turn is a step into an unforgettable journey.
//           </p>
//           <p className="text-lg text-gray-600 leading-relaxed mb-6">
//             Remember, each book holds a story that deserves to be explored. So grab a cup of tea,
//             cozy up, and let the magic of words take you away.
//           </p>
//         </div>

//         {/* Decorative Quote Section */}
//         <div className="bg-gray-100 p-6 text-center animate-fadeInUp delay-200">
//           <blockquote className="italic text-xl text-gray-700">
//             “A room without books is like a body without a soul.” – Marcus Tullius Cicero
//           </blockquote>
//         </div>
//       </div>

//       {/* Books Section */}
//       <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Link href="/pdf/book1.pdf" target="_blank" rel="noopener noreferrer">
//           <div className="cursor-pointer transform transition-transform duration-500 hover:scale-105">
//             <div className="relative h-[300px] w-full overflow-hidden rounded-md">
//               <img
//                 src="/images/book1.jpeg"
//                 alt="Book 1"
//                 className="object-cover w-full h-full"
//               />
//             </div>
//             <div className="mt-4 text-center">
//               <h3 className="text-2xl font-semibold text-gray-800">[ Vol 1.0 ]</h3>
//             </div>
//           </div>
//         </Link>
//         <Link href="/pdf/book2.pdf" target="_blank" rel="noopener noreferrer">
//           <div className="cursor-pointer transform transition-transform duration-500 hover:scale-105">
//             <div className="relative h-[300px] w-full overflow-hidden rounded-md">
//               <img
//                 src="/images/book2.jpeg"
//                 alt="Book 2"
//                 className="object-cover w-full h-full"
//               />
//             </div>
//             <div className="mt-4 text-center">
//               <h3 className="text-2xl font-semibold text-gray-800">[ Vol 2.0 ]</h3>
//             </div>
//           </div>
//         </Link>
//       </div>

//       {/* Call to Action */}
//       <button className="mt-12 px-8 py-4 bg-gray-800 hover:bg-gray-500 text-white font-semibold text-lg rounded-lg shadow-lg transition duration-300 animate-bounce">
//         Discover More Books
//       </button>
//     </div>
//   );
// };

// export default BookPage;




"use client";

import React from "react";
import Link from "next/link"; // Import Link from next/link
import Image from "next/image";

const BookPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 flex flex-col items-center py-12 px-6">
      {/* Main Book Section */}
      <div className="max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 animate-fadeIn">
        {/* Cover Section */}
        <div className="h-80 bg-cover bg-center" style={{ backgroundImage: "url('/book-cover.jpg')" }}>
          {/* Overlay */}
          <div className="h-full w-full bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg text-center animate-fadeInDown">
              "The World of Imagination"
            </h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 animate-fadeInUp">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Welcome, Book Lover!</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Books open a window to new worlds, transporting us through time, space, and ideas.
            Whether you're lost in the fantasy realms of Tolkien or unraveling the mysteries of
            Sherlock Holmes, every page you turn is a step into an unforgettable journey.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Remember, each book holds a story that deserves to be explored. So grab a cup of tea,
            cozy up, and let the magic of words take you away.
          </p>
        </div>

        {/* Decorative Quote Section */}
        <div className="bg-gray-100 p-6 text-center animate-fadeInUp delay-200">
          <blockquote className="italic text-xl text-gray-700">
            “A room without books is like a body without a soul.” – Marcus Tullius Cicero
          </blockquote>
        </div>
      </div>

      {/* Books Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/pdf/book1.pdf" target="_blank" rel="noopener noreferrer">
          <div className="cursor-pointer transform transition-transform duration-500 hover:scale-105">
            <div className="relative h-[300px] w-full overflow-hidden rounded-md shadow-lg">
              <Image
                src="/images/book1.jpeg"
                alt="Book 1"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-semibold text-gray-800">[ Vol 1.0 ]</h3>
            </div>
          </div>
        </Link>
        <Link href="/pdf/book2.pdf" target="_blank" rel="noopener noreferrer">
          <div className="cursor-pointer transform transition-transform duration-500 hover:scale-105">
            <div className="relative h-[300px] w-full overflow-hidden rounded-md shadow-lg">
              <Image
                src="/images/book2.jpeg"
                alt="Book 2"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-semibold text-gray-800">[ Vol 2.0 ]</h3>
            </div>
          </div>
        </Link>
      </div>

      {/* Call to Action */}
      <button className="mt-12 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg shadow-lg transition duration-300 animate-bounce">
        Discover More Books
      </button>
    </div>
  );
};

export default BookPage;