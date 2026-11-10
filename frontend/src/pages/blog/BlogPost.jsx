import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
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
        console.log("post", res.data.data);
        setPost(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) postDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600">Loading post details...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600 mb-4">Post not found.</p>
        <Link to="/blogs" className="text-[var(--primaryColor)] underline">
          Back to Blogs
        </Link>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 md:px-0 max-w-4xl py-6">
      <Breadcrumbs currentLabel={post.title} />

      <Link
        to="/blogs"
        className="text-sm text-gray-500 hover:text-[var(--primaryColor)] flex items-center gap-1 mb-6"
      >
        <i className="bx bx-arrow-back"></i> Back to all posts
      </Link>

      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
        {post.title}
      </h1>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
        <span>
          Category:{" "}
          <strong className="text-gray-700">
            {post.category || "Article"}
          </strong>
        </span>
        <span>•</span>
        <span>
          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString()
            : "Recent"}
        </span>
      </div>

      <div className="w-full h-[400px] rounded-xl overflow-hidden mb-8 border border-gray-100">
        <img
          src={
            post.coverImage ||
            "https://demo01.houzez.co/wp-content/uploads/2016/03/205.jpg"
          }
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="prose max-w-none text-gray-700 leading-relaxed text-lg">
        {post.content ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <p>{post.content}</p>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
