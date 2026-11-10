import React from "react";
import { Link } from "react-router";

const Navigation = ({ navLinks }) => {
  return (
    <>
      {navLinks.map((navLink) => (
        <li key={navLink.id} className="relative group py-2 hidden md:block">
          <Link
            to={navLink.link}
            className="flex items-center gap-1 text-sm lg:text-md text-gray-700 font-medium hover:text-(--primaryColor) transition-colors"
          >
            {navLink.name}

            {navLink.dropdownLinks && (
              <span className="text-xs transition-transform group-hover:rotate-180">
                <i className="bx bx-chevron-down"></i>
              </span>
            )}
          </Link>

          {/* Dropdown Menu */}
          {navLink.dropdownLinks && (
            <ul className="absolute left-0 top-15 mt-0 w-48 bg-white border border-gray-100 shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              {navLink.dropdownLinks.map((subLink) => (
                <li key={subLink.id}>
                  <Link
                    to={subLink.link}
                    className="block px-4 py-2 text-sm lg:text-md text-gray-600 hover:bg-blue-50 hover:text-(--primaryColor)"
                  >
                    {subLink.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </>
  );
};

export default Navigation;
