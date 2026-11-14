import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import Slider from "react-slick";
import { getProperties } from "../redux/property/propertySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const { properties, isLoading } = useSelector((state) => state.property);

  useEffect(() => {
    if (!properties || properties.length === 0) {
      dispatch(getProperties());
    }
  }, [dispatch, properties]);

  const counts = (Array.isArray(properties) ? properties : []).reduce(
    (acc, item) => {
      const catName = item.propertyType || "Apartment";
      acc[catName] = (acc[catName] || 0) + 1;
      return acc;
    },
    {},
  );

  // Default property categories to show even if DB has few
  const defaultCategories = ["Apartment", "House", "Villa", "Commercial", "Studio", "Farmhouse"];
  defaultCategories.forEach((cat) => {
    if (counts[cat] === undefined) {
      counts[cat] = 0;
    }
  });

  const categoryIcons = {
    Apartment: "bx-building-house",
    House: "bx-home-alt",
    Farmhouse: "bx-landscape",
    Villa: "bx-home-heart",
    Commercial: "bx-store-alt",
    Studio: "bx-layer",
    Uncategorized: "bx-images",
  };

  const categoryList = Object.keys(counts).map((name) => {
    const formatted = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    return {
      name: formatted,
      rawName: name,
      count: counts[name],
      iconClass: categoryIcons[formatted] || categoryIcons["Apartment"],
    };
  });

  const settings = {
    dots: false,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2500,
    infinite: categoryList.length > 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: categoryList.length > 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: categoryList.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-(--primaryColor)">
            Categories
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-1">
            Explore by Property Type
          </h2>
        </div>
        <Link
          to="/properties"
          className="text-sm font-semibold text-gray-600 hover:text-(--primaryColor) inline-flex items-center gap-1 transition-colors"
        >
          <span>All Categories</span>
          <i className="bx bx-right-arrow-alt text-lg"></i>
        </Link>
      </div>

      {isLoading && categoryList.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-36 rounded-2xl bg-gray-100 animate-pulse p-5 flex flex-col items-center justify-center"
            />
          ))}
        </div>
      ) : (
        <Slider {...settings} className="-mx-2">
          {categoryList.map((cat, index) => (
            <div key={index} className="px-2 pb-2">
              <Link
                to={`/properties?propertyType=${cat.rawName}`}
                className="group block p-5 sm:p-6 bg-white hover:bg-(--primaryColor) border border-gray-100 hover:border-(--primaryColor) rounded-2xl shadow-xs hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-orange-50 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <i
                    className={`bx ${cat.iconClass} text-3xl text-(--primaryColor) group-hover:text-white transition-colors`}
                  ></i>
                </div>

                <h3 className="capitalize text-base font-bold text-gray-800 group-hover:text-white mb-1 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 group-hover:text-white/80 transition-colors">
                  {cat.count} {cat.count === 1 ? "Property" : "Properties"}
                </p>
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </section>
  );
};

export default Categories;
