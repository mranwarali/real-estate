import React, { useState } from "react";
import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
// import { getProperties } from "../redux/property/propertySlice";
import BigBanner from "../assets/images/banner-big.webp";
import SmallBanner from "../assets/images/banner-small.webp";
import { heroSection } from "../data/data";

const HeroSection = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    location: "",
    status: "rent",
  });
  const [loadingLocation, setLoadingLocation] = useState(false);
  const { heading, description } = heroSection;

  // const handleSearch = (e) => {
  //   e.preventDefault();

  //   const query = new URLSearchParams({
  //     location: filters.location,
  //     listingType: filters.listingType,
  //   }).toString();

  //   dispatch(getProperties(`?${query}`));

  //   //  Navigate listings page
  //   navigate(`/properties?${query}`);
  // };

  const handleSearch = (e) => {
    e.preventDefault();

    const query = new URLSearchParams();

    if (filters.location) {
      query.append("city", filters.location);
    }

    if (filters.status) {
      query.append("listingType", filters.status);
    }

    const queryString = query.toString();

    navigate(`/properties?${queryString}`);
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
          // location api
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
          );
          const data = await response.json();

          // Extract city, town, or village
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state;

          setFilters((prev) => ({ ...prev, location: city }));
          toast.success(`Location set to ${city}`);
        } catch (error) {
          toast.error(error, "Failed to fetch city name");
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
    <div className="relative min-h-[800px] w-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://demo01.houzez.co/wp-content/uploads/2016/03/miami-beach.jpg"
          className="w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="container mx-auto px-6 md:px-0 z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className=" z-10 px-4 w-full max-w-5xl col-span-1 md:col-span-7">
            {/* top heading  */}
            <h1 className="text-3xl md:text-5xl font-semibold text-white mb-8 max-w-xl mt-4 md:mt-0">
              {heading.firstPart}{" "}
              <span className="text-[#ff6655]">{heading.highlight}</span>{" "}
              {heading.lastPart}
            </h1>

            <p className="text-md text-white mb-6 max-w-xl opacity-90">
              {description}
            </p>

            <form
              onSubmit={handleSearch}
              className="bg-white p-1 md:p-2 rounded-sm shadow-2xl flex flex-col md:flex-row gap-2 items-center"
            >
              {/* auto location fetch  */}
              <div className="flex items-center gap-3 flex-1 w-full px-4 border-b md:border-b-0 md:border-r border-gray-100">
                <button
                  type="button"
                  onClick={handleAutoLocation}
                  className={`rounded-full hover:bg-gray-100 transition-colors cursor-pointer ${loadingLocation ? "animate-spin" : ""}`}
                  title="Use current location"
                >
                  <i
                    className={`bx ${loadingLocation ? "bx-loader-alt" : "bx-target-lock"} p-1 md:p-2 text-xl text-[var(--primaryColor)]`}
                  ></i>
                </button>
                <input
                  type="text"
                  placeholder="City or Locality..."
                  className="w-full py-3 focus:outline-none text-gray-700"
                  value={filters.location}
                  onChange={(e) =>
                    setFilters({ ...filters, location: e.target.value })
                  }
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-3 w-full md:w-48 px-4 border-b md:border-b-0 md:border-r border-gray-100">
                <i className="bx bx-home-alt text-2xl text-[var(--primaryColor)]"></i>
                <select
                  className="w-full py-3 focus:outline-none bg-transparent font-medium text-gray-700"
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <option value="rent">For Rent</option>
                  <option value="sales">For Buy</option>
                </select>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="bg-[var(--primaryColor)] hover:opacity-90 text-white w-full md:w-auto px-6 py-3 rounded-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
              >
                <i className="bx bx-search-alt-2 text-xl"></i>
                Search
              </button>
            </form>
          </div>
          <div className="col-span-1 md:col-span-5 relative h-[500px] flex items-start md:items-center justify-center">
            <div className="absolute w-[60%] md:w-[80%] h-[60%] md:h-[80%] z-10 hover:-translate-y-2 transition duration-300">
              <img
                src={BigBanner}
                alt="Main Banner"
                className="w-full h-full object-cover rounded-2xl shadow-2xl border-5 border-white"
              />
            </div>

            <div className="absolute bottom-15 md:-bottom-4 left-5 md:-left-4 w-[50%] md:w-[60%] h-[40%] md:h-[50%] z-20 hover:-translate-y-2 transition duration-300">
              <img
                src={SmallBanner}
                alt="Sub Banner"
                className="w-full h-full object-cover rounded-2xl shadow-2xl border-5 border-white"
              />
            </div>

            {/* <div className="absolute top-10 right-0 w-20 h-20 bg-[#ff6655] rounded-full filter blur-3xl opacity-20 -z-10"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
