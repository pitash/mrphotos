"use client";

import Image from "next/image";
import { useState } from "react";

const Loading = () => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Image
        src="/images/logo_1.png"
        alt="Loading..."
        width={180}
        height={180}
        priority
        onLoadingComplete={handleImageLoad}
      />

      {/* Loading Bar */}
      {loading && (
        <div className="w-full max-w-xs mt-6">
          <div className="w-20 bg-gray-200 rounded-full">
            <div className="bg-blue-500 h-2 rounded-full animate-pulse"></div>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default Loading;
