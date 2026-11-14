import React from "react";
import Slider from "react-slick";

const ImagesSlider = ({ images = [] }) => {
  const settings = {
    dots: false,
    infinite: images.length > 1,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: images.length > 1,
  };

  const getImageUrl = (item) => {
    if (!item) return "https://demo01.houzez.co/wp-content/uploads/2016/03/205.jpg";
    if (typeof item === "string") return item;
    return item.url || item.secure_url || "";
  };

  return (
    <div className="slider-container w-full h-full relative" onClick={(e) => e.stopPropagation()}>
      <Slider {...settings} className="w-full h-full">
        {images.map((img, index) => (
          <div key={img._id || index} className="w-full h-full overflow-hidden">
            <img
              src={getImageUrl(img)}
              alt="Property"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImagesSlider;
