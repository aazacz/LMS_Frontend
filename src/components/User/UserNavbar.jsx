import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FaBell, FaBars } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FiBookOpen, FiBook } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import logo from "../../assets/mindsatlogo.webp";
import { Link } from 'react-router-dom';

const UserNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails);

  const list = ["Subjects", "Courses", "Pricing", "Contact"];
  const navlist = [{
    title: "Courses",
    link: "/student/courses"
  },

  {
    title: "Tutor",
    link: "/student/tutors"
  },



    "Subjects", "Courses", "Pricing", "Contact"];

  const handleToggle = () => {
    setShow(!show);
  };

  return (
    <div className='Test md:px-4 px-4 bg-white  backdrop-blur-lg w-screen h-[7vh] md:h-[12vh] border-b-[1px] flex items-center md:py-0 relative transition-all duration-500'>
      <div className='md:w-[10%]  w-[30%] h-full font-poppins flex justify-center items-center'>
        <img src={logo} className='w-full' alt="logo" />
      </div>

      <div className='hidden  w-[50%] md:grid grid-flow-row grid-cols-6 px-5'>
        {navlist.map((val, index) => (
          <Link key={index} to={val.link}>
            <h1 className='text-[#0066DE] font-plusjakartasans text-center cursor-pointer  md:text-base font-semibold'>
              {val.title}
            </h1>
          </Link>
        ))}
      </div>

      <div className='hidden md:flex md:w-[40%] justify-end items-center h-full'>
        <div className='h-1/2 flex justify-center'>
          <input className='h-[35px] border-2' type="text" />
          <button className='w-[35px] bg-blue-700 h-[35px] flex justify-center items-center'>
            <IoSearch className='text-white' />
          </button>
        </div>
        <div className='h-1/2 flex justify-center'>
          <button className='px-3 text-blue-700 h-[35px]'>Sign in</button>
          <button className='px-3 bg-blue-700 h-[35px] text-white'>Register</button>
        </div>
      </div>

      <button className='md:hidden ml-auto mr-4' onClick={handleToggle}>
        <FaBars className={`text-lg  ${show ? "rotate-90 " : ""}    transition-all duration-700`} />
      </button>

      {(
        <div className={` ${!show ? "-translate-y-[700px] " : ""}  transition-all duration-700  absolute top-[7vh] right-0 w-full bg-white shadow-lg md:hidden `}>
          <h1 className='md:hidden block hover:text-lg text-[#0066DE] font-plusjakartasans text-base font-semibold px-4 py-2 border-b'>
            Login
          </h1>
          <h1 className='md:hidden block hover:text-lg text-[#0066DE] font-plusjakartasans text-base font-semibold px-4 py-2 border-b'>
            Register
          </h1>
          {list.map((val, index) => (
            <h1 key={index} className='text-[#0066DE] hover:text-lg font-plusjakartasans text-base font-semibold px-4 py-2 border-b'>
              {val}
            </h1>
          ))}

          <div className='md:flex flex-col p-4 hidden '>
            <input className='h-[35px] border-2 mb-2' type="text" />
            <button className='w-full bg-blue-700 h-[35px] flex justify-center items-center mb-2'>
              <IoSearch className='text-white' />
            </button>
            <button className='w-full text-blue-700 h-[35px] mb-2'>Sign in</button>
            <button className='w-full bg-blue-700 h-[35px] text-white'>Register</button>
          </div>

        </div>
      )}
    </div>
  );
}

export default UserNavbar;
