import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import axios from "axios";
import { Link } from "react-router";

const BASE_API = import.meta.env.VITE_BASE_URL;

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(8);
  const [loading, setLoading] = useState(true);

  const fallbackPosts = [
    {
      _id: "blog-1",
      title: "Top 7 Emerging Real Estate Hotspots in India for 2026",
      category: "Investment",
      createdAt: new Date().toISOString(),
      coverImage: "https://demo01.houzez.co/wp-content/uploads/2016/03/205.jpg",
      content:
        "Discover the highest yield micro-markets across metropolitan cities offering rapid infrastructure growth, metro connectivity, and capital appreciation.",
    },
    {
      _id: "blog-2",
      title: "First-Time Home Buyer Checklist: Documentation & Due Diligence",
      category: "Guide",
      createdAt: new Date().toISOString(),
      coverImage: "https://demo01.houzez.co/wp-content/uploads/2016/03/miami-beach.jpg",
      content:
        "Everything you must verify before paying a booking token: RERA registration, occupancy certificates, carpet area norms, and home loan pre-approvals.",
    },
    {
      _id: "blog-3",
      title: "Smart Home Tech Trends That Increase Your Property Resale Value",
      category: "Architecture",
      createdAt: new Date().toISOString(),
      coverImage: "https://demo01.houzez.co/wp-content/uploads/2016/03/los-angeles.jpg",
      content:
        "From IoT energy sensors to automated security systems, see which modern home upgrades attract the highest buyer premiums.",
    },
    {
      _id: "blog-4",
      title: "Understanding RERA Rules for Rental Properties and Tenants",
      category: "Legal",
      createdAt: new Date().toISOString(),
      coverImage: "https://demo01.houzez.co/wp-content/uploads/2016/03/205.jpg",
      content:
        "A clear breakdown of tenant rights, landlord obligations, standard lock-in clauses, and security deposit refund protocols.",
    },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_API}/blogs/get-posts`);
        if (Array.isArray(res.data?.data) && res.data.data.length > 0) {
          setPosts(res.data.data);
        } else {
          setPosts(fallbackPosts);
        }
      } catch (error) {
        console.error("Blogs fetch error:", error);
        setPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleViewMore = () => {
    setVisiblePosts((prev) => prev + 4);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs currentLabel={"Blog & Insights"} />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto py-8">
        <span className="text-xs font-bold uppercase tracking-wider text-(--primaryColor) bg-orange-50 px-3 py-1 rounded-full">
          Market Insights
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
          Latest Real Estate News & Advice
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Expert property advice, market trend reports, and guides to help you make informed real estate decisions.
        </p>
      </div>

      {/* Skeleton / Cards */}
      {loading && posts.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-100 rounded"></div>
                <div className="h-3 bg-gray-100 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
          {posts.slice(0, visiblePosts).map((post) => (
            <article
              key={post._id}
              className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={
                    post?.coverImage ||
                    "https://demo01.houzez.co/wp-content/uploads/2016/03/205.jpg"
                  }
                  alt={post?.title || "Blog post"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-gray-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                    {post?.category || "Article"}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-xs text-gray-400 mb-2 font-medium">
                  {post?.createdAt
                    ? new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Recent"}
                </span>

                <Link to={`/blog/${post._id}`}>
                  <h2 className="text-base font-bold text-gray-900 group-hover:text-(--primaryColor) transition-colors line-clamp-2 mb-2 leading-snug">
                    {post?.title}
                  </h2>
                </Link>

                <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                  {post?.content ? post.content.replace(/<[^>]+>/g, "").slice(0, 100) : "Read more about this story to discover helpful tips."}...
                </p>

                <div className="mt-auto pt-3 border-t border-gray-100">
                  <Link
                    to={`/blog/${post._id}`}
                    className="text-(--primaryColor) font-bold text-xs inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Article</span>
                    <i className="bx bx-right-arrow-alt text-base"></i>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {visiblePosts < posts.length && (
        <div className="text-center pb-8">
          <button
            type="button"
            className="px-6 py-2.5 bg-gray-900 hover:bg-(--primaryColor) text-white font-semibold text-sm rounded-xl shadow-sm transition-all cursor-pointer"
            onClick={handleViewMore}
          >
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
};

export default Blogs;
