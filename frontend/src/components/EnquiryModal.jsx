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
    console.log("my form data", formData);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Submitting to MongoDB:", formData);

    try {
      const res = await axios.post(
        `${BASE_API}/enquiry/submit-enquiry`,
        formData,
      );
      toast.success(res.data.message || "Form Sunbmitted Successfully");
      setFormData(res.data);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error While Submitting The Form.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      handleModalClose();
    }, 2000);

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      propertyType: "",
      location: "",
      message: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-300 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">
            Property Enquiry
          </h2>
          <button
            onClick={handleModalClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            <i className="bx bx-x"></i>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="">
            <label className="block text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 text-sm rounded outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 text-sm rounded outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 text-sm rounded outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Property Type *
              </label>
              <select
                name="propertyType"
                required
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 text-sm rounded outline-none capitalize"
              >
                <option value="" className="text-gray-700">
                  Select Type
                </option>
                {propertyOptions.map((opt) => (
                  <option key={opt} value={opt} className="text-gray-600">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location *
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 text-sm rounded outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 text-sm rounded outline-none"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={handleModalClose}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
            >
              ws Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm bg-(--primaryColor) text-white rounded hover:bg-(--primaryColor)/90 transition cursor-pointer"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
