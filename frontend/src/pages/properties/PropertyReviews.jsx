import React, { useState } from "react";
import axios from "axios";
import FetchPropertyReviews from "./FetchPropertyReviews";
import toast from "react-hot-toast";

const BASE_API = import.meta.env.VITE_BASE_URL;

const PropertyReviews = ({ id }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please enter your review comment.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${BASE_API}/review/post-review/${id}`,
        { rating, comment },
        { withCredentials: true },
      );
      toast.success("Review posted successfully!");
      setComment("");
      setRating(5);
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      toast.error(err.response?.data?.message || "Please login to post a review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 border-t border-gray-100 pt-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Leave a Review
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Help other buyers and tenants by sharing your honest feedback.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-xs"
      >
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Your Rating
          </label>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl transition-transform hover:scale-110 cursor-pointer ${
                  rating >= star ? "text-amber-400" : "text-gray-300"
                }`}
                aria-label={`${star} star`}
              >
                <i
                  className={`bx ${rating >= star ? "bxs-star" : "bx-star"}`}
                ></i>
              </button>
            ))}
            <span className="text-xs text-gray-400 self-center ml-2">
              ({rating} of 5 stars)
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Your Review
          </label>
          <textarea
            className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white text-sm text-gray-800 transition-all"
            rows="3"
            placeholder="Share details about the locality, connectivity, amenities, or landlord..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-gray-900 hover:bg-(--primaryColor) text-white font-semibold text-sm rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
        >
          {loading && <i className="bx bx-loader-alt animate-spin"></i>}
          <span>{loading ? "Submitting..." : "Submit Review"}</span>
        </button>
      </form>

      <FetchPropertyReviews id={id} key={refreshKey} />
    </div>
  );
};

export default PropertyReviews;
