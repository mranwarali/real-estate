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
import Breadcrumbs from "./Breadcrumbs";
import { propertyByCity } from "../data/data";

const CityWiseProperties = () => {
  const dispatch = useDispatch();
  const { properties } = useSelector((state) => state.property);

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  const cityImage = {
    Noida: NoidaImg,
    Gurugram: GurugramImg,
    Bengaluru: BengaluruImg,
    Mumbai: MumbaiImg,
    Pune: PuneImg,
  };

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

  const cityList = Object.keys(cityCounts).map((name) => {
    return {
      name,
      count: cityCounts[name],
      bgImage: cityImage[name] || "",
    };
  });

  var settings = {
    dots: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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
    // <div className="container mx-auto pt-8">
    //   <Slider {...settings}>
    //     {cityList.map((city, index) => (
    //       <div key={index} className={`category-card group bg-[${city.image}]`}>
    //         <div className="m-2.5 p-5 bg-[var(--primaryColor)]/5 group-hover:bg-[var(--primaryColor)] transition duration-300 text-center rounded-sm">
    //           <div className="mb-4">
    //             <i
    //               className={`bx ${city.iconClass} text-5xl text-[var(--primaryColor)] group-hover:text-[var(--whiteColor)] transition duration-300 `}
    //             ></i>
    //           </div>

    //           <Link
    //             to={`/properties?city=${city.name}`}
    //             className="capitalize text-md font-semibold text-[var(--primaryColor)] mb-4 block group-hover:text-[var(--whiteColor)] transition duration-300 "
    //           >
    //             {city.name}
    //           </Link>
    //           <p className="text-sm text-gray-500 group-hover:text-[var(--whiteColor)] transition duration-300 ">
    //             {city.count} Properties
    //           </p>
    //         </div>
    //       </div>
    //     ))}
    //   </Slider>
    // </div>
    <div className="container mx-auto py-8">
      <div className="py-8 mb-2 px-4 sm:px-0">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {propertyByCity.heading}
        </h2>
        <p className="mt-2 text-base text-gray-600 ">
          {propertyByCity.description}
        </p>
      </div>
      <Slider {...settings}>
        {cityList.map((city, index) => (
          <div key={index} className="px-2">
            <div
              className="relative overflow-hidden rounded-lg bg-cover bg-center h-64 flex items-end group"
              style={{
                backgroundImage: `url(${city.bgImage ? city.bgImage : "https://demo01.houzez.co/wp-content/uploads/2016/03/los-angeles.jpg"})`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition duration-300"></div>

              <div className="relative w-full p-5 text-center z-10">
                <Link
                  to={`/properties?city=${city.name}`}
                  className="capitalize text-xl font-bold text-white mb-1 block drop-shadow-md hover:text-[var(--primaryColor)] transition duration-300"
                >
                  {city.name}
                </Link>
                <p className="text-sm text-gray-200 font-medium">
                  {city.count} Properties
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CityWiseProperties;
