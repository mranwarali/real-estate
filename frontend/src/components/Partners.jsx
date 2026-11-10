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

  var settings = {
    dots: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="container mx-auto py-10">
      {/* <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Partners</h2>
        <p className="text-sm text-gray-500 mb-4">
          We only work with the best companies around the globe
        </p>
      </div> */}
      <Slider {...settings}>
        {partnersList.map((partner, index) => (
          <div className="w-30" key={index}>
            <img
              src={partner}
              alt={`Partner ${index + 1}`}
              className="block mx-auto"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Partners;
