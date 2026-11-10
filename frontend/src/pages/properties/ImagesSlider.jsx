import React from "react";
import Slider from "react-slick";

const ImagesSlider = ({ images = [] }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={img._id || index} className="overflow-hidden">
            <img
              src={img.url}
              alt=""
              className="w-full h-full object-cover transition duration-300 hover:scale-110 hover:rotate-2"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImagesSlider;
