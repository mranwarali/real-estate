import React from "react";
import Slider from "react-slick";
import { ClientsFeedback } from "../data/data";

const Testimonials = () => {
  const settings = {
    dots: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {ClientsFeedback.title}
        </h2>
        <p className="text-base text-gray-600 max-w-xl mx-auto">
          {ClientsFeedback.paragraph}
        </p>
      </div>

      <Slider {...settings}>
        {ClientsFeedback.feedback.map((item, index) => (
          <div key={index} className="px-3 h-full my-4">
            <div
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full min-h-[250px]"
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            >
              <i className="bx bxs-quote-alt-left text-3xl text-gray-600"></i>
              <p className="text-gray-600 italic text-sm mb-6">
                "{item.testimonial}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <img
                  src={item.avatar_url}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover bg-gray-100"
                />
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {item.name}
                  </h4>
                  {/* <p className="text-xs text-gray-500">{item.role} </p> */}
                  <p className="text-xs text-gray-600">{item.company}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
