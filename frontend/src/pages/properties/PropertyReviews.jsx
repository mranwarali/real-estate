import React, { useState } from "react";
import axios from "axios";
import FetchPropertyReviews from "./FetchPropertyReviews";

const BASE_API = import.meta.env.VITE_BASE_URL;

const PropertyReviews = ({ id }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${BASE_API}/review/post-review/${id}`,
        { rating, comment },
        { withCredentials: true },
      );
      setComment("");
      setRating(5);
    } catch (err) {
      alert(err.response?.data?.message || "Error posting review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 border-t border-gray-300 pt-5">
      {/* <h3 className="text-2xl font-bold mb-6">Reviews ({reviews.length})</h3> */}

      <form
        onSubmit={handleSubmit}
        className="mb-10 bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
      >
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${rating >= star ? "text-yellow-400" : "text-yellow-400"}`}
            >
              <i
                className={`bx ${rating >= star ? "bxs-star" : "bx-star"}`}
              ></i>
            </button>
          ))}
        </div>
        <textarea
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button
          disabled={loading}
          className="mt-3 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:bg-slate-400"
        >
          {loading ? "Posting..." : "Submit Review"}
        </button>
      </form>
      <FetchPropertyReviews id={id} />
    </div>
  );
};

export default PropertyReviews;
