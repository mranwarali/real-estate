import React from "react";
import PropertyList from "./properties/PropertyList";
import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import CityWise from "../components/CityWiseProperties";
import OurAgents from "../components/Ouragents";
import EnquirySection from "../components/EnquirySection";
import Partners from "../components/Partners";
import Testimonials from "../components/Testimonials";
import VideoBanner from "../components/VideoBanner";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Categories />
      <PropertyList />
      <EnquirySection />
      <CityWise />
      <OurAgents />
      <Testimonials />
      <VideoBanner />
      <Partners />
    </div>
  );
};

export default Home;
