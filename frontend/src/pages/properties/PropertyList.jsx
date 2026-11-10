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
  const [visiblecards, setVisibleCards] = useState(4);
  const [loading, setLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  // const data = propertyList[0];
  // const [open, setOpen] = useState(false);

  // const handleOpenModal = () => {
  //   setOpen(!open);
  // };

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

  useEffect(() => {
    dispatch(getProperties());
    return () => dispatch(reset());
  }, [dispatch]);

  const loadMoreCards = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCards(visiblecards + 4);
      setLoading(false);
    }, 600);
  };

  if (isLoading) return <h2>Loading properties...</h2>;
  if (error) return <p>Error:</p>;

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between">
        <div className="py-8 mb-2 px-4 sm:px-0 ">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--headings-color)] sm:text-3xl">
            {propertyList.heading}
          </h2>
          <p className="mt-2 text-base text-gray-600 ">
            {propertyList.description}
          </p>
        </div>
        <Link
          to="/properties"
          className="group text-[var(--headings-color)] font-semibold text-[15px] hover:text-(--primaryColor) transition duration-300"
        >
          {propertyList.viewAllBtn}
          <i
            className={`bx ${propertyList.viewAllBtnIcon} rotate-180 group-hover:translate-x-1 transition duration-300`}
          ></i>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-0 pb-8">
        {properties?.slice(0, visiblecards).map((item) => (
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
                  alt=""
                />
              )}
              {/* modal icon */}
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
                    <i className="bx bxs-user-circle text-gray-400 text-3xl"></i>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-semibold text-gray-700 leading-tight">
                    {item.owner?.name ? item.owner.name.split(" ")[0] : "User"}
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
      {/* <div className="flex items-center justify-center mb-6 ">
        <button
          className="px-4 py-2 text-white bg-(--primaryColor) cursor-pointer rounded-sm"
          onClick={loadMoreCards}
        >
          {loading ? "Loading..." : " Load More"}
        </button>
      </div> */}

      {properties?.length > 0 && visiblecards < properties.length && (
        <div className="flex items-center justify-center mb-6 ">
          <button
            className="px-4 py-2 text-white bg-(--primaryColor) cursor-pointer rounded-sm"
            onClick={loadMoreCards}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyList;
