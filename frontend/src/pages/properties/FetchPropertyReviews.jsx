import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_API = import.meta.env.VITE_BASE_URL;

const FetchPropertyReviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${BASE_API}/review/fetch-reviews/${id}`);
        const data = res.data?.data || [];
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchReviews();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-16 bg-gray-100 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      <h3 className="text-base font-bold text-gray-900">
        Customer Reviews ({reviews.length})
      </h3>

      {reviews.length > 0 ? (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="p-4 rounded-xl border border-gray-100 bg-white shadow-xs flex items-start gap-3.5"
            >
              <div className="w-9 h-9 rounded-full bg-orange-100 text-(--primaryColor) flex items-center justify-center font-bold text-sm shrink-0">
                {review.userName ? review.userName[0].toUpperCase() : "U"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <span className="font-bold text-sm text-gray-800">
                    {review.userName || "Verified Tenant"}
                  </span>
                  <div className="flex text-amber-400 text-xs">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`bx ${
                          star <= (review.rating || 5) ? "bxs-star" : "bx-star"
                        }`}
                      ></i>
                    ))}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-xs sm:text-sm text-gray-500">
            No reviews yet. Be the first to share your experience with this property!
          </p>
        </div>
      )}
    </div>
  );
};

export default FetchPropertyReviews;
