import React, { useState } from "react";
import Swal from "sweetalert2";
import { deleteProfile } from "../../redux/user/userSlice";
import { logout } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const GeneralSettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState({
    security: true,
    email: false,
  });

  const handleSwitch = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Delete Profile
  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete your account and all listed properties!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#eb6753",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteProfile()).unwrap();
          dispatch(logout());
          Swal.fire({
            title: "Deleted!",
            text: "Your account has been successfully removed.",
            icon: "success",
          });
          navigate("/signup");
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error || "Something went wrong. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Account Preferences Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">
            Regional & Language Preferences
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage your default currency, language, and measurement units.
          </p>
        </div>
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-800">Display Language</p>
              <p className="text-xs text-gray-400">
                Choose the language you prefer for property listings.
              </p>
            </div>
            <select className="text-xs sm:text-sm border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 outline-none focus:border-(--primaryColor) text-gray-700">
              <option>English (India)</option>
              <option>Hindi (हिंदी)</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">
            Notification Preferences
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Control which messages and alerts you receive.
          </p>
        </div>
        <div className="p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Security & Account Alerts
              </p>
              <p className="text-xs text-gray-400">
                Get notified when logins or profile changes occur.
              </p>
            </div>
            <ToggleButton
              enabled={notifications.security}
              toggle={() => handleSwitch("security")}
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Property Inquiries & Updates
              </p>
              <p className="text-xs text-gray-400">
                Receive email alerts when buyers contact you about your listings.
              </p>
            </div>
            <ToggleButton
              enabled={notifications.email}
              toggle={() => handleSwitch("email")}
            />
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="p-5 sm:p-6 bg-red-50/60 rounded-2xl border border-red-200/80">
        <h3 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1">
          Danger Zone
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3">
          <div>
            <p className="text-sm font-bold text-gray-900">
              Permanently Delete Account
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Once you delete your account, there is no going back. All listings will be removed.
            </p>
          </div>
          <button
            onClick={handleDeleteAccount}
            type="button"
            className="text-xs font-bold text-white px-5 py-2.5 bg-red-500 hover:bg-red-600 rounded-xl transition shadow-xs cursor-pointer shrink-0 self-start sm:self-center"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

const ToggleButton = ({ enabled, toggle }) => (
  <button
    type="button"
    onClick={toggle}
    className={`${
      enabled ? "bg-(--primaryColor)" : "bg-gray-300"
    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer shrink-0`}
    aria-label="Toggle setting"
  >
    <span
      className={`${
        enabled ? "translate-x-6" : "translate-x-1"
      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-xs`}
    />
  </button>
);

export default GeneralSettings;
