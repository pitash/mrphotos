"use client";

import { useState } from 'react';
import TopicFilter from '@/components/blog/TopicFilter';
import BlogGrid from '@/components/blog/BlogGrid';
import Newsletter from '@/components/blog/Newsletter';

const MOCK_POSTS = [
  {
    id: 1,
    title: "Adventures for hill track",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed biben dum leo maur massa eleife purus rutrum nulla.",
    image: "/api/placeholder/400/320",
    comments: 5,
    date: "25 Jan 2019",
    category: "fashion"
  },
  {
    id: 2,
    title: "Adventures for northern lights",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed biben dum leo maur massa eleife purus rutrum nulla.",
    image: "/api/placeholder/400/320",
    comments: 5,
    date: "25 Jan 2019",
    category: "lifestyle"
  },
  // Add more posts as needed
];

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredPosts = activeFilter === 'all' 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter(post => post.category === activeFilter);

  return (
    <div className="min-h-screen bg-neutral-50">
      
      <div className="">
        <TopicFilter 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter} 
        />
        <BlogGrid posts={filteredPosts} />
        <Newsletter />
      </div>
    </div>
  );
}