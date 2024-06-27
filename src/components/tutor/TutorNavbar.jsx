import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBell } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { FiBookOpen, FiBook } from "react-icons/fi";
import "./TutorNavbar.css";

const TutorNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.TutorDetails);

  console.log(user);

  return (
    <>
      {/* ___________________NAVBAR STARTS HERE________________________  */}

      <div className="navbar-container md:px-4  px-2 flex-1 w-full h-[10vh] z-30  border-b-[1px] flex items-center md:py-8 py-5  z-50 bg-white     ">
        {/*_________________ left side____________________ */}
        <div className="w-[60%]  font-poppins relative">
          <p className=" md:pl-0 text-sm z-10"> Welcome Back!</p>
          <p className="  md:pl-0 md:text-sm font-bold block md:hidden z-20">
            {" "}
            {user.userName}
          </p>
        </div>

        {/* _________________right side__________________ */}
        <div className="w-[40%] flex justify-end    ">
          <div className="flex items-center">
            {/* notification bell */}
            <div className=" w-16 flex h-9  justify-start px-2">
              <div className="rounded-lg h-8 w-8   flex justify-center items-center text-black border-[1px] border-black mr-1 ">
                <FaBell className="" />
              </div>
              {/* notification red icon */}
              <div className=" rounded-[4px] h-4 w-4 flex justify-center items-center bg-red-700 relative ">
                <div className="absolute rotate-45 -translate-x-1/2 -translate-y-1/2   bg-red-700 w-[6px] h-[6px] top-1/2  left-[1px]"></div>
                <p className="text-xs text-white">8</p>
              </div>
            </div>

            {/* hamburger button */}
            {isSidebarOpen ? (
              <FiBookOpen
                onClick={() => toggleSidebar()}
                className="block md:hidden z-30  text-2xl "
              />
            ) : (
              <FiBook
                onClick={() => toggleSidebar()}
                className="block md:hidden z-30  text-2xl "
              />
            )}

            {/* Admin NAME EMAIL AND PROFILE PHOTO */}
            <div className="flex-1  h-auto md:flex md:flex-row  items-center flex-col  hidden">
              <img
                className=" rounded-full object-cover overflow-hidden md:w-[42px] md:h-[42px] w-[20px] "
                src={`${user.userImg}`}
                alt=""
              />
              <div className="flex items-center">
                <div className="md:px-3">
                  <p className=" font-poppins">{user.userName}</p>
                  <p className="text-gray-500 font-poppins">{user.email}</p>
                </div>
                <IoIosArrowForward className="text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorNavbar;
