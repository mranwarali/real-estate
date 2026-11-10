import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { login, logout } from "../../redux/auth/authSlice";
import CircularProgress from "@mui/joy/CircularProgress";

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn, error } = useSelector((state) => state.auth.isLoggedIn);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email || !formData.password) {
      return toast.error("Please enter both email and password");
    }

    try {
      await dispatch(login(formData)).unwrap();
      toast.success("Welcome back!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      if (
        error === "Email not verified" ||
        error?.includes("verify your email")
      ) {
        toast.info("Please verify your email before logging in.");

        navigate("/signup-confirmation", { state: { email: formData.email } });
      } else {
        toast.error(error || "Login failed. Please check your credentials.");
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn && error === "Invalid token") {
      dispatch(logout());
    }
  }, [navigate, isLoggedIn, dispatch, error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Login</h2>
          <p className="mt-2 text-sm text-gray-600">Welcome Back!</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
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
                className="rounded-lg block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none sm:text-sm"
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

            <Link
              to="/forget-password"
              className="text-sm text-blue-500 hover:text-blue-600 text-end block mt-1"
            >
              Forgot Password?
            </Link>
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
                "Login"
              )}
            </button>
          </div>

          <div className="flex flex-col items-center space-y-4 text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
