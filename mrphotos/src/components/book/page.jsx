"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const BookPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl font-bold text-gray-500 mb-8 text-center underline animate-fadeIn">Life Through The Lens</h1>

      {/* Books Section */}
      <div className="mt-12 flex flex-wrap justify-center gap-8">
        <Link href="/pdf/book1.pdf" target="_blank" rel="noopener noreferrer">
          <div className="cursor-pointer transform transition-transform duration-700 hover:scale-105 animate-slideInLeft">
            <div className="relative h-[300px] sm:h-[350px] md:h-[400px] w-[300px] sm:w-[350px] md:w-[400px] lg:w-[400px] overflow-hidden rounded-md shadow-lg mx-auto">
              <Image
                src="/images/book1.jpeg"
                alt="Book 1"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">LIFE THROUGH THE LENS</h3>
              <p className="text-md sm:text-lg text-gray-600">Moshiur Rahman</p>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">[ Vol 1.0 ]</h3>
            </div>
          </div>
        </Link>
        <Link href="/pdf/book2.pdf" target="_blank" rel="noopener noreferrer">
          <div className="cursor-pointer transform transition-transform duration-700 hover:scale-105 animate-slideInRight delay-200">
            <div className="relative h-[300px] sm:h-[350px] md:h-[400px] w-[300px] sm:w-[350px] md:w-[400px] lg:w-[400px] overflow-hidden rounded-md shadow-lg mx-auto">
              <Image
                src="/images/book2.jpeg"
                alt="Book 2"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">LIFE THROUGH THE LENS (Vol-2)</h3>
              <p className="text-md sm:text-lg text-gray-600">Moshiur Rahman</p>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">[ Vol 2.0 ]</h3>
            </div>
          </div>
        </Link>
        {/* Add more books here */}
      </div>

      {/* Call to Action */}
      <button className="mt-12 px-8 py-4 bg-gray-800 hover:bg-gray-600 text-white font-semibold text-lg rounded-lg shadow-lg transition duration-300 animate-bounce">
        Discover More Books
      </button>
    </div>
  );
};

export default BookPage;