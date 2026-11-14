import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "../redux/user/userSlice";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(null);
  const { profile, loading } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const imageRef = useRef(null);
  const navigate = useNavigate();

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
        setEdit(null);
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      toast.error(err?.message || "Failed to update profile.");
    }
  };

  const handleImageClick = () => {
    imageRef.current.click();
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden p-5 sm:p-8">
      <div className="flex items-center gap-2.5 pb-5 border-b border-gray-100 mb-6">
        <div className="w-10 h-10 rounded-xl bg-orange-100 text-(--primaryColor) flex items-center justify-center text-xl">
          <i className="bx bx-user-circle"></i>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Personal Profile</h2>
          <p className="text-xs text-gray-500">Update your details and public avatar</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative group cursor-pointer" onClick={handleImageClick}>
            <img
              src={
                preview ||
                "https://img.freepik.com/premium-vector/user-icon-round-grey-icon_1076610-44912.jpg"
              }
              alt="Profile avatar"
              className="w-24 h-24 rounded-full border-4 border-orange-100 object-cover shadow-sm group-hover:opacity-80 transition-all"
            />
            <div className="absolute bottom-0 right-0 bg-(--primaryColor) p-2 rounded-full text-white text-xs shadow-md">
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
          <p className="text-xs text-gray-400 mt-2 font-medium">Click photo to upload new avatar</p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={edit !== "name"}
                className={`w-full px-3.5 py-2.5 pr-10 text-sm rounded-xl border transition-all outline-none ${
                  edit !== "name"
                    ? "bg-gray-50 text-gray-600 border-gray-200 cursor-not-allowed"
                    : "bg-white text-gray-900 border-(--primaryColor) ring-2 ring-orange-100"
                }`}
              />
              <button
                type="button"
                className="bx bx-edit-alt absolute top-1/2 -translate-y-1/2 right-3 text-lg cursor-pointer text-gray-400 hover:text-(--primaryColor)"
                onClick={() => handleEdit("name")}
                title="Edit field"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={edit !== "phone"}
                maxLength={10}
                className={`w-full px-3.5 py-2.5 pr-10 text-sm rounded-xl border transition-all outline-none ${
                  edit !== "phone"
                    ? "bg-gray-50 text-gray-600 border-gray-200 cursor-not-allowed"
                    : "bg-white text-gray-900 border-(--primaryColor) ring-2 ring-orange-100"
                }`}
              />
              <button
                type="button"
                className="bx bx-edit-alt absolute top-1/2 -translate-y-1/2 right-3 text-lg cursor-pointer text-gray-400 hover:text-(--primaryColor)"
                onClick={() => handleEdit("phone")}
                title="Edit field"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={edit !== "email"}
                className={`w-full px-3.5 py-2.5 pr-10 text-sm rounded-xl border transition-all outline-none ${
                  edit !== "email"
                    ? "bg-gray-50 text-gray-600 border-gray-200 cursor-not-allowed"
                    : "bg-white text-gray-900 border-(--primaryColor) ring-2 ring-orange-100"
                }`}
              />
              <button
                type="button"
                className="bx bx-edit-alt absolute top-1/2 -translate-y-1/2 right-3 text-lg cursor-pointer text-gray-400 hover:text-(--primaryColor)"
                onClick={() => handleEdit("email")}
                title="Edit field"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white text-gray-700 transition-all capitalize"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white text-gray-700 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-(--primaryColor) hover:bg-(--primaryHoverColor) text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-orange-300 transition-all cursor-pointer disabled:opacity-60 flex items-center gap-1.5"
          >
            {loading && <i className="bx bx-loader-alt animate-spin text-base"></i>}
            <span>{loading ? "Saving..." : "Save Profile Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
