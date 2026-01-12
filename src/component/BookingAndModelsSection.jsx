// import React from "react";
// import model1 from "../assets/booking1.webp";
// import model2 from "../assets/booking2.webp";
// import model3 from "../assets/booking3.webp";
// import model4 from "../assets/booking4.webp";
// import model5 from "../assets/booking5.webp";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import WhyChooseAndPhotoshoots from "./WhyChooseAndPhotoshoots";

// const BookingAndModelsSection = () => {
//   return (
//     <section className="w-full font-sans bg-white overflow-hidden">
//       {/* ---------- HOW BOOKING WORKS ---------- */}
//       <div className="bg-[#D79CC3] py-10 sm:py-14 px-4 sm:px-10 lg:px-20 relative text-center">
//         {/* Arrows */}
//         <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-gray-700 text-gray-700 hover:bg-white/30 cursor-pointer transition">
//           <ChevronLeft className="w-5 h-5" />
//         </div>
//         <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-gray-700 text-gray-700 hover:bg-white/30 cursor-pointer transition">
//           <ChevronRight className="w-5 h-5" />
//         </div>

//         {/* Title */}
//         <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-black mb-10 uppercase tracking-wide">
//           HOW BOOKING WORKS
//         </h2>

//         {/* Steps Timeline */}
//         <div className="relative flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto">
//           {/* Connecting line */}
//           <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-300 hidden sm:block"></div>

//           {[
//             "Browse Profiles",
//             "Select Availability",
//             "Confirm Details & Payment",
//             "Shoot / Event",
//             "Shoot / Event",
//           ].map((label, i) => (
//             <div
//               key={i}
//               className="relative flex flex-col items-center text-center sm:w-auto w-full mb-8 sm:mb-0"
//             >
//               <div className="flex items-center justify-center bg-[#630C50] text-white font-semibold w-9 h-9 sm:w-12 sm:h-12 rounded-full shadow-md z-10">
//                 {i + 1}
//               </div>
//               <p className="mt-3 text-[12px] sm:text-sm md:text-base font-medium text-black max-w-[130px] leading-snug">
//                 {label}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ---------- MODELS SECTION ---------- */}
//       <div className="relative bg-[#DC99C4] pt-12 pb-20 sm:pb-24 px-4 sm:px-10 lg:px-20">
//         {/* White divider on top */}
//         <div className="absolute top-0 left-0 w-full h-[260px] bg-white z-0"></div>

//         {/* Models Grid */}
//         <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 mb-10 sm:mb-14">
//           {[model1, model2, model3, model4, model5].map((img, index) => (
//             <div
//               key={index}
//               className="overflow-hidden rounded-md shadow-md hover:shadow-lg transition-all duration-500"
//             >
//               <img
//                 src={img}
//                 alt={`Model ${index + 1}`}
//                 className="object-cover w-full h-[180px] sm:h-[230px] md:h-[250px] lg:h-[360px] hover:scale-105 transition-transform duration-500"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Models & Contact Info */}
//         <div className="relative z-20 flex flex-col lg:flex-row items-start justify-between gap-10 bg-white p-6 sm:p-10 rounded-xl shadow-md">
//           {/* MODELS Info */}
//           <div className="flex-1">
//             <h3 className="text-xl sm:text-2xl font-semibold text-[#2a0520] mb-4 uppercase tracking-wide">
//               MODELS
//             </h3>
//             <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
//               SIGNED AGENCY <br />
//               <span className="text-[#630C50] font-medium">
//                 ENHANCEMODELS.COM
//               </span>
//               <br />
//               Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Fusce
//               Elementum Ligula Eget Dui Dapibus.
//             </p>
//           </div>

//           {/* CONTACT Info */}
//           <div className="flex-1 bg-[#F4E1ED] rounded-xl p-6 sm:p-8 shadow-inner">
//             <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-[#45072E] uppercase tracking-wide">
//               CONTACT
//             </h3>
//             <p className="text-gray-800 mb-2 font-semibold text-sm sm:text-base">
//               MODELS
//             </p>
//             <p className="text-gray-700 mb-2 font-medium text-sm sm:text-base">
//               MODELS@AGENCYMAIL.COM
//             </p>
//             <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
//               Based in Los Angeles, CA/NY. <br />
//               Available for Worldwide Shoots & Travel.
//             </p>
//           </div>
//         </div>
//       </div>
//       <WhyChooseAndPhotoshoots />
//     </section>
//   );
// };

