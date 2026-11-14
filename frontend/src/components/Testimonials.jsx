import React from "react";
import Slider from "react-slick";
import { ClientsFeedback } from "../data/data";
import useResponsiveSliderSettings from "../hooks/useResponsiveSliderSettings";

const Testimonials = () => {
  const settings = {
    dots: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
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
  const sliderSettings = useResponsiveSliderSettings(settings);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-(--primaryColor)">
          Feedback
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 mb-2">
          {ClientsFeedback.title}
        </h2>
        <p className="text-sm text-gray-600">
          Discover why thousands of homeowners and investors choose us for their real estate journey.
        </p>
      </div>

      <Slider {...sliderSettings} className="mobile-dots-slider -mx-2 pb-8">
        {ClientsFeedback.feedback.map((item, index) => (
          <div key={index} className="px-2 pb-2 h-full">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full min-h-[260px]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 text-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i key={star} className="bx bxs-star"></i>
                    ))}
                  </div>
                  <i className="bx bxs-quote-alt-left text-3xl text-orange-200"></i>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{item.testimonial}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                <img
                  src={item.avatar_url}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border border-gray-200"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-gray-900 truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">{item.company}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Testimonials;
