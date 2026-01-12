import React, { useState, useRef, useEffect } from "react";
import { FiChevronRight, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getCitiesThunk } from "../store/slices/citySlice";

const MostSearchedLocations = () => {
  const dispatch = useDispatch();
  const { cities, loading } = useSelector((state) => state.city);

  const [locations, setLocations] = useState([]);
  const [index, setIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  // FIXED CARD WIDTH (exactly like screenshot)
  const cardWidth = 360; // px
  const cardGap = 32; // px gap between cards

  const sliderRef = useRef(null);

  useEffect(() => {
    dispatch(getCitiesThunk());
  }, [dispatch]);

  // FORMAT DATA
  useEffect(() => {
    if (!Array.isArray(cities)) {
      setLocations([]);
      return;
    }

    const grouped = {};

    cities.forEach((city) => {
      const stateId = city.state?._id;
      const stateName = city.state?.name;

      if (!stateId) return;

      if (!grouped[stateId]) {
        grouped[stateId] = {
          id: stateId,
          state: stateName,
          allMainCities: [],
        };
      }

      if (city.mainCity) {
        grouped[stateId].allMainCities.push(city.mainCity.trim());
      }
    });

    const formatted = Object.values(grouped).map((item, idx) => ({
      ...item,
      allMainCities: [...new Set(item.allMainCities)],
      color: idx % 2 === 0 ? "bg-[#A3195B]" : "bg-[#0D86D1]",
    }));

    setLocations(formatted);
  }, [cities]);

  // RESPONSIVE BREAKPOINTS
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) setCardsToShow(1); // Mobile
      else if (width < 1024) setCardsToShow(2); // Tablet
      else setCardsToShow(3); // Desktop
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // SLIDER TRANSFORM
  useEffect(() => {
    if (!sliderRef.current) return;

    sliderRef.current.style.transform = `translateX(-${
      index * (cardWidth + cardGap)
    }px)`;
    sliderRef.current.style.transition = "transform 0.4s ease-in-out";
  }, [index]);

  const maxIndex = Math.max(0, locations.length - cardsToShow);

  const nextSlide = () => setIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setIndex((prev) => Math.max(prev - 1, 0));

  return (
    <section className="bg-[#E9F7FE] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#A3195B]">
          Most Searched Locations in India
        </h2>
        <div className="w-28 sm:w-32 h-1 bg-[#A3195B] mx-auto mt-3 mb-12 rounded-full"></div>

        {loading && (
          <p className="text-center py-10 text-xl text-[#A3195B] font-semibold">
            Loading...
          </p>
        )}

        {!loading && locations.length === 0 && (
          <p className="text-center py-10 text-lg text-gray-600">
            No locations found.
          </p>
        )}

        {!loading && locations.length > 0 && (
          <>
            <div className="relative flex items-center gap-2">
              {/* LEFT ARROW */}
              <button
                onClick={prevSlide}
                disabled={index === 0}
                className="hidden sm:block text-3xl text-[#A3195B] p-2 hover:scale-110 disabled:opacity-40 transition"
              >
                <FiArrowLeft />
              </button>

              {/* SLIDER WRAPPER */}
              <div className="overflow-hidden flex-1">
                <div
                  ref={sliderRef}
                  className="flex gap-8"
                  style={{
                    width: locations.length * (cardWidth + cardGap),
                  }}
                >
                  {locations.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl shadow-lg border flex flex-col py-6 h-[420px] shrink-0 transition hover:shadow-xl"
                      style={{ width: cardWidth }}
                    >
                      {/* ICON */}
                      <div className="flex justify-center items-center mb-3">
                        <div
                          className={`${item.color} text-white p-4 rounded-xl shadow-md`}
                        >
                          <IoLocationSharp size={32} />
                        </div>
                      </div>

                      {/* STATE */}
                      <h3 className="text-xl sm:text-2xl font-bold text-center text-[#A3195B] capitalize px-2">
                        {item.state}
                      </h3>

                      {/* CITY LIST */}
                      <ul className="mt-5 text-gray-800 h-[150px] overflow-hidden border-t pt-3">
                        {item.allMainCities.slice(0, 6).map((city, idx) => (
                          <li
                            key={idx}
                            className="px-6 py-3 border-b flex justify-between items-center text-sm sm:text-base hover:bg-gray-50"
                          >
                            {city} Call Girls <FiChevronRight />
                          </li>
                        ))}
                      </ul>

                      {/* VIEW STATE BUTTON */}
                      <div className="mt-auto text-center pt-4">
                        <button className="border px-7 py-2 rounded-full text-sm font-medium text-[#A3195B] hover:bg-[#A3195B] hover:text-white transition inline-flex items-center gap-2">
                          View State <FiChevronRight />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT ARROW */}
              <button
                onClick={nextSlide}
                disabled={index >= maxIndex}
                className="hidden sm:block text-3xl text-[#A3195B] p-2 hover:scale-110 disabled:opacity-40 transition"
              >
                <FiArrowRight />
              </button>
            </div>

            {/* MOBILE ARROWS */}
            <div className="flex justify-center gap-6 mt-6 sm:hidden">
              <button
                onClick={prevSlide}
                disabled={index === 0}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow text-[#A3195B]"
              >
                <FiArrowLeft />
              </button>

              <button
                onClick={nextSlide}
                disabled={index >= maxIndex}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow text-[#A3195B]"
              >
                <FiArrowRight />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MostSearchedLocations;
