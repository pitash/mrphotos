// ///----POST METHOD----////

// "use client";
// import Loading from "@/components/loading/loading";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// export default function AboutInfo() {
//   const [aboutData, setAboutData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAboutData = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/about", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({}),
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch about information.");
//         }
//         const data = await response.json();
//         console.log("data is", data.data);
//         setAboutData(data.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchAboutData();
//   }, []);

//   if (loading) return <Loading />;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="bg-white">
//       <div className="grid md:grid-cols-2 gap-12 md:gap-20 mx-auto p-8 md:p-16 animate-fade-in">
//         {/* Left Column - Image */}
//         <div className="flex flex-col justify-between gap-5">
//           <div className="relative h-full mx-auto md:mx-0 animate-fadeInLeft">
//             <Image
//               src={`http://127.0.0.1:8000/${aboutData?.image_path}`}
//               alt="Moshiur Rahman"
//               fill
//               className="object-cover rounded-xl"
//             />
//           </div>
//         </div>

//         {/* Right Column - Content */}
//         <div className="space-y-8 animate-fadeInRight">
//           <h3 className="text-2xl font-semibold">{aboutData.name}</h3>

//           <p className="text-gray-600 text-lg leading-relaxed text-justify">
//             {aboutData.description}
//           </p>
//         </div>
//       </div>

//       {/* Info Boxes */}
//       <div className="bg-gray-50 py-20">
//         <div className="mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//             {/* Box 1 */}
//             <div className="flex flex-col space-y-6 p-8 animate-fadeInUp">
//               <span className="text-4xl font-light text-gray-400">01</span>
//               <h3 className="text-xl font-bold text-gray-900">
//                 {aboutData.quot1_title}
//               </h3>
//               <p className="text-gray-600 leading-relaxed text-justify">
//                 {aboutData.quot1_desc}
//               </p>
//             </div>

//             {/* Box 2 */}
//             <div className="flex flex-col space-y-6 p-8 animate-fadeInUp delay-200">
//               <span className="text-4xl font-light text-gray-400">02</span>
//               <h3 className="text-xl font-bold text-gray-900">
//                 {aboutData.quot2_title}
//               </h3>
//               <p className="text-gray-600 leading-relaxed text-justify">
//                 {aboutData.quot2_desc}
//               </p>
//             </div>

//             {/* Box 3 */}
//             <div className="flex flex-col space-y-6 p-8 animate-fadeInUp delay-400">
//               <span className="text-4xl font-light text-gray-400">03</span>
//               <h3 className="text-xl font-bold text-gray-900">
//                 {aboutData.quot3_title}
//               </h3>
//               <p className="text-gray-600 leading-relaxed text-justify">
//                 {aboutData.quot3_desc}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { get } from "lodash";
import dynamic from "next/dynamic";

// Lazy-load components
const Loading = dynamic(() => import("@/components/loading/loading"));
const Image = dynamic(() => import("next/image"));

export default function AboutInfo() {
  const [aboutData, setAboutData] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading", "success", "error"

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/about", {
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
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
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
              src={`http://127.0.0.1:8000/${aboutData.image_path}`}
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
              <div
                key={index}
                className="flex flex-col space-y-6 p-8"
              >
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
