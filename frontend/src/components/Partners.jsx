import React from "react";
import Slider from "react-slick";
import Img1 from "../assets/images/partners/1.webp";
import Img2 from "../assets/images/partners/2.webp";
import Img3 from "../assets/images/partners/3.webp";
import Img4 from "../assets/images/partners/4.webp";
import Img5 from "../assets/images/partners/5.webp";
import Img6 from "../assets/images/partners/6.webp";
import Img7 from "../assets/images/partners/7.webp";

const Partners = () => {
  const partnersList = [Img1, Img2, Img3, Img4, Img5, Img6, Img7];

  const settings = {
    dots: false,
    speed: 600,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 border-t border-gray-100">
      <div className="text-center mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Trusted by Industry Leaders & Financial Institutions
        </p>
      </div>

      <Slider {...settings} className="items-center">
        {partnersList.map((partner, index) => (
          <div key={index} className="px-4 py-2">
            <div className="flex items-center justify-center h-16 opacity-60 hover:opacity-100 transition-opacity">
              <img
                src={partner}
                alt={`Partner ${index + 1}`}
                className="max-h-10 max-w-[130px] object-contain mx-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Partners;
