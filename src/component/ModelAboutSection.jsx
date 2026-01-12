



import React from "react";
import modelTop from "../assets/model1.webp";
import modelBottom from "../assets/6.jpg";
import { Book } from "lucide-react";
import BookingAndModelsSection from "./BookingAndModelsSection";

const ModelAboutSection = () => {
  return (
    <section className="w-full font-sans bg-white mt-10 md:mt-16">
      {/* ---------- TOP SECTION ---------- */}
      {/* <div className="relative w-full bg-white overflow-hidden">
        
        <div className="absolute bottom-0 w-full h-1/2 bg-[#D79CC3]"></div>

       
        <div className="relative flex flex-col md:flex-row items-center justify-center">
         
          <div className="relative w-full mt-6 md:mt-10">
            <img
              src={modelTop}
              alt="Ozge by Pool"
              className="w-full h-[480px] md:h-[600px] object-cover rounded-lg shadow-xl"
            />
          </div>

         
          <div className="bg-white shadow-2xl rounded-xl p-8 md:p-10 lg:p-12 md:absolute md:left-[0%] md:top-1/2 md:-translate-y-1/2 z-20 max-w-md">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 leading-snug">
              I'M OZGE, FASHION AND FILM MODEL
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              Brownie tootsie roll cotton candy cotton candy canes. Sesame snaps
              pastry candy canes liquorice chocolate sweet pudding cupcake.
              Dessert tart chocolate cake dessert marzipan cupcake apple pie
              cheesecake.
            </p>
            <button className="text-[#3D0C55] font-semibold underline hover:text-[#D79CC3] transition">
              Read About My Story &gt;&gt;
            </button>
          </div>
        </div>
      </div> */}

      {/* ---------- BOTTOM SECTION ---------- */}
      <div className="relative py-16 md:py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* White bottom strip */}
        <div className="absolute bottom-0 left-0 w-full h-[120px] bg-white z-0"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Image + Arrow */}
          <div className="relative flex-1 w-full max-w-lg">
            <img
              src={modelBottom}
              alt="Ozge Pose"
              className="w-full h-[520px] object-cover rounded-xl shadow-xl"
            />
            <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#f6e7f0] hover:bg-white text-[#D79CC3] text-xl font-bold px-5 py-3 rounded-full border-2 border-[#D79CC3] shadow-md transition">
              ←
            </button>
          </div>

          {/* Right Text Info */}
          <div className="flex-1 text-black lg:pl-10">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-8">
              Ankita Sharma 
            </h2>

            {/* Measurement Grid */}
            <div className="grid grid-cols-3 gap-x-10 gap-y-6 border-t border-b border-[#b05591] py-8 text-base font-medium">
              <div>
                <span className="font-semibold block">HEIGHT</span>
                <span>5'10"</span>
              </div>
              <div>
                <span className="font-semibold block">WEIGHT</span>
                <span>140</span>
              </div>
              <div>
                <span className="font-semibold block">WAIST</span>
                <span>25"</span>
              </div>
              <div>
                <span className="font-semibold block">INSEAM</span>
                <span>32"</span>
              </div>
              <div>
                <span className="font-semibold block">EYES</span>
                <span>BROWN</span>
              </div>
              <div>
                <span className="font-semibold block">HAIR</span>
                <span>BROWN</span>
              </div>
            </div>

            {/* Button */}
            <div className="mt-10 flex justify-end">
              <button className="bg-[#3D0C55] hover:bg-[#2a073e] text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg transition">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <BookingAndModelsSection /> */}
    </section>
  );
};

export default ModelAboutSection;
