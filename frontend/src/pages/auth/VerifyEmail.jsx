import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BASE_API = import.meta.env.VITE_BASE_URL;

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("verifying");
  const navigate = useNavigate();
  const verificationStarted = useRef(false);

  useEffect(() => {
    if (verificationStarted.current) return;
    const verifyAccount = async () => {
      if (!token) {
        setStatus("error");
        return;
      }

      try {
        verificationStarted.current = true;
        await axios.get(`${BASE_API}/auth/verify-email/${token}`);
        setStatus("success");
        setTimeout(() => navigate("/login"), 3000);
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
      }
    };

    verifyAccount();
  }, [token, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/70 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center transition-all">
        {status === "verifying" && (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-(--primaryColor) flex items-center justify-center mx-auto text-3xl animate-spin">
              <i className="bx bx-loader-alt"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Verifying Email...
              </h2>
              <p className="text-gray-500 mt-1 text-xs sm:text-sm">
                Please wait a moment while we confirm your email address.
              </p>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-4xl shadow-sm">
              <i className="bx bx-check"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Email Verified!
              </h2>
              <p className="text-gray-500 mt-1 text-xs sm:text-sm">
                Your email has been confirmed. Redirecting you to login...
              </p>
            </div>
            <Link
              to="/login"
              className="mt-4 inline-block px-6 py-2.5 bg-(--primaryColor) text-white font-bold text-xs sm:text-sm rounded-xl shadow-md"
            >
              Go to Login
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-4xl shadow-sm">
              <i className="bx bx-error-circle"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Invalid or Expired Link
              </h2>
              <p className="text-gray-500 mt-1 text-xs sm:text-sm">
                This verification link has expired or has already been used.
              </p>
            </div>
            <Link
              to="/login"
              className="mt-4 inline-flex items-center gap-1.5 px-6 py-2.5 bg-gray-900 hover:bg-black text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all"
            >
              <i className="bx bx-log-in text-base"></i>
              <span>Back to Login</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
