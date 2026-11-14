import React, { useState } from "react";
import axios from "axios";
import { newsletterData } from "../data/data";
import toast from "react-hot-toast";

const BASE_API = import.meta.env.VITE_BASE_URL;

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_API}/newsletter/subscribe`, {
        email,
      });
      toast.success(
        res.data?.message || "Subscribed to newsletter successfully!",
      );
      setEmail("");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error subscribing to newsletter.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-6 py-8 md:py-12 border-b border-white/10">
      <div className="max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          {newsletterData.heading}
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          {newsletterData.description}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full md:w-auto flex flex-col sm:flex-row gap-2 max-w-md"
      >
        <div className="relative flex-1">
          <i className="bx bx-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/15 focus:border-(--primaryColor) focus:bg-white/15 rounded-xl outline-none text-white placeholder-gray-400 text-sm transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-(--primaryColor) hover:bg-(--primaryHoverColor) text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-orange-950/30 cursor-pointer shrink-0 disabled:opacity-60 flex items-center justify-center gap-1.5"
        >
          {loading && <i className="bx bx-loader-alt animate-spin"></i>}
          <span>{loading ? "Submitting..." : newsletterData.buttonText}</span>
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
