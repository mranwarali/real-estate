import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import BigBanner from "../assets/images/banner-big.webp";
import SmallBanner from "../assets/images/banner-small.webp";
import { heroSection } from "../data/data";

const HeroSection = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    location: "",
    status: "rent",
  });
  const [loadingLocation, setLoadingLocation] = useState(false);
  const { heading, description } = heroSection;

  const handleSearch = (e) => {
    e.preventDefault();

    const query = new URLSearchParams();

    if (filters.location.trim()) {
      query.append("city", filters.location.trim());
    }

    if (filters.status) {
      query.append("listingType", filters.status);
    }

    const queryString = query.toString();
    navigate(`/properties${queryString ? `?${queryString}` : ""}`);
  };

  // fetch current location
  const handleAutoLocation = () => {
    if (!navigator.geolocation) {
      return toast.error("Geolocation is not supported by your browser");
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
          );
          const data = await response.json();

          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.state ||
            "";

          if (city) {
            setFilters((prev) => ({ ...prev, location: city }));
            toast.success(`Location set to ${city}`);
          } else {
            toast.error("Could not determine your city.");
          }
        } catch (error) {
          console.error("Location error:", error);
          toast.error("Failed to fetch location name");
        } finally {
          setLoadingLocation(false);
        }
      },
      () => {
        setLoadingLocation(false);
        toast.error("Location access denied");
      },
    );
  };

  return (
    <div className="relative min-h-[640px] md:min-h-[720px] lg:min-h-[780px] w-full flex items-center justify-center overflow-hidden py-14 md:py-20">
      {/* Background with Dark Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://demo01.houzez.co/wp-content/uploads/2016/03/miami-beach.jpg"
          className="w-full h-full object-cover"
          alt="Luxury waterfront properties"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/75 to-black/60"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle & Search */}
          <div className="col-span-1 md:col-span-7 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-orange-300 border border-white/15 backdrop-blur-sm mb-4">
              <i className="bx bx-badge-check text-sm"></i> #1 Real Estate Marketplace
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
              {heading.firstPart}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-(--primaryColor)">
                {heading.highlight}
              </span>{" "}
              {heading.lastPart}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-8 max-w-xl leading-relaxed opacity-90">
              {description}
            </p>

            {/* Search Box Card */}
            <form
              onSubmit={handleSearch}
              className="bg-white/95 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl shadow-2xl border border-white/20 flex flex-col md:flex-row gap-2 items-stretch"
            >
              {/* Location input with GPS button */}
              <div className="flex items-center gap-2 flex-1 px-3 py-2 sm:py-2.5 bg-gray-50/80 rounded-xl border border-gray-200/80 focus-within:border-orange-400 focus-within:bg-white transition-all">
                <button
                  type="button"
                  onClick={handleAutoLocation}
                  className={`p-1.5 rounded-lg text-(--primaryColor) hover:bg-orange-100 transition-colors shrink-0 ${
                    loadingLocation ? "animate-spin" : ""
                  }`}
                  title="Detect current location"
                  aria-label="Detect current location"
                >
                  <i
                    className={`bx ${
                      loadingLocation ? "bx-loader-alt" : "bx-target-lock"
                    } text-xl`}
                  ></i>
                </button>
                <input
                  type="text"
                  placeholder="City, locality or project..."
                  className="w-full py-1 focus:outline-none bg-transparent text-sm text-gray-800 placeholder-gray-400 font-medium"
                  value={filters.location}
                  onChange={(e) =>
                    setFilters({ ...filters, location: e.target.value })
                  }
                />
              </div>

              {/* Status / Listing Type Select */}
              <div className="flex items-center gap-2 px-3 py-2 sm:py-2.5 bg-gray-50/80 rounded-xl border border-gray-200/80 md:w-44 focus-within:border-orange-400 focus-within:bg-white transition-all shrink-0">
                <i className="bx bx-home-alt text-lg text-(--primaryColor) shrink-0"></i>
                <select
                  className="w-full py-1 focus:outline-none bg-transparent text-sm font-semibold text-gray-700 cursor-pointer"
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <option value="rent">For Rent</option>
                  <option value="sales">For Buy</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-(--primaryColor) hover:bg-(--primaryHoverColor) text-white px-6 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 transition-all active:scale-95 cursor-pointer"
              >
                <i className="bx bx-search text-lg"></i>
                <span>Search</span>
              </button>
            </form>

            {/* Quick search tags */}
            <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-gray-300">
              <span className="text-gray-400">Popular:</span>
              {["Apartment", "Villa", "Mumbai", "Noida", "Bengaluru"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    if (["Mumbai", "Noida", "Bengaluru"].includes(tag)) {
                      navigate(`/properties?city=${tag}`);
                    } else {
                      navigate(`/properties?propertyType=${tag}`);
                    }
                  }}
                  className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Composite Cards */}
          <div className="col-span-1 md:col-span-5 relative h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px] w-full max-w-md mx-auto flex items-center justify-center">
            {/* Primary Large Image */}
            <div className="absolute w-[80%] h-[78%] top-0 right-2 sm:right-4 z-10 transition duration-300 hover:scale-[1.02]">
              <img
                src={BigBanner}
                alt="Luxury Modern Architecture"
                className="w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-white/90"
              />
            </div>

            {/* Secondary Floating Image */}
            <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-[60%] h-[50%] z-20 transition duration-300 hover:scale-[1.02]">
              <img
                src={SmallBanner}
                alt="Interior Living Room"
                className="w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-white/90"
              />
            </div>

            {/* Floating Verified Badge */}
            <div className="absolute bottom-8 right-4 z-30 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-xl border border-gray-100 flex items-center gap-2.5 hidden sm:flex">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <i className="bx bx-check-shield text-xl"></i>
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-gray-800">100% Verified</p>
                <p className="text-[10px] text-gray-500">Genuine listings only</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
