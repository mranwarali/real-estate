import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../../components/Breadcrumbs";
import PropertyReviews from "./PropertyReviews";

const BASE_API = import.meta.env.VITE_BASE_URL;

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_API}/property/get-property/${id}`);
        setProperty(res.data.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  const getImageUrl = (item) => {
    if (!item) return "https://demo01.houzez.co/wp-content/uploads/2016/03/205.jpg";
    if (typeof item === "string") return item;
    return item.url || item.secure_url || "";
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-100 rounded w-1/4 mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="h-[400px] bg-gray-200 rounded-2xl animate-pulse mb-6"></div>
            <div className="h-20 bg-gray-100 rounded-xl animate-pulse"></div>
          </div>
          <div className="h-[300px] bg-gray-100 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-500 flex items-center justify-center mx-auto mb-4 text-3xl">
          <i className="bx bx-error-circle"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Property Not Found</h2>
        <p className="text-gray-500 mt-2 mb-6">
          The property you are looking for may have been removed or sold.
        </p>
        <Link
          to="/properties"
          className="px-6 py-2.5 bg-(--primaryColor) text-white font-semibold rounded-xl"
        >
          Browse All Properties
        </Link>
      </div>
    );
  }

  const imagesList = property.images && property.images.length > 0
    ? property.images
    : ["https://demo01.houzez.co/wp-content/uploads/2016/03/205.jpg"];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs
        parentLabel="Properties"
        parentLink="/properties"
        currentLabel={property.title}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
        {/* Main Content Area (Left 2 cols) */}
        <div className="lg:col-span-2">
          {/* Header Title & Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              For {property.listingType}
            </span>
            <span className="bg-orange-100 text-(--primaryColor) text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {property.propertyType || "Residential"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 capitalize leading-tight">
            {property.title}
          </h1>

          <p className="text-sm text-gray-500 mt-2 flex items-center">
            <i className="bx bx-map text-(--primaryColor) mr-1 text-base"></i>
            <span>
              {property.address?.street ? `${property.address.street}, ` : ""}
              {property.address?.city || "City"}, {property.address?.state || "State"}
              {property.address?.zipcode ? ` - ${property.address.zipcode}` : ""}
            </span>
          </p>

          {/* Interactive Photo Gallery */}
          <div className="mt-6 space-y-3">
            {/* Featured Hero Photo */}
            <div className="w-full h-[280px] sm:h-[400px] md:h-[480px] overflow-hidden rounded-2xl shadow-lg bg-gray-100">
              <img
                src={getImageUrl(imagesList[selectedImageIndex] || imagesList[0])}
                className="w-full h-full object-cover transition-all duration-300"
                alt={property.title}
              />
            </div>

            {/* Thumbnail Row */}
            {imagesList.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`h-16 w-20 sm:h-20 sm:w-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImageIndex === idx
                        ? "border-(--primaryColor) ring-2 ring-orange-200 scale-105"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={getImageUrl(img)}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Features Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 py-6 border-y border-gray-100">
            <div className="p-3.5 bg-gray-50 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-(--primaryColor) flex items-center justify-center text-xl shrink-0">
                <i className="bx bx-bed"></i>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium leading-none">Bedrooms</p>
                <p className="text-base font-bold text-gray-800 mt-1">
                  {property.features?.bedroom || 0}
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-gray-50 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-(--primaryColor) flex items-center justify-center text-xl shrink-0">
                <i className="bx bx-bath"></i>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium leading-none">Bathrooms</p>
                <p className="text-base font-bold text-gray-800 mt-1">
                  {property.features?.bathroom || 0}
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-gray-50 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-(--primaryColor) flex items-center justify-center text-xl shrink-0">
                <i className="bx bx-ruler"></i>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium leading-none">Total Area</p>
                <p className="text-base font-bold text-gray-800 mt-1">
                  {property.features?.areaSqFt || 0} sqft
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-gray-50 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-(--primaryColor) flex items-center justify-center text-xl shrink-0">
                <i className="bx bx-car"></i>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium leading-none">Parking</p>
                <p className="text-base font-bold text-gray-800 mt-1">
                  {property.features?.parkingSpace ? `${property.features.parkingSpace} Cars` : "Available"}
                </p>
              </div>
            </div>
          </div>

          {/* Amenities if available */}
          {property.amenities && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Amenities & Facilities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(property.amenities).map(([key, val]) => (
                  <div
                    key={key}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold capitalize ${
                      val
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-gray-50 text-gray-400 border-gray-100"
                    }`}
                  >
                    <i
                      className={`bx ${
                        val ? "bx-check-circle text-emerald-600" : "bx-x text-gray-300"
                      } text-base`}
                    ></i>
                    <span>{key}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              About This Property
            </h2>
            <div className="text-gray-600 leading-relaxed text-sm sm:text-base space-y-3 whitespace-pre-line bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
              {property.description || "No description provided for this listing."}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-10">
            <PropertyReviews id={id} />
          </div>
        </div>

        {/* Right Sidebar: Sticky Price & Owner Card */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 p-6 border border-gray-200 rounded-2xl shadow-lg bg-white space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Listed Price
              </span>
              <p className="text-3xl font-extrabold text-(--primaryColor) mt-1">
                ₹{property.price?.amount ? Number(property.price.amount).toLocaleString("en-IN") : "Price on Request"}
                {property.listingType === "rent" && (
                  <span className="text-sm font-normal text-gray-500">/mo</span>
                )}
              </p>

              {property.price?.isNegotiable && (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mt-2 font-semibold">
                  <i className="bx bx-check"></i> Price is negotiable
                </span>
              )}
            </div>

            <hr className="border-gray-100" />

            {/* Owner Details Card */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Listed By
              </p>
              <div className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden shrink-0">
                  {property.owner?.avatar ? (
                    <img
                      src={property.owner?.avatar}
                      alt="owner"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <i className="bx bxs-user-circle text-4xl text-gray-400"></i>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {property.owner?.name || "Verified Property Owner"}
                  </p>
                  <p className="text-xs text-gray-500">Property Owner</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={`tel:${property.owner?.phone?.replace(/\D/g, "") || "9876543210"}`}
                className="w-full flex items-center justify-center gap-2 bg-(--primaryColor) hover:bg-(--primaryHoverColor) text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md shadow-orange-300 transition-all active:scale-95"
              >
                <i className="bx bx-phone-call text-lg"></i>
                <span>Call Property Owner</span>
              </a>

              {property.owner?.email && (
                <a
                  href={`mailto:${property.owner.email}`}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white py-2.5 px-4 rounded-xl font-semibold text-sm transition-all"
                >
                  <i className="bx bx-envelope text-lg"></i>
                  <span>Send Email</span>
                </a>
              )}
            </div>

            {/* Safety Tips Card */}
            <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100/60 text-xs text-gray-600 space-y-1">
              <p className="font-bold text-gray-800 flex items-center gap-1">
                <i className="bx bx-shield-quarter text-sm text-(--primaryColor)"></i> Safety Guarantee
              </p>
              <p className="text-gray-500 leading-relaxed">
                Do not transfer advance token money before inspecting the property and reviewing physical title deeds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
