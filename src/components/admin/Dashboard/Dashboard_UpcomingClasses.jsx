import React from "react";
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

const Dashboard_UpcomingClasses = () => {
  const data = [
    {
      id: "#581",
      title: "PMP Training Project Team",
      project: "HealthCare Information Security & Privacy Practitioner",
      instructor: "Kevin Romero George",
      time: "2pm-5pm",
      location: "Hydrebad, India",
      date: "30 Dec - 02 Jan",
    },
    {
      id: "#582",
      title: "PMP Training Project Team",
      project: "HealthCare Information Security & Privacy Practitioner",
      instructor: "James Fetherington",
      time: "11am-1pm",
      location: "Pune, India",
      date: "30 Dec - 02 Jan",
    },
    // Add more objects for additional items
  ];
  return (
    <div className="w-full  h-64 flex flex-col justify-center items-center bg-[#E0EDFB] shadow-md rounded-lg p-2  ">
      <div className="w-full h-8 flex justify-between items-center mb-2">
        <p className="text-xs md:text-sm font-poppins">
          Upcoming Training on{" "}
          <span className="font-semibold">13 Jan 2022</span>
        </p>
        <button className="text-xs font-semibold p-2 text-blue-600 hover:text-blue-800">
          View All Trainings
        </button>
      </div>
      <div className="w-full h-full bg-white  max-h-200 overflow-y-scroll no-scrollbar p-2">
        <div>
          {data.map((item, index) => (
            <div
              key={index}
              className="w-full flex flex-col justify-start items-start border-b-2 p-2  border-gray-500"
            >
              <p className="text-xs text-gray-500 font-poppins">
                {item.id} | {item.title}
              </p>
              <p className="text-xs font-semibold font-poppins">
                {item.project}
              </p>
              <p className="font-poppins text-xs  text-gray-500">
                {item.instructor}
              </p>
              <div className="w-[90%] p-1 flex justify-between items-center">
                <p className="font-poppins text-xs text-gray-500 flex justify-center items-center gap-2">
                  {" "}
                  <GoPerson className="text-gray-500" /> 05
                </p>
                <p className="font-poppins text-xs text-gray-500 flex justify-center items-center gap-2">
                  <IoMdTime className="text-gray-500 font-sm" />
                  {item.time}
                </p>
              </div>
              <div className="w-90percent p-1 flex justify-between items-center">
                <p className="font-poppins text-xs text-gray-500 flex justify-center items-center gap-2">
                  <IoBookOutline className="text-gray-500 font-sm" />
                  Classroom- ILT
                </p>
                <p className="font-poppins text-xs text-gray-500 flex justify-center items-center gap-2">
                  <CiLocationOn className="text-gray-500 font-sm" />
                  {item.location}
                </p>
              </div>
              <p className="font-poppins text-xs text-gray-500 p-1  flex justify-center items-center gap-2">
                <CiCalendar className="text-gray-500 font-sm" />
                {item.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard_UpcomingClasses;
