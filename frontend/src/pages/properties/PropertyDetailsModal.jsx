import React from "react";
import ImagesSlider from "./ImagesSlider";
import { Link } from "react-router";

const PropertyDetailsModal = ({ selectedProperty, setSelectedProperty }) => {
  if (!selectedProperty) return null;

  const { title, description, price, features, images, _id, listingType } =
    selectedProperty;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/10 backdrop-blur-sm p-4 transition-all"
      onClick={() => setSelectedProperty(null)}
    >
      <div
        className="bg-white rounded-md shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProperty(null)}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center z-50 transition-colors cursor-pointer"
        >
          <i className="bx bx-x"></i>
        </button>

        {/* image section */}
        <div className="h-64 sm:h-96 w-full overflow-hidden">
          {images && images.length > 0 ? (
            <ImagesSlider images={images} />
          ) : (
            <img
              src="https://via.placeholder.com/800x600?text=No+Image+Available"
              className="w-full h-full object-cover"
              alt="placeholder"
            />
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/*Title & Type */}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl capitalize font-semibold text-gray-900 leading-tight">
              {title}
            </h2>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
              For {listingType}
            </span>
          </div>

          {/* Quick Specs */}
          <div className="flex flex-wrap gap-6 text-gray-600 mb-6 py-4 border-y border-gray-100">
            <div className="flex items-center gap-2">
              <i className="bx bx-bed text-xl text-[var(--primaryColor)]"></i>
              <span className="font-medium">
                {features?.bedroom || 0} Bedrooms
              </span>
            </div>
            <div className="flex items-center gap-2">
              <i className="bx bx-shower text-xl text-[var(--primaryColor)]"></i>
              <span className="font-medium">
                {features?.bathroom || 0} Baths
              </span>
            </div>
            <div className="flex items-center gap-2">
              <i className="bx bx-ruler text-xl text-[var(--primaryColor)]"></i>
              <span className="font-medium">
                {features?.areaSqFt || 0} sqft
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h4 className="text-sm font-bold uppercase text-gray-400 mb-2">
              Description
            </h4>
            <p className="text-gray-600 leading-relaxed italic">
              {description.slice(0, 150) ||
                "No description provided for this featured listing."}
              ...
            </p>
          </div>

          <div className="flex items-center justify-between bg-gray-50 -mx-6 -mb-6 p-6 mt-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 font-medium">
                Total Price
              </span>
              <span className="text-3xl font-black text-[var(--primaryColor)]">
                ₹{price?.amount?.toLocaleString()}
                {listingType === "rent" && (
                  <span className="text-sm font-normal">/mo</span>
                )}
              </span>
            </div>
            <Link
              to={`/property/${_id}`}
              onClick={() => setSelectedProperty(null)}
              className="bg-[var(--primaryColor)] hover:opacity-90 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              View Full Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;
