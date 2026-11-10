// import React, { useEffect } from "react";
import Logo from "../../assets/images/header-logo.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../../redux/auth/authSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import ProfileMenu from "./ProfileMenu";
import { fetchProfile } from "../../redux/user/userSlice";

const BASE_API = import.meta.env.VITE_BASE_URL;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // console.log("user", user);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // navigations
  const navLinks = [
    { id: 1, link: "/", name: "Home" },
    {
      id: 2,
      link: "#",
      name: "Properties",
      dropdownLinks: [
        // { id: 21, link: "/buy", name: "Buy" },
        // { id: 23, link: "/rent", name: "Rent" },
        { id: 21, link: "/properties?listingType=sales", name: "Buy" },
        { id: 23, link: "/properties?listingType=rent", name: "Rent" },
        {
          id: 22,
          link: "/post-property",
          name: "Sell",
        },
      ],
    },
    { id: 3, link: "/blogs", name: "Blog" },
    {
      id: 4,
      link: "#",
      name: "Pages",
      dropdownLinks: [
        { id: 41, link: "/about-us", name: "About Us" },
        { id: 42, link: "/services", name: "Services" },
        { id: 43, link: "/faqs", name: "FAQ" },
      ],
    },
    { id: 5, link: "/contact", name: "Contact Us" },
  ];

  //logout
  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_API}/auth/logout`);
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="bg-white py-4 shadow-sm relative">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex items-center justify-between">
          <button
            className="block md:hidden text-3xl text-(--grayColor)"
            onClick={() => setIsMenuOpen(true)}
          >
            <i className="bx bx-menu cursor-pointer"></i>
          </button>
          {/* Logo */}
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <img src={Logo} alt="Logo" className="h-8 w-auto" />
          </div>

          {/* Navigation */}
          <ul className="flex items-center gap-5 lg:gap-8">
            <Navigation navLinks={navLinks} />

            {/* User Profile Icon */}
            <ProfileMenu
              isLoggedIn={isLoggedIn}
              user={profile}
              handleLogout={handleLogout}
            />

            {/* Post Property Button */}
            <Link
              to="/post-property"
              className="text-sm lg:text-md  text-white  font-semibold px-2 md:px-5 py-1 md:py-2.5 bg-(--primaryColor) rounded-md hover:opacity-90 transition-opacity shadow-sm hidden md:block"
            >
              Post Property
            </Link>
          </ul>
        </div>
      </div>

      {/* mobile view */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navLinks}
      />
    </nav>
  );
};

export default Header;
