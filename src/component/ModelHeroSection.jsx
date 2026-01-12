


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import herosection1 from "../assets/1.jpg";
import herosection2 from "../assets/herosection2.webp";

const ModelHeroSection = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) return;
    const city = search.trim().toLowerCase();
    navigate(`/city/${city}`); // ⬅ navigate to city girls page
  };

  return (
    <section className="bg-[#0cb8bd] w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 lg:px-20 py-12 md:py-20">
        
        {/* LEFT CONTENT */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left mb-10 md:mb-0">

          <h4 className="text-xs md:text-2xl uppercase tracking-[0.25em] text-white font-semibold mb-2">
            CALL GIRLS SERVICES 
          </h4>

          <h1 className="text-[32px] sm:text-[38px] md:text-[2.8rem] lg:text-8xl font-normal text-white  mb-4">
            Girls With Wine
            <br className="hidden md:block" />
            <span className="text-[28px] sm:text-[28px] md:text-[1.8rem] lg:text-[2.2rem] font-normal">Escort Service In India</span> 
          </h1>

          <p className="text-black text-[15px] sm:text-[16px] md:text-[17px] font-normal mb-6 mx-auto md:mx-0 w-full md:w-11/12 lg:w-4/5">
            Search Verified Profiles, Chat Directly With Talent, and Book Securely.
          </p>

          {/* SEARCH BOX */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-10">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by City Example: Ajmer"
              className="flex-1 w-full sm:w-auto px-5 py-3 bg-white rounded-xl border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-purple-700 shadow-sm 
              text-sm md:text-base placeholder:text-gray-700 text-center sm:text-left"
            />

            <button
              onClick={handleSearch}
              className="bg-[#45072E] text-white px-8 py-3 rounded-xl hover:bg-purple-900 transition-all duration-300 text-sm md:text-base font-semibold shadow-md"
            >
              Search
            </button>
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
          <div className="relative flex flex-col sm:flex-row items-center md:items-start">

            <img src={herosection1} alt="Model 1"
              className="rounded-2xl w-[85%] sm:w-[70%] md:w-[90%] object-contain z-10 mb-6 md:mb-0 px-20" />

            

            <div className="absolute -bottom-10 -left-10 w-[130%] h-[130%] bg-linear-to-t from-white/10 to-transparent blur-3xl -z-10"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ModelHeroSection;
