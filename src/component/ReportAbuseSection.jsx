import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const ReportAbuseSection = () => {
  return (
    <div className="w-full bg-[#fdfdfd] py-10 px-4 md:px-0 flex flex-col items-center">

      {/* =============== REPORT ABUSE BOX =============== */}
      <div className="max-w-5xl w-full bg-white shadow-xl rounded-2xl p-6 md:p-10">
        <div className="flex items-start gap-3">
          <ExclamationTriangleIcon className="w-10 h-10 text-[#A3195B]" />

          <h2 className="text-2xl font-bold text-[#c00b5a]">
            Report Abuse
          </h2>
        </div>

        <ul className="mt-4 space-y-3 text-gray-700 text-[16px] leading-relaxed ml-12">
          <li className="list-disc">
            You can send an email to <b>report.girlswithwine.com</b> to report for any improper use of images,
            report of intellectual property (for example telephone, e-mail, names and addresses).
          </li>
          <li className="list-disc">
            You can send an email to <b>report.girlswithwine.com</b> to report for any kind of deemed illegal
            or any abusive content.
          </li>
        </ul>
      </div>

      {/* =============== WARNING BAR =============== */}
      <div className="max-w-5xl w-full mt-6">
        <div className="flex items-center gap-2 px-4 mb-[-10px]">
          <span className="px-4 py-1 bg-pink-100 rounded-full text-[#760025] font-semibold text-sm">
            SECURITY TIPS
          </span>
        </div>

        <div className="bg-[#a0003c] text-white text-center py-4 px-6 rounded-lg font-semibold text-[15px] md:text-[16px]">
          Beware of imposters posing as Girls With wine and asking for money. No one from Girls With wine will claim any payment from you.
        </div>
      </div>

      {/* =============== DISCLAIMER SECTION =============== */}
      <div className="max-w-5xl w-full mt-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#A3195B] mb-4">
          Girls With wines Disclaimer & User Responsibility Statement
        </h2>

        <p className="text-gray-700 text-[16px] leading-relaxed mb-4">
          The user agrees to follow our Terms and Conditions and gives us feedback about our website and our services.
          These ads in Girls With Wine were put there by the advertiser on his own and are solely their responsibility.
          Publishing these kinds of ads doesn’t have to be checked out by ourselves first.
        </p>

        <p className="text-gray-700 text-[16px] leading-relaxed">
          We are not responsible for the ethics, morality, protection of intellectual property rights, 
          or possible violations of public or moral values in the profiles created by the advertisers.
          Girls With Wine lets you publish free online ads and find your way around the websites. It’s not up to
          us to act as a dealer between the customer and the advertiser.
        </p>
      </div>
    </div>
  );
};

export default ReportAbuseSection;
