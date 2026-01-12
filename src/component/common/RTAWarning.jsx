import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import RTAImage from "../../assets/rta.png"; // use your image path

const RTAWarning = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Store flag so next time it won't show
    localStorage.setItem("rtaShown", "true");

    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate("/home");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full h-screen bg-[#5c1c63] flex flex-col justify-center items-center text-white">

      {/* <img
        src={RTAImage}
        alt="RTA Restricted To Adults"
        className="w-56 mb-4"
      /> */}

      <h1 className="text-xl font-semibold tracking-wide">RESTRICTED TO ADULTS</h1>
      <p className="text-sm mt-2 opacity-80">Redirecting in 5 seconds...</p>
    </div>
  );
};

export default RTAWarning;
