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

  const { oldPassword, newPassword, confirmPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match. Please try again.");
    }

    try {
      const response = await axios.put(
        `${BASE_API}/user/change-password`,
        { oldPassword, newPassword },
        { withCredentials: true },
      );

      toast.success(response.data.message || "Password updated successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto shadow-lg bg-white rounded-m">
      <div className="flex items-center justify-center">
        <div className="w-full p-8 bg-white border border-gray-200 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 pb-6">
              Set New Password
            </h2>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Current Password
              </label>
              <input
                id="oldPassword"
                name="oldPassword"
                type="password"
                value={oldPassword}
                onChange={handleChange}
                placeholder="Enter Current Password"
                className="w-full text-sm text-gray-700 px-4 py-2 border border-gray-300 rounded-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={handleChange}
                placeholder="Enter New Password"
                className="w-full text-sm text-gray-700 px-4 py-2 border border-gray-300 rounded-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Enter Confirm Password"
                className="w-full text-sm text-gray-700 px-4 py-2 border border-gray-300 rounded-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-sm shadow-md transition-colors duration-200 cursor-pointer mt-2"
              >
                Update Password
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full py-2 px-4 bg-white hover:bg-gary-100 text-gray-700 text-sm font-semibold rounded-sm border border-gray-400 shadow-md transition-colors duration-200 cursor-pointer mt-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
