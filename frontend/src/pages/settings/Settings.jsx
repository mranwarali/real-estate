import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Settings = () => {
  const location = useLocation();

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-64 space-y-2">
        <h2 className="text-xl font-bold text-gray-800 mb-6 px-4">Settings</h2>
        <nav>
          <Link
            to="/settings/general-settings"
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition ${
              location.pathname === "/settings/general-settings"
                ? "bg-green-50 text-green-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <i className="bx bx-cog text-lg"></i> General
          </Link>

          <Link
            to="/settings/profile"
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition ${
              location.pathname === "/settings/profile"
                ? "bg-green-50 text-green-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <i className="bx bx-user text-lg"></i> Profile
          </Link>

          <Link
            to="/settings/change-password"
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition ${
              location.pathname === "/settings/change-password"
                ? "bg-green-50 text-green-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <i className="bx bx-lock-alt text-lg"></i> Password
          </Link>

          {/* <Link
            to="/settings/notifications"
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition ${
              location.pathname === "/settings/notifications"
                ? "bg-green-50 text-green-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <i className="bx bx-bell text-lg"></i> Notifications
          </Link> */}
        </nav>
      </div>

      {/* --- Main Content Area --- */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
