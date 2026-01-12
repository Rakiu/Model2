import React from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const CitySection = ({ loading, cities = [] }) => {
  const navigate = useNavigate();

 const handleCityClick = (city) => {
  if (!city?._id) return;

  navigate(`/city/${city.mainCity}`, {
    state: { cityId: city._id }, // Hidden ID
  });
};


  const skeletonItems = new Array(10).fill(0);

  return (
    <section className="w-full bg-white px-4 sm:px-8 lg:px-20 mb-10">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center mb-8">
          Available Cities
        </h3>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skeletonItems.map((_, i) => (
              <div
                key={i}
                className="h-12 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"
                aria-hidden
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
            {cities.length > 0 ? (
              cities.map((city) => {
                const label = city?.mainCity
                  ? `Call girls in ${city.mainCity}`
                  : "Unknown city";

                return (
                  <button
                    key={city._id || label}
                    onClick={() => handleCityClick(city)}
                    type="button"
                    className="w-full flex items-center gap-3 justify-center px-4 py-3 rounded-full border border-gray-200 bg-white shadow-sm
                               hover:bg-[#00B9BE] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#00B9BE] transition-transform transform
                               active:translate-y-0.5 disabled:opacity-60 cursor-pointer "
                    aria-label={label}
                  >
                    <span
                      className="flex items-center justify-center shrink-0 rounded-full w-9 h-9 bg-[#F7EEF6] text-[#630C50] 
                                 group-hover:bg-white group-hover:text-white"
                      aria-hidden
                    >
                      <FiSearch className="text-lg" />
                    </span>

                    <p
                      className="font-medium text-sm text-center truncate"
                      style={{ maxWidth: "140px" }}
                      title={label}
                    >
                      {label}
                    </p>
                  </button>
                );
              })
            ) : (
              <p className="text-center text-gray-600 col-span-full">
                No cities found.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CitySection;
