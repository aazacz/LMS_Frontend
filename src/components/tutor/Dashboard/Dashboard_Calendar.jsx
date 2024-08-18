import React, { useEffect, useState } from "react";
import Calendar from "react-calendar"; // or your preferred calendar library
import "react-calendar/dist/Calendar.css";
import Modal from "./Calendar_Modal"; // Import the Modal component
import { GoPerson } from "react-icons/go";
import { IoMdTime } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { CiLocationOn, CiCalendar } from "react-icons/ci";
import { TutorAxiosInstance } from "../../../routes/TutorRoutes";
import "./Dashboard_Calendar.css";
import TableModal from "./TableModal"; // Import the TableModal component

const Dashboard_Calendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [Data, setData] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openTableModal = () => setIsTableModalOpen(true);
  const closeTableModal = () => setIsTableModalOpen(false);

  const fetchAllSessionList = async () => {
    try {
      const response = await TutorAxiosInstance.get(
        `api/courseTutor/tutor-sessions`
      );
      console.log(response.data.tutorSessions);

      if (
        response.data.tutorSessions &&
        response.data.tutorSessions.length > 0
      ) {
        setData(response.data.tutorSessions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllSessionList();
  }, []);

  return (
    <div className="w-full h-max flex flex-col lg:flex-row justify-between items-center flex-wrap shadow-md bg-[#F4F5FB]">
      {/* Calendar Section - Visible on large screens */}
      <div className="assignment-main-calender md:w-[45%] flex flex-col w-full">
        <div className="assignment-calender">
          <Calendar className="assignment-main-calender" />
        </div>
      </div>

      {/* Upcoming Trainings Section */}
      <div className="w-full lg:w-[55%] h-max">
        <div className="w-full mt-4 h-8 flex border-b-2 border-black justify-between items-center pb-4">
          <p className="ml-2 text-xs font-semibold font-poppins">
            Upcoming Training Sessions
          </p>
          <button
            className="text-xs font-semibold p-2 text-blue-600 hover:text-blue-800"
            onClick={openTableModal} // Open the table modal
          >
            View All Trainings
          </button>
        </div>
        <div className="w-[100%] h-52 overflow-y-scroll snap-y snap-mandatory border-gray-400 max-h-200   scroll pb-0 p-2">
          {Data.map((item, index) => (
            <ClassCard key={item.sessionId} item={item} index={index} />
          ))}
        </div>
      </div>
      {/* Calendar Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />

      {/* Table Modal Component */}
      <TableModal
        isOpen={isTableModalOpen}
        onClose={closeTableModal}
        data={Data}
      />
    </div>
  );
};

export default Dashboard_Calendar;

const ClassCard = ({ item, index }) => {
  return (
    <div
      key={item.sessionId} // Using sessionId as key
      className="relative snap-start w-full h-full flex flex-col justify-start items-start border-b-2 p-2 border-dashed border-black"
    >
      <div className="flex items-center gap-x-2 text-Base font-semibold font-poppins">
        <p className="text-black">Module</p>
        <p className="">{item.moduleName}</p>
      </div>

      <div className="flex items-center gap-x-2 text-xs text-gray-500 font-poppins">
        <p className="text-gray-800 text-sm">Session Name</p>
        <p className="">{item.sessionName}</p>
      </div>

      <div className="flex items-center gap-x-2 text-xs text-gray-500 font-poppins">
        <p className="text-gray-800 text-sm">Session Description :</p>
        <p className="">{item.sessionDescription}</p>
      </div>

      <div className="w-[90%] p-1 flex justify-between items-center">
        <p className="font-poppins text-xs text-gray-500 flex justify-center items-center gap-2">
          <GoPerson className="text-gray-500" /> 05
        </p>
        <p className="font-poppins text-xs text-gray-500 flex justify-center items-center gap-2">
          <IoMdTime className="text-gray-500 font-sm" />
          {item.sessionDateTime
            ? new Date(item.sessionDateTime).toLocaleString()
            : "N/A"}
        </p>
      </div>
      <div className="w-[90%] p-1 flex justify-between items-center">
        <p className="font-poppins text-xs text-gray-500 flex justify-center items-center gap-2">
          <IoBookOutline className="text-gray-500 font-sm" />
          Classroom- Online
        </p>
        <p className="font-poppins text-xs text-gray-500 flex justify-center items-center gap-2">
          <CiLocationOn className="text-gray-500 font-sm" />
          {item.sessionLink ? (
            <a
              href={item.sessionLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Session
            </a>
          ) : (
            "Location N/A"
          )}
        </p>
      </div>

      <div className="flex w-full gap-x-2 px-2 left-1/2 -translate-x-1/2 absolute bottom-1">
        <input
          type="text"
          name=""
          className="placeholder:text-xs border-2 placeholder:pl-2 font-poppins italic rounded-lg"
          placeholder="GMeet Link Here"
          id=""
          value={item.sessionLink || ""}
          readOnly
        />
        <button className="w-[40%] px-2 h-6 rounded-sm font-poppins text-xs text-white bg-blue-600">
          Schedule
        </button>
        <button className="w-[40%] px-2 h-6 rounded-sm font-poppins text-xs text-white bg-blue-600">
          Start Class
        </button>
      </div>
    </div>
  );
};
