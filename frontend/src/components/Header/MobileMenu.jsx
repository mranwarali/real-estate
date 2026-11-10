import React, { useState } from "react";
import { Link } from "react-router";

const MobileMenu = ({ isOpen, onClose, navLinks }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-110 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-70 bg-white shadow-2xl z-120 transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-5 flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={onClose}
              className="text-3xl text-(--grayColor) cursor-pointer"
            >
              <i className="bx bx-x"></i>
            </button>
          </div>

          {/* Nav Links */}
          <ul className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <li
                key={item.id}
                className="border-b border-gray-50 last:border-0"
              >
                {item.dropdownLinks ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className="flex items-center justify-between w-full py-3 text-(--grayColor) font-medium"
                    >
                      {item.name}
                      <i
                        className={`bx bx-chevron-down transition-transform ${activeDropdown === item.id ? "rotate-180" : ""}`}
                      ></i>
                    </button>

                    {/* Mobile Dropdown Items */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${activeDropdown === item.id ? "max-h-40 pb-2" : "max-h-0"}`}
                    >
                      {item.dropdownLinks.map((sub) => (
                        <Link
                          key={sub.id}
                          to={sub.link}
                          onClick={onClose}
                          className="block py-2 pl-4 text-sm text-gray-500 hover:text-(--primaryColor)"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.link}
                    onClick={onClose}
                    className="block py-3 text-(--grayColor) font-medium"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6">
            <button className="w-full text-white font-semibold py-3 bg-(--primaryColor) rounded-md">
              Post Property
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;