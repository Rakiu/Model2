import React from "react";
import Footer from "./common/Footer";
import Header from "./common/header";

const PrivacyPolicy = ({ lastUpdated = "August 2025" }) => {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-8">

          {/* Last Updated */}
          <div className="mb-10">
            <p className="text-sm text-gray-600">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* PRIVACY POLICY CONTENT */}
          <section
            className="
              prose prose-sm lg:prose-lg text-gray-700 leading-relaxed
              [&_p]:text-gray-700 [&_p]:text-base [&_p]:mb-4
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#A3195B] [&_h2]:mt-8 [&_h2]:mb-3
              [&_ul]:list-disc [&_ul]:pl-6
            "
          >
            <p>
              This website follows the rules set by Data Protection Legislation to protect the
              privacy of both users and ad posters. All personal data we collect is handled with
              strict confidentiality.
            </p>

            <p>
              The website administrators follow the Privacy Policy and Terms & Conditions to
              ensure protection of your data. However, the Offeror User information displayed
              publicly on their profile is controlled solely by the user themselves.
            </p>

            <p>
              If such information is misused or reaches the wrong hands, the company is not
              responsible for how that publicly posted data is handled.
            </p>

            <p>
              This Privacy Policy may change or be updated periodically based on legal
              requirements or Data Protection Authority directives. Users will be notified through
              updated links or notices where required.
            </p>

            {/* SECTION 1 */}
            <h2>1. What Personal Information Do We Collect?</h2>

            <p>“Personal Data” refers to any information that can identify you. This may include:</p>

            <ul>
              <li><strong>Contact Details:</strong> Name, phone number, email ID, identification details.</li>
              <li><strong>Payment Data:</strong> Purchase history and transaction information.</li>
              <li><strong>Other Personal Data:</strong> Gender, age, photos, or anything you submit voluntarily.</li>
              <li><strong>Special Categories:</strong> Sexual preferences or lifestyle-related information.</li>
              <li><strong>Usage Data:</strong> IP address, device info, cookies, browser type.</li>
            </ul>

            <p>
              We may also collect aggregated non-identifiable data for improving user experience
              and analyzing platform usage patterns.
            </p>

            {/* SECTION 2 */}
            <h2>2. How Do We Collect Your Personal Information?</h2>

            <p>Your Personal Data is collected when:</p>

            <ul>
              <li>You browse or use the website.</li>
              <li>You register an account.</li>
              <li>You post an ad or respond to one.</li>
              <li>You request customer support.</li>
              <li>Your age verification is performed.</li>
            </ul>

            <p>
              If you submit data on someone’s behalf, ensure they have read and agreed to the
              Privacy Policy. You must also inform us of any updates to your data.
            </p>

            {/* SECTION 3 */}
            <h2>3. What Do We Do With Your Personal Information?</h2>

            <p>We process your data for the following lawful purposes:</p>

            <ul>
              <li><strong>Allowing browsing and registration</strong> on the website.</li>
              <li><strong>Publishing ads</strong> and letting you respond to ads.</li>
              <li><strong>Age verification</strong> using external verification tools.</li>
              <li><strong>Processing orders</strong> and payment-related activities.</li>
              <li><strong>Marketing and promotional messages</strong> (with your consent).</li>
              <li><strong>Service improvements</strong> through analytics and user behavior data.</li>
              <li><strong>Legal protection</strong> in disputes or fraud investigations.</li>
              <li><strong>Compliance</strong> with court orders and legal obligations.</li>
            </ul>

            {/* SECTION 4 */}
            <h2>4. How Do We Protect Your Personal Data?</h2>

            <p>
              We use multiple security measures—secure servers, encryption, access controls, and
              industry-standard policies—to protect your Personal Data.
            </p>

            {/* SECTION 5 */}
            <h2>5. How Long Do We Store Your Data?</h2>

            <p>We retain your data only for the time necessary for each purpose:</p>

            <ul>
              <li>Browsing & Registration: Up to 2 years of inactivity.</li>
              <li>Ad Publishing: Up to 1 year after ad expiration.</li>
              <li>Age Verification: Up to 1 year after account deletion.</li>
              <li>Orders & Payments: At least 10 years (legal requirement).</li>
              <li>Marketing Data: 2 years unless consent withdrawn.</li>
              <li>Service Improvements & Analytics: 2 years.</li>
              <li>Legal Defense: As long as needed for legal obligations.</li>
            </ul>

            {/* SECTION 6 */}
            <h2>6. Do We Share Your Data With Others?</h2>

            <p>
              Your data may be accessed by authorized employees or external service providers
              such as:
            </p>

            <ul>
              <li>Payment processors</li>
              <li>IT service companies</li>
              <li>Age verification partners</li>
            </ul>

            <p>
              You may request the full list of third-party partners by contacting us.
            </p>

            {/* SECTION 7 */}
            <h2>7. International Data Transfer</h2>

            <p>
              Your data may be transferred to other countries. When we do this, we follow legal
              safeguards such as GDPR Article 46 where applicable.
            </p>

            {/* SECTION 8 */}
            <h2>8. Your Rights</h2>

            <p>You have the right to:</p>

            <ul>
              <li>Access your data</li>
              <li>Correct inaccurate data</li>
              <li>Withdraw consent anytime</li>
              <li>Object to certain processing</li>
              <li>Make a complaint to our Grievance Officer</li>
            </ul>

            <p>
              All rights can be exercised free of charge by contacting us.
            </p>

            {/* SECTION 9 */}
            <h2>9. How to File a Complaint</h2>

            <p>
              If you believe your data is being misused, you may contact our Grievance Officer,
              approach MeitY, or take legal action. However, we recommend contacting us first so
              we can resolve the issue.
            </p>

            <p className="mt-8 text-gray-600 italic">
              © 2025 Girls With Wine. All Rights Reserved.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
