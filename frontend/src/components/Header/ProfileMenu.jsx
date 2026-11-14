import React from "react";
import { Link } from "react-router";
import { userMenuData } from "../../data/data";

const ProfileMenu = ({ isLoggedIn, user, handleLogout }) => {
  const menuItems =
    isLoggedIn && user ? userMenuData.loggedInData : userMenuData.loggedOutData;

  return (
    <div className="relative group py-2 flex items-center">
      {isLoggedIn && user ? (
        <button
          type="button"
          className="rounded-full h-9 w-9 sm:h-10 sm:w-10 overflow-hidden border-2 border-orange-200 cursor-pointer focus:outline-none hover:ring-2 hover:ring-orange-300 transition-all"
          aria-label="User menu"
        >
          <img
            src={user.avatar || "https://img.freepik.com/premium-vector/user-icon-round-grey-icon_1076610-44912.jpg"}
            alt="user"
            className="h-full w-full object-cover"
          />
        </button>
      ) : (
        <button
          type="button"
          className="p-1 rounded-full text-gray-600 hover:text-(--primaryColor) transition-colors cursor-pointer focus:outline-none"
          aria-label="Sign in"
        >
          <i className="bx bx-user-circle text-2xl sm:text-3xl align-middle"></i>
        </button>
      )}

      {/* Dropdown Menu */}
      <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <ul className="w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-2 overflow-hidden">
          {isLoggedIn && user && (
            <li className="px-4 py-2 border-b border-gray-100">
              <p className="text-xs text-gray-400 font-medium uppercase">Signed in as</p>
              <p className="text-sm font-semibold text-gray-800 truncate">{user.name || "User"}</p>
            </li>
          )}

          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.action === "logout" && <hr className="border-gray-100 my-1" />}

              <li>
                {item.type === "link" ? (
                  <Link
                    to={item.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50/60 hover:text-(--primaryColor) transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileMenu;
