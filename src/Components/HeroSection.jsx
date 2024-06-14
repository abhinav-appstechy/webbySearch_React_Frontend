import React from 'react';
import HeroImage from "/public/hero_section.jpg"

const HeroSection = () => {
  return (
    <div className="grid md:grid-cols-2 items-center md:gap-4 gap-8 font-[sans-serif] text-[#333] max-w-5xl max-md:max-w-md mx-auto mt-20">
      <div className="max-md:order-1 max-md:text-center">
        <h3 className="md:text-3xl text-2xl md:leading-10">Discover WebbySearch</h3>
        <p className="mt-4 text-sm">Welcome to WebbySearch, your ultimate custom search engine experience. Powered by the robust Crawler extension, WebbySearch brings you precision, speed, and a highly personalized web exploration journey.</p>
        <button type="button" className="px-6 py-2 mt-8 font-semibold rounded text-sm outline-none border-2 border-[#333] hover:bg-[#333] hover:text-white transition-all duration-300">Explore</button>
      </div>
      <div className="md:h-[450px]">
        <img src={HeroImage} className="w-full h-full md:object-contain" />
      </div>
    </div>
  )
}

export default HeroSection