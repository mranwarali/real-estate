import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";

const Settings = () => {
  const location = useLocation();

  const navItems = [
    {
      to: "/settings/general-settings",
      path: "/settings/general-settings",
      alias: "/settings",
      icon: "bx-cog",
      label: "General",
    },
    {
      to: "/settings/profile",
      path: "/settings/profile",
      icon: "bx-user",
      label: "Profile",
    },
    {
      to: "/settings/change-password",
      path: "/settings/change-password",
      icon: "bx-lock-alt",
      label: "Security",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-5xl">
      <Breadcrumbs currentLabel={"Account Settings"} />

      <div className="my-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Manage your personal profile, notification preferences and account security.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
        {/* Navigation Sidebar / Mobile Horizontal Tabs */}
        <div className="w-full md:w-60 shrink-0">
          <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 bg-gray-50 p-2 rounded-2xl border border-gray-100">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.alias && location.pathname === item.alias);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 md:shrink md:w-full ${
                    isActive
                      ? "bg-white text-(--primaryColor) shadow-sm border border-gray-100"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                  }`}
                >
                  <i className={`bx ${item.icon} text-lg`}></i>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Content Outlet */}
        <div className="flex-1 w-full min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Settings;
