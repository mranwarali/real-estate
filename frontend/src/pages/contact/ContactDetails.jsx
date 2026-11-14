import React from "react";

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
      name: "Whatsapp",
      icon: "whatsapp",
      link: "https://www.whatsapp.com",
      bgColor: "bg-[#25D366]",
    },
  ];

  return (
    <div className="space-y-6">
      {contactSections.map((section, i) => (
        <div
          key={i}
          className="p-5 sm:p-6 rounded-xl border border-gray-100 bg-gray-50/50"
        >
          <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider border-b border-gray-200/60 pb-2">
            {section.title}
          </h3>

          {section.members ? (
            <div className="space-y-5">
              {section.members.map((person, j) => (
                <div key={j} className="flex flex-col">
                  <h4 className="text-sm font-bold text-gray-900 mb-1">
                    {person.name}
                  </h4>
                  <div className="space-y-1.5 text-xs text-gray-600">
                    <p className="flex items-center gap-2">
                      <i className="bx bx-briefcase text-(--primaryColor) text-sm shrink-0"></i>
                      <span>{person.position}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <i className="bx bx-map text-(--primaryColor) text-sm shrink-0"></i>
                      <span>{person.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <i className="bx bx-envelope text-(--primaryColor) text-sm shrink-0"></i>
                      <a
                        href={`mailto:${person.email}`}
                        className="text-gray-700 hover:text-(--primaryColor) transition-colors truncate"
                      >
                        {person.email}
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-start gap-2.5 text-xs text-gray-600 leading-relaxed">
              <i className="bx bx-building-house text-lg text-(--primaryColor) shrink-0 mt-0.5"></i>
              <div>
                <p className="font-semibold text-gray-800">{section.address}</p>
                <p className="text-gray-500">{section.location}</p>
              </div>
            </div>
          )}
        </div>
      ))}

      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Connect With Us
        </h4>
        <div className="flex flex-wrap items-center gap-2">
          {socialData.map((data, i) => (
            <a
              href={data.link}
              target="_blank"
              rel="noreferrer"
              className={`${data.bgColor} rounded-xl w-9 h-9 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-xs`}
              key={i}
              aria-label={data.name}
            >
              <i className={`bx bxl-${data.icon} text-lg`}></i>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
