import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_API = import.meta.env.VITE_BASE_URL;

const FetchPropertyReviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      //   if (!id) return;
      //   setLoading(true);
      try {
        const res = await axios.get(`${BASE_API}/review/fetch-reviews/${id}`);
        const data = res.data?.data || [];

        console.log("reviews", data);

        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  if (loading) return <p className="text-gray-500">Loading reviews...</p>;

  return (
    <div className="space-y-6 mb-4">
      <h3 className="text-2xl font-bold mb-4">Reviews ({reviews.length})</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review._id}
            className="flex gap-4 py-4 rounded-lg border border-gray-50"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
              {review.userName?.[0] || "U"}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{review.userName}</span>
                <span className="text-yellow-500 text-sm">
                  {/*  <span>
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>  */}

                  <span className="flex text-yellow-500 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`bx ${i < review.rating ? "bxs-star" : "bx-star"}`}
                      ></i>
                    ))}
                  </span>
                </span>
              </div>
              <p className="text-gray-600 mt-1">{review.comment}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No reviews yet.</p>
      )}
    </div>
  );
};

export default FetchPropertyReviews;
