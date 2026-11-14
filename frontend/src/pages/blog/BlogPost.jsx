import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Breadcrumbs from "../../components/Breadcrumbs";

const BASE_API = import.meta.env.VITE_BASE_URL;

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_API}/blogs/get-post/${id}`);
        setPost(res.data.data);
      } catch (error) {
        console.error("Blog post error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) postDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>
        <div className="h-[360px] bg-gray-100 rounded-2xl mb-8 animate-pulse"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-500 flex items-center justify-center mx-auto mb-4 text-3xl">
          <i className="bx bx-error-circle"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Article Not Found</h2>
        <p className="text-gray-500 mt-2 mb-6">
          The blog post you're looking for doesn't exist or has been relocated.
        </p>
        <Link
          to="/blogs"
          className="px-6 py-2.5 bg-(--primaryColor) text-white font-semibold rounded-xl text-sm"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-6">
      <Breadcrumbs currentLabel={post.title} />

      <Link
        to="/blogs"
        className="text-xs sm:text-sm text-gray-500 hover:text-(--primaryColor) inline-flex items-center gap-1.5 mb-6 transition-colors font-medium"
      >
        <i className="bx bx-arrow-back text-base"></i> Back to All Articles
      </Link>

      <div className="flex items-center gap-2 mb-3">
        <span className="bg-orange-50 text-(--primaryColor) font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
          {post.category || "Article"}
        </span>
        <span className="text-xs text-gray-400">•</span>
        <span className="text-xs text-gray-500">
          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "Recently Published"}
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
        {post.title}
      </h1>

      <div className="w-full h-[260px] sm:h-[380px] md:h-[460px] rounded-2xl overflow-hidden mb-8 border border-gray-100 shadow-md bg-gray-100">
        <img
          src={
            post.coverImage ||
            "https://demo01.houzez.co/wp-content/uploads/2016/03/205.jpg"
          }
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-gray-700 leading-relaxed text-base sm:text-lg space-y-4 prose max-w-none">
        {post.content ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <p>{post.content}</p>
        )}
      </div>

      {/* Share / Back Bar */}
      <div className="mt-12 pt-6 border-t border-gray-100 flex items-center justify-between">
        <Link
          to="/blogs"
          className="text-sm font-bold text-(--primaryColor) hover:underline flex items-center gap-1"
        >
          <i className="bx bx-left-arrow-alt text-lg"></i> More Articles
        </Link>
        <Link
          to="/properties"
          className="px-5 py-2 bg-gray-900 hover:bg-black text-white text-xs sm:text-sm font-semibold rounded-xl"
        >
          Explore Properties
        </Link>
      </div>
    </div>
  );
};

export default BlogPost;
