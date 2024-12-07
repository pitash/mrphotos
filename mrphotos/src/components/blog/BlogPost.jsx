export default function BlogPost({ post }) {
    return (
      <article className="bg-white">
        <div className="relative">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-64 object-cover" 
          />
        </div>
        <div className="p-8">
          <span className="text-sm uppercase text-neutral-500">
            {post.category}
          </span>
          <h2 className="text-xl font-bold mt-2 mb-4">
            {post.title}
          </h2>
          <p className="text-neutral-600 mb-6">
            {post.excerpt}
          </p>
          <div className="flex justify-between text-sm text-neutral-500">
            <div className="flex gap-2 items-center">
              <span>Comments: {post.comments}</span>
            </div>
            <div className="flex gap-2 items-center">
              <span>Date: {post.date}</span>
            </div>
          </div>
        </div>
      </article>
    );
  }