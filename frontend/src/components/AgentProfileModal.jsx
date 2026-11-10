import React from "react";

const AgentProfileModal = ({ handleCloseModal, selectedAgent }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          &times;
        </button>

        <div className="p-8 flex flex-col items-center">
          <img
            className="h-32 w-32 rounded-full object-cover border-4 border-blue-500 mb-4"
            src={
              selectedAgent.avatar ||
              `https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg`
            }
            alt=""
          />
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedAgent.name}
          </h2>
          <p className="text-blue-600 font-medium mb-4">Official Agent</p>

          <div className="w-full space-y-3 text-left border-t pt-4">
            <div className="flex items-center text-gray-700">
              <span className="font-bold w-20">Email:</span>
              <span className="text-gray-600">
                {selectedAgent.email || "N/A"}
              </span>
            </div>
            <div className="flex items-center text-gray-700">
              <span className="font-bold w-20">Phone:</span>
              <span className="text-gray-600">
                {selectedAgent.phone || "N/A"}
              </span>
            </div>
            <div className="mt-4">
              <span className="font-bold block text-gray-700">Bio:</span>
              <p className="text-gray-600 text-sm leading-relaxed mt-1">
                {selectedAgent.bio || "No biography provided."}
              </p>
            </div>
          </div>

          <button
            onClick={handleCloseModal}
            className="mt-8 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentProfileModal;
