import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import model1 from "../assets/2.jpg";
import model2 from "../assets/3.jpg";
import model3 from "../assets/4.jpg";
import model4 from "../assets/5.jpg";

const FeaturedModelsSection = () => {
  const models = [
    { id: 1, name: "Aisha Sharma", location: "Mumbai • Editorial", image: model1 },
    { id: 2, name: "Priya Kumari", location: "Mumbai • Editorial", image: model2 },
    { id: 3, name: "Payal Joshi", location: "Mumbai • Editorial", image: model3 },
    { id: 4, name: "Supriya Agarwal", location: "Mumbai • Editorial", image: model4 },
    { id: 5, name: "Komal", location: "Mumbai • Editorial", image: model1 },
  ];

  const scrollLeft = () => {
    document.getElementById("scrollContainer").scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    document.getElementById("scrollContainer").scrollBy({ left: 350, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-3 py-10 md:py-14">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <h2 className="ttext-3xl md:text-5xl  font-libre font-semibold text-[#A3195B] tracking-wide">
            Best Call Girls
          </h2>

          {/* Arrows — hide on mobile */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={scrollLeft}
              className="bg-white hover:bg-gray-100 text-gray-800 rounded-full p-2 shadow-md transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="bg-white hover:bg-gray-100 text-gray-800 rounded-full p-2 shadow-md transition"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scroll Container */}
        <div
          id="scrollContainer"
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          {models.map((model) => (
            <div
              key={model.id}
              className="group relative min-w-[240px] md:min-w-[280px] lg:min-w-[300px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-[320px] md:h-[350px] object-cover transform
                md:group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay on hover (Desktop Only) */}
              <div className="absolute inset-0 bg-black/30 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Book Now — Hide on Mobile */}
              <button
                className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 
                bg-[#0F7BAC] text-white px-5 py-2 rounded-md text-sm font-medium 
                hover:bg-purple-900 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500"
              >
                Book Now
              </button>

              {/* Info Card — Always visible on mobile */}
              <div
                className="
                  absolute bottom-0 left-0 right-0 bg-[#EFFAFF] px-4 py-3 text-left 
                  md:translate-y-full md:group-hover:translate-y-0 
                  transition-all duration-500
                "
              >
                <h3 className="text-[16px] md:text-[18px] font-semibold text-black mb-1">
                  {model.name}
                </h3>
                <p className="text-sm text-gray-700">{model.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedModelsSection;
