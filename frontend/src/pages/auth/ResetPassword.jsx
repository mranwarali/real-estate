import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const BASE_API = import.meta.env.VITE_BASE_URL;

const ResetPassword = () => {
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password And Confirm Password Not Match!");
    }

    try {
      const res = await axios.post(`${BASE_API}/auth/reset-password/${token}`, {
        password,
      });
      toast.success(res.data.message || "Password updated successfully!");
      navigate("/login");
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "Reset failed. Link may be expired.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md p-8 flex flex-col gap-6 bg-white border border-gray-200 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Set New Password
            </h2>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full text-sm text-gray-700 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`bx ${showPassword ? "bx-hide" : "bx-show"} text-xl`}
                  ></i>
                </button>
              </div>
            </div>

            {/* Confirm Password  */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showCPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full text-sm text-gray-700 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowCPassword(!showCPassword)}
                >
                  <i
                    className={`bx ${showCPassword ? "bx-hide" : "bx-show"} text-xl`}
                  ></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-sm shadow-md transition-colors duration-200 cursor-pointer"
            >
              Update Password
            </button>
          </form>

          <div className="text-center">
            <a href="/login" className="text-sm text-blue-600 hover:underline">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
