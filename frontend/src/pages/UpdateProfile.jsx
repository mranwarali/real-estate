import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProfile, updateProfile } from "../redux/user/userSlice";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(null);
  const { profile, loading } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const imageRef = useRef(null);
  const navigate = useNavigate();
  console.log("profile", profile);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    dob: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");

  const handleEdit = (inputName) => {
    setEdit(edit === inputName ? null : inputName);
  };

  useEffect(() => {
    if (isLoggedIn && !profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, isLoggedIn, profile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        gender: profile.gender || "",
        dob: profile.dob
          ? new Date(profile.dob).toISOString().split("T")[0]
          : "",
      });
      setPreview(profile.avatar || "");
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("gender", formData.gender);
    data.append("dob", formData.dob);
    if (avatar) {
      data.append("avatar", avatar);
    }
    try {
      const resultAction = await dispatch(updateProfile(data)).unwrap();

      if (resultAction) {
        setAvatar(null);
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  // // Delete Profile
  // const handleDeleteAccount = () => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#5a5a5a",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         await dispatch(deleteProfile()).unwrap();
  //         dispatch(logout());
  //         Swal.fire({
  //           title: "Deleted!",
  //           text: "Your account has been successfully removed.",
  //           icon: "success",
  //         });
  //         navigate("/signup");
  //       } catch (error) {
  //         Swal.fire({
  //           title: "Error!",
  //           text: error || "Something went wrong. Please try again.",
  //           icon: "error",
  //         });
  //       }
  //     }
  //   });
  // };

  const handleImageClick = () => {
    imageRef.current.click();
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="max-w-5xl mx-auto border border-gray-300 shadow-lg p-6 bg-white rounded-md">
      <div className="flex items-center justify-center gap-3 mb-5">
        <i className="bx bxs-user-circle text-3xl text-green-600"></i>
        <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            <img
              src={
                preview ||
                "https://img.freepik.com/premium-vector/user-icon-round-grey-icon_1076610-44912.jpg"
              }
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-200 cursor-pointer object-cover hover:opacity-80 transition duration-300"
              onClick={handleImageClick}
            />
            <div className="absolute bottom-0 right-0 bg-green-500 p-1 rounded-full text-white text-xs">
              <i className="bx bxs-camera"></i>
            </div>
            <input
              ref={imageRef}
              type="file"
              name="avatar"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <p className="text-xs text-gray-400">Click photo to change</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={edit !== "name"}
                className={`block w-full rounded-sm border border-gray-300 px-3 py-2 pr-10 text-sm text-gray-600 outline-none transition-colors focus:border-green-500 ${
                  edit !== "name"
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white"
                }`}
              />
              <i
                className="bx bx-edit-alt absolute top-2 right-2 text-xl cursor-pointer text-blue-400"
                onClick={() => handleEdit("name")}
              ></i>
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Phone
            </label>
            <div className="relative">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={edit !== "phone"}
                className={`block w-full rounded-sm border border-gray-300 px-3 py-2 pr-10 text-sm text-gray-600 outline-none transition-colors focus:border-green-500 ${
                  edit !== "phone"
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white"
                }`}
                maxLength={10}
              />
              <i
                className="bx bx-edit-alt absolute top-2 right-2 text-xl cursor-pointer text-blue-400"
                onClick={() => handleEdit("phone")}
              ></i>
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={edit !== "email"}
                className={`block w-full rounded-sm border border-gray-300 px-3 py-2 pr-10 text-sm text-gray-600 outline-none transition-colors focus:border-green-500 ${
                  edit !== "email"
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white"
                }`}
              />
              <i
                className="bx bx-edit-alt absolute top-2 right-2 text-xl cursor-pointer text-blue-400"
                onClick={() => handleEdit("email")}
              ></i>
            </div>
          </div>
        </div>

        {/* Gender Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 outline-none text-gray-600 block w-full rounded-sm text-sm focus:border-green-500 transition-colors"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* DOB Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 outline-none text-gray-600 block w-full rounded-sm text-sm focus:border-green-500 transition-colors"
            maxLength={10}
          />
        </div>

        <div className="flex items-center justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-sm text-sm text-white cursor-pointer transition-all ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* --- Delete Profile --- */}
      {/* <div className="mt-10 pt-6 border-t border-gray-200">
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
      </div> */}
    </div>
  );
};
export default UpdateProfile;
