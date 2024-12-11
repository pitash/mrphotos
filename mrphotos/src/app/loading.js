"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const Loading = () => {
  const [loading, setLoading] = useState(true);
  const [imageWidth, setImageWidth] = useState(180); // Default width of the image
  const imageRef = useRef(null);

  const handleImageLoad = () => {
    setLoading(false);
    if (imageRef.current) {
      setImageWidth(imageRef.current.naturalWidth); // Get the actual image width
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Image
        src="/images/logo_1.png"
        alt="Loading..."
        width={imageWidth}
        height={imageWidth}
        priority
        onLoadingComplete={handleImageLoad}
        ref={imageRef}
      />

      {/* Loading Bar */}
      {loading && (
        <div className="w-full mt-6 flex justify-center">
          <div
            className="bg-gray-200 rounded-full"
            style={{ width: `${imageWidth}px` }}
          >
            <div className="bg-blue-500 h-2 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loading;
