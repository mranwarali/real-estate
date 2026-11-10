import React from "react";
import { Link } from "react-router";

const ContactDetails = ({ contactSections }) => {
  const socialData = [
    {
      name: "Facebook",
      icon: "facebook",
      link: "https://www.facebook.com",
      bgColor: "bg-[#1877F2]",
    },
    {
      name: "Twitter",
      icon: "twitter",
      link: "https://www.twitter.com",
      bgColor: "bg-[#1DA1F2]",
    },
    {
      name: "Youtube",
      icon: "youtube",
      link: "https://www.youtube.com",
      bgColor: "bg-[#FF0000]",
    },
    {
      name: "Linkedin",
      icon: "linkedin",
      link: "https://www.linkedin.com",
      bgColor: "bg-[#0A66C2]",
    },
    {
      name: "Instagram",
      icon: "instagram",
      link: "https://www.instagram.com",
      bgColor: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    },
    {
      name: "Skype",
      icon: "skype",
      link: "https://www.skype.com",
      bgColor: "bg-[#00AFF0]",
    },
  ];
  return (
    <>
      <div className="space-y-6">
        {contactSections.map((section, i) => (
          <div
            key={i}
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            className="p-6"
          >
            <h3 className="text-[16px] font-bold text-gray-800 mb-4 uppercase tracking-wider border-b border-gray-100 pb-2">
              {section.title}
            </h3>

            {section.members ? (
              <div className="space-y-4">
                {section.members.map((person, j) => (
                  <div key={j} className="flex flex-col">
                    <h4 className="text-[15px] font-bold text-gray-800 mb-1">
                      {person.name}
                    </h4>
                    <div className="space-y-2 text-[14px] text-gray-600">
                      <p className="flex items-center gap-2">
                        <i className="bx bx-briefcase text-gray-400 text-lg"></i>
                        {person.position}
                      </p>
                      <p className="flex items-center gap-2">
                        <i className="bx bx-map text-gray-400 text-lg"></i>
                        {person.address}
                      </p>
                      <p className="flex items-center gap-2">
                        <i className="bx bx-envelope text-gray-400 text-lg"></i>
                        <a
                          href={`mailto:${person.email}`}
                          className="text-gray-600 hover:underline transition"
                        >
                          {person.email}
                        </a>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-start gap-2 text-[14px] text-gray-600 leading-relaxed">
                <i className="bx bx-building-house text-gray-400 text-xl mt-0.5"></i>
                <div>
                  <p>{section.address}</p>
                  <p>{section.location}</p>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center gap-2">
          {socialData.map((data, i) => (
            <div className={`${data.bgColor} rounded-sm`} key={i}>
              <Link to={data.link}>
                <i
                  className={`bx bxl-${data.icon} text-2xl p-2 text-white`}
                ></i>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContactDetails;
