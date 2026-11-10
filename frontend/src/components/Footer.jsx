import React, { useEffect } from "react";
import Logo from "../assets/images/white-logo.svg";
import { footerLinks, address } from "../data/data";
import Newsletter from "./Newsletter";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../redux/property/propertySlice";
import { Link } from "react-router";
import { footerData } from "../data/data";

const Footer = () => {
  const dispatch = useDispatch();
  const { properties } = useSelector((state) => state.property);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  const counts = (Array.isArray(properties) ? properties : []).reduce(
    (acc, item) => {
      const catName = item.propertyType;
      acc[catName] = (acc[catName] || 0) + 1;
      return acc;
    },
    {},
  );

  const categoryList = Object.keys(counts).map((name) => {
    return {
      name,
      count: counts[name],
    };
  });

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
    };
  });

  return (
    <div className="bg-[var(--footerColor)]">
      <div className="container mx-auto px-4 md:px-0">
        {/* newsletter  */}
        <Newsletter />

        {/* footer  */}
        <div className="py-5 md:py-13">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            <div>
              <div className="cursor-pointer">
                <img src={Logo} alt="Logo" className="h-8 w-auto mb-4" />
                <p className="text-md text-[var(--whiteColor)] mb-4">
                  {footerData.companyDesc}
                </p>
                <ul className="flex items-center gap-4">
                  <li className="border border-gray-100 rounded-full">
                    <a href="" className="text-2xl text-[var(--whiteColor)]">
                      <i className="bx bxl-facebook-circle p-2"></i>
                    </a>
                  </li>
                  <li className="border border-gray-100 rounded-full">
                    <a href="" className="text-2xl text-[var(--whiteColor)]">
                      <i className="bx bxl-twitter p-2"></i>
                    </a>
                  </li>
                  <li className="border border-gray-100 rounded-full">
                    <a href="" className="text-2xl text-[var(--whiteColor)]">
                      <i className="bx bxl-linkedin p-2"></i>
                    </a>
                  </li>
                  <li className="border border-gray-100 rounded-full">
                    <a href="" className="text-2xl text-[var(--whiteColor)]">
                      <i className="bx bxl-youtube p-2"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Company */}
            <>
              {footerLinks.map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-semibold mb-4 text-[var(--whiteColor)]">
                    {section.heading}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i}>
                        <a
                          href={item.link}
                          className="text-[var(--whiteColor)] text-sm transition-colors"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>

            {/* Categories Section */}
            <>
              {/* {categories.map((section, idx) => ( */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[var(--whiteColor)]">
                  Categories
                </h3>
                <ul className="space-y-2">
                  {categoryList.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between pr-10"
                    >
                      <Link
                        // href={item.link}
                        to={`/properties?propertyType=${item.name}`}
                        className="text-[var(--whiteColor)] text-sm transition-colors hover:text-(--primaryColor) transition duration-300 capitalize"
                      >
                        {item.name}
                      </Link>
                      <span className="bg-gray-800 text-xs px-2 py-1 rounded-full text-[var(--whiteColor)]">
                        {item.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* ))} */}
            </>

            {/* Top Cities Section */}
            <>
              {/* {cities.map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-semibold mb-4 text-[var(--whiteColor)]">
                    {section.heading}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i}>
                        <a
                          href={item.link}
                          className="text-[var(--whiteColor)] text-sm transition-colors flex items-center"
                        >
                          <i className="bx bx-chevron-right mr-1"></i>{" "}
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))} */}

              <div>
                <h3 className="text-lg font-semibold mb-4 text-[var(--whiteColor)]">
                  Top Cities
                </h3>
                <ul className="space-y-2">
                  {cityList.map((city, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between pr-10"
                    >
                      <Link
                        to={`/properties?city=${city.name}`}
                        className="text-[var(--whiteColor)] text-sm transition-colors hover:text-(--primaryColor) transition duration-300 capitalize flex citys-center"
                      >
                        <i className="bx bx-chevron-right mr-1"></i>
                        {city.name}
                      </Link>
                      <span className="bg-gray-800 text-xs px-2 py-1 rounded-full text-[var(--whiteColor)]">
                        {city.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </>

            {/* Address & Contact Section */}
            <>
              {address.map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-lg font-semibold mb-4 text-[var(--whiteColor)]">
                    {section.heading}
                  </h3>
                  <ul className="space-y-4">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <i
                          className={`${item.icon} text-xl text-[var(--whiteColor)]`}
                        ></i>
                        <span className="text-gray-300 text-sm leading-relaxed">
                          {item.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          </div>
        </div>

        <div className="py-5 border-t border-gray-300">
          <p className="text-sm text-[var(--whiteColor)] text-center">
            {currentYear} {footerData.copyrightPara}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
