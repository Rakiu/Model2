import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiMap, FiMapPin, FiUsers, FiMail, FiLogOut } from "react-icons/fi";

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutPopup, setLogoutPopup] = useState(false);
  const navigate = useNavigate();

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setLogoutPopup(false);
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* DESKTOP TOP BAR */}
      <div className="hidden md:flex fixed w-full top-0 left-0 bg-white shadow-md z-30 px-6 py-4 items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-700">Admin Panel</h1>
      </div>

      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed w-full top-0 left-0 bg-pink-600 text-white flex justify-between items-center p-4 shadow-lg z-30">
        <h1 className="text-xl font-semibold">Girls Panel</h1>
        <button onClick={() => setIsOpen(true)}>
          <FiMenu size={28} />
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gradient-to-b from-pink-600 to-pink-400 text-white p-6 flex flex-col shadow-xl 
        transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Close - Mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-white"
          onClick={() => setIsOpen(false)}
        >
          <FiX size={28} />
        </button>

        {/* Header */}
        <h1 className="text-3xl font-bold mb-10 tracking-wide text-center">
          Girls
        </h1>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 font-medium text-lg">

          <NavLink
            to="/admin/all-state"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md flex items-center gap-3 transition ${
                isActive
                  ? "bg-white text-pink-600 font-semibold shadow-md"
                  : "hover:bg-pink-300 hover:shadow"
              }`
            }
          >
            <FiMap size={20} /> State
          </NavLink>

          <NavLink
            to="/admin/all-cities"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md flex items-center gap-3 transition ${
                isActive
                  ? "bg-white text-pink-600 font-semibold shadow-md"
                  : "hover:bg-pink-300 hover:shadow"
              }`
            }
          >
            <FiMapPin size={20} /> City
          </NavLink>

          <NavLink
            to="/admin/model-girl"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md flex items-center gap-3 transition ${
                isActive
                  ? "bg-white text-pink-600 font-semibold shadow-md"
                  : "hover:bg-pink-300 hover:shadow"
              }`
            }
          >
            <FiUsers size={20} /> Model Girl
          </NavLink>

          <NavLink
            to="/admin/all-contacts"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md flex items-center gap-3 transition ${
                isActive
                  ? "bg-white text-pink-600 font-semibold shadow-md"
                  : "hover:bg-pink-300 hover:shadow"
              }`
            }
          >
            <FiMail size={20} /> Contact
          </NavLink>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto pt-10">
          <button
            onClick={() => setLogoutPopup(true)}
            className="w-full bg-white text-pink-600 font-semibold py-2 rounded-md shadow hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
            <FiLogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-4 mt-20 md:mt-20 h-full overflow-auto">
        {children}
      </main>

      {/* LOGOUT POPUP — MATCHED TO IMAGE */}
      {logoutPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white w-[420px] rounded-2xl p-8 shadow-2xl text-center">

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800">
              Are you sure you want to log out?
            </h2>

            {/* Subtitle */}
            <p className="text-gray-500 mt-2">
              You’ll be returned to the login screen.
            </p>

            {/* Icon Circle */}
            <div className="flex justify-center my-6">
              <div className="w-28 h-28 bg-red-100 rounded-full flex items-center justify-center">
                <FiLogOut size={48} className="text-red-500" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-4">

              <button
                onClick={() => setLogoutPopup(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
              >
                Logout
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
