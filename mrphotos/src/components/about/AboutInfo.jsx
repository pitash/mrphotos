
"use client";

import { useEffect, useState } from "react";
import { get } from "lodash";
import Image from "next/image";

export default function AboutInfo() {
  const [aboutData, setAboutData] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading", "success", "error"

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(`${process.env.baseUrl}/about`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch about information.");
        }
        const data = await response.json();
        setAboutData(data.data);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };

    fetchAboutData();
  }, []);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="relative">
          {/* Placeholder Logo */}
          <Image
            src="/images/logo_1.png"
            alt="Loading..."
            width={100}
            height={100}
            priority
          />
          {/* Loading Bar */}
          <div className="absolute bottom-0 left-0 w-full">
            <div className="bg-gray-200 rounded-full overflow-hidden w-[100px]">
              <div className="bg-gray-800 h-2 rounded-full animate-barLoader"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Error fetching data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 mx-auto p-8 md:p-16">
        {/* Left Column - Image */}
        <div className="relative h-full mx-auto md:mx-0">
          {get(aboutData, "image_path") ? (
            <Image
              src={`${process.env.ImagebaseUrl}/${aboutData.image_path}`}
              alt={get(aboutData, "name", "About Image")}
              fill
              className="object-cover rounded-xl"
            />
          ) : (
            <div className="bg-gray-200 rounded-xl h-full w-full"></div>
          )}
        </div>

        {/* Right Column - Content */}
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold">
            {get(aboutData, "name", "No Name")}
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed text-justify">
            {get(aboutData, "description", "Description not available.")}
          </p>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="bg-gray-50 py-20">
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex flex-col space-y-6 p-8">
                <span className="text-4xl font-light text-gray-400">{`0${index}`}</span>
                <h3 className="text-xl font-bold text-gray-900">
                  {get(aboutData, `quot${index}_title`, "Title not available")}
                </h3>
                <p className="text-gray-600 leading-relaxed text-justify">
                  {get(aboutData, `quot${index}_desc`, "Description not available.")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
