import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties, reset } from "../../redux/property/propertySlice";
import ImagesSlider from "./ImagesSlider";
import { Link } from "react-router";
import PropertyDetailsModal from "./PropertyDetailsModal";
import { propertyList } from "../../data/data";

const PropertyList = () => {
  const dispatch = useDispatch();
  const { properties, isLoading, error } = useSelector(
    (state) => state.property,
  );
  const [visiblecards, setVisibleCards] = useState(8);
  const [loading, setLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

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
    dispatch(getProperties());
    return () => dispatch(reset());
  }, [dispatch]);

  const loadMoreCards = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCards((prev) => prev + 4);
      setLoading(false);
    }, 400);
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-(--primaryColor)">
            Featured
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-1">
            {propertyList.heading}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-gray-600 max-w-xl">
            {propertyList.description}
          </p>
        </div>

        <Link
          to="/properties"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-gray-800 hover:text-(--primaryColor) transition-colors shrink-0"
        >
          <span>{propertyList.viewAllBtn}</span>
          <i className="bx bx-right-arrow-alt text-xl group-hover:translate-x-1 transition-transform"></i>
        </Link>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (!properties || properties.length === 0) ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
      ) : error ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <p className="text-gray-500 mb-2">Unable to load properties.</p>
          <button
            onClick={() => dispatch(getProperties())}
            className="px-4 py-2 bg-(--primaryColor) text-white text-xs font-semibold rounded-lg"
          >
            Try Again
          </button>
        </div>
      ) : (
        /* Properties Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
          {properties?.slice(0, visiblecards).map((item) => (
            <div
              key={item._id}
              className="property-card flex flex-col h-full rounded-2xl overflow-hidden shadow-xs hover:shadow-xl bg-white border border-gray-100 transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Image & Badges */}
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

                {/* Quick View Button */}
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
              <div className="p-4 sm:p-5 flex flex-col grow">
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

                {/* Specs / Features */}
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
                  <span className="font-semibold text-gray-700 truncate max-w-30">
                    {item.owner?.name ? item.owner.name.split(" ")[0] : "Verified Owner"}
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

      {/* Modal - rendered ONCE outside the loop */}
      <PropertyDetailsModal
        setSelectedProperty={setSelectedProperty}
        selectedProperty={selectedProperty}
      />

      {/* Load More Button */}
      {properties?.length > 0 && visiblecards < properties.length && (
        <div className="flex items-center justify-center mt-2 mb-8">
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
    </section>
  );
};

export default PropertyList;
