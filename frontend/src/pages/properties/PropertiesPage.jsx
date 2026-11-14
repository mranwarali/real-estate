import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImagesSlider from "./ImagesSlider";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useLocation, Link } from "react-router";
import { getProperties } from "../../redux/property/propertySlice";
import PropertyDetailsModal from "./PropertyDetailsModal";
import { propertyList } from "../../data/data";

const PropertiesPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { properties, isLoading, error } = useSelector(
    (state) => state.property,
  );

  const [visiblecards, setVisibleCards] = useState(9);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  // Read URL query params on initial load
  const initialParams = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      listingType: params.get("listingType") || "",
      propertyType: params.get("propertyType") || "",
      city: params.get("city") || "",
    };
  }, [location.search]);

  // Filter states
  const [filters, setFilters] = useState({
    listingType: initialParams.listingType,
    propertyType: initialParams.propertyType,
    priceRange: { min: "", max: "" },
    bedrooms: "",
    bathrooms: "",
    city: initialParams.city,
    state: "",
    areaSqFt: { min: "", max: "" },
  });

  // Sync state if URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters((prev) => ({
      ...prev,
      listingType: params.get("listingType") || prev.listingType,
      propertyType: params.get("propertyType") || prev.propertyType,
      city: params.get("city") || prev.city,
    }));
  }, [location.search]);

  const postTimeAgo = (date) => {
    if (!date) return "Recently";
    const diff = new Date() - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years}y ago`;
    if (months > 0) return `${months}mo ago`;
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  useEffect(() => {
    dispatch(getProperties(location.search));
  }, [dispatch, location.search]);

  // Computed active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.listingType) count++;
    if (filters.propertyType) count++;
    if (filters.priceRange.min || filters.priceRange.max) count++;
    if (filters.bedrooms) count++;
    if (filters.bathrooms) count++;
    if (filters.city) count++;
    if (filters.state) count++;
    if (filters.areaSqFt.min || filters.areaSqFt.max) count++;
    return count;
  }, [filters]);

  // Apply filters & sorting
  const displayProperties = useMemo(() => {
    if (!properties || !Array.isArray(properties)) return [];

    let filtered = [...properties];

    // Filter by listing type
    if (filters.listingType) {
      filtered = filtered.filter(
        (p) =>
          p.listingType?.toLowerCase() === filters.listingType.toLowerCase(),
      );
    }

    // Filter by property type
    if (filters.propertyType) {
      filtered = filtered.filter(
        (p) =>
          p.propertyType?.toLowerCase() === filters.propertyType.toLowerCase(),
      );
    }

    // Filter by price range
    if (filters.priceRange.min || filters.priceRange.max) {
      filtered = filtered.filter((p) => {
        const price = p.price?.amount || 0;
        const min = filters.priceRange.min
          ? parseInt(filters.priceRange.min, 10)
          : 0;
        const max = filters.priceRange.max
          ? parseInt(filters.priceRange.max, 10)
          : Infinity;
        return price >= min && price <= max;
      });
    }

    // Filter by bedrooms
    if (filters.bedrooms) {
      filtered = filtered.filter(
        (p) => (p.features?.bedroom || 0) >= parseInt(filters.bedrooms, 10),
      );
    }

    // Filter by bathrooms
    if (filters.bathrooms) {
      filtered = filtered.filter(
        (p) => (p.features?.bathroom || 0) >= parseInt(filters.bathrooms, 10),
      );
    }

    // Filter by city
    if (filters.city.trim()) {
      filtered = filtered.filter((p) =>
        p.address?.city
          ?.toLowerCase()
          .includes(filters.city.trim().toLowerCase()),
      );
    }

    // Filter by state
    if (filters.state.trim()) {
      filtered = filtered.filter((p) =>
        p.address?.state
          ?.toLowerCase()
          .includes(filters.state.trim().toLowerCase()),
      );
    }

    // Filter by area
    if (filters.areaSqFt.min || filters.areaSqFt.max) {
      filtered = filtered.filter((p) => {
        const area = p.features?.areaSqFt || 0;
        const min = filters.areaSqFt.min
          ? parseInt(filters.areaSqFt.min, 10)
          : 0;
        const max = filters.areaSqFt.max
          ? parseInt(filters.areaSqFt.max, 10)
          : Infinity;
        return area >= min && area <= max;
      });
    }

    // Sort
    if (sortBy === "price-low") {
      filtered.sort((a, b) => (a.price?.amount || 0) - (b.price?.amount || 0));
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => (b.price?.amount || 0) - (a.price?.amount || 0));
    } else if (sortBy === "newest") {
      filtered.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    }

    return filtered;
  }, [properties, filters, sortBy]);

  const handleFilterChange = (filterType, value) => {
    if (filterType.includes(".")) {
      const [parent, child] = filterType.split(".");
      setFilters((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
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
      setVisibleCards((prev) => prev + 6);
      setLoading(false);
    }, 400);
  };

  const getUniqueValues = (key) => {
    if (!properties || !Array.isArray(properties)) return [];
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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs currentLabel={"Properties"} />

      {/* Page Header with Stats & Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-b border-gray-100 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            {propertyList.heading}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {Math.min(visiblecards, displayProperties.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {displayProperties.length}
            </span>{" "}
            available properties
          </p>
        </div>

        {/* Controls: Filter Toggle (mobile) & Sort Dropdown */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold shadow-xs"
          >
            <i className="bx bx-filter-alt"></i>
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-(--primaryColor) text-white text-xs flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
            <span className="text-xs text-gray-500 font-medium hidden sm:inline">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-sm font-semibold text-gray-700 outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <div className="col-span-1">
          <div
            className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 sticky top-24 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
              <div className="flex items-center gap-2">
                <i className="bx bx-slider text-xl text-(--primaryColor)"></i>
                <h3 className="text-base font-bold text-gray-900">Filter Properties</h3>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold text-(--primaryColor) hover:underline cursor-pointer"
                >
                  Reset ({activeFiltersCount})
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Listing Type Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Listing Type
                </label>
                <select
                  value={filters.listingType}
                  onChange={(e) =>
                    handleFilterChange("listingType", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                >
                  <option value="">All Types (Rent & Buy)</option>
                  <option value="sales">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>

              {/* Property Type Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Property Category
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) =>
                    handleFilterChange("propertyType", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all capitalize"
                >
                  <option value="">All Categories</option>
                  {getUniqueValues("propertyType").map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  City
                </label>
                <div className="relative">
                  <i className="bx bx-map absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai, Noida"
                    value={filters.city}
                    onChange={(e) => handleFilterChange("city", e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Price Range (₹)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min ₹"
                    value={filters.priceRange.min}
                    onChange={(e) =>
                      handleFilterChange("priceRange.min", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                  />
                  <input
                    type="number"
                    placeholder="Max ₹"
                    value={filters.priceRange.max}
                    onChange={(e) =>
                      handleFilterChange("priceRange.max", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Bedrooms & Bathrooms Filter */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Bedrooms
                  </label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
                    className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                  >
                    <option value="">Any</option>
                    <option value="1">1+ Bed</option>
                    <option value="2">2+ Beds</option>
                    <option value="3">3+ Beds</option>
                    <option value="4">4+ Beds</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Bathrooms
                  </label>
                  <select
                    value={filters.bathrooms}
                    onChange={(e) =>
                      handleFilterChange("bathrooms", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                  >
                    <option value="">Any</option>
                    <option value="1">1+ Bath</option>
                    <option value="2">2+ Baths</option>
                    <option value="3">3+ Baths</option>
                  </select>
                </div>
              </div>

              {/* Area Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Area (Sq Ft)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min sqft"
                    value={filters.areaSqFt.min}
                    onChange={(e) =>
                      handleFilterChange("areaSqFt.min", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                  />
                  <input
                    type="number"
                    placeholder="Max sqft"
                    value={filters.areaSqFt.max}
                    onChange={(e) =>
                      handleFilterChange("areaSqFt.max", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-(--primaryColor) focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Clear filters mobile button */}
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer mt-2"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="col-span-1 lg:col-span-3">
          {isLoading && (!properties || properties.length === 0) ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm animate-pulse"
                >
                  <div className="aspect-[4/3] bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-50 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : displayProperties.length === 0 ? (
            <div className="text-center w-full py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-8">
              <div className="w-16 h-16 rounded-full bg-orange-100 text-(--primaryColor) flex items-center justify-center mx-auto mb-4 text-3xl">
                <i className="bx bx-search"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                No properties matched your criteria
              </h3>
              <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                Try widening your price range, choosing different categories, or resetting filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 px-6 py-2.5 bg-(--primaryColor) hover:bg-(--primaryHoverColor) text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-orange-300"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
              {displayProperties.slice(0, visiblecards).map((item) => (
                <div
                  key={item._id}
                  className="property-card flex flex-col h-full rounded-2xl overflow-hidden shadow-xs hover:shadow-xl bg-white border border-gray-100 transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* Image with badges & quick expand */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                    <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-wider text-white font-bold bg-emerald-600 px-2 py-1 rounded-md shadow-xs">
                      For {item.listingType}
                    </span>

                    <span className="absolute top-3 right-3 z-10 text-[10px] font-bold text-gray-700 uppercase bg-white/90 backdrop-blur-xs px-2 py-1 rounded-md shadow-xs">
                      {item.propertyType}
                    </span>

                    {item.images && item.images.length > 0 ? (
                      <ImagesSlider images={item.images} />
                    ) : (
                      <img
                        src="https://demo01.houzez.co/wp-content/uploads/2016/03/205.jpg"
                        className="w-full h-full object-cover"
                        alt={item.title}
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedProperty(item)}
                      className="absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-(--primaryColor) shadow-md flex items-center justify-center transition-all cursor-pointer opacity-90 hover:opacity-100 hover:scale-110"
                      title="Quick View"
                      aria-label="Quick View"
                    >
                      <i className="bx bx-expand text-base"></i>
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex flex-col flex-grow">
                    <div className="mb-1.5">
                      <Link
                        to={`/property/${item._id}`}
                        className="text-base font-bold text-gray-900 line-clamp-1 capitalize hover:text-(--primaryColor) transition-colors"
                      >
                        {item.title}
                      </Link>
                    </div>

                    <p className="text-xs text-gray-500 mb-3 flex items-center">
                      <i className="bx bx-map me-1 text-(--primaryColor) text-sm shrink-0"></i>
                      <span className="line-clamp-1">
                        {item.address?.city || "Location"}, {item.address?.state || "India"}
                      </span>
                    </p>

                    {/* Features */}
                    <div className="flex items-center justify-between text-gray-600 text-xs border-y border-gray-100 py-2.5 my-auto">
                      <span className="flex items-center gap-1">
                        <i className="bx bx-bed text-sm text-(--primaryColor)"></i>
                        {item.features?.bedroom || 0} Beds
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="bx bx-shower text-sm text-(--primaryColor)"></i>
                        {item.features?.bathroom || 0} Baths
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="bx bx-ruler text-sm text-(--primaryColor)"></i>
                        {item.features?.areaSqFt || 0} sqft
                      </span>
                    </div>

                    {/* Price */}
                    <div className="pt-3 flex justify-between items-center">
                      <div>
                        <p className="text-base sm:text-lg font-extrabold text-(--primaryColor)">
                          ₹{item.price?.amount ? Number(item.price.amount).toLocaleString("en-IN") : "Contact"}
                          {item.listingType === "rent" && (
                            <span className="text-xs font-normal text-gray-500">/mo</span>
                          )}
                        </p>
                      </div>

                      <Link
                        to={`/property/${item._id}`}
                        className="text-xs font-semibold text-gray-700 hover:text-(--primaryColor) inline-flex items-center"
                      >
                        Details <i className="bx bx-chevron-right"></i>
                      </Link>
                    </div>
                  </div>

                  {/* Owner Footer */}
                  <div className="px-4 py-2.5 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 text-[11px]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-orange-100 shrink-0">
                        {item.owner?.avatar ? (
                          <img
                            src={item.owner.avatar}
                            className="w-full h-full object-cover"
                            alt="Owner"
                          />
                        ) : (
                          <i className="bx bxs-user text-gray-400 text-sm flex items-center justify-center h-full"></i>
                        )}
                      </div>
                      <span className="font-semibold text-gray-700 truncate max-w-[120px]">
                        {item.owner?.name ? item.owner.name.split(" ")[0] : "Owner"}
                      </span>
                    </div>
                    <span className="text-gray-400">
                      {postTimeAgo(item.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {displayProperties.length > 0 && visiblecards < displayProperties.length && (
            <div className="flex items-center justify-center mt-4 mb-8">
              <button
                type="button"
                className="px-6 py-2.5 bg-gray-900 hover:bg-(--primaryColor) text-white font-semibold text-sm rounded-xl shadow-sm transition-all duration-200 cursor-pointer flex items-center gap-2"
                onClick={loadMoreCards}
                disabled={loading}
              >
                {loading && <i className="bx bx-loader-alt animate-spin text-base"></i>}
                <span>{loading ? "Loading..." : "Load More Properties"}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal rendered ONCE */}
      <PropertyDetailsModal
        setSelectedProperty={setSelectedProperty}
        selectedProperty={selectedProperty}
      />
    </div>
  );
};

export default PropertiesPage;
