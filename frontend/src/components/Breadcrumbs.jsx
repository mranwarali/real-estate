import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ parentLabel, parentLink, currentLabel }) => {
  return (
    <nav className="flex py-3 overflow-hidden text-xs sm:text-sm" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1.5 sm:space-x-2 flex-wrap">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center font-medium text-gray-500 hover:text-(--primaryColor) transition-colors"
          >
            <i className="bx bx-home text-base mr-1"></i>
            <span>Home</span>
          </Link>
        </li>

        {parentLabel && (
          <li className="inline-flex items-center">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <i className="bx bx-chevron-right text-gray-400 text-base"></i>
              <Link
                to={parentLink || "#"}
                className="font-medium text-gray-500 hover:text-(--primaryColor) transition-colors"
              >
                {parentLabel}
              </Link>
            </div>
          </li>
        )}

        {currentLabel && (
          <li aria-current="page" className="inline-flex items-center">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <i className="bx bx-chevron-right text-gray-400 text-base shrink-0"></i>
              <span className="font-semibold text-gray-800 max-w-35 sm:max-w-xs md:max-w-md truncate capitalize">
                {currentLabel}
              </span>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
