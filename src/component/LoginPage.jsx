import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineMail, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginImage from "../assets/LoginImage.avif";
import { adminLogin } from "../store/slices/adminAuthSlice";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((s) => s.adminAuth);

  const formik = useFormik({
    initialValues: { email: "", password: "" },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "Min 6 chars").required("Required"),
    }),

    onSubmit: async (values) => {
      const result = await dispatch(adminLogin(values));

      if (adminLogin.fulfilled.match(result)) {
        toast.success("Admin Login Successful!");

        setTimeout(() => {
          navigate("/admin/all-state");
          window.location.reload();
        }, 500);
      } else {
        toast.error(result.payload);
      }
    },
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-r from-[#FEF1FA] to-[#DD86C1]">
      <ToastContainer />

      <div className="absolute w-full md:w-2/3 h-[650px] md:h-[750px] left-4 md:left-0">
        <img src={LoginImage} alt="Foxtale" className="w-full h-full object-cover" />
      </div>

      <div className="absolute top-1/2 right-4 md:right-0 transform -translate-y-1/2 bg-[#FEDCF3] p-10 rounded-lg shadow-2xl w-[90%] sm:w-[70%] md:w-[40%] z-10">
        <h2 className="text-center text-2xl font-bold text-pink-700 mb-2">Welcome</h2>
        <p className="text-center text-gray-500 text-sm mb-6">Admin Login</p>

        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center space-y-5">

          {/* Email */}
          <div className="relative w-full max-w-sm">
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              {...formik.getFieldProps("email")}
              className={`w-full px-4 py-2 pr-12 border rounded-md ${
                formik.errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            <div className="absolute top-[25px] right-0 bg-[#FF7DDD] w-10 h-10 flex items-center justify-center rounded-md">
              <AiOutlineMail className="text-white text-lg" />
            </div>
            {formik.errors.email && (
              <p className="text-red-500 text-xs">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative w-full max-w-sm">
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...formik.getFieldProps("password")}
              className={`w-full px-4 py-2 pr-10 border rounded-md ${
                formik.errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />

            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[25px] right-0 bg-[#FF7DDD] w-10 h-10 rounded-md flex items-center justify-center text-white cursor-pointer"
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>

            {formik.errors.password && (
              <p className="text-red-500 text-xs">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full max-w-sm bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md"
          >
            {loading ? "Logging in..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
