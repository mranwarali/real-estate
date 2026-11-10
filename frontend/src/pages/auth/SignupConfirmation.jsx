import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { resendVerification } from "../../redux/auth/authSlice";

const SignupConfirmation = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);

  const email = location.state?.email;

  const handleResend = () => {
    if (email) {
      dispatch(resendVerification(email));
    } else {
      alert("Please go back and enter your email again.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-xl shadow-lg border border-gray-100 text-center">
        <div className="flex justify-center">
          <div className="bg-green-100 rounded-full">
            <i className="bx bx-envelope text-3xl text-green-500 p-3"></i>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900">Verify your email</h2>

        <p className="text-sm text-gray-600 leading-relaxed">
          We've sent a verification link to{" "}
          <span className="font-semibold text-gray-800">
            {email || "abc@email.com"}
          </span>
          . Please click it to activate your account. Check your{" "}
          <b>spam folder</b> if you don't see it.
        </p>

        <div className="pt-4">
          <p className="text-sm text-gray-500 mb-4">Still can't find it?</p>
          <button
            onClick={handleResend}
            disabled={loading}
            type="button"
            className={`w-full py-3 px-4 rounded-lg text-sm font-semibold text-white transition-all cursor-pointer ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 shadow-md"
            }`}
          >
            {loading ? "Sending..." : "Resend Verification Email"}
          </button>
        </div>
        <Link
          to="/login"
          className="text-sm font-semibold text-gray-500 text-center"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default SignupConfirmation;
