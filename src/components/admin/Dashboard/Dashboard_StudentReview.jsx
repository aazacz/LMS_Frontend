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

const Dashboard_StudentReview = () => {
    const tutors = [
        {
          name: "Travis Fuller",
          role: "Tutor",
          students: 2348,
          subject: "Math",
          modules: 5,
          progress: [
            { label: "Classes", value: "33%", color: "#4F46E5" },
            { label: "Tests", value: "17%", color: "#10B981" },
            { label: "Assessments", value: "17%", color: "#2DB1EC" },
          ],
        },
        {
          name: "Jordan Smith",
          role: "Instructor",
          students: 1923,
          subject: "Science",
          modules: 5,
          progress: [
            { label: "Classes", value: "45%", color: "#4F46E5" },
            { label: "Tests", value: "30%", color: "#10B981" },
            { label: "Assessments", value: "25%", color: "#2DB1EC" },
          ],
        },
        {
          name: "Jordan Smith",
          role: "Tutor",
          students: 1900,
          subject: "Science",
          modules: 5,
          progress: [
            { label: "Classes", value: "15%", color: "#4F46E5" },
            { label: "Tests", value: "40%", color: "#10B981" },
            { label: "Assessments", value: "35%", color: "#2DB1EC" },
          ],
        },
        {
          name: "Jordan Smith",
          role: "Instructor",
          students: 1823,
          subject: "Science",
          modules: 5,
          progress: [
            { label: "Classes", value: "45%", color: "#4F46E5" },
            { label: "Tests", value: "30%", color: "#10B981" },
            { label: "Assessments", value: "25%", color: "#2DB1EC" },
          ],
        },
        // Add more tutor objects here as needed
      ];
      
  return (
   <div className="w-full h-max bg-blue-100 rounded-lg flex flex-col justify-start items-start gap-3 shadow-md p-2">
    <p className="text-sm font-semibold font-poppins">Student Review</p>
    <p className="text-lg font-poppins">9.7</p>
    <p className="text-xs font-poppins text-gray-500">
      Performance Score
    </p>
    <div className="w-full h-2 rounded-lg bg-red-400"></div>
    <p className="flex justify-center items-center gap-2 font-poppins text-xs font-medium">
      <FaRegCircle className="text-[#4F46E5]" />
      Excellent
    </p>
    <p className="flex justify-center items-center gap-2 font-poppins text-xs font-medium">
      <FaRegCircle className="text-[#10B981]" />
      Very Good
    </p>
    <p className="flex justify-center items-center gap-2 font-poppins text-xs font-medium">
      <FaRegCircle className="text-[#4BBAEE]" />
      Good
    </p>
    <p className="flex justify-center items-center gap-2 font-poppins text-xs font-medium">
      <FaRegCircle className="text-[#F5B24D]" />
      Poor
    </p>
    <p className="flex justify-center items-center gap-2 font-poppins text-xs font-medium">
      <FaRegCircle className="text-[#F68362]" />
      Very Poor
    </p>
  </div>

  )
}

export default Dashboard_StudentReview
