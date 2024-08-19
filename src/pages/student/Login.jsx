import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import usePasswordToggle from "../../hooks/usePasswordToggle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStudentDetails } from "../../store/reducers/StudentloginSlice";
import studentLoginimage from "../../assets/SignupPersonalDetails/personal.svg";
import UserNavbar from "../../components/User/UserNavbar";
import Loader from "../../components/reusable/Loader";
// import "./Login.css";
import { TutorAxiosInstance } from "../../routes/TutorRoutes";
import { axiosInstanceStudent } from "../../routes/UserRoutes";

const StudentLogin = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setLoading(true);
      const res = await axios.post(
        `${baseUrl}api/students/login-student`,
        data,
        {
          "user-agent": navigator.userAgent,
        }
      );

      console.log({
        studentData: res.data,
      });

      if (res.data.role === "student") {
        setLoading(false);
        toast.success("Login Successful");
        dispatch(setStudentDetails(res.data || []));
        navigate("/student/*");
      }
    } catch (error) {
      setIsSubmitting(false);
      setLoading(false);
      toast.error(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="h-[88vh] flex items-center justify-center">
        <div className=" bg-white  rounded-3xl border-[2px] border-[#0066de] shadow-lg w-full max-w-md">
          <div className="flex justify-center items-center">
            <img
              src={studentLoginimage}
              className="w-[200px]"
              alt="Student Login"
            />
          </div>
          <div className="w-full px-10 flex justify-center">
            <button className="bg-white text-[#0066de] font-semibold px-5 py-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md">
              <Link to="/signup">Student Login</Link>
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center p-10"
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
                className="mt-1 block w-[300px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                  className="mt-1 block w-[300px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <span className="absolute top-1/2 -translate-y-1/2 bg-transparent right-2 flex items-center text-sm leading-5">
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
                    flex justify-center py-2 mt-5 px-4 border border-transparent rounded-md 
                    shadow-sm text-sm font-medium text-white hover:bg-blue-700 
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

export default StudentLogin;
