import React, { useState } from "react";
import { FiSend, FiCopy } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { createContactThunk } from "../store/slices/contactSlice";

import Header from "./common/header";
import Footer from "./common/Footer";

const ContactPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.contacts);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    subject: "",
    message: "",
    captchaInput: "",
  });

  function generateCaptcha(length = 6) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  }

  const [captcha, setCaptcha] = useState(generateCaptcha());

  const handleRefreshCaptcha = () => setCaptcha(generateCaptcha());

  const copyEmail = () => {
    navigator.clipboard.writeText("info@girlswithwine.com");
    alert("Email copied!");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.mobile || !formData.message) {
      alert("Please fill Name, Mobile, and Message.");
      return;
    }

    if (formData.captchaInput.trim() !== captcha.trim()) {
      alert("Invalid CAPTCHA!");
      handleRefreshCaptcha();
      return;
    }

    const payload = { ...formData, captcha };

    dispatch(createContactThunk(payload)).then((res) => {
      if (!res.error) {
        alert("Your message has been submitted!");

        setFormData({
          name: "",
          mobile: "",
          email: "",
          subject: "",
          message: "",
          captchaInput: "",
        });

        handleRefreshCaptcha();
      }
    });
  };

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* LEFT INFO BOX */}
        <div className="bg-gray-100 p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-[#B30059] mb-5">Telegram</h2>

          <div className="flex gap-4 mb-10">
            <button className="flex items-center gap-2 bg-[#1DA1F2] text-white px-5 py-2 rounded-lg shadow hover:opacity-90 cursor-pointer">
              <FiSend /> Contact for Inquiry
            </button>

            <button className="flex items-center gap-2 border border-[#1DA1F2] text-[#1DA1F2] px-5 py-2 rounded-lg hover:bg-blue-50 cursor-pointer">
              <FaTelegramPlane /> Join Our Community
            </button>
          </div>

          {/* Email */}
          <h3 className="text-xl font-bold text-[#B30059]">Email</h3>
          <div className="flex items-center gap-3 mt-2 mb-6">
            <p className="text-gray-800">info@girlswithwine.com</p>
            <button className="text-[#B30059] cursor-pointer" onClick={copyEmail}>
              <FiCopy size={18} />
            </button>
            <span className="text-gray-600 text-sm">Click to copy</span>
          </div>

          {/* Address */}
          <h3 className="text-xl font-bold text-[#B30059]">Address</h3>
          <p className="text-gray-800 mt-2 mb-6">4435 Berkshire Circle, Knoxville</p>

          {/* Phone */}
          <h3 className="text-xl font-bold text-[#B30059]">Phone</h3>
          <p className="text-gray-800 mt-2">0000000000</p>
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-r from-[#00B9BE] to-[#7CC7EC] p-8 rounded-xl shadow-lg"
        >
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

          <Input
            label="Mobile No."
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter mobile number"
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <Input
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject"
          />

          <Textarea
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message"
          />

          {/* CAPTCHA */}
          <div className="mb-4">
            <label className="text-white font-semibold text-lg tracking-widest">
              {captcha}
            </label>

            <input
              type="text"
              name="captchaInput"
              placeholder="Enter CAPTCHA"
              value={formData.captchaInput}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 rounded-lg focus:outline-none border"
              required
            />

            <button
              type="button"
              className="text-white mt-3 text-sm hover:underline cursor-pointer"
              onClick={handleRefreshCaptcha}
            >
              Refresh CAPTCHA
            </button>
          </div>

          <button
            type="submit"
            className="bg-white text-[#B30059] w-full py-3 rounded-lg font-bold mt-4 shadow hover:bg-gray-100 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

/* ---------------------------
   REUSABLE COMPONENTS
--------------------------- */
const Input = ({ label, className = "", ...props }) => (
  <div className="mb-4">
    <label className="text-white font-semibold">{label}</label>
    <input
      {...props}
      className={`w-full mt-1 px-4 py-2 rounded-lg border focus:outline-none ${className}`}
    />
  </div>
);

const Textarea = ({ label, className = "", ...props }) => (
  <div className="mb-4">
    <label className="text-white font-semibold">{label}</label>
    <textarea
      {...props}
      className={`w-full mt-1 px-4 py-2 h-28 rounded-lg border focus:outline-none ${className}`}
    />
  </div>
);

export default ContactPage;
