// import React, { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useLocation, Link } from "react-router-dom";

// import { getGirlByIdThunk, getGirlsByCityThunk } from "../store/slices/girlSlice";
// import { getCityByIdThunk } from "../store/slices/citySlice";

// import Header from "../component/common/header";
// import Footer from "../component/common/Footer";
// import ReportAbuseSection from "./ReportAbuseSection";

// const GirlDetailsPage = () => {
//   const { id } = useParams();
//   const { search } = useLocation();
//   const cityIdFromURL = new URLSearchParams(search).get("cityId");

//   const dispatch = useDispatch();

//   const { singleGirl, cityGirls, loading } = useSelector((state) => state.girls);
//   const { singleCity } = useSelector((state) => state.city);

//   /* ======================= STEP 1 — Fetch Girl Details ======================= */
//   useEffect(() => {
//     if (id) dispatch(getGirlByIdThunk(id));
//   }, [id]);

//   /* ==================== STEP 2 — Determine Active City ID ==================== */
//   const activeCityId = useMemo(() => {
//     if (cityIdFromURL) return cityIdFromURL;

//     if (singleGirl?.city && typeof singleGirl.city === "string")
//       return singleGirl.city;

//     if (Array.isArray(singleGirl?.city) && singleGirl.city[0]?._id)
//       return singleGirl.city[0]._id;

//     return null;
//   }, [cityIdFromURL, singleGirl]);

//   /* =========== STEP 3 — Fetch City Contact Details & Similar Girls =========== */
//   useEffect(() => {
//     if (activeCityId) {
//       dispatch(getCityByIdThunk(activeCityId));
//       dispatch(getGirlsByCityThunk(activeCityId));
//     }
//   }, [activeCityId]);

//   if (loading || !singleGirl)
//     return <p className="text-center py-20 text-gray-600 text-lg">Loading...</p>;

//   const cityData = singleCity || {};

//   /* ========================== TEXT SHORTENERS ========================== */
//   const shortHeading =
//     singleGirl.heading?.slice(0, 100) +
//     (singleGirl.heading?.length > 100 ? "..." : "");

//   const shortDescription =
//     singleGirl.description?.slice(0, 500) +
//     (singleGirl.description?.length > 500 ? "..." : "");

//   return (
//     <>
//       <Header />

//       <div className="max-w-7xl mx-auto px-4 py-12">

//         {/* ========================= IMAGE + DETAILS SECTION ========================= */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

//           {/* IMAGE */}
//           <div className="flex justify-center">
//             <img
//               src={singleGirl.imageUrl}
//               alt={singleGirl.heading}
//               className="w-full max-h-[550px] rounded-xl shadow-xl object-cover"
//             />
//           </div>

//           {/* DETAILS */}
//           <div>
//             <p className="text-sm text-gray-500 font-medium mb-2">
//               {singleGirl.age} Years | {cityData.mainCity || "Unknown City"}
//             </p>

//             <h1 className="text-3xl sm:text-4xl font-extrabold text-[#B30059]">
//               {shortHeading}
//             </h1>

//             {singleGirl.priceDetails && (
//               <p className="mt-3 text-[#34A853] text-lg font-semibold">
//                 {singleGirl.priceDetails}
//               </p>
//             )}

//             <p className="mt-5 text-gray-700 leading-relaxed text-[15px] whitespace-pre-line">
//               {shortDescription}
//             </p>

//             {/* ========================= CONTACT SECTION ========================= */}
//             <div className="mt-10">
//               <h2 className="text-xl font-bold text-[#9C1C4D] mb-4">
//                 Contact Advertiser
//               </h2>

//               <div className="flex flex-col sm:flex-row gap-4">

//                 {/* WhatsApp */}
//                 {cityData?.whatsappNumber ? (
//                   <a
//                     href={`https://wa.me/91${cityData.whatsappNumber}`}
//                     target="_blank"
//                     className="w-full bg-green-600 text-white font-bold text-lg px-6 py-4 rounded-md shadow-md text-center"
//                   >
//                     WhatsApp
//                   </a>
//                 ) : (
//                   <p className="text-red-600 font-semibold w-full">
//                     No WhatsApp number available
//                   </p>
//                 )}

