import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAdminDetails } from "../../store/reducers/AdminloginSlice";
import adminBg from "../../assets/Admin/adminBg.jpg";
import Logo from "../../assets/Admin/Logoo.png";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState({ email: "", passwrord: "" });
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const baseURL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // SUBMITTING THE LOGIN FUNCTION
  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      const res = await axios.post(`${baseURL}api/admin/login`, data, {
        "user-agent": navigator.userAgent,
      });

      dispatch(setAdminDetails(res.data || []));

      if (res.data.role === "admin") {
        navigate("/admin/home");
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center flex-col ">
        <img
          src={adminBg}
          className="fixed -z-10 top-0 left-0 w-screen h-screen blur-sm "
          alt=""
        />
        <img
          className="absolute w-60 top-10 right-12 backdrop-blur-lg  bg-white px-8 py-4 bg-opacity-50 "
          src={Logo}
          alt=""
        />
        <img
          className="absolute w-60 top-10 right-12    bg-opacity-100 px-8 py-4 "
          src={Logo}
          alt=""
        />

        <div className=" bg-white  rounded-lg shadow-lg w-full max-w-md">
          <div className=" h-[20%] py-3 bg-rose-900 rounded-t-lg flex items-center justify-center">
            <h2 className="text-2xl font-poppins font-bold  text-white text-center">
              Admin Login
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-10 space-y-6 h-[90%]"
          >
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={PasswordInputType}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <span className="absolute top-1/2 -translate-y-1/2 bg-transparent  right-2  flex items-center text-sm leading-5">
                  {ToggleIcon}
                </span>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                disabled={isSubmitting}
                type="submit"
                className={`w-full ${
                  isSubmitting ? "bg-gray-600" : "bg-blue-600"
                }
                                 flex justify-center py-2 px-4 border border-transparent rounded-md 
                                 shadow-sm text-sm font-medium text-white  hover:bg-blue-700 
                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {isSubmitting ? "Verifying..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
