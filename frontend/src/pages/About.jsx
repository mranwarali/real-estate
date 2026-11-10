import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import AboutBanner from "../assets/images/about-top.webp";
import { aboutUsData } from "../data/data";
import AutoCounter from "../components/AutoCounter";
import { companyState } from "../data/data";
import OurAgents from "../components/Ouragents";
import Partners from "../components/Partners";
import VideoBanner from "../components/VideoBanner";

const About = () => {
  return (
    <div className="">
      <div className=" container mx-auto">
        <Breadcrumbs currentLabel={"About Us"} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-6 px-4 md:px-0 pt-10">
          <div className="col-span-1 relative">
            <div className="rounded-xl bg-[#004274] h-[90%] w-[90%] absolute bottom-5 left-0 -z-1"></div>
            <img
              src={AboutBanner}
              alt=""
              className="h-[90%] w-[90%] mx-auto rounded-xl"
            />
          </div>

          <div className="col-span-1 lg:col-span-2">
            <div className="space-y-6">
              <p className="text-md font-semibold bg-[var(--primaryColor)] px-2 py-1 w-fit rounded-lg text-white">
                About Us
              </p>
              <h2 className="text-4xl font-bold text-gray-700">
                {aboutUsData.title}
              </h2>
              <p className="text-sm text-gray-600">{aboutUsData.paragraph}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="col-span-1 lg:col-span-2">
                  <ul>
                    {aboutUsData?.features.map((feature, i) => (
                      <li
                        key={i}
                        className="mb-2 text-gray-600 list-disc list-inside"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="col-span-1 p-6"
                  style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                >
                  <div className="border border-[var(--primaryColor)] rounded-xl p-8">
                    <div className="flex items-center justify-around mb-4">
                      {/* <i class={`bx ${aboutUsData.icon} text-5xl`}></i> */}
                      <img src={aboutUsData.icon} alt="" />
                      <h4 className="text-4xl font-bold w-15 text-[#004274]">
                        <AutoCounter
                          targetNumber={aboutUsData.years}
                          duration={2000}
                        />
                        +
                      </h4>
                    </div>
                    <div className="text-center">
                      <h6 className="text-xl font-semibold text-gray-700">
                        {aboutUsData.expPara}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* company states  */}
        <div className="flex items-center justify-between max-w-[800px] mx-auto py-10">
          {companyState.map((data, i) => (
            <div key={i} className="p-4 text-center">
              <h3 className="text-3xl font-semibold text-[#004274]">
                <AutoCounter targetNumber={data.value} duration={2000} />+
              </h3>
              <p className="text-gray-600 text-sm">{data.metric}</p>
            </div>
          ))}
        </div>
      </div>

      {/* agent section */}
      <div className="bg-blue-50">
        <OurAgents />
      </div>
      <VideoBanner />
      <Partners />
    </div>
  );
};

export default About;
