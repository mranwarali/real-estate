import React from "react";
import { Link } from "react-router";
import { userMenuData } from "../../data/data";

const ProfileMenu = ({ isLoggedIn, user, handleLogout }) => {
  const menuItems =
    isLoggedIn && user ? userMenuData.loggedInData : userMenuData.loggedOutData;
  return (
    <>
      <div className="relative group py-2 flex items-center">
        {isLoggedIn && user ? (
          <div className="rounded-full h-10 w-10 overflow-hidden border border-gray-200 cursor-pointer">
            <img
              src={user.avatar}
              alt="user"
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <i className="bx bx-user-circle text-3xl text-gray-600 cursor-pointer hover:text-[var(--primaryColor)] transition-colors"></i>
        )}

        {/* The User Dropdown Menu */}
        <ul className="absolute right-0 top-15 mt-2 w-40 bg-white border border-gray-100 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
          {/* {isLoggedIn && user ? (
            <>
              <li>
                <Link
                  to="/settings/profile"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-[var(--primaryColor)]"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-[var(--primaryColor)]"
                >
                  Account Settings
                </Link>
              </li>

              <hr className="border-gray-100" />
              <li>
                <button
                  className="w-full text-left block px-4 py-3 text-sm text-[var(--primaryColor)] hover:bg-red-50 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-[var(--primaryColor)]"
              >
                Login/Signup
              </Link>
            </li>
          )} */}

          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.action === "logout" && <hr className="border-gray-100" />}

              <li>
                {item.type === "link" ? (
                  <Link
                    to={item.path}
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-[var(--primaryColor)] transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-3 text-sm text-[var(--primaryColor)] hover:bg-red-50 cursor-pointer transition-colors"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProfileMenu;
