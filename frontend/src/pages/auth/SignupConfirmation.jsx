import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { resendVerification } from "../../redux/auth/authSlice";
import toast from "react-hot-toast";

const SignupConfirmation = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);

  const email = location.state?.email;

  const handleResend = () => {
    if (email) {
      dispatch(resendVerification(email));
    } else {
      toast.error("Please go back and enter your email again.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/70 px-4 py-12">
      <div className="max-w-md w-full space-y-6 p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-100 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-orange-100 text-(--primaryColor) rounded-2xl flex items-center justify-center text-3xl">
            <i className="bx bx-envelope"></i>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900">
          Verify Your Email
        </h1>

        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          We've sent a confirmation link to{" "}
          <span className="font-bold text-gray-900">
            {email || "your email address"}
          </span>
          . Please click the link to activate your account.
        </p>

        <div className="p-3 bg-amber-50 rounded-xl text-amber-800 text-xs">
          💡 If you don't see it within a couple minutes, please check your <strong>spam or promotions folder</strong>.
        </div>

        <div className="pt-2">
          <p className="text-xs text-gray-400 mb-3">Still can't find it?</p>
          <button
            onClick={handleResend}
            disabled={loading}
            type="button"
            className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-(--primaryColor) hover:bg-(--primaryHoverColor) transition-all shadow-md shadow-orange-300 disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading && <i className="bx bx-loader-alt animate-spin text-base"></i>}
            <span>{loading ? "Sending..." : "Resend Verification Email"}</span>
          </button>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <Link
            to="/login"
            className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-(--primaryColor) inline-flex items-center gap-1 transition-colors"
          >
            <i className="bx bx-arrow-back text-base"></i> Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupConfirmation;
