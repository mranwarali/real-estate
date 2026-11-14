import React from "react";
import ImagesSlider from "./ImagesSlider";
import { Link } from "react-router";

const PropertyDetailsModal = ({ selectedProperty, setSelectedProperty }) => {
  if (!selectedProperty) return null;

  const { title, description, price, features, images, _id, listingType, address, propertyType } =
    selectedProperty;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 transition-all"
      onClick={() => setSelectedProperty(null)}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProperty(null)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black bg-white/80 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center z-50 shadow-md transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <i className="bx bx-x text-2xl"></i>
        </button>

        {/* Image Slider */}
        <div className="h-56 sm:h-80 w-full overflow-hidden bg-gray-100 relative">
          <span className="absolute top-3 left-3 z-20 text-[11px] uppercase tracking-wider text-white font-bold bg-emerald-600 px-2.5 py-1 rounded-md shadow-sm">
            For {listingType}
          </span>
          {images && images.length > 0 ? (
            <ImagesSlider images={images} />
          ) : (
            <img
              src="https://demo01.houzez.co/wp-content/uploads/2016/03/205.jpg"
              className="w-full h-full object-cover"
              alt="placeholder"
            />
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 sm:p-6">
          {/* Title & Type */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-(--primaryColor) bg-orange-50 px-2 py-0.5 rounded">
                {propertyType || "Property"}
              </span>
              <h2 className="text-xl sm:text-2xl capitalize font-bold text-gray-900 leading-snug mt-1">
                {title}
              </h2>
            </div>
            {address?.city && (
              <p className="text-xs sm:text-sm text-gray-500 flex items-center shrink-0">
                <i className="bx bx-map text-(--primaryColor) mr-1 text-base"></i>
                <span>
                  {address.city}{address.state ? `, ${address.state}` : ""}
                </span>
              </p>
            )}
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-gray-700 my-4 py-3 border-y border-gray-100 bg-gray-50/50 rounded-xl px-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <i className="bx bx-bed text-xl text-(--primaryColor)"></i>
              <div>
                <p className="text-[11px] text-gray-400 leading-none">Beds</p>
                <p className="text-sm font-semibold">{features?.bedroom || 0}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <i className="bx bx-shower text-xl text-(--primaryColor)"></i>
              <div>
                <p className="text-[11px] text-gray-400 leading-none">Baths</p>
                <p className="text-sm font-semibold">{features?.bathroom || 0}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <i className="bx bx-ruler text-xl text-(--primaryColor)"></i>
              <div>
                <p className="text-[11px] text-gray-400 leading-none">Area</p>
                <p className="text-sm font-semibold">{features?.areaSqFt || 0} sqft</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Description
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {description
                ? description.slice(0, 200) + (description.length > 200 ? "..." : "")
                : "No description provided for this property listing."}
            </p>
          </div>

          {/* Price & Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-400 font-medium leading-none">Asking Price</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-(--primaryColor) mt-1">
                ₹{price?.amount ? Number(price.amount).toLocaleString("en-IN") : "Price on Request"}
                {listingType === "rent" && (
                  <span className="text-xs font-normal text-gray-500">/mo</span>
                )}
              </p>
            </div>

            <Link
              to={`/property/${_id}`}
              onClick={() => setSelectedProperty(null)}
              className="bg-(--primaryColor) hover:bg-(--primaryHoverColor) text-white px-6 py-2.5 rounded-xl font-bold text-center text-sm shadow-md shadow-orange-300 transition-all active:scale-95"
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
