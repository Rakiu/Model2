// import React from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import shoot1 from "../assets/shoot1.webp";
// import shoot2 from "../assets/shoot2.webp";
// import shoot3 from "../assets/shoot3.webp";
// import shoot4 from "../assets/shoot4.webp";
// import shoot5 from "../assets/shoot5.webp";

// const WhyChooseAndPhotoshoots = () => {
//   return (
//     <section className="w-full font-sans bg-[#DC99C4] ">
//       {/* ---------- WHY CHOOSE MODEL GIRLS ---------- */}
//       <div className="bg-[#D79CC3] py-14 px-6 sm:px-10 lg:px-20 text-center">
//         <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black uppercase mb-10">
//           WHY CHOOSE MODELGIRLS
//         </h2>

//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
//           {[
//             {
//               title: "Verified Profiles",
//               text: "Each profile is verified for authenticity and portfolio quality.",
//             },
//             {
//               title: "Flexible Pricing",
//               text: "Hourly or project-based pricing with transparent cost breakdown.",
//             },
//             {
//               title: "Secure Payments",
//               text: "Payment protection until job completion.",
//             },
//             {
//               title: "Portfolio Tools",
//               text: "Easy gallery upload & sharable portfolio links.",
//             },
//             {
//               title: "Trusted Partners",
//               text: "Studios, stylists & agencies checked for smooth shoots.",
//             },
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center"
//             >
//               <h3 className="text-base sm:text-lg font-semibold text-[#45072E] mb-2">
//                 {item.title}
//               </h3>
//               <p className="text-gray-700 text-sm leading-relaxed">
//                 {item.text}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ---------- PHOTO SHOOTS ---------- */}
//       <section className="w-full bg-[#D79CC3] py-14 px-4 sm:px-8 lg:px-20">
//       <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-black uppercase mb-10">
//         PHOTO SHOOTS
//       </h2>

//       {/* ---------- IMAGE LAYOUT ---------- */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 ">
//         {/* LEFT SIDE - Large Image */}
//         <div className="lg:col-span-2 overflow-hidden rounded-lg shadow-lg">
//           <img
//             src={shoot1}
//             alt="Main Shoot"
//             className="w-[603px] h-[751px] object-cover hover:scale-105 transition-transform duration-500"
//           />
//         </div>

//         {/* RIGHT SIDE - 4 small stacked images (2x2 grid) */}
//         <div className="grid grid-cols-2 ">
//           {[shoot2, shoot3, shoot4, shoot5].map((img, index) => (
//             <div
//               key={index}
//               className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500"
//             >
//               <img
//                 src={img}
//                 alt={`Shoot ${index + 2}`}
//                 className="w-[310px] h-[375px] object-cover hover:scale-105 transition-transform duration-500"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//     </section>
//   );
// };

// export default WhyChooseAndPhotoshoots;
import React from "react";
import shoot1 from "../assets/FollowUs.png";

const WhyChooseAndPhotoshoots = () => {
  const features = [
    {
      title: "Verified Profiles",
      text: "Each profile is verified for authenticity by girls with wine team.",
    },
    {
      title: "Flexible Pricing",
      text: "Hourly or project-based pricing with transparent cost breakdown.",
    },
    {
      title: "  Payments",
      text: "100% Cash payments.",
    },
    // {
    //   title: "Portfolio Tools",
    //   text: "Easy gallery upload & sharable portfolio links.",
    // },
    // {
    //   title: "Trusted Partners",
    //   text: "Studios, stylists & agencies checked for smooth shoots.",
    // },
  ];

  return (
    <section className="w-full font-sans bg-[#EFFAFF] overflow-hidden">
      {/* ---------- WHY CHOOSE MODEL GIRLS ---------- */}
      <div className="bg-[#EFFAFF] py-12 sm:py-16 px-5 sm:px-10 lg:px-20 text-center">
        <h2 className="text-[22px] sm:text-[26px] md:text-[32px] lg:text-[38px] font-semibold text-black uppercase mb-10 tracking-wide">
          WHY CHOOSE Girl With Wine
        </h2>

        {/* ---------- Cards Grid ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 sm:p-7 md:p-8 flex flex-col items-center text-center"
            >
              <h3 className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] font-semibold text-[#45072E] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- PHOTO SHOOTS ---------- */}
      {/* <div className="w-full bg-[#D79CC3] py-12 sm:py-16 px-5 sm:px-10 lg:px-20">
        <h2 className="text-center text-[22px] sm:text-[26px] md:text-[32px] lg:text-[38px] font-semibold text-black uppercase mb-10 tracking-wide">
          PHOTO SHOOTS
        </h2>

       
        <div className="max-w-7xl mx-auto overflow-hidden rounded-2xl shadow-xl">
          <img
            src={shoot1}
            alt="Photoshoot"
            className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div> */}
    </section>
  );
};

export default WhyChooseAndPhotoshoots;
