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

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchProfile());
    }
  }, [dispatch, isLoggedIn]);

  // navigations
  const navLinks = [
    { id: 1, link: "/", name: "Home" },
    {
      id: 2,
      link: "#",
      name: "Properties",
      dropdownLinks: [
        { id: 21, link: "/properties?listingType=sales", name: "Buy" },
        { id: 23, link: "/properties?listingType=rent", name: "Rent" },
        { id: 22, link: "/post-property", name: "Sell" },
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

  // logout
  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_API}/auth/logout`);
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md py-3.5 shadow-sm border-b border-gray-100 transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="block md:hidden text-2xl text-gray-700 hover:text-(--primaryColor) p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Menu"
          >
            <i className="bx bx-menu text-2xl align-middle"></i>
          </button>

          {/* Logo */}
          <Link to="/" className="cursor-pointer flex items-center shrink-0">
            <img src={Logo} alt="Dream Home Logo" className="h-7 sm:h-8 w-auto" />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            <Navigation navLinks={navLinks} />
          </ul>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* User Profile Menu */}
            <ProfileMenu
              isLoggedIn={isLoggedIn}
              user={profile}
              handleLogout={handleLogout}
            />

            {/* Post Property Button (desktop) */}
            <Link
              to="/post-property"
              className="text-xs sm:text-sm text-white font-semibold px-3 sm:px-5 py-2 sm:py-2.5 bg-(--primaryColor) hover:bg-(--primaryHoverColor) rounded-lg transition-all shadow-sm shadow-orange-200 active:scale-95 hidden sm:inline-flex items-center gap-1.5"
            >
              <i className="bx bx-plus-circle text-base"></i>
              <span>Post Property</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navLinks}
        isLoggedIn={isLoggedIn}
        user={profile}
        handleLogout={handleLogout}
      />
    </nav>
  );
};

export default Header;
