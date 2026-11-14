import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { Link } from "react-router";
import Partners from "../components/Partners";

const Services = () => {
  const serviceItems = [
    {
      id: 1,
      title: "Property Buying Assistance",
      icon: "bx-home-heart",
      description:
        "Find and purchase your dream property with our expert guidance, curated site visits, neighborhood insights, and seamless price negotiations.",
      features: ["Curated property matching", "Verified legal documentation", "Price negotiation support"],
    },
    {
      id: 2,
      title: "Property Selling & Marketing",
      icon: "bx-trending-up",
      description:
        "Get maximum value for your residential or commercial property with targeted digital campaigns, professional photography, and verified buyers.",
      features: ["Free property valuation", "Virtual 3D video tours", "High visibility promotions"],
    },
    {
      id: 3,
      title: "Rental & Lease Management",
      icon: "bx-key",
      description:
        "Effortless renting for owners and tenants alike. From tenant background verification to monthly rent agreements and deposit security.",
      features: ["Tenant background verification", "Online rent agreements", "Timely rent collection"],
    },
    {
      id: 4,
      title: "Home Loan & Financing",
      icon: "bx-credit-card",
      description:
        "Fast-track home loans with leading banking partners offering low interest rates, minimal paperwork, and quick doorstep sanctioning.",
      features: ["Pre-approved loan offers", "Lowest interest rates", "Instant eligibility check"],
    },
    {
      id: 5,
      title: "Legal & Title Verification",
      icon: "bx-check-shield",
      description:
        "Comprehensive legal scrutiny by accredited property attorneys covering title searches, encumbrance certificates, and RERA compliance.",
      features: ["RERA registration check", "Title deed verification", "Drafting sale agreements"],
    },
    {
      id: 6,
      title: "Interior Design & Staging",
      icon: "bx-palette",
      description:
        "Transform raw flats into stunning livable spaces or stage vacant apartments to sell faster at top market prices.",
      features: ["Custom modular design", "Turnkey execution", "Affordable packages"],
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs currentLabel={"Services"} />

      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto py-10">
        <span className="text-xs font-bold uppercase tracking-wider text-(--primaryColor) bg-orange-50 px-3 py-1 rounded-full">
          What We Offer
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
          End-to-End Real Estate Services
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
          From finding the right home to sealing the deal, our comprehensive suite of real estate solutions makes your journey effortless.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-14">
        {serviceItems.map((service) => (
          <div
            key={service.id}
            className="p-6 sm:p-8 bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
          >
            <div className="w-14 h-14 rounded-2xl bg-orange-50 group-hover:bg-(--primaryColor) text-(--primaryColor) group-hover:text-white flex items-center justify-center text-3xl mb-5 transition-colors">
              <i className={`bx ${service.icon}`}></i>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2.5">
              {service.title}
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 grow">
              {service.description}
            </p>

            <ul className="space-y-2 pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-700">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <i className="bx bx-check text-emerald-500 font-bold text-base"></i>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-(--primaryColor) hover:underline"
            >
              <span>Inquire About This Service</span>
              <i className="bx bx-right-arrow-alt text-base"></i>
            </Link>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-[#004274] rounded-3xl p-8 sm:p-12 text-white text-center max-w-4xl mx-auto my-10 relative overflow-hidden shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
          Need a Custom Real Estate Solution?
        </h2>
        <p className="text-sm text-blue-100 max-w-xl mx-auto mb-6">
          Speak with one of our senior property advisors today for bespoke portfolio advisory, commercial leasing, or bulk investments.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="w-full sm:w-auto px-7 py-3 bg-(--primaryColor) hover:bg-(--primaryHoverColor) text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
          >
            Contact Advisor
          </Link>
          <a
            href="tel:+911800123456"
            className="w-full sm:w-auto px-7 py-3 bg-white/10 hover:bg-white text-white hover:text-gray-900 rounded-xl font-bold text-sm transition-all"
          >
            Call Us Now
          </a>
        </div>
      </div>

      <Partners />
    </div>
  );
};

export default Services;
