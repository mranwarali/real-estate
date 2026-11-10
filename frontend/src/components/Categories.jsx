import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import Slider from "react-slick";
import { getProperties } from "../redux/property/propertySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const { properties } = useSelector((state) => state.property);
  console.log("properties", properties);

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  // const counts = properties.reduce((acc, item) => {
  //   const catName = item.propertyType || "Uncategorized";
  //   acc[catName] = (acc[catName] || 0) + 1;
  //   return acc;
  // }, {});

  const counts = (Array.isArray(properties) ? properties : []).reduce(
    (acc, item) => {
      const catName = item.propertyType || "Uncategorized";
      acc[catName] = (acc[catName] || 0) + 1;
      return acc;
    },
    {},
  );

  const categoryIcons = {
    Apartment: "bx-building-house",
    House: "bx-home-alt",
    Farmhouse: "bx-landscape",
    Villa: "bx-home-heart",
    Commercial: "bx-store-alt",
    Uncategorized: "bx-images",
  };

  // const categoryList = Object.keys(counts).map((name) => ({
  //   name,
  //   count: counts[name],
  //   iconClass: categoryIcons[iconName],
  // }));

  const categoryList = Object.keys(counts).map((name) => {
    const iconName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    return {
      name,
      count: counts[name],
      iconClass: categoryIcons[iconName] || categoryIcons["Uncategorized"],
    };
  });

  const settings = {
    dots: false,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 1500,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 1500,
        },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="container mx-auto pt-8">
      {/* <div className="py-4 mb-2 px-4 sm:px-0 ">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Explore Apartment Types
        </h2>
      </div> */}
      <Slider {...settings}>
        {categoryList.map((cat, index) => (
          <div key={index} className="category-card group">
            <div className="m-2.5 p-5 bg-(--primaryColor)/5 group-hover:bg-(--primaryColor) transition duration-300 text-center rounded-sm">
              <div className="mb-4">
                <i
                  className={`bx ${cat.iconClass} text-5xl text-(--primaryColor) group-hover:text-[var(--whiteColor)] transition duration-300 `}
                ></i>
              </div>

              <Link
                to={`/properties?propertyType=${cat.name}`}
                className="capitalize text-md font-semibold text-(--primaryColor) mb-4 block group-hover:text-[var(--whiteColor)] transition duration-300 "
              >
                {cat.name}
              </Link>
              <p className="text-sm text-gray-500 group-hover:text-[var(--whiteColor)] transition duration-300 ">
                {cat.count} Properties
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Categories;
