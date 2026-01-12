import React from "react";
import Header from "./common/header";
import Footer from "./common/Footer";

const HelpFaqs = () => {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-8">

          {/* Top Intro */}
          <p className="text-gray-700 text-base leading-relaxed mb-8">
            We're glad you found the Help & Frequently Asked Questions (FAQs) page on Girls With wine, the site you
            can trust to find escort service ads in India. Are you a service provider or a tourist who wants to
            connect? We can help you through the process. Here are some of the questions that people usually
            ask.
          </p>

          {/* ===== GENERAL INFORMATION ===== */}
          <h2 className="text-2xl font-bold text-red-700 mt-10 mb-4">General Information</h2>

          <h3 className="text-xl font-bold text-red-800 mt-6 mb-2">1. What is Girls With wine?</h3>
          <p className="text-gray-700 mb-4">
            The independent online classified ads site Girls With wine was made just for escort service listings. People
            can advertise their support services in a safe, private, and easy-to-use place that we provide. People
            and businesses from all over India can use our website.
          </p>

          <h3 className="text-xl font-bold text-red-800 mt-6 mb-2">2. Is Girls With wine an escort agency?</h3>
          <p className="text-gray-700 mb-4">
            Not at all. Neither are we an agent nor a go-between. Girls With wine merely provides businesses with a
            platform where they can post their services. It is our business to have no control or management of
            any secret services.
          </p>

          {/* ===== POSTING ADS ===== */}
          <h2 className="text-2xl font-bold text-red-700 mt-10 mb-4">Posting Ads</h2>

          <h3 className="text-xl font-bold text-red-800 mt-6 mb-2">3. How do I post an ad on Girls With wine?</h3>
          <p className="text-gray-700 mb-3">To put up an ad:</p>

          <ul className="list-disc ml-6 text-gray-700 mb-4">
            <li>In order to post an advertisement: Register/ log in.</li>
            <li>Keep scrolling down until you get to the post ad.</li>
            <li>Paste some pictures and the information you need, and submit your offering.</li>
          </ul>

          <p className="text-gray-700 mb-4">
            Once our review process is completed, your ad will be live.
          </p>

          <h3 className="text-xl font-bold text-red-800 mt-6 mb-2">
            4. Are there any guidelines for posting?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes. We have strict rules about what can be in ads to make sure they are all legal and polite. Do not
            use inappropriate material, false information, or pictures from other sources. Check out our Terms &
            Conditions for full rules on ads.
          </p>

          <h3 className="text-xl font-bold text-red-800 mt-6 mb-2">
            5. Can I post an ad for free?
          </h3>
          <p className="text-gray-700 mb-4">
            Yes, we do have both free and paid ad spots. You can get basic exposure with free ads, but your ad
            ranking and views will go up with paid choices.
          </p>

          {/* ===== MANAGING ADS ===== */}
          <h2 className="text-2xl font-bold text-red-700 mt-10 mb-4">Managing Ads</h2>

          <h3 className="text-xl font-bold text-red-800 mt-6 mb-2">6. How can I edit or delete my ad?</h3>
          <p className="text-gray-700 mb-3">
            From your personal page, you can change how your ads look. After that, you can:
          </p>

          <ul className="list-disc ml-6 text-gray-700 mb-4">
            <li>Add information</li>
            <li>Stop or start ads</li>
            <li>Sign up for premium</li>
            <li>Take down your ad for good</li>
          </ul>

          <h3 className="text-xl font-bold text-red-800 mt-6 mb-2">
            7. How long will my ad remain active?
          </h3>
          <p className="text-gray-700 mb-4">
            Free ads stay up for a set amount of time, like 7–15 days, based on the area you choose. Premium
            ads are seen for longer and are placed better.
          </p>

          {/* ===== ACCOUNT & PRIVACY ===== */}
          <h2 className="text-2xl font-bold text-red-700 mt-10 mb-4">Account & Privacy</h2>

          <h3 className="text-xl font-bold text-red-800 mt-6 mb-2">8. Is my data safe on Girls With wine?</h3>
          <p className="text-gray-700 mb-4">
            Of course. We have strict rules about keeping your info safe. The information in your profile is never
            shown to the public unless it's part of an ad. We do not give out your contact information to other
            people.
          </p>

          <h3 className="text-xl font-bold text-red-800 mt-6 mb-2">
            9. Do I have to show my identity?
          </h3>
          <p className="text-gray-700 mb-4">
            Not at all. You can post ads without giving your real name by using a show name and a few contact
            information. Don't forget to follow our safety and proof rules when you add things.
          </p>

          {/* ===== SAFETY & VERIFICATION ===== */}
          <h2 className="text-2xl font-bold text-red-700 mt-10 mb-4">Safety & Verification</h2>

          <h3 className="text-xl font-bold text-red-800 mt-6 mb-2">10. Are the ads verified?</h3>
          <p className="text-gray-700 mb-4">
            Yes. Before it is approved, every ad goes through a simple check and review by hand. Girls With wine does
            not, however, promise that any person or ad is real. Always be careful and use your best judgment.
          </p>

          <h3 className="text-xl font-bold text-red-800 mt-6 mb-2">
            11. What should I do if I spot a fake or scam ad?
          </h3>
          <p className="text-gray-700 mb-4">
            On every entry, there is a “Report” button that you can click. You can also send us photos or links by
            email at support@Girls With wine.com. Our team will look over it and decide what to do.
          </p>

          {/* ===== MORE COMING — You can paste rest here following same pattern ===== */}

        </div>
      </div>

      <Footer />
    </>
  );
};

export default HelpFaqs;
