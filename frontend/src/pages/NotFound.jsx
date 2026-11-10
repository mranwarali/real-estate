import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    // <div className="h-dvh flex items-center justify-center">
    <div class="flex flex-col items-center justify-center text-sm max-md:px-4 h-[600px] md:h-[800px]">
      <h1 class="text-5xl md:text-9xl font-bold text-[var(--primaryColor)]">
        404
      </h1>
      <div class="h-1 w-16 rounded bg-[var(--primaryColor)] my-5 md:my-7"></div>
      <p class="text-xl md:text-3xl font-bold text-[var(--grayColor)]">
        Page Not Found
      </p>
      <p class="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <div class="flex items-center gap-4 mt-6">
        <Link
          to="/"
          class="bg-[var(--grayColor)] hover:bg-black px-4 md:px-7 py-2.5 text-white rounded-sm active:scale-95 transition-all"
        >
          Return Home
        </Link>
        <Link
          to="/contact-us"
          class="border border-gray-300 px-4 md:px-7 py-2.5 text-[var(--grayColor)] rounded-sm active:scale-95 transition-all"
        >
          Contact support
        </Link>
      </div>
    </div>
    // </div>
  );
};

export default NotFound;
