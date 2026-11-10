import React, { useState } from "react";
import bgImage from "../assets/images/enquirybg.jpg";
import { enquiryBanner } from "../data/data";
import { Link } from "react-router";
import EnquiryModal from "./EnquiryModal";

const EnquirySection = () => {
  const { content, actions } = enquiryBanner;
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };
  return (
    <div
      className="h-100 w-full relative mt-12"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#004274cc]/80"></div>
      <div className="container mx-auto flex items-center justify-center h-full">
        <div className="z-10 flex items-center justify-center flex-col space-y-6">
          <h6 className="text-sm font-bold text-white p-2 bg-gray-50/30 rounded-lg">
            {content.topTitle}
          </h6>

          <h3 className="text-2xl md:text-3xl text-white font-semibold max-w-230 text-center">
            {content.mainHeading}
          </h3>
          <div className="flex items-center gap-4">
            <button
              className="px-6 py-2 border border-[var(--whiteColor)] text-white rounded-md hover:bg-[var(--primaryColor)] transition-colors font-semibold cursor-pointer"
              onClick={handleModalOpen}
            >
              {actions.primary.label}
            </button>

            <Link
              to={actions.secondary.link}
              className="px-6 py-2 bg-white text-[var(--primaryColor)] rounded-md hover:bg-gray-100 transition-colors font-semibold cursor-pointer"
            >
              {actions.secondary.label}
            </Link>
          </div>
        </div>
      </div>
      <EnquiryModal isOpen={isOpen} handleModalClose={handleModalClose} />
    </div>
  );
};

export default EnquirySection;
