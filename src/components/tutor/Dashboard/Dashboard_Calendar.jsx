import React from "react";

import { GoPerson } from "react-icons/go";
import { IoMdTime } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


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

const Dashboard_Calendar = () => {
  return (
    <div className="w-full h-max flex justify-between items-center flex-wrap shadow-md bg-[#E5F0FC]" >
      <div className="w-full  lg:w-[40%] justify-center bg-red-400 h-max bg-y00"><Calendar className="w-full font-poppins border-none border-r-2  bg-[#E5F0FC] "/></div>
      <div className="w-full  lg:w-[55%] h-max ">
        <div className="w-full h-8 flex  border-b-2 border-dashed border-black justify-between items-center ">
          <p className=" ml-2 text-xs font-semibold font-poppins">
            Upcoming Training on{" "}
            <span className="font-semibold">13 Jan 2022</span>
          </p>
          <button className="text-xs font-semibold p-2 text-blue-600 hover:text-blue-800">
            View All Trainings
          </button>
        </div>
        <div className="w-[90%] h-48  border-gray-400   max-h-200 overflow-y-scroll no-scrollbar p-2">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-full flex flex-col justify-start items-start border-b-2 p-2 border-dashed border-black"
            >
              <p className="text-xs text-gray-500 font-poppins">
                {item.id} | {item.title}
              </p>
              <p className="text-xs  font-semibold font-poppins">
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
              <div className="w-[90%] p-1 flex justify-between items-center">
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
              <button className="w-[40%] h-6 rounded-sm font-poppins text-xs text-white bg-blue-600">
                Start Class
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard_Calendar;
