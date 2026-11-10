import React from "react";
import VideoImage from "../assets/images/video-banner.webp";

const VideoBanner = () => {
  return (
    <div>
      {/* video banner  */}
      <div className="video-sec relative cursor-pointer">
        <img src={VideoImage} alt="" />
        <i className="bx bx-play text-6xl transition-transform duration-300 hover:scale-110 p-4 rounded-full bg-white align-middle text-[var(--primaryColor)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
      </div>
    </div>
  );
};

export default VideoBanner;
