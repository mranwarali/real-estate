import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import AboutBanner from "../assets/images/about-top.webp";
import { aboutUsData, companyState } from "../data/data";
import AutoCounter from "../components/AutoCounter";
import OurAgents from "../components/OurAgents";
import Partners from "../components/Partners";
import VideoBanner from "../components/VideoBanner";

const About = () => {
  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs currentLabel={"About Us"} />

        {/* Hero / Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-8 sm:py-12">
          {/* Visual Column */}
          <div className="lg:col-span-5 relative max-w-md mx-auto w-full">
            <div className="rounded-3xl bg-[#004274] w-full h-[320px] sm:h-[400px] absolute -bottom-4 -left-4 -z-10 opacity-90 hidden sm:block"></div>
            <img
              src={AboutBanner}
              alt="About Dream Home"
              className="w-full h-[320px] sm:h-[400px] object-cover rounded-3xl shadow-xl border-4 border-white"
            />
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-(--primaryColor) bg-orange-50 px-3 py-1 rounded-full">
              About Us
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              {aboutUsData.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {aboutUsData.paragraph}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <ul className="space-y-3">
                {aboutUsData?.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700"
                  >
                    <i className="bx bx-check-circle text-lg text-emerald-500 shrink-0 mt-0.5"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-orange-50/60 border border-orange-200/80 rounded-2xl p-6 flex flex-col justify-center text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <h3 className="text-4xl sm:text-5xl font-black text-[#004274]">
                    <AutoCounter
                      targetNumber={aboutUsData.years}
                      duration={2000}
                    />
                    +
                  </h3>
                </div>
                <p className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                  {aboutUsData.expPara}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Trusted by thousands of home seekers across India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Company Stats Grid */}
        <div className="py-12 border-y border-gray-100 my-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {companyState.map((data, i) => (
              <div key={i} className="p-4 text-center bg-gray-50/80 rounded-2xl border border-gray-100">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#004274]">
                  <AutoCounter targetNumber={data.value} duration={2000} />+
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm font-medium mt-1">
                  {data.metric}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agents, Video, Partners */}
      <div className="bg-gray-50/60 py-6">
        <OurAgents />
      </div>
      <VideoBanner />
      <Partners />
    </div>
  );
};

export default About;
