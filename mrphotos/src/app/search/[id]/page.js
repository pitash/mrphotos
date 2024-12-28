
// "use client";

// import Loading from "@/components/loading/loading";
// import { useEffect, useState } from "react";
// import React from "react";

// export default function SearchDetail({ params }) {
//   const [item, setItem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Unwrapping the params object
//   const resolvedParams = React.use(params);
//   const { id } = resolvedParams;

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/api/search/${id}`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ id }),
//         });

//         if (!response.ok) throw new Error("Failed to fetch item");
//         const data = await response.json();
//         setItem(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItem();
//   }, [id]);

//   if (loading) return <div><Loading /></div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!item) return <div>No result found!</div>;

//   return (
//     <div className="relative min-h-screen px-5 pb-48 md:pb-32 md:px-20 pt-32 bg-gray-100">
//       {/* Side text - similar to "Last Works" */}
//       <div className="fixed left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
//         <span className="block -rotate-90 text-sm font-semibold uppercase tracking-wider text-primary">
//           Searching Result
//         </span>
//       </div>

//       {/* Main Content */}
//       <div className="p-6">
//         <h1 className="text-3xl font-bold">{item.title || "Untitled"}</h1>
//         {item.image_url && (
//           <img
//             src={item.image_url}
//             alt={item.title || "Gallery Image"}
//             className="w-full h-[400px] object-cover mt-4"
//           />
//         )}
//         <p className="mt-4">{item.description || "No description available."}</p>
//       </div>
//     </div>
//   );
// }




"use client";

import Loading from "@/components/loading/loading";
import { useEffect, useState } from "react";
import React from "react";

export default function SearchDetail({ params }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Unwrapping the params object
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/search/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) throw new Error("Failed to fetch item");
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
        <Loading/>
    );
  }

  if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  if (!item) return <div className="text-center mt-10">No result found!</div>;

  return (
    <div className="relative min-h-screen px-5 pb-48 md:pb-32 md:px-20 pt-32 bg-gray-100">
      {/* Side text - similar to "Last Works" */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <span className="block -rotate-90 text-sm font-semibold uppercase tracking-wider text-primary">
          Searching Result
        </span>
      </div>

      {/* Main Content */}
      <div className="p-6 animate-fade-in">
        <h1 className="text-3xl font-bold">{item.title || "Untitled"}</h1>
        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.title || "Gallery Image"}
            className="w-full h-[400px] object-cover mt-4 rounded-md shadow-lg"
          />
        )}
        <p className="mt-4 text-lg">{item.description || "No description available."}</p>
      </div>
    </div>
  );
}