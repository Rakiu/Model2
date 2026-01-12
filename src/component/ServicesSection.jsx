import React from "react";
import { FiChevronRight } from "react-icons/fi";

import imgCallGirls from "../assets/10.jpg";
import imgMassage from "../assets/11.jpg";
import imgMaleEscorts from "../assets/12.jpg";

const ServicesSection = () => {
  const services = [
    {
      title: "Call Girls",
      img: imgCallGirls,
      description:
        "Girls with Wine is an adult classified website for Call girls and women that can help you find single call girls and women to satisfy your desires.",
      cities: ["Bangalore Call Girls", "Mumbai Call Girls", "Jaipur Call Girls"],
    },
    {
      title: "Massage",
      img: imgMassage,
      description:
        "The best massage ads for all kinds of sexy services. The hot massage girls will give you a relaxing full-body rub to make you feel amazing.",
      cities: ["Bangalore Massage", "Mumbai Massage", "Jaipur Massage"],
    },
    {
      title: "Male Escorts",
      img: imgMaleEscorts,
      description:
        "Find the hottest male escorts, boy toys, call boys, and other adult services on the best adult classifieds. Get the best adult experiences.",
      cities: [
        "Bangalore Male Escorts",
        "Mumbai Male Escorts",
        "Jaipur Male Escorts",
      ],
    },
  ];

  return (
    <section className="w-full px-4 py-16 bg-[#E9F7FE]">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-5xl font-extrabold text-[#A3195B]">
          Search Or Post Your Adult Advertisements
        </h2>
        <div className="w-24 h-1 bg-[#A3195B] mx-auto mt-2 mb-10"></div>

        {/* Description */}
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-700 text-lg md:text-xl leading-relaxed">
            There is no better place to be in India, as far as listings of professional escort services
            are concerned, than Girls with Wine. It assists people in finding great partners in a safe and anonymous
            environment.
          </p>

          <p className="text-center mt-4 text-gray-700 text-lg md:text-xl leading-relaxed">
            Whether you want an eye-candy date for an event or a relaxing place to hook up, Girls with Wine helps
            create remarkable memories while maintaining privacy and quality.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              {/* IMAGE + ABSOLUTE TITLE */}
              <div className="relative">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-64 object-cover"
                />

                {/* ABSOLUTE HEADING */}
                <div className=" w-80 text-center absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-[#A3195B] text-white px-6 py-2 rounded-md shadow-lg text-lg font-semibold">
                  {service.title}
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="p-4 text-gray-700 text-sm leading-relaxed mt-6">
                {service.description}
              </p>

              {/* CITY LIST */}
              <ul>
                {service.cities.map((city, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer transition border-t"
                  >
                    {city} <FiChevronRight />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
