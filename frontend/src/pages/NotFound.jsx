import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 min-h-[70vh] flex flex-col items-center justify-center text-center py-16">
      <div className="w-20 h-20 rounded-full bg-orange-100 text-(--primaryColor) flex items-center justify-center text-4xl mb-4">
        <i className="bx bx-error-alt"></i>
      </div>

      <h1 className="text-6xl sm:text-8xl md:text-9xl font-black text-(--primaryColor) tracking-tight">
        404
      </h1>

      <div className="h-1.5 w-16 rounded-full bg-(--primaryColor) my-4"></div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
        Page Not Found
      </h2>

      <p className="text-sm sm:text-base mt-2 text-gray-500 max-w-md">
        The page you are looking for might have been moved, removed, or doesn't exist.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 w-full sm:w-auto">
        <Link
          to="/"
          className="w-full sm:w-auto bg-(--primaryColor) hover:bg-(--primaryHoverColor) px-6 py-2.5 text-white font-bold text-sm rounded-xl shadow-md shadow-orange-300 transition-all active:scale-95"
        >
          Return Home
        </Link>
        <Link
          to="/contact"
          className="w-full sm:w-auto border border-gray-300 hover:bg-gray-50 px-6 py-2.5 text-gray-700 font-semibold text-sm rounded-xl transition-all"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
