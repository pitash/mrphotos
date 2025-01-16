// "use client";

// import { useEffect, useState } from "react";
// //import Loading from "@/components/loading/loading";

// // import Loading from "./loading/loading";

// export default function SearchDetailClient({ id }) {
//   const [item, setItem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const response = await fetch(`${process.env.baseUrl}/search/${id}`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ id }),
//         });

//         if (!response.ok) throw new Error('Failed to fetch item with id ${id}');
//         const data = await response.json();
//         console.log(data)
//         setItem(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItem();
//   }, [id]);

// //   if (loading) return <Loading />;
//   if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
//   if (!item) return <div className="text-center mt-10">No result found!</div>;

//   return (
//     <div className="p-6 animate-fade-in">
//       <h1 className="text-3xl font-bold">{item.title || "Untitled"}</h1>
//       {item.image_url && (
//         <img
//           src={item.image_url}
//           alt={item.title || "Gallery Image"}
//           className="w-full h-[400px] object-cover mt-4 rounded-md shadow-lg"
//         />
//       )}
//       <p className="mt-4 text-lg">{item.description || "No description available."}</p>
//     </div>
//   );
// }