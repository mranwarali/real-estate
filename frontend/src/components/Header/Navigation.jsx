import React from "react";
import { Link, useLocation } from "react-router";

const Navigation = ({ navLinks }) => {
  const location = useLocation();

  const isCurrentActive = (link, dropdownLinks) => {
    if (dropdownLinks) {
      return dropdownLinks.some((sub) => location.pathname === sub.link || location.pathname + location.search === sub.link);
    }
    return location.pathname === link;
  };

  return (
    <>
      {navLinks.map((navLink) => {
        const isActive = isCurrentActive(navLink.link, navLink.dropdownLinks);
        return (
          <li key={navLink.id} className="relative group py-2">
            <Link
              to={navLink.link}
              className={`flex items-center gap-1 text-sm lg:text-[15px] font-medium transition-colors ${
                isActive
                  ? "text-(--primaryColor) font-semibold"
                  : "text-gray-700 hover:text-(--primaryColor)"
              }`}
            >
              {navLink.name}

              {navLink.dropdownLinks && (
                <span className="text-base transition-transform duration-200 group-hover:rotate-180">
                  <i className="bx bx-chevron-down"></i>
                </span>
              )}
            </Link>

            {/* Dropdown Menu */}
            {navLink.dropdownLinks && (
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <ul className="w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-2 overflow-hidden">
                  {navLink.dropdownLinks.map((subLink) => (
                    <li key={subLink.id}>
                      <Link
                        to={subLink.link}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-orange-50/60 hover:text-(--primaryColor) transition-colors"
                      >
                        {subLink.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </>
  );
};

export default Navigation;
