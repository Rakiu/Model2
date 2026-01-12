import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaYoutube,
    FaPinterestP,
    FaLinkedinIn,
    FaArrowUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/LOGO.png";
import rta from "../../assets/RTA.png";

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-20 pb-10 relative">
            <div className="max-w-7xl mx-auto px-6">

                {/* TOP GRID */}
                <div className="grid md:grid-cols-4 gap-16">

                    {/* COLUMN 1 */}
                    <div className="pr-8">
                        <img
                            src={logo}
                            alt="Girls with Wine Logo"
                            className="w-60 object-contain mb-5"
                        />

                        <p className="text-[15px] leading-relaxed opacity-90 max-w-sm">
                            The number 1 website for Adult ADS in India for Female Escorts
                            and massage ads.
                        </p>

                        {/* SOCIAL ICONS */}
                        <div className="flex items-center gap-5 mt-7">
                            <FaFacebookF className="text-xl cursor-pointer hover:text-gray-300" />
                            <FaTwitter className="text-xl cursor-pointer hover:text-gray-300" />
                            <FaYoutube className="text-xl cursor-pointer hover:text-gray-300" />
                            <FaPinterestP className="text-xl cursor-pointer hover:text-gray-300" />
                            <FaLinkedinIn className="text-xl cursor-pointer hover:text-gray-300" />
                        </div>
                    </div>

                    {/* COLUMN 2 */}
                    <div>
                        <h2 className="font-semibold text-[20px] mb-6">Girls With Wine</h2>
                        <ul className="space-y-3 text-[15px] opacity-90">
                            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
                            <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
                            <li><Link to="/professional-accounts" className="hover:text-gray-300">Professional Accounts</Link></li>
                        </ul>
                    </div>

                    {/* COLUMN 3 */}
                    <div>
                        <h2 className="font-semibold text-[20px] mb-6">HELP / INFO</h2>
                        <ul className="space-y-3 text-[15px] opacity-90">
                            <li><Link to="/terms" className="hover:text-gray-300">Terms And Conditions</Link></li>
                            <li><Link to="/privacy" className="hover:text-gray-300">Privacy Policy</Link></li>
                            <li><Link to="/faq" className="hover:text-gray-300">Help And Faqs</Link></li>
                        </ul>
                    </div>

                    {/* COLUMN 4 */}
                    <div>
                        <h2 className="font-semibold text-[20px] mb-6">USEFUL LINKS</h2>
                        <ul className="space-y-3 text-[15px] opacity-90">
                            <li><Link to="/contact" className="hover:text-gray-300">Contact Us</Link></li>
                            <li><Link to="/post-ad" className="hover:text-gray-300">Post your Ad</Link></li>
                            <li><Link to="/blog" className="hover:text-gray-300">Blog</Link></li>
                        </ul>

                        <img
                            src={rta}
                            alt="RTA Badge"
                            className="w-56 mt-3 ml-2"
                        />
                    </div>
                </div>

                {/* DISCLAIMER */}
                <p className="text-center text-[14px] mt-16 leading-relaxed opacity-60 max-w-4xl mx-auto">
                    This website's only purpose is to advertise, and it can also be used to
                    find information. We have nothing to do with the people or sites that are
                    listed on the page, and we are not responsible for them. We offer online
                    space as a service. Because of this, we have never had any dealings with
                    the prostitution business or escort services. We are not responsible for
                    the content of third-party websites.
                </p>

                {/* COPYRIGHT SECTION */}
                <div className="mt-12 border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-5">
                    <p className="text-sm opacity-70">
                        © 2025 Girls with Wine — All Rights Reserved
                    </p>

                    <button className="flex items-center gap-2 bg-pink-700 hover:bg-pink-600 px-5 py-2 rounded-full text-sm font-medium">
                        🌐 Girls with Wine Network
                    </button>
                </div>
            </div>

            {/* SCROLL TO TOP BUTTON */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="fixed bottom-6 right-6 bg-pink-700 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg"
            >
                <FaArrowUp />
            </button>
        </footer>
    );
};

export default Footer;
