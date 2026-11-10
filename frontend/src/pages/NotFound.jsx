import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-sm max-md:px-4 h-150 md:h-200">
      <h1 className="text-5xl md:text-9xl font-bold text-(--primaryColor)">
        404
      </h1>
      
      <div className="h-1 w-16 rounded bg-(--primaryColor) my-5 md:my-7"></div>
      
      <p className="text-xl md:text-3xl font-bold text-(--grayColor)">
        Page Not Found
      </p>
      
      <p className="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      
      <div className="flex items-center gap-4 mt-6">
        <Link
          to="/"
          className="bg-(--grayColor) hover:bg-black px-4 md:px-7 py-2.5 text-white rounded-sm active:scale-95 transition-all"
        >
          Return Home
        </Link>
        <Link
          to="/contact-us"
          className="border border-gray-300 px-4 md:px-7 py-2.5 text-(--grayColor) rounded-sm active:scale-95 transition-all"
        >
          Contact support
        </Link>
      </div>
    </div>
  );
};

export default NotFound;