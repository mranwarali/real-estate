import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { getProperties } from "../redux/property/propertySlice";
import NoidaImg from "../assets/images/propertyImages/noida.webp";
import GurugramImg from "../assets/images/propertyImages/gurugram.jpg";
import BengaluruImg from "../assets/images/propertyImages/bengaluru.webp";
import MumbaiImg from "../assets/images/propertyImages/mumbai.avif";
import PuneImg from "../assets/images/propertyImages/pune.avif";
import { Link } from "react-router";
import { propertyByCity } from "../data/data";

const CityWiseProperties = () => {
  const dispatch = useDispatch();
  const { properties } = useSelector((state) => state.property);

  useEffect(() => {
    if (!properties || properties.length === 0) {
      dispatch(getProperties());
    }
  }, [dispatch, properties]);

  const cityImage = {
    Noida: NoidaImg,
    Gurugram: GurugramImg,
    Bengaluru: BengaluruImg,
    Mumbai: MumbaiImg,
    Pune: PuneImg,
  };

  const defaultCities = ["Mumbai", "Bengaluru", "Noida", "Gurugram", "Pune"];

  const cityCounts = (Array.isArray(properties) ? properties : []).reduce(
    (acc, item) => {
      const cityName = item.address?.city;
      if (cityName) {
        acc[cityName] = (acc[cityName] || 0) + 1;
      }
      return acc;
    },
    {},
  );

  // Fill in default cities with at least 0 count
  defaultCities.forEach((city) => {
    if (cityCounts[city] === undefined) {
      cityCounts[city] = 0;
    }
  });

  const cityList = Object.keys(cityCounts).map((name) => {
    return {
      name,
      count: cityCounts[name],
      bgImage: cityImage[name] || "https://demo01.houzez.co/wp-content/uploads/2016/03/los-angeles.jpg",
    };
  });

  const settings = {
    dots: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: cityList.length > 3,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: cityList.length > 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: cityList.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-(--primaryColor)">
            Top Locations
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-1">
            {propertyByCity.heading}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-gray-600">
            {propertyByCity.description}
          </p>
        </div>
        <Link
          to="/properties"
          className="text-sm font-semibold text-gray-600 hover:text-(--primaryColor) inline-flex items-center gap-1 transition-colors"
        >
          <span>All Cities</span>
          <i className="bx bx-right-arrow-alt text-lg"></i>
        </Link>
      </div>

      <Slider {...settings} className="mobile-dots-slider -mx-2 pb-8">
        {cityList.map((city, index) => (
          <div key={index} className="px-2 pb-2">
            <Link
              to={`/properties?city=${city.name}`}
              className="relative block overflow-hidden rounded-2xl h-64 sm:h-72 group shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Background image with scale animation */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${city.bgImage})`,
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent group-hover:from-black/90 transition-colors duration-300"></div>

              {/* Text content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-center z-10">
                <h3 className="capitalize text-lg sm:text-xl font-bold text-white mb-1 drop-shadow-md group-hover:text-orange-300 transition-colors">
                  {city.name}
                </h3>
                <p className="text-xs text-gray-200 font-medium bg-white/20 backdrop-blur-xs inline-block px-3 py-1 rounded-full">
                  {city.count} {city.count === 1 ? "Property" : "Properties"}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default CityWiseProperties;
