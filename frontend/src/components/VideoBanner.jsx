import React, { useState } from "react";
import VideoImage from "../assets/images/video-banner.webp";

const VideoBanner = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative overflow-hidden w-full">
      {/* Video Banner Container */}
      <div
        className="relative cursor-pointer group h-[260px] sm:h-[360px] md:h-[460px] w-full"
        onClick={() => setIsPlaying(true)}
      >
        <img
          src={VideoImage}
          alt="Virtual Tour Preview"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>

        {/* Text Callout */}
        <div className="absolute top-6 left-6 sm:top-10 sm:left-10 text-white z-10 max-w-sm">
          <span className="text-xs uppercase font-bold tracking-widest text-orange-300 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
            Virtual Experience
          </span>
          <h3 className="text-xl sm:text-3xl font-extrabold mt-2 drop-shadow-md">
            Take a 3D Tour of Modern Luxury
          </h3>
        </div>

        {/* Pulsing Play Button */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/30 animate-ping"></span>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-(--primaryColor) shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <i className="bx bx-play text-4xl sm:text-5xl ml-1"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isPlaying && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsPlaying(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 text-white hover:text-orange-400 text-3xl z-10 bg-black/50 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              aria-label="Close video"
            >
              <i className="bx bx-x"></i>
            </button>
            <iframe
              src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1"
              title="Property Tour"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoBanner;
