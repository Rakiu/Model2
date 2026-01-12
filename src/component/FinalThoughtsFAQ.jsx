import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FinalThoughtsFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is Girls with Wine legal in India?",
      answer:
        "Escort companionship services are legal when they involve consenting adults and strictly exclude any form of exploitation or activities prohibited by law. Girls with Wine only lists independent verified profiles, emphasizing privacy and safety for every member.",
    },
    {
      question: "How do I ensure my privacy?",
      answer:
        "Your privacy is our top priority. We never share your personal details or interactions with any third party. All chats and bookings take place in a secure and encrypted environment.",
    },
    {
      question: "Are the escorts verified?",
      answer:
        "Yes. We verify profiles through identity checks, social presence validation, and customer feedback. Only authentic and reliable profiles are allowed on Girls with Wine.",
    },
    {
      question: "Can I book escorts for travel outside India?",
      answer:
        "Some companions offer international travel companionship depending on availability and agreement. We recommend confirming travel policies with the escort directly through our secure chat.",
    },
    {
      question: "How can I contact Girls with Wine for assistance?",
      answer:
        "You can reach out through our Help Center, email support, or 24/7 live chat. Our dedicated support team is ready to assist you anytime.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-gray-700 leading-relaxed">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#A3195B] mb-3">
          Final Thoughts
        </h2>
        <div className="w-24 h-1 bg-[#A3195B] mb-6"></div>

        {/* Intro Text */}
        <p className="mb-4">
          Girls with Wine changes the meaning of friendship as you are introduced to
          professional women who can care about your needs and happiness more
          than anything. Our platform ensures that this gives a safe,
          confidential and superior experience to the people in India who are
          on a massive party day or just chilling off by themselves.
        </p>

        <p className="mb-8">
          Girls with Wine is the most appropriate place to discover the authentic
          connections as it contains verified profiles and covers the whole
          nation. And look at our services today, and you will not see a world
          of sameness but a world of individual, marvellous experiences
          custom-made just to you.
        </p>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border bg-[#00B9BE] rounded-md text-white text-xl">
              <button
                className="w-full  flex justify-between items-center text-left px-4 py-5 font-medium"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <FiChevronDown
                  className={`transform transition duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-4 pb-4 text-lg border-t pt-2 ">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FinalThoughtsFAQ;
