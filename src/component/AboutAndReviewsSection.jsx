import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCitiesThunk } from "../store/slices/citySlice";
import CitySection from "./CitySection";

const AboutAndReviewsSection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCitiesThunk());
  }, [dispatch]);

  const { loading, cities } = useSelector((state) => state.city);

  // ===================== EXTENDED ABOUT CONTENT =====================
  const aboutSections = [
    // INTRODUCTION
    {
      title: "Who We Are",
      text: `Girls With Wine is India's most trusted and secure escort companionship platform designed for adults looking for elegant, friendly, and emotionally intelligent partners. We believe that companionship is not just physical presence, but a complete experience of comfort, trust, privacy, conversation, and human connection.

We provide a safe space for individuals to meet verified and respectful call girls, independent escorts, and high-profile companions without fear, judgment, or risk. Our priority is your privacy, satisfaction, and a smooth experience across every city in India.`,
    },

    // MISSION
    {
      title: "Our Mission & Vision",
      text: `Our mission is to make companionship safe, respectful, luxurious, and emotionally fulfilling. We aim to build India's most reliable and private network of premium escorts who understand elegance, etiquette, and confidentiality.

Our vision is to change how India views companionship by offering transparent, verified, private, and meaningful interactions between adults who value trust and respect.`,
    },

    // WHY PEOPLE USE ESCORT SERVICES
    {
      title: "Why People Choose Escort & Call Girl Services",
      bullets: [
        "To enjoy meaningful companionship and intelligent conversations",
        "To attend business events, dinners, parties, or functions with style",
        "To reduce stress, loneliness, and emotional burden",
        "To explore nightlife, clubs, travel, and luxury experiences",
        "To create memories without long-term relationship pressure",
        "To have private, respectful, and discreet interactions",
      ],
    },

    // MAIN BENEFITS
    {
      title: "Benefits of Hiring Escorts in India",
      bullets: [
        "Companionship for parties, corporate events, weddings, and VIP gatherings",
        "Personalized and pressure-free emotional bonding",
        "Cultural and city tours with knowledgeable partners",
        "Confidence boost in social and professional environments",
        "Discreet, private, and secure interaction policy",
        "Best for travelers, entrepreneurs, NRIs, and working professionals",
      ],
    },

    // SERVICES
    {
      title: "Escort Services We Provide",
      bullets: [
        "VIP & High-Profile Escorts for luxury experiences",
        "Independent Call Girls with flexible arrangements",
        "Travel & Vacation Companions inside and outside India",
        "Dinner & Date companions for romantic or casual evenings",
        "Nightlife, Party & Clubbing special companionship",
        "Online / Virtual Companionship via video or chat",
        "Mature, Elite, and International Escorts",
      ],
    },

    // UNIQUE QUALITIES
    {
      title: "What Makes Our Escorts Unique?",
      bullets: [
        "Beautiful, well-groomed, educated, and well-spoken",
        "Respectful, friendly, confidential, and emotionally intelligent",
        "Fluent in English, Hindi, and other regional languages",
        "Perfect for business meetings, travel, and luxury events",
        "Knowledge of culture, restaurants, nightlife, and tourism",
      ],
    },

    // CITIES
    {
      title: "Top Cities We Serve in India",
      bullets: [
        "Mumbai Escorts – Bandra, Andheri, Juhu, Marine Drive, Navi Mumbai",
        "Delhi NCR Escorts – Aerocity, Connaught Place, Saket, Noida, Gurgaon",
        "Bangalore Escorts – Koramangala, Indiranagar, MG Road, Whitefield",
        "Hyderabad Escorts – Banjara Hills, Hitech City, Gachibowli",
        "Chandigarh Escorts – Sector 17, Zirakpur, Mohali, Panchkula",
        "Goa Escorts – Baga, Calangute, Candolim, Anjuna, Panaji",
        "Jaipur Escorts – C-Scheme, Malviya Nagar, Ajmer Road",
        "Pune Escorts – Koregaon Park, Viman Nagar, Hinjawadi",
        "Ahmedabad Escorts – SG Highway, Navrangpura, Satellite",
        "Kolkata Escorts – Park Street, Salt Lake, New Town",
      ],
    },

    // PRIVACY
    {
      title: "Your Privacy & Confidentiality Is Our Priority",
      bullets: [
        "Strong data protection and end-to-end encrypted communication",
        "Secure booking and anonymous payment options",
        "No data sharing, no screenshots, no identity disclosure",
        "Strict verification of escorts for your safety",
        "Safe meeting guidelines and respectful behavior policy",
      ],
    },

    // HOW TO BOOK
    {
      title: "How to Book Safely",
      bullets: [
        "Browse verified profiles based on city, interests & preferences",
        "Choose the type of companionship you are looking for",
        "Share your preferred time, location, and meeting style",
        "Make secure payment through approved channels",
        "Meet at a safe hotel, public place, or private location",
      ],
    },

    // WHO USES THIS PLATFORM
    {
      title: "Who Uses Girls With Wine?",
      bullets: [
        "Business owners, CEOs, and corporate professionals",
        "NRIs visiting India short-term",
        "Travelers exploring Indian cities",
        "Event attendees, party lovers, and influencers",
        "People seeking emotional support & meaningful companionship",
      ],
    },

    // FINAL SECTION
    {
      title: "Final Thoughts",
      text: `Girls With Wine is not just a platform; it is a modern, safe, elegant, and private world of elite companionship for adults looking for comfort, conversation, and unforgettable experiences.

Whether you are traveling, celebrating, attending a business event, or simply want someone to talk to, our companions make every moment memorable.

Your privacy. Your choice. Your experience — redefined.`,
    },
  ];

  return (
    <section className="w-full font-sans bg-white">
      <div className="w-full mt-10 px-6 sm:px-10 lg:px-28 text-center ">

        {/* MAIN PAGE TITLE */}
        <h2 className="text-3xl md:text-5xl  font-serif font-extrabold text-[#00B9BE] mb-12 uppercase tracking-[0.3em] pb-3 border-b-4 border-b-gray-300 inline-block px-4">
          About Girls With Wine
        </h2>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto   p-6 text-justify leading-relaxed">
          {aboutSections.map((sec, i) => (
            <div key={i} className="mb-10">
              <h3 className="text-xl sm:text-5xl font-bold text-[#00B9BE] mb-4">
                {sec.title}
              </h3>

              {sec.text && (
                <p className="text-gray-700 text-base sm:text-2xl whitespace-pre-line mb-4">
                  {sec.text}
                </p>
              )}

              {sec.bullets && (
                <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base sm:text-2xl">
                  {sec.bullets.map((li, index) => (
                    <li key={index}>{li}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CITY SECTION */}
      <CitySection loading={loading} cities={cities} />
    </section>
  );
};

export default AboutAndReviewsSection;
