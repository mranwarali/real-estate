import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";

const BASE_API = import.meta.env.VITE_BASE_URL;

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_API}/auth/forget-password`, {
        email,
      });
      toast.success(res.data.message);
      setEmail("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      const errorMsg =
        error.response?.data?.error ||
        "Something went wrong. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  const newLocal = <div>
    <label
      htmlFor="email"
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      Email Address
    </label>
    <input
      id="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter Email"
      className="w-full text-sm text-gray-700 px-4 py-2 border border-gray-300 rounded-sm outline-none transition-all"
      required />
  </div>;
  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md p-8 flex flex-col gap-6 bg-white border border-gray-200 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Forgot Password?
            </h2>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {newLocal}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-sm shadow-md transition-colors duration-200 cursor-pointer"
            >
              {loading ? "Loading..." : "Send Reset Link"}
            </button>
          </form>

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm font-semibold text-gray-500 text-center"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
