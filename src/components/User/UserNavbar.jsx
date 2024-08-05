import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBell, FaBars } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FiBookOpen, FiBook } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import logo from "../../assets/mindsatlogo.webp";
import { Link, useNavigate } from "react-router-dom";
import profile from "../../assets/Student/profile.jpeg";
import { motion, AnimatePresence } from "framer-motion";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { clearStudentDetails } from "../../store/reducers/StudentloginSlice";

const UserNavbar = ({ toggleSidebar, isSidebarOpen, User }) => {
  const [Showsidebar, setShowsidebar] = useState(false);
  const [show, setShow] = useState(false);

  const user = useSelector((state) => state.StudentDetails.token);
  const userName = useSelector((state) => state.StudentDetails.userName);
  const navigate = useNavigate();

  const [NameLetter, SetNameLetter] = useState(userName ? userName[0] : "");

  const handleToggle = () => {
    setShow(!show);
  };

  useEffect(() => {
    console.log(Showsidebar);
  }, [Showsidebar]);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(Showsidebar);
  }, [Showsidebar]);


  const handleLogout = () => {
    setShowsidebar(false);
    dispatch(clearStudentDetails());
    navigate("/");
  };

  return (
    <div
      className="Test px-8 justify-between w-full bg-white h-[12vh]
                  border-b-[1px] flex items-center  relative 
                 transition-all duration-500"
    >
      <div className="w-[140px] lg:w-[200px] text-5xl h-full font-poppins flex justify-center items-center">
        <Link to="/">
          <img src={logo} className="w-full cursor-pointer" alt="logo" />
        </Link>
      </div>

      <AnimatePresence>
        {Showsidebar && (
          <motion.div
            onMouseOver={() => setShowsidebar(true)}
            onMouseOut={() => setShowsidebar(false)}
            initial={{ opacity: 0, y: "20px" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "20px" }}
            className="absolute top-[8vh] right-3 w-[200px] cursor-pointer z-[9] bg-transparent h-max"
          >
            <div className=" relative top-[20px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-  w-full h-full">
              <Link to={"/student/courses"}>
                <div
                  onClick={() => setShowsidebar(false)}
                  className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
                >
                  Courses
                </div>
              </Link>
              <Link to={"/student/assignments"}>
                <div
                  onClick={() => setShowsidebar(false)}
                  className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
                >
                  Assignment
                </div>
              </Link>
              <Link to={"/student/settings"}>
                <div
                  onClick={() => setShowsidebar(false)}
                  className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
                >
                  Settings
                </div>
              </Link>

              <div
                onClick={() => handleLogout()}
                className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
              >
                <LiaSignOutAltSolid className="text-xl" />
                Signout
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {user ? (
        <div className="w-[40%] flex justify-end">
          <div className="flex items-center">
            <div className="w-16 flex h-9 justify-start px-2">
              <div className="rounded-lg h-8 w-8 flex justify-center items-center text-black border-[1px] border-black mr-1">
                <FaBell />
              </div>
              <div className="rounded-[4px] h-4 w-4 flex justify-center items-center bg-red-700 relative">
                <div className="absolute rotate-45 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] top-1/2 left-[1px]"></div>
                <p className="text-xs text-white">8</p>
              </div>
            </div>
            {isSidebarOpen ? (
              <FiBookOpen
                onClick={toggleSidebar}
                className="block md:hidden z-30 text-2xl"
              />
            ) : (
              <FiBook
                onClick={toggleSidebar}
                className="block md:hidden z-30 text-2xl"
              />
            )}
            <div className="flex-1 h-auto md:flex md:flex-row items-center flex-col hidden">
              <img
                className="rounded-full object-cover overflow-hidden md:w-[42px] md:h-[42px] w-[20px]"
                src={profile}
                alt=""
              />
              <div className="flex items-center">
                <div className="md:px-3">
                  <p className="font-poppins">{userName}</p>
                  <p className="text-gray-500 font-poppins">
                    {user ? user : ""}
                  </p>
                </div>
                <IoIosArrowForward className="text-2xl" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden xl:flex xl:w-[90%] justify-end items-center h-full">
          <div className="h-1/2 flex gap-8 justify-between ">
            <div className="flex gap-5">
              <Link to={"/login"}>
                <button className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold">
                  Courses
                </button>
              </Link>
              <Link to={"/login"}>
                <button className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold">
                  Tutors
                </button>
              </Link>
              <Link to={"/login"}>
                <button className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold">
                  Team
                </button>
              </Link>
              <Link to={"/login"}>
                <button className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold">
                  Pricing
                </button>
              </Link>
              <Link to={"/login"}>
                <button className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold">
                  Diagnose Test
                </button>
              </Link>
              <Link to={"/login"}>
                <button className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold">
                  Contact
                </button>
              </Link>
            </div>
            <div className="flex gap-5">
              <Link to={"/login"}>
                <button className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold">
                  Sign in
                </button>
              </Link>
              <Link to={"/signup"}>
                <button className="px-3 text-[14px] bg-blue-700 h-[35px] text-white font-poppins rounded-lg font-semibold">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <button className="xl:hidden ml-auto mr-4" onClick={handleToggle}>
        <FaBars
          className={`text-lg ${
            show ? "rotate-90" : ""
          } transition-all duration-700`}
        />
      </button>

      <div
        className={`${
          !show ? "-translate-y-[1280px]" : ""
        } xl:hidden fixed top-[12vh] right-0 w-full bg-white h-max transition-transform duration-700 ease-in-out flex flex-col items-center`}
      >
        {user ? (
          <>
            <div
              onClick={() => handleLogout()}
              className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
            >
              <LiaSignOutAltSolid className="text-xl" />
              Signout
            </div>
            <Link to={"/student/courses"}>
              <div
                onClick={() => setShow(false)}
                className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
              >
                Courses
              </div>
            </Link>
            <Link to={"/student/assignments"}>
              <div
                onClick={() => setShow(false)}
                className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
              >
                Assignment
              </div>
            </Link>
            <Link to={"/student/settings"}>
              <div
                onClick={() => setShow(false)}
                className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
              >
                Settings
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <div
                onClick={() => setShow(false)}
                className="text-left px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
              >
                Courses
              </div>
            </Link>
            <Link to={"/login"}>
              <div
                onClick={() => setShow(false)}
                className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
              >
                Tutors
              </div>
            </Link>
            <Link to={"/login"}>
              <div
                onClick={() => setShow(false)}
                className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
              >
                Pricing
              </div>
            </Link>
            <Link to={"/login"}>
              <div
                onClick={() => setShow(false)}
                className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
              >
                Diagnose Test
              </div>
            </Link>
            <Link to={"/login"}>
              <div
                onClick={() => setShow(false)}
                className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
              >
                Contact
              </div>
            </Link>
            <Link to={"/login"}>
              <div
                onClick={() => setShow(false)}
                className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
              >
                Sign in
              </div>
            </Link>
            <Link to={"/signup"}>
              <div
                onClick={() => setShow(false)}
                className="px-3 text-[16px] h-[35px] text-blue-700 font-poppins font-bold"
              >
                Register
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default UserNavbar;
