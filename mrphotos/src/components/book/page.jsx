"use client";

import React from "react";

const BookPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 flex flex-col items-center py-12 px-6">
      {/* Main Book Section */}
      <div className="max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        {/* Cover Section */}
        <div className="h-80 bg-cover bg-center" style={{ backgroundImage: "url('/book-cover.jpg')" }}>
          {/* Overlay */}
          <div className="h-full w-full bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg text-center">
              "The World of Imagination"
            </h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
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
        <div className="bg-gray-100 p-6 text-center">
          <blockquote className="italic text-xl text-gray-700">
            “A room without books is like a body without a soul.” – Marcus Tullius Cicero
          </blockquote>
        </div>
      </div>

      {/* Call to Action */}
      <button className="mt-12 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg shadow-lg transition duration-300">
        Discover More Books
      </button>
    </div>
  );
};

export default BookPage;
