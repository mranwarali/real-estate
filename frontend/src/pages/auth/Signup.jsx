import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../redux/auth/authSlice";
import { toast } from "react-hot-toast";
import CircularProgress from "@mui/joy/CircularProgress";

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
      return toast.error("Password And Confirm Password Should Match");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">Join us today!</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 ml-1">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                className="rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none sm:text-sm"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 ml-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                className="rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none sm:text-sm"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 ml-1">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none sm:text-sm"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div
                  className="absolute right-3 cursor-pointer text-gray-500 hover:text-gray-700 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`bx ${showPassword ? "bx-hide" : "bx-show"} text-xl`}
                  ></i>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 ml-1">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="cpassword"
                  // FIX 1: Use showCPassword state here
                  type={showCPassword ? "text" : "password"}
                  required
                  className="rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none sm:text-sm"
                  placeholder="••••••••"
                  value={formData.cpassword}
                  onChange={handleChange}
                />
                <div
                  className="absolute right-3 cursor-pointer text-gray-500 hover:text-gray-700 flex items-center"
                  // FIX 2: Toggle showCPassword state here
                  onClick={() => setShowCPassword(!showCPassword)}
                >
                  <i
                    className={`bx ${showCPassword ? "bx-hide" : "bx-show"} text-xl`}
                  ></i>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white cursor-pointer ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } focus:outline-none transition-colors duration-200`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <CircularProgress size="sm" />
                  Processing...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          <div className="flex flex-col items-center space-y-4 text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
