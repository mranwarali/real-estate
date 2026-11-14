import { useEffect } from "react";
import { useLocation } from "react-router";

const siteName = "Nestora Realty";
const defaultDescription =
  "Explore homes for sale and rent across India with Nestora Realty. Browse property listings, compare locations, and connect with trusted real estate agents.";

const pageMetadata = {
  "/": {
    title: "Homes for Sale & Rent in India",
    description: defaultDescription,
  },
  "/about": {
    title: "About Us",
    description:
      "Learn how Nestora Realty helps buyers, renters, and property owners navigate India's real estate market.",
  },
  "/about-us": {
    title: "About Us",
    description:
      "Learn how Nestora Realty helps buyers, renters, and property owners navigate India's real estate market.",
  },
  "/services": {
    title: "Real Estate Services",
    description:
      "Explore property buying, renting, selling, and real estate support services from Nestora Realty.",
  },
  "/faqs": {
    title: "Real Estate FAQs",
    description:
      "Find answers to common questions about buying, renting, selling, and listing property with Nestora Realty.",
  },
  "/contact": {
    title: "Contact Our Real Estate Team",
    description:
      "Contact Nestora Realty for help with property listings, buying, renting, or selling a home in India.",
  },
  "/properties": {
    title: "Properties for Sale & Rent in India",
    description:
      "Browse homes and properties for sale and rent across India. Filter listings by location, property type, and budget.",
  },
  "/properties/category": {
    title: "Properties by Category",
    description:
      "Browse apartments, houses, villas, and other property listings across India with Nestora Realty.",
  },
  "/post-property": {
    title: "List Your Property",
    description:
      "List your property with Nestora Realty and connect with people looking to buy or rent in India.",
  },
  "/blogs": {
    title: "Real Estate News, Guides & Advice",
    description:
      "Read real estate news, property guides, and expert advice for buyers, renters, owners, and investors in India.",
  },
  "/blog": {
    title: "Real Estate News, Guides & Advice",
    description:
      "Read real estate news, property guides, and expert advice for buyers, renters, owners, and investors in India.",
  },
  "/login": {
    title: "Log In",
    description: "Log in to your Nestora Realty account.",
  },
  "/signup": {
    title: "Create an Account",
    description: "Create an account to manage your Nestora Realty property listings.",
  },
  "/signup-confirmation": {
    title: "Sign-Up Confirmation",
    description: "Confirm your Nestora Realty account registration.",
  },
  "/forget-password": {
    title: "Reset Your Password",
    description: "Request a password reset for your Nestora Realty account.",
  },
  "/reset-password": {
    title: "Choose a New Password",
    description: "Set a new password for your Nestora Realty account.",
  },
  "/verify-email": {
    title: "Verify Your Email",
    description: "Verify the email address associated with your Nestora Realty account.",
  },
  "/settings": {
    title: "Account Settings",
    description: "Manage your Nestora Realty account and profile settings.",
  },
};

const noIndexRoutes = [
  "/login",
  "/signup",
  "/signup-confirmation",
  "/forget-password",
  "/reset-password",
  "/verify-email",
  "/settings",
];

const setMetaContent = (key, keyValue, value) => {
  let element = document.head.querySelector(`meta[${key}="${keyValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(key, keyValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
};

const getPageMetadata = (pathname, search) => {
  if (pathname.startsWith("/property/")) {
    return {
      title: "Property Details",
      description:
        "View property details, photos, features, and contact information for this Nestora Realty listing.",
    };
  }

  if (pathname.startsWith("/blog/")) {
    return {
      title: "Real Estate Article",
      description:
        "Explore real estate insights, property guides, and practical advice from Nestora Realty.",
    };
  }

  if (pathname.startsWith("/properties/category/")) {
    const category = pathname.split("/").pop().replaceAll("-", " ");
    return {
      title: `${category} Properties`,
      description: `Browse ${category} property listings for sale and rent across India with Nestora Realty.`,
    };
  }

  if (pathname.startsWith("/verify-email/")) {
    return pageMetadata["/verify-email"];
  }

  if (pathname.startsWith("/reset-password/")) {
    return pageMetadata["/reset-password"];
  }

  if (pathname.startsWith("/settings/")) {
    return pageMetadata["/settings"];
  }

  if (pageMetadata[pathname]) {
    if (pathname === "/properties" && search) {
      const params = new URLSearchParams(search);
      const city = params.get("city");
      const propertyType = params.get("propertyType");
      const listingType = params.get("listingType");
      const filters = [propertyType, city, listingType].filter(Boolean);

      if (filters.length > 0) {
        const transactionTitle = listingType === "rent" ? "Rent " : listingType === "sales" ? "Buy " : "";
        const transactionDescription = listingType === "rent" ? "for rent " : listingType === "sales" ? "for sale " : "";
        const propertyDescription = propertyType || "properties";
        const locationDescription = city ? ` in ${city}` : " in India";
        return {
          title: `${transactionTitle}${propertyDescription}${locationDescription}`,
          description: `Browse ${propertyDescription.toLowerCase()} listings ${transactionDescription}${city ? `in ${city}` : "across India"} with Nestora Realty.`,
        };
      }
    }

    return pageMetadata[pathname];
  }

  return {
    title: "Page Not Found",
    description: "The page you requested could not be found on Nestora Realty.",
  };
};

const SeoHead = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const metadata = getPageMetadata(pathname, search);
    const title = `${metadata.title} | ${siteName}`;
    const isPrivateRoute = noIndexRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    );
    const isKnownRoute =
      pathname === "/" ||
      Object.prototype.hasOwnProperty.call(pageMetadata, pathname) ||
      pathname.startsWith("/property/") ||
      pathname.startsWith("/blog/") ||
      pathname.startsWith("/properties/category/");
    const noIndex = isPrivateRoute || !isKnownRoute;

    document.title = title;
    setMetaContent("name", "description", metadata.description);
    setMetaContent("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");
    setMetaContent("property", "og:title", title);
    setMetaContent("property", "og:description", metadata.description);
    setMetaContent("property", "og:type", "website");
    setMetaContent("property", "og:locale", "en_IN");
    setMetaContent("name", "twitter:title", title);
    setMetaContent("name", "twitter:description", metadata.description);
  }, [pathname, search]);

  return null;
};

export default SeoHead;
