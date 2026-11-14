import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BASE_API = import.meta.env.VITE_BASE_URL;

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { oldPassword, newPassword, confirmPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("New password and Confirm password do not match.");
    }

    if (newPassword.length < 6) {
      return toast.error("New password must be at least 6 characters long.");
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_API}/user/change-password`,
        { oldPassword, newPassword },
        { withCredentials: true },
      );

      toast.success(response.data?.message || "Password updated successfully!");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => {
        navigate("/settings");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update password. Please check your current password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden p-5 sm:p-8">
      <div className="flex items-center gap-2.5 pb-5 border-b border-gray-100 mb-6">
        <div className="w-10 h-10 rounded-xl bg-orange-100 text-(--primaryColor) flex items-center justify-center text-xl">
          <i className="bx bx-shield-quarter"></i>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Security & Password</h2>
          <p className="text-xs text-gray-500">Ensure your account is using a secure password</p>
        </div>
      </div>

      <form className="space-y-4 max-w-lg" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="oldPassword"
            className="block text-xs font-semibold text-gray-700 mb-1.5"
          >
            Current Password
          </label>
          <div className="relative flex items-center">
            <input
              id="oldPassword"
              name="oldPassword"
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              className="w-full text-sm text-gray-800 px-3.5 py-2.5 pr-10 border border-gray-200 bg-gray-50 focus:bg-white focus:border-(--primaryColor) rounded-xl outline-none transition-all"
              required
            />
            <button
              type="button"
              className="absolute right-3 text-gray-400 hover:text-gray-700"
              onClick={() => setShowOld(!showOld)}
              aria-label="Toggle password visibility"
            >
              <i className={`bx ${showOld ? "bx-hide" : "bx-show"} text-lg`}></i>
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block text-xs font-semibold text-gray-700 mb-1.5"
          >
            New Password
          </label>
          <div className="relative flex items-center">
            <input
              id="newPassword"
              name="newPassword"
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className="w-full text-sm text-gray-800 px-3.5 py-2.5 pr-10 border border-gray-200 bg-gray-50 focus:bg-white focus:border-(--primaryColor) rounded-xl outline-none transition-all"
              required
            />
            <button
              type="button"
              className="absolute right-3 text-gray-400 hover:text-gray-700"
              onClick={() => setShowNew(!showNew)}
              aria-label="Toggle password visibility"
            >
              <i className={`bx ${showNew ? "bx-hide" : "bx-show"} text-lg`}></i>
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-xs font-semibold text-gray-700 mb-1.5"
          >
            Confirm New Password
          </label>
          <div className="relative flex items-center">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter new password"
              className="w-full text-sm text-gray-800 px-3.5 py-2.5 pr-10 border border-gray-200 bg-gray-50 focus:bg-white focus:border-(--primaryColor) rounded-xl outline-none transition-all"
              required
            />
            <button
              type="button"
              className="absolute right-3 text-gray-400 hover:text-gray-700"
              onClick={() => setShowConfirm(!showConfirm)}
              aria-label="Toggle password visibility"
            >
              <i className={`bx ${showConfirm ? "bx-hide" : "bx-show"} text-lg`}></i>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto py-2.5 px-6 bg-(--primaryColor) hover:bg-(--primaryHoverColor) text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-orange-300 transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-1.5"
          >
            {loading && <i className="bx bx-loader-alt animate-spin text-base"></i>}
            <span>{loading ? "Updating..." : "Update Password"}</span>
          </button>
          <button
            type="button"
            onClick={() => navigate("/settings")}
            className="w-full sm:w-auto py-2.5 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer text-center"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
