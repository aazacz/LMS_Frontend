import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setStudentDetails } from "../../store/reducers/StudentloginSlice";
import { setToken } from "../../store/reducers/tokenSlice";
import studentLoginimage from "/studentLoginimage.png";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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

      const res = await axios.post(
        `${baseURL}api/admin/login`,
        data,

        {
          "user-agent": navigator.userAgent,
        }
      );
      console.log(res.data);
      toast.success("Login Successful");
      // dispatch(setToken(res.data)); //Saving the token in redux
      // dispatch(
      //   setUserDetails({ ...(data || []) }) //Saving the USER DETAILS in redux
      // );
      if (role === "admin") {
        navigate("/admin/home");
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error(error.response.data.error);
      console.log(error.response.data.error);
      console.log(error.message);
      console.log(error.response);
    }
  };



  return (
    <>
      <div className="min-h-screen flex items-center justify-center ">
        <div className=" bg-white  rounded-3xl border-[1px] border-[#0066de] shadow-lg w-full max-w-md">
          <div className="  w-full flex  justify-center items-center">
            <img src={studentLoginimage} className="w-18 " alt="" />
          </div>
          <div className="w-full px-10 grid grid-flow-row grid-cols-2">
            <button className="bg-[#0066de] text-white font-semibold px-5 py-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md">
              Login
            </button>
            <button className="bg-white text-[#0066de] font-semibold px-5 py-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md">
              Signup
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-10 space-y-6 h-[90%]"
          >
            <div className="relative">
              <input
                placeholder="Email"
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
              <div className="relative">
                <input
                  placeholder="Password"
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
            <div className="w-full px-20">
              <button
                disabled={isSubmitting}
                type="submit"
                className={`w-full ${
                  isSubmitting ? "bg-gray-600" : "bg-[#0066de]"
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

export default Signup;
