import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";

const BASE_API = import.meta.env.VITE_BASE_URL;

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(4);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${BASE_API}/blogs/get-posts`);
        setPosts(res.data.data);
        console.log("posts", res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  const handleViewMore = () => {
    setVisiblePosts(visiblePosts + 4);
  };

  return (
    <div className="container mx-auto px-4 md:px-0">
      <Breadcrumbs currentLabel={"Blog"} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-6">
        {posts.slice(0, visiblePosts).map((post) => (
          <div
            key={post._id}
            className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            {/* Image Container */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={
                  post?.coverImage ||
                  "https://demo01.houzez.co/wp-content/uploads/2016/03/205.jpg"
                }
                alt={post?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[var(--primaryColor)] text-white text-xs font-semibold px-2.5 py-1 rounded">
                  {post?.category || "Article"}
                </span>
              </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <span className="text-sm text-gray-500 mb-2">
                {post?.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : "Recent"}
              </span>

              <Link to={`/blog/${post._id}`}>
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-[var(--primaryColor)] transition-colors line-clamp-2 mb-3 cursor-pointer">
                  {post?.title}
                </h2>
              </Link>

              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {post?.content.slice(0, 80) ||
                  "Read more about this post to stay updated with the latest trends"}...
              </p>

              <div className="mt-auto">
                <Link
                  to={`/blog/${post._id}`}
                  className="text-[var(--primaryColor)] font-medium text-sm flex items-center gap-1 cursor-pointer hover:underline"
                >
                  Read More
                  <i className="bx bx-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visiblePosts < posts.length && (
        <div className="text-center py-4">
          <button
            className="px-6 py-2 bg-[var(--primaryColor)] text-white font-semibold text-sm rounded-sm cursor-pointer"
            onClick={handleViewMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Blogs;
