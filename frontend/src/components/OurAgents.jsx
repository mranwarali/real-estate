import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import AgentProfileModal from "./AgentProfileModal";
import useResponsiveSliderSettings from "../hooks/useResponsiveSliderSettings";

const BASE_API = import.meta.env.VITE_BASE_URL;

const OurAgents = () => {
  const [data, setData] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fallbackAgents = [
    {
      _id: "agent-1",
      name: "Rohit Malhotra",
      bio: "Senior Luxury Real Estate Consultant with 10+ years helping families find premium villas and high-end apartments.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
      email: "rohit.m@dreamhome.com",
      phone: "+91 98112 34567",
    },
    {
      _id: "agent-2",
      name: "Pooja Singhania",
      bio: "Specializing in commercial leasing and residential high-rises across Mumbai and Bengaluru.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      email: "pooja.s@dreamhome.com",
      phone: "+91 98223 45678",
    },
    {
      _id: "agent-3",
      name: "Anil Kulkarni",
      bio: "Certified property valuer and investment advisor helping first-time buyers navigate mortgages and documentation.",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
      email: "anil.k@dreamhome.com",
      phone: "+91 98334 56789",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_API}/user/fetch-agent`);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setData(res.data);
        } else {
          setData(fallbackAgents);
        }
      } catch (error) {
        console.error("Agents fetch error:", error);
        setData(fallbackAgents);
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = (agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAgent(null);
    setIsModalOpen(false);
  };

  const settings = {
    dots: true,
    infinite: data.length > 2,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, infinite: data.length > 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };
  const sliderSettings = useResponsiveSliderSettings(settings);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-(--primaryColor)">
          Our Team
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 mb-2">
          Meet Our Certified Agents
        </h2>
        <p className="text-sm text-gray-600">
          Our verified local experts are dedicated to helping you make the right property decisions.
        </p>
      </div>

      <Slider {...sliderSettings} className="mobile-dots-slider -mx-2 pb-8">
        {data.map((agent) => (
          <div key={agent._id} className="px-2 pb-2">
            <div className="bg-white rounded-2xl shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col items-center p-5 sm:p-8 text-center h-full">
              <div className="relative mb-4">
                <img
                  className="h-24 w-24 rounded-full object-cover border-4 border-orange-100 shadow-md"
                  src={
                    agent.avatar ||
                    `https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg`
                  }
                  alt={agent.name}
                />
                <span className="absolute bottom-0 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px]" title="Verified Agent">
                  <i className="bx bx-check"></i>
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900">
                {agent.name}
              </h3>
              <p className="text-xs font-semibold text-(--primaryColor) mb-3">
                Real Estate Specialist
              </p>

              <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4 italic">
                "{agent.bio || "Expert real estate agent ready to guide you home."}"
              </p>

              <button
                type="button"
                className="mt-auto px-5 py-2 bg-gray-50 hover:bg-(--primaryColor) text-gray-700 hover:text-white rounded-xl text-xs font-bold transition-all border border-gray-200 hover:border-(--primaryColor) cursor-pointer"
                onClick={() => handleOpenModal(agent)}
              >
                View Profile & Contact
              </button>
            </div>
          </div>
        ))}
      </Slider>

      {/* Profile modal */}
      {isModalOpen && selectedAgent && (
        <AgentProfileModal
          handleCloseModal={handleCloseModal}
          selectedAgent={selectedAgent}
        />
      )}
    </section>
  );
};

export default OurAgents;
