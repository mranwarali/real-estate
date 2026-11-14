import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { login, logout } from "../../redux/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, error, loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      return toast.error("Please enter both email and password");
    }

    try {
      await dispatch(login(formData)).unwrap();
      toast.success("Welcome back!");
      setTimeout(() => {
        navigate("/");
      }, 800);
      setFormData({
        email: "",
        password: "",
      });
    } catch (err) {
      if (
        err === "Email not verified" ||
        err?.includes?.("verify your email")
      ) {
        toast("Please verify your email before logging in.", { icon: "ℹ️" });
        navigate("/signup-confirmation", { state: { email: formData.email } });
      } else {
        toast.error(err || "Login failed. Please check your credentials.");
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn && error === "Invalid token") {
      dispatch(logout());
    }
  }, [navigate, isLoggedIn, dispatch, error]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50/70 px-4 py-12">
      <div className="max-w-md w-full space-y-6 p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-(--primaryColor) flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
            <i className="bx bx-log-in-circle"></i>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Sign in to manage your properties and saved searches
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <i className="bx bx-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
              <input
                name="email"
                type="email"
                required
                className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 focus:border-(--primaryColor) focus:bg-white rounded-xl text-sm text-gray-900 outline-none transition-all placeholder-gray-400"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-700">
                Password
              </label>
              <Link
                to="/forget-password"
                className="text-xs text-(--primaryColor) hover:underline font-semibold"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="relative flex items-center">
              <i className="bx bx-lock-alt absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 focus:border-(--primaryColor) focus:bg-white rounded-xl text-sm text-gray-900 outline-none transition-all placeholder-gray-400"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className="absolute right-3 text-gray-400 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                <i
                  className={`bx ${showPassword ? "bx-hide" : "bx-show"} text-lg`}
                ></i>
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 text-sm font-bold rounded-xl text-white bg-(--primaryColor) hover:bg-(--primaryHoverColor) shadow-md shadow-orange-300 transition-all cursor-pointer disabled:opacity-60"
            >
              {loading && <i className="bx bx-loader-alt animate-spin text-base"></i>}
              <span>{loading ? "Signing in..." : "Sign In"}</span>
            </button>
          </div>

          <div className="text-center text-xs sm:text-sm text-gray-600 pt-2 border-t border-gray-100">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-(--primaryColor) hover:underline"
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