//                 {/* Phone Call */}
//                 {cityData?.phoneNumber ? (
//                   <a
//                     href={`tel:91${cityData.phoneNumber}`}
//                     className="w-full bg-[#B30059] text-white font-bold text-lg px-6 py-4 rounded-md shadow-md text-center"
//                   >
//                     Call Now
//                   </a>
//                 ) : (
//                   <p className="text-red-600 font-semibold w-full">
//                     No phone number available
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ========================= SIMILAR GIRLS SECTION ========================= */}
//         <div className="mt-16">
//           <h2 className="text-3xl text-center font-extrabold text-[#B30059]">
//             You might be interested in…
//           </h2>

//           <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
//             {cityGirls
//               ?.filter((g) => g._id !== id)
//               ?.slice(0, 3)
//               ?.map((girl) => (
//                 <div
//                   key={girl._id}
//                   className="bg-white shadow-xl rounded-xl p-5 hover:shadow-2xl transition-all flex flex-col"
//                 >
//                   {/* IMAGE + TEXT */}
//                   <Link
//                     to={`/girl/${girl._id}?cityId=${activeCityId}`}
//                     className="flex gap-5"
//                   >
//                     <img
//                       src={girl.imageUrl}
//                       className="w-28 h-28 rounded-lg object-cover"
//                       alt={girl.heading}
//                     />

//                     <div className="flex flex-col justify-between">
//                       <h3 className="text-[#B30059] font-bold text-[15px] line-clamp-2">
//                         {girl.heading}
//                       </h3>

//                       <p className="text-[13px] text-gray-600 line-clamp-2">
//                         {girl.description}
//                       </p>
//                     </div>
//                   </Link>

//                   {/* CONTACT BUTTONS */}
//                   <div className="flex flex-col sm:flex-row gap-3 pt-4">

//                     {/* WhatsApp */}
//                     {cityData?.whatsappNumber ? (
//                       <a
//                         href={`https://wa.me/91${cityData.whatsappNumber}`}
//                         target="_blank"
//                         className="w-32 bg-green-600 text-white font-semibold py-2 rounded-md text-center"
//                       >
//                         WhatsApp
//                       </a>
//                     ) : (
//                       <p className="text-red-500 text-sm w-full text-center">
//                         No WhatsApp number
//                       </p>
//                     )}

//                     {/* Call */}
//                     {cityData?.phoneNumber ? (
//                       <a
//                         href={`tel:91${cityData.phoneNumber}`}
//                         className="w-32 bg-[#B30059] text-white font-semibold py-2 rounded-md text-center"
//                       >
//                         Call Now
//                       </a>
//                     ) : (
//                       <p className="text-red-500 text-sm w-full text-center">
//                         No phone number
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>

//       </div>
//     <ReportAbuseSection/>
//       <Footer />
//     </>
//   );
// };

// export default GirlDetailsPage;


import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import { getGirlByIdThunk, getGirlsByCityThunk } from "../store/slices/girlSlice";
import { getCityByIdThunk } from "../store/slices/citySlice";

import Header from "../component/common/header";
import Footer from "../component/common/Footer";
import ReportAbuseSection from "./ReportAbuseSection";

const GirlDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { girlName } = useParams();               // SEO-friendly slug
  const location = useLocation();

  // 🔥 Hidden ID passed using navigate() state
  const girlId = location.state?.girlId || null;

  const { singleGirl, cityGirls, loading } = useSelector((s) => s.girls);
  const { singleCity } = useSelector((s) => s.city);

  /* ------------------------------------------------
    STEP 1 — FETCH GIRL BY ID (STATE ONLY)
  ------------------------------------------------ */
  useEffect(() => {
    if (!girlId) return; // prevents undefined fetch
    dispatch(getGirlByIdThunk(girlId));
  }, [girlId]);

  /* ------------------------------------------------
    STEP 2 — Get the CITY ID from girl object
  ------------------------------------------------ */
  const activeCityId = useMemo(() => {
    if (singleGirl?.city?._id) return singleGirl.city._id;
    if (Array.isArray(singleGirl?.city) && singleGirl.city[0]?._id)
      return singleGirl.city[0]._id;
    return null;
  }, [singleGirl]);

  /* ------------------------------------------------
    STEP 3 — Fetch City Details + Similar Girls
  ------------------------------------------------ */
  useEffect(() => {
    if (!activeCityId) return;

    dispatch(getCityByIdThunk(activeCityId));
    dispatch(getGirlsByCityThunk(activeCityId));
  }, [activeCityId]);

  if (!girlId) {
    return (
      <p className="text-center py-20 text-red-600 text-xl">
        Invalid Girl URL — ID missing.
      </p>
    );
  }

  if (loading || !singleGirl)
    return <p className="text-center py-20 text-gray-600 text-lg">Loading...</p>;

  const cityData = singleCity || {};

  /* ---------------- TEXT SHORTENERS ---------------- */
  const shortHeading =
    (singleGirl.heading || "").slice(0, 100) +
    ((singleGirl.heading || "").length > 100 ? "..." : "");

  const shortDescription =
    (singleGirl.description || "").slice(0, 500) +
    ((singleGirl.description || "").length > 500 ? "..." : "");

  /* ---------------- HELPER — Create Slug ---------------- */
  const makeSlug = (name) =>
    name?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") || "";

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* ================= IMAGE + DETAILS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={singleGirl.imageUrl}
              alt={singleGirl.heading}
              className="w-full max-h-[550px] rounded-xl shadow-xl object-cover"
            />
          </div>

          {/* DETAILS */}
          <div>
            <p className="text-sm text-gray-500 font-medium mb-2">
              {singleGirl.age} Years | {cityData.mainCity || "Unknown City"}
            </p>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#B30059]">
              {shortHeading}
            </h1>

            {singleGirl.priceDetails && (
              <p className="mt-3 text-[#34A853] text-lg font-semibold">
                {singleGirl.priceDetails}
              </p>
            )}

            <p className="mt-5 text-gray-700 leading-relaxed text-[15px] whitespace-pre-line">
              {shortDescription}
            </p>

            {/* CONTACT SECTION */}
            <div className="mt-10">
              <h2 className="text-xl font-bold text-[#9C1C4D] mb-4">
                Contact Advertiser
              </h2>

              <div className="flex flex-col sm:flex-row gap-4">

                {cityData?.whatsappNumber ? (
                  <a
                    href={`https://wa.me/91${cityData.whatsappNumber}`}
                    target="_blank"
                    className="w-full bg-green-600 text-white font-bold text-lg px-6 py-4 rounded-md shadow-md text-center"
                  >
                    WhatsApp
                  </a>
                ) : (
                  <p className="text-red-600 font-semibold w-full">
                    No WhatsApp number
                  </p>
                )}

                {cityData?.phoneNumber ? (
                  <a
                    href={`tel:91${cityData.phoneNumber}`}
                    className="w-full bg-[#B30059] text-white font-bold text-lg px-6 py-4 rounded-md shadow-md text-center"
                  >
                    Call Now
                  </a>
                ) : (
                  <p className="text-red-600 font-semibold w-full">
                    No phone number
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= SIMILAR GIRLS ================= */}
        <div className="mt-16">
          <h2 className="text-3xl text-center font-extrabold text-[#B30059]">
            You might be interested in…
          </h2>

          <div className="mt-12 flex flex-col gap-7">

            {cityGirls
              ?.filter((g) => g._id !== girlId)
              ?.slice(0, 3)
              ?.map((girl) => (
                <div
                  key={girl._id}
                  className="bg-white shadow-xl rounded-xl p-5 hover:shadow-2xl transition-all flex flex-col"
                >
                  {/* IMAGE + INFO */}
                  <div
                    onClick={() =>
                      navigate(`/girl/${makeSlug(girl.name)}`, {
                        state: { girlId: girl._id }, // hidden id
                      })
                    }
                    className="flex gap-5 cursor-pointer"
                  >
                    <img
                      src={girl.imageUrl}
                      className="w-28 h-28 rounded-lg object-cover"
                      alt={girl.heading}
                    />

                    <div className="flex flex-col justify-between">
                      <h3 className="text-[#B30059] font-bold text-[15px] line-clamp-2">
                        {girl.heading}
                      </h3>

                      <p className="text-[13px] text-gray-600 line-clamp-2">
                        {girl.description}
                      </p>
                    </div>
                  </div>

                  {/* CONTACT BUTTONS */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    {cityData?.whatsappNumber && (
                      <a
                        href={`https://wa.me/91${cityData.whatsappNumber}`}
                        target="_blank"
                        className="w-32 bg-green-600 text-white font-semibold py-2 rounded-md text-center"
                      >
                        WhatsApp
                      </a>
                    )}

                    {cityData?.phoneNumber && (
                      <a
                        href={`tel:91${cityData.phoneNumber}`}
                        className="w-32 bg-[#B30059] text-white font-semibold py-2 rounded-md text-center"
                      >
                        Call Now
                      </a>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <ReportAbuseSection />
      <Footer />
    </>
  );
};

export default GirlDetailsPage;
