import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../redux/auth/authSlice";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      return toast.error("Password and Confirm Password must match!");
    }
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }
    try {
      await dispatch(signup(formData)).unwrap();
      navigate("/signup-confirmation", { state: { email: formData.email } });
      setFormData({
        name: "",
        email: "",
        password: "",
        cpassword: "",
      });
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50/70 px-4 py-12">
      <div className="max-w-md w-full space-y-6 p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-(--primaryColor) flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
            <i className="bx bx-user-plus"></i>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Create an Account
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Join thousands of real estate buyers, sellers & agents
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <i className="bx bx-user absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
              <input
                name="name"
                type="text"
                required
                className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 focus:border-(--primaryColor) focus:bg-white rounded-xl text-sm text-gray-900 outline-none transition-all placeholder-gray-400"
                placeholder="Rahul Sharma"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

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
                placeholder="rahul@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <i className="bx bx-lock-alt absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 focus:border-(--primaryColor) focus:bg-white rounded-xl text-sm text-gray-900 outline-none transition-all placeholder-gray-400"
                placeholder="At least 6 characters"
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

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <i className="bx bx-lock-alt absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
              <input
                name="cpassword"
                type={showCPassword ? "text" : "password"}
                required
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 focus:border-(--primaryColor) focus:bg-white rounded-xl text-sm text-gray-900 outline-none transition-all placeholder-gray-400"
                placeholder="Re-enter password"
                value={formData.cpassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 text-gray-400 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowCPassword(!showCPassword)}
                aria-label="Toggle confirm password visibility"
              >
                <i
                  className={`bx ${showCPassword ? "bx-hide" : "bx-show"} text-lg`}
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
              <span>{loading ? "Creating Account..." : "Create Account"}</span>
            </button>
          </div>

          <div className="text-center text-xs sm:text-sm text-gray-600 pt-2 border-t border-gray-100">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-(--primaryColor) hover:underline"
            >
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
