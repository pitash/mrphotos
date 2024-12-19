// "use client";

// import { useState } from 'react';
// import TopicFilter from '@/components/blog/TopicFilter';
// import BlogGrid from '@/components/blog/BlogGrid';
// import Newsletter from '@/components/blog/Newsletter';

// const MOCK_POSTS = [
//   {
//     id: 1,
//     title: "Adventures for hill track",
//     excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed biben dum leo maur massa eleife purus rutrum nulla.",
//     image: "/api/placeholder/400/320",
//     comments: 5,
//     date: "25 Jan 2019",
//     category: "fashion"
//   },
//   {
//     id: 2,
//     title: "Adventures for northern lights",
//     excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed biben dum leo maur massa eleife purus rutrum nulla.",
//     image: "/api/placeholder/400/320",
//     comments: 5,
//     date: "25 Jan 2019",
//     category: "lifestyle"
//   },
//   // Add more posts as needed
// ];

// export default function BlogPage() {
//   const [activeFilter, setActiveFilter] = useState('all');

//   const filteredPosts = activeFilter === 'all'
//     ? MOCK_POSTS
//     : MOCK_POSTS.filter(post => post.category === activeFilter);

//   return (
//     <div className="min-h-screen bg-neutral-50">

//       <div className="">
//         <TopicFilter
//           activeFilter={activeFilter}
//           onFilterChange={setActiveFilter}
//         />
//         <BlogGrid posts={filteredPosts} />
//         <Newsletter />
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from 'react';
// import TopicFilter from '@/components/blog/TopicFilter';
// import Newsletter from '@/components/blog/Newsletter';

// export default function BlogPage() {
//   const [posts, setPosts] = useState([]);
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [loading, setLoading] = useState(true);

//   // Fetch posts data from the API
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/blogs');
//         const data = await response.json();
//         setPosts(data.data); // Assuming the API returns the posts directly
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching blog posts:', error);
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // Filter posts based on category (You can add this logic if you need it)
//   // const filteredPosts = activeFilter === 'all'
//   //   ? posts
//   //   : posts.filter(post => post.category === activeFilter);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-neutral-50">
//       <div>
//         <TopicFilter
//           activeFilter={activeFilter}
//           onFilterChange={setActiveFilter}
//         />

//         {/* Blog Grid Section */}
//         <div className="container mx-auto px-4 py-12">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {posts.map(post => (
//               <article
//                 key={post.id}
//                 className="bg-white transform transition-all duration-700 ease-out shadow-md rounded-lg overflow-hidden opacity-100 translate-y-0"
//               >
//                 {/* Post Image */}
//                 <div className="relative">
//                   <img
//                     src={post.image}
//                     alt={post.title}
//                     className="w-full h-64 object-cover transition-opacity duration-700 ease-in-out opacity-100"
//                   />
//                 </div>

//                 {/* Post Content */}
//                 <div className="p-6">
//                   <span className="text-sm uppercase text-neutral-500">
//                     {post.category}
//                   </span>
//                   <h2 className="text-xl font-bold mt-2 mb-4">{post.title}</h2>
//                   <p className="text-neutral-600 mb-6">{post.excerpt}</p>

//                   {/* Post Footer */}
//                   <div className="flex justify-between text-sm text-neutral-500">
//                     <div className="flex gap-2 items-center">
//                       <span>Comments: {post.comments}</span>
//                     </div>
//                     <div className="flex gap-2 items-center">
//                       <span>Date: {post.date}</span>
//                     </div>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </div>

//         <Newsletter />
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image"; // Import Image component from Next.js
// import TopicFilter from "./TopicFilter";

// export default function BlogPage() {
//   const [activeFilter, setActiveFilter] = useState(null);
//   const [blogData, setBlogData] = useState([]); // Ensuring it's an array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Handle filter change
// const handleFilterChange = (filterId) => {
//   setActiveFilter(filterId);
// };

//   // Fetch blog data from the API
//   useEffect(() => {
//     const fetchBlogData = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/blogs"); // Replace with your API endpoint
//         if (!response.ok) throw new Error("Failed to fetch blog data");
//         const data = await response.json();

//         console.log(data.data); // Log the entire response to check its structure

//         // Adjust based on the actual structure of your API response
//         if (data && Array.isArray(data.data.data)) {
//           setBlogData(data.data.data); // Use the correct field name, e.g., 'result'
//         } else {
//           throw new Error("Invalid data format");
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlogData();
//   }, [activeFilter]); // Re-fetch data when active filter changes

//   if (loading) return <div className="text-white py-8">Loading blogs...</div>;
//   if (error) return <div className="text-red-500 py-8">{error}</div>;

//   return (
//     <div>
//       {/* Topic Filter */}
//       <TopicFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} />

//       {/* Blog Data Display */}
//       <div className="py-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
//         {blogData.map((blog, index) => (
//           <div key={index} className="bg-neutral-800  rounded-lg shadow-lg">
//             <div className="relative w-full h-48 mb-4">
//               {/* Image using Next.js Image component */}
//               <Image
//                 src={`http://127.0.0.1:8000/${blog?.image}`} // Ensure blog.image is a valid image URL
//                 alt={blog.title}
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-md"
//               />
//             </div>
//             <h3 className="text-xl font-semibold text-white mb-2">{blog.title}</h3>
//             <p className="text-neutral-400">{blog.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }











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

        const response = await fetch(endpoint);
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
            <div key={blog.id} className="cursor-pointer">
              <div className="relative h-[400px] w-full overflow-hidden rounded-md">
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
                      Comments{blog.comments_count || 0} 
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
          className={`px-3 py-1 border rounded-md ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-white"
          }`}
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 border rounded-md ${
              page === currentPage
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-white"
          }`}
        >
          &gt;
        </button>
      </div>
      <Newsletter/>
    </div>
  );
}
