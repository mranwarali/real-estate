import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";

const BASE_API = import.meta.env.VITE_BASE_URL;

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_API}/auth/reset-password/${token}`, {
        password,
      });
      toast.success(res.data?.message || "Password updated successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "Reset failed. Link may be expired or invalid.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md p-6 sm:p-8 bg-white border border-gray-100 rounded-2xl shadow-xl text-center space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-orange-100 text-(--primaryColor) flex items-center justify-center mx-auto text-2xl">
          <i className="bx bx-lock-open"></i>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Set New Password
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Choose a strong password with at least 6 characters.
          </p>
        </div>

        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              New Password
            </label>
            <div className="relative flex items-center">
              <i className="bx bx-lock-alt absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 focus:border-(--primaryColor) focus:bg-white rounded-xl text-sm text-gray-900 outline-none transition-all"
                required
              />
              <button
                type="button"
                className="absolute right-3 text-gray-400 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password"
              >
                <i
                  className={`bx ${showPassword ? "bx-hide" : "bx-show"} text-lg`}
                ></i>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <i className="bx bx-lock-alt absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
              <input
                type={showCPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 focus:border-(--primaryColor) focus:bg-white rounded-xl text-sm text-gray-900 outline-none transition-all"
                required
              />
              <button
                type="button"
                className="absolute right-3 text-gray-400 hover:text-gray-700"
                onClick={() => setShowCPassword(!showCPassword)}
                aria-label="Toggle confirm password"
              >
                <i
                  className={`bx ${showCPassword ? "bx-hide" : "bx-show"} text-lg`}
                ></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-(--primaryColor) hover:bg-(--primaryHoverColor) text-white text-sm font-bold rounded-xl shadow-md shadow-orange-300 transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <i className="bx bx-loader-alt animate-spin text-base"></i>}
            <span>{loading ? "Updating..." : "Update Password"}</span>
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

export default ResetPassword;
