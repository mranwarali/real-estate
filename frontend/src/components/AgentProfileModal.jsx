import React from "react";

const AgentProfileModal = ({ handleCloseModal, selectedAgent }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <i className="bx bx-x text-2xl"></i>
        </button>

        <div className="p-6 sm:p-8 flex flex-col items-center text-center">
          <div className="relative mb-3">
            <img
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover border-4 border-orange-100 shadow-lg"
              src={
                selectedAgent.avatar ||
                `https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg`
              }
              alt={selectedAgent.name}
            />
            <span className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs">
              <i className="bx bx-check"></i>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {selectedAgent.name}
          </h2>
          <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold text-(--primaryColor) bg-orange-50 mt-1 mb-4">
            Official Real Estate Agent
          </span>

          <div className="w-full space-y-3 text-left border-t border-gray-100 pt-4 text-sm">
            {selectedAgent.email && (
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-(--primaryColor) shrink-0">
                  <i className="bx bx-envelope text-lg"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] text-gray-400 uppercase font-semibold">Email</p>
                  <a
                    href={`mailto:${selectedAgent.email}`}
                    className="text-gray-800 hover:text-(--primaryColor) font-medium truncate block"
                  >
                    {selectedAgent.email}
                  </a>
                </div>
              </div>
            )}

            {selectedAgent.phone && (
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-(--primaryColor) shrink-0">
                  <i className="bx bx-phone text-lg"></i>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] text-gray-400 uppercase font-semibold">Phone</p>
                  <a
                    href={`tel:${selectedAgent.phone}`}
                    className="text-gray-800 hover:text-(--primaryColor) font-medium truncate block"
                  >
                    {selectedAgent.phone}
                  </a>
                </div>
              </div>
            )}

            <div className="pt-2">
              <p className="text-[11px] text-gray-400 uppercase font-semibold mb-1">About</p>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed bg-gray-50 p-3 rounded-xl">
                {selectedAgent.bio || "Certified real estate professional assisting with high-quality properties and smooth transactions."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full mt-6">
            {selectedAgent.phone && (
              <a
                href={`tel:${selectedAgent.phone}`}
                className="py-2.5 px-4 bg-(--primaryColor) hover:bg-(--primaryHoverColor) text-white rounded-xl font-bold text-xs sm:text-sm transition shadow-sm text-center flex items-center justify-center gap-1.5"
              >
                <i className="bx bx-phone-call"></i> Call Now
              </a>
            )}
            <button
              onClick={handleCloseModal}
              className={`py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold text-xs sm:text-sm transition text-center cursor-pointer ${
                !selectedAgent.phone ? "col-span-2" : ""
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfileModal;
