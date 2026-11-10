import React from "react";
import { useState } from "react";
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

  const handleSwich = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Delete Profile
  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#5a5a5a",
      confirmButtonText: "Yes, delete it!",
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
    <div className="flex-1 space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            Account Preferences
          </h3>
          <p className="text-sm text-gray-500">
            Manage your language and display settings.
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Language</p>
              <p className="text-xs text-gray-500">
                Select your preferred language.
              </p>
            </div>
            <select className="text-sm border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-green-500">
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            Email Notifications
          </h3>
          <p className="text-sm text-gray-500">
            Decide what updates you want to receive.
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Security Alerts
              </p>
              <p className="text-xs text-gray-500">
                Get notified about suspicious login attempts.
              </p>
            </div>
            <ToggleButton
              enabled={notifications.security}
              toggle={() => handleSwich("security")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Marketing Emails
              </p>
              <p className="text-xs text-gray-500">
                Receive news about new features and offers.
              </p>
            </div>
            <ToggleButton
              enabled={notifications.email}
              toggle={() => handleSwich("email")}
            />
          </div>
        </div>
      </div>

      {/* Security Quick Link */}
      {/* <div className="bg-red-50 border border-red-100 rounded-xl p-6 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-red-800 uppercase tracking-wider">
            Account Privacy
          </h4>
          <p className="text-sm text-red-600">
            Want to deactivate your account temporarily?
          </p>
        </div>
        <button className="px-4 py-2 bg-white border border-red-200 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-600 hover:text-white transition">
          Deactivate
        </button>
      </div>
    </div> */}

      {/* --- Delete Profile --- */}
      <div className="mt-10 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-bold text-red-600 uppercase tracking-wider mb-2">
          Danger Zone
        </h3>
        <div className="flex items-center justify-between p-4 bg-red-50 rounded-md border border-red-100">
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Delete this account
            </p>
            <p className="text-xs text-gray-500">
              Once you delete your account, there is no going back.
            </p>
          </div>
          <button
            onClick={handleDeleteAccount}
            type="button"
            className="text-sm font-semibold text-white px-4 py-2 bg-red-500 rounded-sm hover:bg-red-600 transition duration-300 cursor-pointer shadow-sm"
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
    onClick={toggle}
    className={`${
      enabled ? "bg-green-600" : "bg-gray-300"
    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer`}
  >
    <span
      className={`${
        enabled ? "translate-x-6" : "translate-x-1"
      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform `}
    />
  </button>
);

export default GeneralSettings;