// export default BookingAndModelsSection;
import React from "react";
import model1 from "../assets/7.jpg";
import model2 from "../assets/8.jpg";
import model3 from "../assets/9.jpg";
import model4 from "../assets/10.jpg";
import model5 from "../assets/11.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WhyChooseAndPhotoshoots from "./WhyChooseAndPhotoshoots";

const BookingAndModelsSection = () => {
  const steps = [
    "Browse Profiles",
    "Select Availability",
    "Confirm Details & Payment",
    "Shoot / Event",
    "Review & Feedback",
  ];

  const models = [model1, model2, model3, model4, model5];

  return (
    <section className="w-full font-sans bg-white overflow-hidden">
      {/* ---------- HOW BOOKING WORKS ---------- */}
      {/* <div className="bg-[#D79CC3] py-10 sm:py-14 px-4 sm:px-8 lg:px-20 relative text-center">
       
        <div className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-9 h-9 rounded-full border border-gray-700 text-gray-700 hover:bg-white/30 cursor-pointer transition">
          <ChevronLeft className="w-5 h-5" />
        </div>
        <div className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-9 h-9 rounded-full border border-gray-700 text-gray-700 hover:bg-white/30 cursor-pointer transition">
          <ChevronRight className="w-5 h-5" />
        </div>

        
        <h2 className="text-[22px] sm:text-[26px] md:text-[32px] lg:text-[38px] font-semibold text-black mb-10 uppercase tracking-wide leading-tight">
          HOW BOOKING WORKS
        </h2>

        <div className="relative flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto">
          
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-300 hidden sm:block"></div>

          {steps.map((label, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center text-center sm:w-auto w-full mb-10 sm:mb-0"
            >
              
              <div className="flex items-center justify-center bg-[#630C50] text-white font-semibold w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md z-10">
                {i + 1}
              </div>

              
              <p className="mt-3 text-[13px] sm:text-sm md:text-base font-medium text-black max-w-40 leading-snug px-2">
                {label}
              </p>

              
              {i !== steps.length - 1 && (
                <div className="absolute left-1/2 top-[3.2rem] w-px h-10 bg-gray-300 sm:hidden"></div>
              )}
            </div>
          ))}
        </div>
      </div> */}

      <div className="relative bg-[#EFFAFF] pt-12 pb-20 sm:pb-24 px-4 sm:px-8 lg:px-20">
        
        <div className="absolute top-0 left-0 w-full h-60 sm:h-[260px] bg-white z-0"></div>

        
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 mb-10 sm:mb-14">
          {models.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-500"
            >
              <img
                src={img}
                alt={`Model ${index + 1}`}
                className="object-cover w-full h-[180px] sm:h-[230px] md:h-[260px] lg:h-[340px] xl:h-[380px] hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* ---------- Models & Contact Info ---------- */}
        <div className="relative z-20 flex flex-col lg:flex-row items-start justify-between gap-10 bg-white p-6 sm:p-10 rounded-xl shadow-md">
          {/* MODELS Info */}
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#2a0520] mb-4 uppercase tracking-wide">
              Girls With Wine
            </h3>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Call Girl Service <br />
              <span className="text-[#630C50] font-medium">
                info@girlswithwine.com
              </span>
              <br />
             Girls with Wine is one of India's best online escort service websites. We want to give customers a safe and easy platform to look into different professional services without worrying about their safety.
            </p>
          </div>

          {/* CONTACT Info */}
          <div className="flex-1 bg-[#EFFAFF] rounded-xl p-6 sm:p-8 shadow-inner text-center lg:text-left">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 text-[#45072E] uppercase tracking-wide">
              CONTACT
            </h3>
            <div className="space-y-2">
              <p className="text-gray-800 font-semibold text-sm sm:text-base">
                Escort Services
              </p>
              <p className="text-gray-700 font-medium text-sm sm:text-base">
                escort@girlswithwine.com 
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Based in India. <br />
                Available for Pan India.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- NEXT SECTION ---------- */}
      <WhyChooseAndPhotoshoots />
    </section>
  );
};

export default BookingAndModelsSection;
