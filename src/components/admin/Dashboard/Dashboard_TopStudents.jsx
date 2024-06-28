import React from 'react'
import { AiOutlinePieChart } from "react-icons/ai";
import { PiDownloadSimpleFill } from "react-icons/pi";
import { PiMoney } from "react-icons/pi";
import { FaBook } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { FaUserGraduate } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUsersRectangle } from "react-icons/fa6";
import { GoPerson } from "react-icons/go";
import { IoMdTime } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { FaRegCircle } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { FaMedal } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";
import { Bar } from "react-chartjs-2";


const Dashboard_TopStudents = () => {
  return (
    <div className="w-full h-max shadow-md bg-blue-100 rounded-lg flex flex-col justify-start items-start">
    <p className="w-full font-poppins font-semibold p-2 text-sm md:text-lg">
      Top Students
    </p>
    <div className="w-full overflow-x-scroll no-scrollbar rounded-lg">
      <table className="w-full border-collapse font-poppins overflow-x-scroll ">
        <thead>
          <tr>
            <th className="text-left text-xs md:text-sm py-2 px-4 font-semibold bg-[#E9F2FC]">
              ID
            </th>
            <th className="text-left text-xs md:text-sm py-2 px-4 font-semibold bg-[#E9F2FC]">
              Name
            </th>
            <th className="text-left text-xs md:text-sm py-2 px-4 font-semibold bg-[#E9F2FC]">
              Course
            </th>
            <th className="text-left text-xs md:text-sm py-2 px-4 font-semibold bg-[#E9F2FC]">
              Tutor
            </th>
            <th className="text-left text-xs md:text-sm py-2 px-4 font-semibold bg-[#E9F2FC]">
              Email ID
            </th>
            <th className="text-left text-xs md:text-sm py-2 px-4 font-semibold bg-[#E9F2FC]">
              Previous Marks
            </th>
            <th className="text-left text-xs md:text-sm py-2 px-4 font-semibold bg-[#E9F2FC]"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left text-xs md:text-sm py-2 px-4 bg-white">
              251
            </td>
            <td className="text-left text-xs md:text-sm py-2 px-4 bg-white">
              Amar
            </td>
            <td className="text-left  text-xs md:text-sm py-2 px-4 bg-white">
              SAT Course
            </td>
            <td className="text-left text-xs md:text-smpy-2 px-4 bg-white">
              Lauren
            </td>
            <td className="text-left  text-xs md:text-smpy-2 px-4 bg-white">
              amar@gmail.com
            </td>
            <td className="text-left text-xs md:text-sm py-2 px-4 bg-white">
              485
            </td>
            <td className="bg-white">
              <SlOptions />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  )
}

export default Dashboard_TopStudents
