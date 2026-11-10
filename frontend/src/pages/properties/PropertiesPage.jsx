import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getProperties, reset } from "../../redux/property/propertySlice";
import ImagesSlider from "./ImagesSlider";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useLocation } from "react-router";
import { getProperties } from "../../redux/property/propertySlice";
import PropertyDetailsModal from "./PropertyDetailsModal";
import { propertyList } from "../../data/data";

const PropertiesPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { properties, isLoading, error } = useSelector(
    (state) => state.property,
  );

  console.log("property page", properties);

  const [visiblecards, setVisibleCards] = useState(6);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    listingType: "",
    propertyType: "",
    priceRange: { min: "", max: "" },
    bedrooms: "",
    bathrooms: "",
    city: "",
    state: "",
    areaSqFt: { min: "", max: "" },
  });

  // Filtered properties
  const [filteredProperties, setFilteredProperties] = useState([]);

  const postTimeAgo = (date) => {
    const diff = new Date() - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  console.log("data", properties);

  //   useEffect(() => {
  //     dispatch(getProperties(location.search));
  //     return () => dispatch(reset());
  //   }, [dispatch, location.search]);

  useEffect(() => {
    dispatch(getProperties(location.search));
  }, [dispatch, location.search]);

  // apply filters when filters change
  useEffect(() => {
    if (!properties) return;

    let filtered = [...properties];

    // Filter by listing type
    if (filters.listingType) {
      filtered = filtered.filter(
        (property) =>
          property.listingType.toLowerCase() ===
          filters.listingType.toLowerCase(),
      );
    }

    // Filter by property type
    if (filters.propertyType) {
      filtered = filtered.filter(
        (property) =>
          property.propertyType.toLowerCase() ===
          filters.propertyType.toLowerCase(),
      );
    }

    // Filter by price range
    if (filters.priceRange.min || filters.priceRange.max) {
      filtered = filtered.filter((property) => {
        const price = property.price?.amount || 0;
        const min = filters.priceRange.min
          ? parseInt(filters.priceRange.min)
          : 0;
        const max = filters.priceRange.max
          ? parseInt(filters.priceRange.max)
          : Infinity;
        return price >= min && price <= max;
      });
    }

    // Filter by bedrooms
    if (filters.bedrooms) {
      filtered = filtered.filter(
        (property) => property.features?.bedroom >= parseInt(filters.bedrooms),
      );
    }

    // Filter by bathrooms
    if (filters.bathrooms) {
      filtered = filtered.filter(
        (property) =>
          property.features?.bathroom >= parseInt(filters.bathrooms),
      );
    }

    // Filter by city
    if (filters.city) {
      filtered = filtered.filter((property) =>
        property.address?.city
          ?.toLowerCase()
          .includes(filters.city.toLowerCase()),
      );
    }

    // Filter by state
    if (filters.state) {
      filtered = filtered.filter((property) =>
        property.address?.state
          ?.toLowerCase()
          .includes(filters.state.toLowerCase()),
      );
    }

    // Filter by area
    if (filters.areaSqFt.min || filters.areaSqFt.max) {
      filtered = filtered.filter((property) => {
        const area = property.features?.areaSqFt || 0;
        const min = filters.areaSqFt.min ? parseInt(filters.areaSqFt.min) : 0;
        const max = filters.areaSqFt.max
          ? parseInt(filters.areaSqFt.max)
          : Infinity;
        return area >= min && area <= max;
      });
    }

    setFilteredProperties(filtered);
    setVisibleCards(6); // Reset visible cards when filters change
  }, [properties, filters]);

  const handleFilterChange = (filterType, value) => {
    if (filterType.includes(".")) {
      // Handle nested filters
      const [parent, child] = filterType.split(".");
      setFilters((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      // Handle normal filters
      setFilters((prev) => ({
        ...prev,
        [filterType]: value,
      }));
    }
  };

  const clearFilters = () => {
    setFilters({
      listingType: "",
      propertyType: "",
      priceRange: { min: "", max: "" },
      bedrooms: "",
      bathrooms: "",
      city: "",
      state: "",
      areaSqFt: { min: "", max: "" },
    });
  };

  const loadMoreCards = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCards(visiblecards + 3);
      setLoading(false);
    }, 600);
  };

  // Get unique values for filter options
  const getUniqueValues = (key) => {
    if (!properties) return [];
    return [
      ...new Set(
        properties
          .map((property) => {
            if (key.includes(".")) {
              const [parent, child] = key.split(".");
              return property[parent]?.[child];
            }
            return property[key];
          })
          .filter(Boolean),
      ),
    ];
  };

  const displayProperties = filteredProperties || properties || [];

  if (isLoading) return <h2>Loading properties...</h2>;
  if (error) return <p>Error:</p>;

  return (
    <div className="container mx-auto">
      <Breadcrumbs currentLabel={"Properties"} />
      <div className="py-8 mb-2 px-4 sm:px-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {propertyList.heading}
        </h2>
        <p className="mt-2 text-base text-gray-600 ">
          {propertyList.description}
        </p>
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-1 gap-6 px-4 sm:px-0">
        {/* Filter Sidebar */}
        <div className="col-span-1">
          {/* show/hide filters button for mobile */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full px-4 py-2 bg-(--primaryColor) text-white rounded-lg flex items-center justify-center gap-2"
            >
              <i className="bx bx-filter"></i>
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          <div
            className={`bg-white rounded-lg shadow-lg p-6 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-(--primaryColor) hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Listing Type Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Listing Type
              </label>
              <select
                value={filters.listingType}
                onChange={(e) =>
                  handleFilterChange("listingType", e.target.value)
                }
                className="w-full px-3 py-2 text-sm test-[var(--grayColor)] border border-gray-300 rounded-md outline-none"
              >
                <option value="">All Types</option>
                <option value="sales">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            {/* Property Type Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) =>
                  handleFilterChange("propertyType", e.target.value)
                }
                className="w-full px-3 py-2 text-sm test-[var(--grayColor)] border border-gray-300 rounded-md outline-none"
              >
                <option value="">All Properties</option>
                {getUniqueValues("propertyType").map((type) => (
                  <option key={type} value={type} className="capitalize">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range (₹)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange.min}
                  onChange={(e) =>
                    handleFilterChange("priceRange.min", e.target.value)
                  }
                  className="w-1/2 px-3 py-2 text-sm test-[var(--grayColor)] border border-gray-300 rounded-md outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange.max}
                  onChange={(e) =>
                    handleFilterChange("priceRange.max", e.target.value)
                  }
                  className="w-1/2 px-3 py-2 text-sm test-[var(--grayColor)] border border-gray-300 rounded-md outline-none"
                />
              </div>
            </div>

            {/* Bedrooms Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Bedrooms
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
                className="w-full px-3 py-2 text-sm test-[var(--grayColor)] border border-gray-300 rounded-md outline-none"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            {/* Bathrooms Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Bathrooms
              </label>
              <select
                value={filters.bathrooms}
                onChange={(e) =>
                  handleFilterChange("bathrooms", e.target.value)
                }
                className="w-full px-3 py-2 text-sm test-[var(--grayColor)] border border-gray-300 rounded-md outline-none"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            {/* Location Filters */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                placeholder="Enter city"
                value={filters.city}
                onChange={(e) => handleFilterChange("city", e.target.value)}
                className="w-full px-3 py-2 text-sm test-[var(--grayColor)] border border-gray-300 rounded-md outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                placeholder="Enter state"
                value={filters.state}
                onChange={(e) => handleFilterChange("state", e.target.value)}
                className="w-full px-3 py-2 text-sm test-[var(--grayColor)] border border-gray-300 rounded-md outline-none"
              />
            </div>

            {/* Area Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area (Sq Ft)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.areaSqFt.min}
                  onChange={(e) =>
                    handleFilterChange("areaSqFt.min", e.target.value)
                  }
                  className="w-1/2 px-3 py-2 text-sm test-[var(--grayColor)] border border-gray-300 rounded-md outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.areaSqFt.max}
                  onChange={(e) =>
                    handleFilterChange("areaSqFt.max", e.target.value)
                  }
                  className="w-1/2 px-3 py-2 text-sm test-[var(--grayColor)] border border-gray-300 rounded-md outline-none"
                />
              </div>
            </div>

            {/* Results Count */}
            {/* <div className="mt-6 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Showing {Math.min(visiblecards, displayProperties.length)} of{" "}
                {displayProperties.length} properties
              </p>
            </div> */}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="col-span-1 lg:col-span-3">
          {displayProperties.length === 0 && !isLoading ? (
            <div className="text-center w-full py-10">
              <h3 className="text-xl text-gray-500">
                No properties found matching your filters.
              </h3>
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-(--primaryColor) text-white rounded-lg hover:opacity-90"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
              {displayProperties.slice(0, visiblecards).map((item) => (
                <div
                  key={item._id}
                  className="property-card flex flex-col h-full rounded-lg overflow-hidden shadow-lg bg-white border border-gray-100 transition-all hover:shadow-2xl hover:-translate-y-1 transition duration-300"
                >
                  <div className="relative w-full aspect-[4/3] sm:aspect-video md:aspect-[4/3] overflow-hidden">
                    <span className="absolute top-3 right-3 z-10 text-[10px] uppercase tracking-wider text-white font-bold bg-green-500 px-2 py-1 rounded shadow-sm">
                      For {item.listingType}
                    </span>

                    {item.images && item.images.length > 0 ? (
                      <ImagesSlider images={item.images} />
                    ) : (
                      <img
                        src="https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                        className="w-full h-full object-cover"
                        alt="placeholder"
                      />
                    )}

                    <i
                      className="bx bx-expand absolute text-xl right-10 bottom-5 p-2 bg-(--primaryColor)/20 rounded-sm text-(--primaryColor) cursor-pointer"
                      onClick={() => setSelectedProperty(item)}
                    ></i>
                  </div>

                  <PropertyDetailsModal
                    setSelectedProperty={setSelectedProperty}
                    selectedProperty={selectedProperty}
                  />

                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-1 capitalize hover:text-(--primaryColor) transition">
                        <a href={`/property/${item._id}`}>{item.title}</a>
                      </h3>
                    </div>

                    <p className="text-xs text-gray-500 mb-1 flex items-center">
                      <i className="bx bx-map me-1 text-blue-500"></i>
                      <span className="line-clamp-1">
                        {item.address?.city}, {item.address?.state}
                      </span>
                    </p>

                    <div className="flex items-center gap-4 text-gray-600 mb-1 text-sm border-y border-gray-50 py-2">
                      <span className="flex items-center">
                        <i className="bx bx-bed me-1"></i>
                        {item.features?.bedroom}
                      </span>
                      <span className="flex items-center">
                        <i className="bx bx-shower me-1"></i>
                        {item.features?.bathroom}
                      </span>
                      <span className="flex items-center">
                        <i className="bx bx-ruler me-1"></i>
                        {item.features?.areaSqFt}
                      </span>
                    </div>

                    <div className="mt-auto flex justify-between items-center">
                      <p className="text-lg font-bold text-(--primaryColor)">
                        ₹{item.price?.amount?.toLocaleString()}
                        {item.listingType === "rent" && (
                          <span className="text-xs font-normal">/mo</span>
                        )}
                      </p>
                      <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-100 px-2 py-1 rounded">
                        {item.propertyType}
                      </span>
                    </div>
                  </div>

                  <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200">
                        {item.owner?.avatar ? (
                          <img
                            src={item.owner.avatar}
                            className="w-full h-full object-cover"
                            alt="avatar"
                          />
                        ) : (
                          <i className="bx bxs-user-circle text-gray-400 text-3xl align-middle"></i>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-semibold text-gray-700 leading-tight">
                          {item.owner?.name
                            ? item.owner.name.split(" ")[0]
                            : "User"}
                        </span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                          Property Owner
                        </span>
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-400 italic">
                      {postTimeAgo(item.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {displayProperties.length > 0 &&
            visiblecards < displayProperties.length && (
              <div className="flex items-center justify-center mb-6">
                <button
                  className="px-4 py-2 text-white bg-(--primaryColor) cursor-pointer rounded-sm"
                  onClick={loadMoreCards}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
