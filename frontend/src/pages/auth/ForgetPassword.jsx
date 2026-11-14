import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

const BASE_API = import.meta.env.VITE_BASE_URL;

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      return toast.error("Please enter your registered email address.");
    }
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_API}/auth/forget-password`, {
        email,
      });
      toast.success(res.data?.message || "Reset link sent to your email!");
      setEmail("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const errorMsg =
        error.response?.data?.error ||
        "Something went wrong. Please check your email.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md p-6 sm:p-8 bg-white border border-gray-100 rounded-2xl shadow-xl text-center space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-orange-100 text-(--primaryColor) flex items-center justify-center mx-auto text-2xl">
          <i className="bx bx-key"></i>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Forgot Password?
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Enter your account email and we'll send you a password reset link.
          </p>
        </div>

        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-gray-700 mb-1.5"
            >
              Email Address
            </label>
            <div className="relative">
              <i className="bx bx-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 focus:border-(--primaryColor) focus:bg-white rounded-xl text-sm text-gray-900 outline-none transition-all placeholder-gray-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-(--primaryColor) hover:bg-(--primaryHoverColor) text-white text-sm font-bold rounded-xl shadow-md shadow-orange-300 transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <i className="bx bx-loader-alt animate-spin text-base"></i>}
            <span>{loading ? "Sending link..." : "Send Reset Link"}</span>
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100">
          <Link
            to="/login"
            className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-(--primaryColor) inline-flex items-center gap-1 transition-colors"
          >
            <i className="bx bx-arrow-back text-base"></i> Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
