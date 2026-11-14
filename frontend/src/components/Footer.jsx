import React, { useEffect } from "react";
import Logo from "../assets/images/nestora-logo-light.svg";
import { footerData } from "../data/data";
import Newsletter from "./Newsletter";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../redux/property/propertySlice";
import { Link } from "react-router";

const Footer = () => {
  const dispatch = useDispatch();
  const { properties } = useSelector((state) => state.property);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (!properties || properties.length === 0) {
      dispatch(getProperties());
    }
  }, [dispatch, properties]);

  const counts = (Array.isArray(properties) ? properties : []).reduce(
    (acc, item) => {
      const catName = item.propertyType;
      if (catName) {
        acc[catName] = (acc[catName] || 0) + 1;
      }
      return acc;
    },
    {},
  );

  const defaultCats = ["Apartment", "House", "Villa", "Commercial"];
  defaultCats.forEach((c) => {
    if (counts[c] === undefined) counts[c] = 0;
  });

  const categoryList = Object.keys(counts).slice(0, 5).map((name) => ({
    name,
    count: counts[name],
  }));

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

  const defaultCities = ["Mumbai", "Bengaluru", "Noida", "Gurugram"];
  defaultCities.forEach((c) => {
    if (cityCounts[c] === undefined) cityCounts[c] = 0;
  });

  const cityList = Object.keys(cityCounts).slice(0, 5).map((name) => ({
    name,
    count: cityCounts[name],
  }));

  return (
    <footer className="bg-(--footerColor) text-white border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <Newsletter />

        {/* Footer Main Links */}
        <div className="py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10">
            {/* Column 1: Brand Info & Socials */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link to="/" className="inline-block mb-4">
                <img src={Logo} alt="Nestora Realty" className="h-8 w-auto" />
              </Link>
              <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
                {footerData.companyDesc}
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-(--primaryColor) flex items-center justify-center text-lg text-white transition-colors"
                  aria-label="Facebook"
                >
                  <i className="bx bxl-facebook"></i>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-(--primaryColor) flex items-center justify-center text-lg text-white transition-colors"
                  aria-label="Twitter"
                >
                  <i className="bx bxl-twitter"></i>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-(--primaryColor) flex items-center justify-center text-lg text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <i className="bx bxl-linkedin"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-(--primaryColor) flex items-center justify-center text-lg text-white transition-colors"
                  aria-label="Instagram"
                >
                  <i className="bx bxl-instagram"></i>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2.5 text-sm text-gray-300">
                <li>
                  <Link to="/" className="hover:text-(--primaryColor) transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/properties" className="hover:text-(--primaryColor) transition-colors">
                    All Properties
                  </Link>
                </li>
                <li>
                  <Link to="/about-us" className="hover:text-(--primaryColor) transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-(--primaryColor) transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/faqs" className="hover:text-(--primaryColor) transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/blogs" className="hover:text-(--primaryColor) transition-colors">
                    Blog & News
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-(--primaryColor) transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Categories */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                Categories
              </h3>
              <ul className="space-y-2.5 text-sm">
                {categoryList.map((item, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <Link
                      to={`/properties?propertyType=${item.name}`}
                      className="text-gray-300 hover:text-(--primaryColor) transition-colors capitalize text-xs sm:text-sm"
                    >
                      {item.name}
                    </Link>
                    <span className="bg-white/10 text-gray-300 text-[11px] px-2 py-0.5 rounded-full font-medium">
                      {item.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Top Cities */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                Top Cities
              </h3>
              <ul className="space-y-2.5 text-sm">
                {cityList.map((city, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <Link
                      to={`/properties?city=${city.name}`}
                      className="text-gray-300 hover:text-(--primaryColor) transition-colors capitalize text-xs sm:text-sm flex items-center"
                    >
                      <i className="bx bx-chevron-right mr-1 text-(--primaryColor)"></i>
                      {city.name}
                    </Link>
                    <span className="bg-white/10 text-gray-300 text-[11px] px-2 py-0.5 rounded-full font-medium">
                      {city.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Address & Contact */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                Contact Office
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-gray-300">
                <li className="flex items-start gap-2.5">
                  <i className="bx bx-map text-lg text-(--primaryColor) shrink-0 mt-0.5"></i>
                  <span className="leading-relaxed">
                    BKC Financial Centre, Bandra East, Mumbai, Maharashtra 400051
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <i className="bx bx-envelope text-lg text-(--primaryColor) shrink-0"></i>
                  <a href="mailto:support@dreamhome.com" className="hover:text-(--primaryColor) transition-colors">
                    support@dreamhome.com
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <i className="bx bx-phone-call text-lg text-(--primaryColor) shrink-0"></i>
                  <a href="tel:+911800123456" className="hover:text-(--primaryColor) transition-colors">
                    +91 1800 123 456
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>
            © {currentYear} Nestora Realty. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/faqs" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/faqs" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
