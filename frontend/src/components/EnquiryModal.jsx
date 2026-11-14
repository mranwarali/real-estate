import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const BASE_API = import.meta.env.VITE_BASE_URL;

const EnquiryModal = ({ isOpen, handleModalClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyType: "",
    location: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const propertyOptions = [
    "house",
    "apartment",
    "condo",
    "villa",
    "studio",
    "land",
    "commercial",
    "office",
    "warehouse",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${BASE_API}/enquiry/submit-enquiry`,
        formData,
      );
      toast.success(res.data?.message || "Enquiry submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        propertyType: "",
        location: "",
        message: "",
      });
      setTimeout(() => {
        handleModalClose();
      }, 1200);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error while submitting the form.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/70">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Property Enquiry
            </h2>
            <p className="text-xs text-gray-500">We'll get back to you within 24 hours</p>
          </div>
          <button
            onClick={handleModalClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <i className="bx bx-x text-2xl"></i>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="e.g. Rahul Sharma"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 border border-gray-200 text-sm rounded-xl outline-none focus:border-(--primaryColor) focus:ring-2 focus:ring-orange-100 transition-all text-gray-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 border border-gray-200 text-sm rounded-xl outline-none focus:border-(--primaryColor) focus:ring-2 focus:ring-orange-100 transition-all text-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 border border-gray-200 text-sm rounded-xl outline-none focus:border-(--primaryColor) focus:ring-2 focus:ring-orange-100 transition-all text-gray-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Property Type *
              </label>
              <select
                name="propertyType"
                required
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 border border-gray-200 text-sm rounded-xl outline-none focus:border-(--primaryColor) focus:ring-2 focus:ring-orange-100 transition-all capitalize text-gray-800 cursor-pointer"
              >
                <option value="">Select Type</option>
                {propertyOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Target Location *
              </label>
              <input
                type="text"
                name="location"
                required
                placeholder="e.g. Mumbai, Bandra"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 border border-gray-200 text-sm rounded-xl outline-none focus:border-(--primaryColor) focus:ring-2 focus:ring-orange-100 transition-all text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Message or Requirements
            </label>
            <textarea
              name="message"
              rows="3"
              placeholder="Tell us what you're looking for (budget, move-in date, etc.)"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 border border-gray-200 text-sm rounded-xl outline-none focus:border-(--primaryColor) focus:ring-2 focus:ring-orange-100 transition-all text-gray-800"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={handleModalClose}
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-sm font-bold bg-(--primaryColor) hover:bg-(--primaryHoverColor) text-white rounded-xl shadow-md shadow-orange-300 transition cursor-pointer disabled:opacity-60 flex items-center gap-1.5"
            >
              {loading && <i className="bx bx-loader-alt animate-spin"></i>}
              <span>{loading ? "Submitting..." : "Send Enquiry"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
