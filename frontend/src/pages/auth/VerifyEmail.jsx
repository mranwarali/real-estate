import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
        setTimeout(() => navigate("/login"), 4000);
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
      }
    };

    verifyAccount();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center transition-all">
        {status === "verifying" && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <i className="bx bx-loader-alt bx-spin text-6xl text-emerald-500"></i>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">
                Verifying...
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Please wait while we confirm your email address.
              </p>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <div className="bg-emerald-100 p-4 rounded-full animate-pulse">
                <i className="bx bxs-check-shield text-6xl text-emerald-600"></i>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">
                Email Verified!
              </h2>
              <p className="text-gray-500 mt-2">
                Awesome! You're all set. Redirecting you to login...
              </p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="bg-red-100  rounded-full">
                <i className="bx bx-error-circle text-4xl text-red-600 p-4"></i>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">
                Invalid Link
              </h2>
              <p className="text-gray-500 mt-2">
                Please check if the link is valid or resend verification email.
              </p>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-2 px-6 rounded-md transition-all shadow-lg"
            >
              <i className="bx bx-log-in-circle text-xl"></i>
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
