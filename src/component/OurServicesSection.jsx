// import React from "react";
// import { ArrowLeft, ArrowRight } from "lucide-react";

// const OurServicesSection = () => {
//   const services = [
//     {
//       title: "Model Booking",
//       desc: "Hire models for catalogs, e-commerce, TVCs & events with transparent pricing.",
//     },
//     {
//       title: "Portfolio & Studio",
//       desc: "Professional portfolio shoots with our partnered studios and photographers.",
//     },
//     {
//       title: "Brand Collabs",
//       desc: "Influencer partnerships and paid promotions managed end-to-end.",
//     },
//     {
//       title: "Talent Management",
//       desc: "Career guidance, auditions & representation for models.",
//     },
//   ];

//   return (
//     <section className="bg-white  h-auto w-full">
//       <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-5 py-6 md:py-10 text-center relative">
        

//         {/* Section Title */}
//         <h2 className="text-[40px] md:text-[44px] font-medium text-gray-900 mb-5 tracking-wide " style={{fontFamily:"Libre Caslon Displa"}}>
//           OUR SERVICES
//         </h2>

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-center">
//           {services.map((service, index) => (
//             <div
//               key={index}
//               className="bg-[#DC99C4] rounded-2xl shadow-md p-6 md:p-8 text-left"
//             >
//               <h3 className="text-[15px] md:text-[20px] font-bold text-[#000000] mb-2 text-center">
//                 {service.title}
//               </h3>
//               <p className="text-[12px] md:text-[14px] font-medium text-[#2B0417]  text-center">
//                 {service.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OurServicesSection;


import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const OurServicesSection = () => {
  const services = [
    {
      title: "Model Booking",
      desc: "Hire models for catalogs, e-commerce, TVCs & events with transparent pricing.",
    },
    {
      title: "Portfolio & Studio",
      desc: "Professional portfolio shoots with our partnered studios and photographers.",
    },
    {
      title: "Brand Collabs",
      desc: "Influencer partnerships and paid promotions managed end-to-end.",
    },
    {
      title: "Talent Management",
      desc: "Career guidance, auditions & representation for models.",
    },
  ];

  return (
    <section className="bg-white w-full py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 text-center">
        
        {/* ---------- SECTION TITLE ---------- */}
        <h2
          className="text-[32px] sm:text-[38px] md:text-[44px] font-semibold text-gray-900 mb-10 tracking-wide"
          style={{ fontFamily: "Libre Caslon Display" }}
        >
          OUR SERVICES
        </h2>

        {/* ---------- SERVICES GRID ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#DC99C4] rounded-2xl shadow-md p-6 md:p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              <h3 className="text-[18px] md:text-[20px] font-bold text-[#000000] mb-3">
                {service.title}
              </h3>
              <p className="text-[14px] md:text-[15px] font-medium text-[#2B0417] leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServicesSection;
