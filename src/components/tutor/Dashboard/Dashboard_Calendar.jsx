import React, { useState } from "react";
import Calendar from "react-calendar"; // or your preferred calendar library
import "react-calendar/dist/Calendar.css";
import Modal from "./Calendar_Modal"; // Import the Modal component
import { GoPerson } from "react-icons/go";
import { IoMdTime } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { CiLocationOn, CiCalendar } from "react-icons/ci";

const data = [
  {
    id: "#581",
    title: "PMP Training Project Team",
    project: "HealthCare Information Security & Privacy Practitioner",
    instructor: "Kevin Romero George",
    time: "2pm-5pm",
    location: "Hyderabad, India",
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full h-max flex flex-col lg:flex-row justify-between items-center flex-wrap shadow-md bg-[#E5F0FC]">
      {/* Calendar Section - Visible on large screens */}
      <div className="hidden lg:block w-full lg:w-[45%] p-2 h-auto text-sm lg:text-lg">
        <Calendar className="calendar shadow-md p-2 text-sm rounded-lg overflow-hidden font-poppins border-none border-r-2 bg-[#E5F0FC]" />
      </div>

      {/* Calendar Icon - Visible on medium and small screens */}
      <div className="lg:hidden p-4">
        <button
          onClick={openModal}
          className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-md"
        >
          <CiCalendar className="text-2xl" />
        </button>
      </div>

      {/* Upcoming Trainings Section */}
      <div className="w-full lg:w-[55%] h-max">
        <div className="w-full mt-4 h-8 flex border-b-2 border-black justify-between items-center pb-4">
          <p className="ml-2 text-xs font-semibold font-poppins">
            Upcoming Training on{" "}
            <span className="font-semibold">13 Jan 2022</span>
          </p>
          <button className="text-xs font-semibold p-2 text-blue-600 hover:text-blue-800">
            View All Trainings
          </button>
        </div>
        <div className="w-[90%] h-48 border-gray-400 max-h-200 overflow-y-scroll no-scrollbar p-2">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-full flex flex-col justify-start items-start border-b-2 p-2 border-dashed border-black"
            >
              <p className="text-xs text-gray-500 font-poppins">
                {item.id} | {item.title}
              </p>
              <p className="text-xs font-semibold font-poppins">
                {item.project}
              </p>
              <p className="font-poppins text-xs text-gray-500">
                {item.instructor}
              </p>
              <div className="w-[90%] p-1 flex justify-between items-center">
                <p className="font-poppins text-xs text-gray-500 flex justify-center items-center gap-2">
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
              <p className="font-poppins text-xs text-gray-500 p-1 flex justify-center items-center gap-2">
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
      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Dashboard_Calendar;
