import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FaBell, FaBars } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FiBookOpen, FiBook } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import logo from "../../assets/mindsatlogo.webp";
import { Link } from 'react-router-dom';
import profile from "/profile.jpeg"

const UserNavbar = ({ toggleSidebar, isSidebarOpen,User }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails);

  const list = ["Subjects", "Courses", "Library", "Contact"];


  const handleToggle = () => {
    setShow(!show);
  };

  return (
    <div className='Test md:px-4 px-4 justify-between  w-full bg-white  h-[7vh] md:h-[12vh] border-b-[1px] flex items-center md:py-0 relative transition-all duration-500'>
      <div className='md:w-[10%]  w-[30%] h-full font-poppins flex justify-center items-center'>
      <Link to="/">
      <img src={logo} className='w-full cursor-pointer' alt="logo" />
    </Link>
      </div>

  


      {User?( <div className='w-[40%] flex justify-end    '>

<div className='flex items-center'>

  {/* notification bell */}
  <div className=' w-16 flex h-9  justify-start px-2'>
    <div className='rounded-lg h-8 w-8   flex justify-center items-center text-black border-[1px] border-black mr-1 '>
      <FaBell className='' />
    </div>
    {/* notification red icon */}
    <div className=' rounded-[4px] h-4 w-4 flex justify-center items-center bg-red-700 relative '>
      <div className='absolute rotate-45 -translate-x-1/2 -translate-y-1/2    w-[6px] h-[6px] top-1/2  left-[1px]'></div>
      <p className='text-xs text-white'>8</p>
    </div>

  </div>


  {/* hamburger button */}
  {isSidebarOpen ? <FiBookOpen onClick={() => toggleSidebar()} className='block md:hidden z-30  text-2xl ' />
          : <FiBook onClick={() => toggleSidebar()} className='block md:hidden z-30  text-2xl ' />
        }          


  {/* Admin NAME EMAIL AND PROFILE PHOTO */}
  <div className='flex-1  h-auto md:flex md:flex-row  items-center flex-col  hidden'>
    <img className=' rounded-full object-cover overflow-hidden md:w-[42px] md:h-[42px] w-[20px] ' src={profile} alt="" />
    <div className='flex items-center'>
  
      <div className='md:px-3'>
        <p className=' font-poppins'>Abin</p>
        <p className='text-gray-500 font-poppins'>abin@gmail.com</p>
      </div>
      <IoIosArrowForward className='text-2xl' />
    </div>
  </div>


</div>
</div>):

(
  <div className='hidden md:flex md:w-[40%] justify-end items-center h-full '>
    {/* <div className='h-1/2 flex justify-center'>
      <input className='h-[35px] border-2' type="text" />
      <button className='w-[35px] bg-blue-700 h-[35px] flex justify-center items-center'>
        <IoSearch className='text-white' />
      </button>
    </div> */}
    <div className='h-1/2  flex gap-4 justify-between '>
      
    <Link to={"/login"}>
      <button className='px-3 text-[14px]  bg-blue-700 h-[35px] text-white font-poppins'>Sign in</button>
    </Link>
    
    <Link to={"/signup"}>
      <button className='px-3 text-[14px]  bg-blue-700 h-[35px] text-white font-poppins'>Register</button>
    </Link>
    </div>
  </div>
)


}

      <button className='md:hidden ml-auto mr-4' onClick={handleToggle}>
        <FaBars className={`text-lg  ${show ? "rotate-90 " : ""}    transition-all duration-700`} />
      </button>

      {(
        <div className={` ${!show ? "-translate-y-[700px] " : ""}  transition-all z-50 duration-700  absolute top-[7vh] right-0 w-full bg-white shadow-lg md:hidden `}>
          <h1 className='md:hidden block hover:text-lg bg-white text-[#0066DE] font-plusjakartasans text-base font-semibold px-4 py-2 border-b'>
            Login
          </h1>
          <h1 className='md:hidden block hover:text-lg bg-white text-[#0066DE] font-plusjakartasans text-base font-semibold px-4 py-2 border-b'>
            Register
          </h1>
          {list.map((val, index) => (
            <h1 key={index} className='text-[#0066DE] bg-white hover:text-lg font-plusjakartasans text-base font-semibold px-4 py-2 border-b'>
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
