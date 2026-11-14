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
    <section
      className="relative min-h-[360px] md:min-h-[400px] w-full flex items-center justify-center my-12 py-16"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#004274]/90 backdrop-blur-xs"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center">
        <div className="flex items-center justify-center flex-col text-center max-w-3xl space-y-5">
          <span className="text-xs font-bold tracking-wider uppercase text-white/90 px-3.5 py-1.5 bg-white/15 rounded-full backdrop-blur-xs border border-white/20">
            {content.topTitle}
          </span>

          <h3 className="text-2xl sm:text-3xl md:text-4xl text-white font-extrabold leading-tight">
            {content.mainHeading}
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 w-full sm:w-auto">
            <button
              className="w-full sm:w-auto px-7 py-3 bg-(--primaryColor) hover:bg-(--primaryHoverColor) text-white rounded-xl shadow-lg shadow-orange-950/20 font-bold text-sm transition-all active:scale-95 cursor-pointer"
              onClick={handleModalOpen}
            >
              {actions.primary.label}
            </button>

            <Link
              to={actions.secondary.link}
              className="w-full sm:w-auto px-7 py-3 bg-white/10 hover:bg-white text-white hover:text-gray-900 border border-white/30 rounded-xl font-bold text-sm transition-all text-center cursor-pointer backdrop-blur-xs"
            >
              {actions.secondary.label}
            </Link>
          </div>
        </div>
      </div>

      <EnquiryModal isOpen={isOpen} handleModalClose={handleModalClose} />
    </section>
  );
};

export default EnquirySection;
