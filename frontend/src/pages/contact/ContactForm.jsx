import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_API = import.meta.env.VITE_BASE_URL;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    setIsAgreed(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAgreed) return;
    setLoading(true);

    console.log("Submitting to MongoDB:", formData);

    try {
      const res = await axios.post(`${BASE_API}/contact/contact-us`, formData);
      toast.success(res.data.message || "Form Sunbmitted Successfully");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsAgreed(false);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error While Submitting The Form.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700 text-center pb-4">
        Contact Us
      </h2>

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

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="consent"
            id="consent"
            checked={isAgreed}
            onChange={handleCheckbox}
            className="cursor-pointer"
            required
          />
          <label htmlFor="consent" className="text-[14px] text-gray-700">
            I consent to having this website store my submitted information
          </label>
        </div>

        {/* <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button> */}
        <button
          type="submit"
          className="px-6 py-2 w-full text-sm bg-[var(--primaryColor)] text-white rounded hover:bg-[var(--primaryColor)]/90 transition cursor-pointer"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {/* </div> */}
      </form>
    </>
  );
};

export default ContactForm;
