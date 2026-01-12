import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

import { getGirlsByCityThunk } from "../store/slices/girlSlice";
import { getCitiesThunk, getCityByIdThunk } from "../store/slices/citySlice";

import Header from "./common/header";
import Footer from "./common/Footer";
import CitySection from "./CitySection";

const CityGirlsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { cityName } = useParams(); // SEO slug (UI only)

  const { cities, singleCity } = useSelector((state) => state.city);
  const { cityGirls = [], loading } = useSelector((s) => s.girls);

  // cityId comes from navigate state
  const cityId = location.state?.cityId || null;

  const queryParams = new URLSearchParams(location.search);
  const subCity = queryParams.get("subCity");

  const [searchText, setSearchText] = useState("");

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    dispatch(getCitiesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!cityId) return;
    dispatch(getCityByIdThunk(cityId));
    dispatch(getGirlsByCityThunk(cityId));
  }, [cityId, dispatch]);

  /* ---------------- HELPERS ---------------- */
  const replaceCityName = (text = "", name = "") =>
    String(text).replace(/{{cityName}}/gi, name);

  const createWhatsAppURL = (cityName, number) => {
    const num = String(number || "").replace(/[^0-9]/g, "");
    if (!num) return "#";
    return `https://wa.me/91${num}?text=${encodeURIComponent(
      `Hello, I want booking in ${cityName} city.`
    )}`;
  };

  /* ---------------- SEARCH FILTER ---------------- */
  const filteredGirls = cityGirls.filter((girl) => {
    const txt = searchText.toLowerCase();
    return (
      girl.name?.toLowerCase().includes(txt) ||
      girl.heading?.toLowerCase().includes(txt) ||
      girl.description?.toLowerCase().includes(txt)
    );
  });

  /* ---------------- CITY DATA ---------------- */
  const cityObj = singleCity || {};

  let matchedLocalArea = null;
  if (subCity && Array.isArray(cityObj?.localAreas)) {
    matchedLocalArea = cityObj.localAreas.find(
      (a) => a.name.toLowerCase() === subCity.toLowerCase()
    );
  }

  const finalName =
    matchedLocalArea?.name ||
    cityObj?.mainCity ||
    cityObj?.state?.name ||
    "";

  /* -------- FIXED: HEADING & SUBDESCRIPTION -------- */
  const cityHeading =
    cityObj?.heading ||
    `Enjoy your private moments with our beautiful ${finalName} call girls`;

  const citySubDescription =
    cityObj?.subDescription ||
    `One of the top classified advertisement websites for escort services in ${finalName}.`;

  const finalDescription =
    matchedLocalArea?.description ||
    cityObj?.description ||
    `<p>No description available for <strong>${finalName}</strong>.</p>`;

  const showRightSidebar = searchText.trim() === "";

  /* ---------------- UI ---------------- */
  return (
    <>
      <Header />

      <div className="px-4 sm:px-6 lg:px-8">

        {/* -------- BREADCRUMB -------- */}
        <div className="bg-gray-50 py-3 mt-6 rounded-md px-4 flex flex-col sm:flex-row sm:justify-between gap-3 shadow-sm">
          <div className="text-sm text-gray-600 flex items-center gap-1 flex-wrap">
            <span className="text-[#C2185B] font-semibold cursor-pointer">
              Home
            </span>
            <span>/</span>
            <span className="text-[#C2185B] font-semibold cursor-pointer">
              Call-Girls
            </span>

            {finalName && (
              <>
                <span>/</span>
                <span className="text-[#C2185B] capitalize font-semibold">
                  {finalName}
                </span>
              </>
            )}

            {subCity && (
              <>
                <span>/</span>
                <span className="text-[#C2185B] capitalize font-semibold">
                  {subCity}
                </span>
              </>
            )}
          </div>

          {/* SEARCH */}
          <div className="flex w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search models..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border border-gray-300 rounded-l-full px-4 py-2 w-full sm:w-72 text-sm"
            />
            <button className="bg-[#C2185B] px-4 rounded-r-full flex items-center text-white">
              <CiSearch className="text-2xl" />
            </button>
          </div>
        </div>

        {/* -------- PAGE HEADING (FIXED) -------- */}
        <div className="pt-10 text-center max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#B30059] leading-tight">
            {replaceCityName(cityHeading, finalName)}
          </h1>

          {citySubDescription && (
            <p className="text-gray-700 max-w-7xl mx-auto mt-4 text-[15px] leading-relaxed">
              {replaceCityName(citySubDescription, finalName)}
            </p>
          )}
        </div>

        {/* -------- CONTENT -------- */}
        <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">

          {/* -------- GIRL LIST -------- */}
          <div>
            {loading ? (
              <p className="text-center py-10">Loading...</p>
            ) : filteredGirls.length > 0 ? (
              <div className="space-y-5">
                {filteredGirls.map((girl) => {
                  const wp = girl.whatsappNumber || cityObj?.whatsappNumber;
                  const call = girl.phoneNumber || cityObj?.phoneNumber;

                  return (
                    <div
                      key={girl._id}
                      onClick={() =>
                        navigate(
                          `/girl/${girl.name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`,
                          { state: { girlId: girl._id } }
                        )
                      }
                      className="cursor-pointer bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition border flex gap-4"
                    >
                      <img
                        src={girl.imageUrl}
                        alt={girl.name}
                        className="w-24 h-24 sm:w-40 sm:h-40 object-cover rounded-xl"
                      />

                      <div className="flex flex-col justify-between w-full">
                        <h3 className="text-[20px] font-bold text-[#B30059]">
                          {replaceCityName(girl.heading, finalName)}
                        </h3>

                        <p className="text-[15px] text-gray-700 mt-1 line-clamp-2">
                          {replaceCityName(girl.description, finalName)}
                        </p>

                        <div className="flex gap-3 text-[14px] mt-3 font-semibold text-[#B30059]">
                          {girl.age && <span>{girl.age} Years</span>}
                          <span>|</span>
                          <span>Call Girls</span>
                          <span>|</span>
                          <span>{finalName}</span>
                        </div>

                        <div className="flex gap-3 mt-4 justify-end">
                          {wp && (
                            <a
                              onClick={(e) => e.stopPropagation()}
                              target="_blank"
                              rel="noreferrer"
                              href={createWhatsAppURL(finalName, wp)}
                              className="px-3 py-2 bg-[#25D366] text-white text-xs rounded-md"
                            >
                              WhatsApp
                            </a>
                          )}
                          {call && (
                            <a
                              onClick={(e) => e.stopPropagation()}
                              href={`tel:91${call}`}
                              className="px-3 py-2 bg-[#B30059] text-white text-xs rounded-md"
                            >
                              Call Us
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-10">
                No profiles found.
              </p>
            )}
          </div>

          {/* -------- SIDEBAR -------- */}
          {showRightSidebar && (
            <div className="hidden lg:block">
              <div className="bg-white shadow-md rounded-xl p-5 border">
                <h3 className="text-center bg-[#B30059] text-white py-2 rounded-lg text-sm font-bold">
                  Ads in {cityObj?.state?.name}
                </h3>

                <ul className="mt-4 text-sm text-gray-700">
                  {(cityObj?.localAreas || []).map((area) => (
                    <li key={area._id} className="border-b py-2">
                      Call Girls in {area.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* -------- CITY DESCRIPTION -------- */}
        <div
          className="md:mt-20 mt-6 mb-10 border-t pt-6 text-gray-700 text-[14px] max-w-7xl mx-auto"
          dangerouslySetInnerHTML={{
            __html: replaceCityName(finalDescription, finalName),
          }}
        />
      </div>

      <CitySection loading={loading} cities={cities} />
      <Footer />
    </>
  );
};

export default CityGirlsPage;
