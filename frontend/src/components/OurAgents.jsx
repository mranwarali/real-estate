import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import AgentProfileModal from "./AgentProfileModal";

const BASE_API = import.meta.env.VITE_BASE_URL;

const OurAgents = () => {
  const [data, setData] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_API}/user/fetch-agent`);
        setData(res.data);
        console.log("data", data);
      } catch (error) {
        console.log(error);
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
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-10">
        <h2 className="text-3xl text-gray-700 font-semibold mb-4 text-center">
          Meet Our Agents
        </h2>
        <p className="text-sm text-gray-600 text-center">
          Highlight the best of your properties by using the List Category
          shortcode.
        </p>
      </div>

      {data.length > 0 ? (
        <Slider {...settings} className="agent-slider">
          {data.map((agent) => (
            <div key={agent._id} className="px-2 my-3">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden border border-gray-100 h-full flex flex-col items-center p-6 text-center">
                <img
                  className="h-24 w-24 rounded-full object-cover border-4 border-blue-50 mb-4 mx-auto"
                  src={
                    agent.avatar ||
                    `https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg`
                  }
                  alt=""
                />
                <h3 className="text-xl font-bold text-gray-800">
                  {agent.name}
                </h3>
                <p className="text-gray-600 mt-2 text-sm line-clamp-3 italic">
                  "{agent.bio || "Expert real estate agent ready to help you."}"
                </p>
                <button
                  className="mt-auto pt-5 text-blue-600 font-semibold hover:underline"
                  onClick={() => handleOpenModal(agent)}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">No agents available.</p>
      )}

      {/* profile modal  */}

      {isModalOpen && selectedAgent && (
        <AgentProfileModal
          handleCloseModal={handleCloseModal}
          selectedAgent={selectedAgent}
        />
      )}
    </div>
  );
};

export default OurAgents;
