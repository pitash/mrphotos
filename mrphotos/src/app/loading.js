
"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const Loading = () => {
  const [loading, setLoading] = useState(true);
  const [imageWidth, setImageWidth] = useState(100); // Reduced width of the image
  const imageRef = useRef(null);

  const handleImageLoad = () => {
    setLoading(false);
    if (imageRef.current) {
      setImageWidth(imageRef.current.naturalWidth); // Get the actual image width
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="relative">
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
          <div className="absolute bottom-0 left-0 w-full">
            <div
              className="bg-gray-200 rounded-full overflow-hidden"
              style={{ width: `${imageWidth}px` }}
            >
              <div className="bg-blue-500 h-2 rounded-full animate-barLoader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loading;
