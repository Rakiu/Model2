import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiMenu } from "react-icons/fi";
import Drawer from "@mui/material/Drawer";
import logo from "../../assets/logo1.png";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <nav className="w-full bg-gradient-to-r from-[#00B9BE] to-[#7CC7EC] py-4 shadow-md">
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 260,
            backgroundColor: "#00B9BE",
            color: "white",
            paddingTop: "20px",
          },
        }}
      >
        {/* Drawer Menu Content */}
        <div className="px-6 space-y-6 mt-7">
          {/* <Link
            to="#"
            className="block text-lg font-semibold hover:opacity-80"
            onClick={toggleDrawer(false)}
          >
            LOGIN
          </Link> */}

          {/* <Link
            to="#"
            className="block text-lg font-semibold hover:opacity-80"
            onClick={toggleDrawer(false)}
          >
            REGISTER
          </Link> */}

          <Link
            to="/contact"
            className="block text-lg font-semibold hover:opacity-80"
            onClick={toggleDrawer(false)}
          >
            CONTACT US
          </Link>

          {/* POST YOUR AD inside drawer */}
          <Link
            to="#"
            className="flex items-center gap-3 bg-[#FFE7E7] text-black font-semibold rounded-full px-5 py-3 shadow-md hover:bg-[#fadada] transition"
            onClick={toggleDrawer(false)}
          >
            <span className="bg-[#A01047] text-white rounded-full p-1 flex items-center justify-center">
              <FiPlus size={20} />
            </span>
            POST YOUR AD
          </Link>
        </div>
      </Drawer>

      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

        {/* LEFT LOGO */}
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="Girls with Wine Logo"
              className="w-52 md:w-64 h-auto object-contain"
            />
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10">
          {/* <Link to="#" className="text-white text-xl font-semibold hover:opacity-80">
            LOGIN
          </Link>
          <Link to="#" className="text-white text-xl font-semibold hover:opacity-80">
            REGISTER
          </Link> */}
          <Link to="/contact" className="text-white text-xl font-semibold hover:opacity-80">
            CONTACT US
          </Link>

          {/* Desktop POST AD Button */}
          <Link
            to="#"
            className="flex items-center gap-3 bg-[#FFE7E7] text-black font-semibold rounded-full px-6 py-3  shadow-md hover:bg-[#fadada] transition"
          >
            <span className="bg-[#A01047] text-white rounded-full p-1 flex items-center justify-center">
              <FiPlus size={20} />
            </span>
            POST YOUR AD
          </Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={toggleDrawer(true)}
          className="md:hidden text-white text-3xl "
        >
          <FiMenu />
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
