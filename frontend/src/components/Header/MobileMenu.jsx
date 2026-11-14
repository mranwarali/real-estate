import React, { useState } from "react";
import { Link } from "react-router";
import Logo from "../../assets/images/header-logo.svg";

const MobileMenu = ({ isOpen, onClose, navLinks, isLoggedIn, user, handleLogout }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 z-50 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[290px] sm:w-[320px] max-w-[85vw] bg-white shadow-2xl z-50 transition-transform duration-300 transform flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <Link to="/" onClick={onClose}>
            <img src={Logo} alt="Logo" className="h-7 w-auto" />
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <i className="bx bx-x text-2xl"></i>
          </button>
        </div>

        {/* User Card if logged in */}
        {isLoggedIn && user ? (
          <div className="p-4 bg-orange-50/50 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-orange-200 shrink-0">
              <img
                src={user.avatar || "https://img.freepik.com/premium-vector/user-icon-round-grey-icon_1076610-44912.jpg"}
                alt={user.name || "User"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {user.name || "My Account"}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email || ""}</p>
            </div>
          </div>
        ) : null}

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto p-4">
          <ul className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <li key={item.id} className="border-b border-gray-50 last:border-0 pb-1">
                {item.dropdownLinks ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className="flex items-center justify-between w-full py-2.5 text-[15px] text-gray-700 font-medium hover:text-(--primaryColor) transition-colors text-left"
                    >
                      <span>{item.name}</span>
                      <i
                        className={`bx bx-chevron-down text-lg transition-transform duration-200 ${
                          activeDropdown === item.id ? "rotate-180 text-(--primaryColor)" : ""
                        }`}
                      ></i>
                    </button>

                    {/* Mobile Dropdown Items */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        activeDropdown === item.id ? "max-h-56 pb-2" : "max-h-0"
                      }`}
                    >
                      <div className="pl-3 py-1 space-y-1 border-l-2 border-orange-200 ml-2">
                        {item.dropdownLinks.map((sub) => (
                          <Link
                            key={sub.id}
                            to={sub.link}
                            onClick={onClose}
                            className="block py-1.5 px-2 text-sm text-gray-600 hover:text-(--primaryColor) hover:bg-orange-50/50 rounded-md transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.link}
                    onClick={onClose}
                    className="block py-2.5 text-[15px] text-gray-700 font-medium hover:text-(--primaryColor) transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Account shortcuts */}
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-1">
            {isLoggedIn ? (
              <>
                <Link
                  to="/settings/profile"
                  onClick={onClose}
                  className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-(--primaryColor)"
                >
                  <i className="bx bx-user text-lg"></i>
                  <span>Profile Settings</span>
                </Link>
                <button
                  onClick={() => {
                    onClose();
                    handleLogout();
                  }}
                  className="flex items-center gap-2 py-2 text-sm text-red-500 hover:text-red-600 w-full text-left"
                >
                  <i className="bx bx-log-out text-lg"></i>
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="text-center py-2 px-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={onClose}
                  className="text-center py-2 px-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <Link
            to="/post-property"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full text-white font-semibold py-2.5 px-4 bg-(--primaryColor) hover:bg-(--primaryHoverColor) rounded-lg shadow-sm shadow-orange-200 transition-colors"
          >
            <i className="bx bx-plus-circle text-lg"></i>
            <span>Post Property Free</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
