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
    if (!isAgreed) {
      toast.error("Please agree to the privacy policy to submit.");
      return;
    }
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_API}/contact/contact-us`, formData);
      toast.success(res.data?.message || "Form submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsAgreed(false);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error while submitting the form.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pb-2">
        Send Us a Message
      </h2>
      <p className="text-xs sm:text-sm text-gray-500 mb-6">
        Fill out this quick form and our team will be in touch shortly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            required
            placeholder="e.g. John Doe"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 border border-gray-200 text-sm rounded-xl outline-none focus:border-(--primaryColor) focus:ring-2 focus:ring-orange-100 transition-all text-gray-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 border border-gray-200 text-sm rounded-xl outline-none focus:border-(--primaryColor) focus:ring-2 focus:ring-orange-100 transition-all text-gray-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
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

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Your Message *
          </label>
          <textarea
            name="message"
            rows="4"
            required
            placeholder="Write your message, property queries, or request a call..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 border border-gray-200 text-sm rounded-xl outline-none focus:border-(--primaryColor) focus:ring-2 focus:ring-orange-100 transition-all text-gray-800"
          ></textarea>
        </div>

        <div className="flex items-start gap-2.5 pt-1">
          <input
            type="checkbox"
            name="consent"
            id="consent"
            checked={isAgreed}
            onChange={handleCheckbox}
            className="mt-0.5 w-4 h-4 accent-(--primaryColor) rounded cursor-pointer shrink-0"
            required
          />
          <label htmlFor="consent" className="text-xs text-gray-600 cursor-pointer select-none leading-relaxed">
            I consent to having this website store my submitted information so they can respond to my inquiry.
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 text-sm font-bold bg-(--primaryColor) hover:bg-(--primaryHoverColor) text-white rounded-xl shadow-md shadow-orange-300 transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading && <i className="bx bx-loader-alt animate-spin text-base"></i>}
          <span>{loading ? "Sending Message..." : "Send Message"}</span>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
