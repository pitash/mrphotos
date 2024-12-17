
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react"; // Import the Loader icon

export default function AboutIntro() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/about");
        if (!response.ok) {
          throw new Error("Failed to fetch about information.");
        }
        const data = await response.json();
        console.log("data is", data.data);
        setAboutData(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Loader className="animate-spin w-10 h-10 text-gray-300" />
    </div>
  );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 mx-auto p-8 md:p-16">
        {/* Left Column - Title */}
        <div className="flex flex-col justify-between gap-5">
          <div className="relative h-full mx-auto md:mx-0">
            <Image
              src={`http://127.0.0.1:8000/${aboutData?.image_path}`}
              alt="Moshiur Rahman"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold">{aboutData.name}</h3>

          <p className="text-gray-600 text-lg leading-relaxed text-justify">
            {aboutData.description}
          </p>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="bg-gray-50 py-20">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Box 1 */}
            <div className="flex flex-col space-y-6 p-8">
              <span className="text-4xl font-light text-gray-400">01</span>
              <h3 className="text-xl font-bold text-gray-900">
                {aboutData.quot1_title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-justify">
                {aboutData.quot1_desc}
              </p>
            </div>

            {/* Box 2 */}
            <div className="flex flex-col space-y-6 p-8">
              <span className="text-4xl font-light text-gray-400">02</span>
              <h3 className="text-xl font-bold text-gray-900">
                {aboutData.quot2_title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-justify">
                {aboutData.quot2_desc}
              </p>
            </div>

            {/* Box 3 */}
            <div className="flex flex-col space-y-6 p-8">
              <span className="text-4xl font-light text-gray-400">03</span>
              <h3 className="text-xl font-bold text-gray-900">
                {aboutData.quot3_title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-justify">
                {aboutData.quot3_desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
