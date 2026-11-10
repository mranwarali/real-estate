import React from "react";
import axios from "axios";
import { newsletterData } from "../data/data";
import { useState } from "react";
import toast from "react-hot-toast";

const BASE_API = import.meta.env.VITE_BASE_URL;

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      // alert("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const res = await axios.post(`${BASE_API}/newsletter/subscribe`, {
        email,
      });
      toast.success(
        res.data.message || "Email Submitted For Newsletter Successfully",
      );
      setEmail("");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error While Submitting The Form.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="flex items-center justify-between flex-col md:flex-row py-5 md:py-13 border-b border-gray-300">
      <div className="mb-4 md:mb-0">
        <h2 className="text-3xl font-semibold text-[var(--whiteColor)] mb-4">
          {newsletterData.heading}
        </h2>
        <p className="text-md font-semibold text-[var(--whiteColor)]">
          {newsletterData.description}
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center border border-gray-300 overflow-hidden rounded-sm"
      >
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 outline-none bg-[var(--whiteColor)] text-[var(--grayColor)] text-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[var(--primaryColor)] text-[var(--whiteColor)] text-sm cursor-pointer"
        >
          {newsletterData.buttonText}
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
