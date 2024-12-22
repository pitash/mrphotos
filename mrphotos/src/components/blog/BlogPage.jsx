
////Get method///

// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import TopicFilter from "./TopicFilter";
// import { MessageCircle, Clock } from "lucide-react"; // Import icons
// import Newsletter from "./Newsletter";

// export default function BlogPage({ countryId }) {
//   const [blogs, setBlogs] = useState([]);
//   const [filteredBlogs, setFilteredBlogs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 3;
//   const [activeFilter, setActiveFilter] = useState(null);

//   const handleFilterChange = (filterId) => {
//     setActiveFilter(filterId);
//   };

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const endpoint = countryId
//           ? `http://127.0.0.1:8000/api/blogs/${countryId}`
//           : "http://127.0.0.1:8000/api/blogs";

//         const response = await fetch(endpoint);
//         const data = await response.json();
//         console.log("Fetched data:", data);
//         if (Array.isArray(data?.data?.data)) {
//           setBlogs(data.data.data);
//           setFilteredBlogs(data.data.data);
//         } else {
//           console.error("Invalid data format:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching blog data:", error);
//       }
//     };

//     fetchBlogs();
//   }, [countryId]);

//   useEffect(() => {
//     if (activeFilter) {
//       const filtered = blogs.filter((blog) => blog.countryId === activeFilter);
//       setFilteredBlogs(filtered);
//     } else {
//       setFilteredBlogs(blogs);
//     }
//   }, [activeFilter, blogs]);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedBlogs = filteredBlogs.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <div>
//       <TopicFilter
//         activeFilter={activeFilter}
//         onFilterChange={handleFilterChange}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {paginatedBlogs.length === 0 ? (
//           <p className="text-center text-gray-500 col-span-3">
//             No blogs available
//           </p>
//         ) : (
//           paginatedBlogs.map((blog) => (
//             <div
//               key={blog.id}
//               className="cursor-pointer transform transition-transform duration-500 hover:scale-105"
//             >
//               <div className="relative h-[400px] w-full overflow-hidden rounded-md animate-fadeIn">
//                 <Image
//                   src={`http://127.0.0.1:8000/${blog?.image}`}
//                   alt={blog.title || "Blog Image"}
//                   layout="fill"
//                   className="object-cover"
//                   onError={(e) => {
//                     e.target.src = "/fallback-image.jpg";
//                   }}
//                 />
//                 <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-60 text-white">
//                   <h3 className="text-lg font-semibold">
//                     {blog.title || "Untitled"}
//                   </h3>
//                   <p className="text-sm mt-2">
//                     {blog.description || "No description available"}
//                   </p>

//                   <div className="flex justify-between items-center mt-4">
//                     {/* Comments Section */}
//                     <div className="flex items-center space-x-1">
//                       <MessageCircle size={16} />
//                       <h4 className="text-sm font-semibold">
//                         Comments {blog.comments_count || 0}
//                       </h4>
//                     </div>

//                     {/* Date Section */}
//                     <div className="flex items-center space-x-1">
//                       <Clock size={16} />
//                       <p className="text-sm">
//                         {blog.published_date || "No date available"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <div className="mt-6 flex justify-center items-center space-x-2">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className={`px-3 py-1 border rounded-md transition-colors duration-300 ${
//             currentPage === 1
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-white hover:bg-gray-200"
//           }`}
//         >
//           &lt;
//         </button>

//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//           <button
//             key={page}
//             onClick={() => handlePageChange(page)}
//             className={`px-3 py-1 border rounded-md transition-colors duration-300 ${
//               page === currentPage
//                 ? "bg-gray-800 text-white"
//                 : "bg-white text-gray-800 hover:bg-gray-200"
//             }`}
//           >
//             {page}
//           </button>
//         ))}

//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className={`px-3 py-1 border rounded-md transition-colors duration-300 ${
//             currentPage === totalPages
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-white hover:bg-gray-200"
//           }`}
//         >
//           &gt;
//         </button>
//       </div>
//       <Newsletter />
//     </div>
//   );
// }



///post method///


"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TopicFilter from "./TopicFilter";
import { MessageCircle, Clock } from "lucide-react"; // Import icons
import Newsletter from "./Newsletter";

export default function BlogPage({ countryId }) {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [activeFilter, setActiveFilter] = useState(null);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const endpoint = countryId
          ? `http://127.0.0.1:8000/api/blogs/${countryId}`
          : "http://127.0.0.1:8000/api/blogs";

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
        const data = await response.json();
        console.log("Fetched data:", data);
        if (Array.isArray(data?.data?.data)) {
          setBlogs(data.data.data);
          setFilteredBlogs(data.data.data);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogs();
  }, [countryId]);

  useEffect(() => {
    if (activeFilter) {
      const filtered = blogs.filter((blog) => blog.countryId === activeFilter);
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [activeFilter, blogs]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <TopicFilter
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginatedBlogs.length === 0 ? (
          <p className="text-center text-gray-500 col-span-3">
            No blogs available
          </p>
        ) : (
          paginatedBlogs.map((blog) => (
            <div
              key={blog.id}
              className="cursor-pointer transform transition-transform duration-500 hover:scale-105"
            >
              <div className="relative h-[400px] w-full overflow-hidden rounded-md animate-fadeIn">
                <Image
                  src={`http://127.0.0.1:8000/${blog?.image}`}
                  alt={blog.title || "Blog Image"}
                  layout="fill"
                  className="object-cover"
                  onError={(e) => {
                    e.target.src = "/fallback-image.jpg";
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-60 text-white">
                  <h3 className="text-lg font-semibold">
                    {blog.title || "Untitled"}
                  </h3>
                  <p className="text-sm mt-2">
                    {blog.description || "No description available"}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    {/* Comments Section */}
                    <div className="flex items-center space-x-1">
                      <MessageCircle size={16} />
                      <h4 className="text-sm font-semibold">
                        Comments {blog.comments_count || 0}
                      </h4>
                    </div>

                    {/* Date Section */}
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <p className="text-sm">
                        {blog.published_date || "No date available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 flex justify-center items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded-md transition-colors duration-300 ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-white hover:bg-gray-200"
          }`}
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 border rounded-md transition-colors duration-300 ${
              page === currentPage
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800 hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded-md transition-colors duration-300 ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-white hover:bg-gray-200"
          }`}
        >
          &gt;
        </button>
      </div>
      <Newsletter />
    </div>
  );
}