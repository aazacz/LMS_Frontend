import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { IoMdTime } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";

const Dashboard_StudentRequest = () => {
  const data = [
    {
      id: 1,
      title: "Training 1",
      project: "Project A",
      instructor: "Instructor X",
      student: "Student Y",
      time: "3hrs",
      teachingMethod: " Virtual Teaching",
      date: "2024-06-14",
    },
    {
      id: 2,
      title: "Training 2",
      project: "Project A",
      instructor: "Instructor X",
      student: "Student Y",
      time: "3hrs",
      teachingMethod: " Virtual Teaching",
      date: "2024-06-14",
    },
    // More data objects...
  ];
  return (
    <div className="w-full h-full flex flex-col shadow-md bg-[#E5F0FC] p-2">
      <div className="flex font-poppins font-semibold justify-between">
        <p className="text-sm  w-full">Student Request</p>
        <div className="flex gap-2">
          <FaAngleLeft />
          <FaAngleRight />
        </div>
      </div>
      <div className="bg-[#E5F0FC] font-poppins text-xs flex justify-end">
        Expires in <span className="text-red-500 px-1"> 5 hours </span> &{" "}
        <span className="text-red-500 px-1"> 5 mins </span>
      </div>
      <div className="w-full h-full bg-blue-50 border-t-2 border-black border-dashed">
        <div className="w-[100%] h-full lg:h-[228px] max-h-200 overflow-y-scroll no-scrollbar p-4 snap-y snap-mandatory">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-full flex flex-col justify-start items-start border-b-2 border-dashed p-2 border-gray-500 snap-start"
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
                  <GoPerson className="text-gray-500" /> {item.student}
                </p>
                <p className="font-poppins text-xs text-gray-500 flex justify-center items-center gap-2">
                  <IoMdTime className="text-gray-500 font-sm" />
                  {item.time}
                </p>
              </div>
              <div className="w-[90%] p-1 flex justify-between items-center">
                <p className="font-poppins text-xs text-gray-500 flex justify-center items-center gap-2">
                  <IoBookOutline className="text-gray-500 font-sm" />
                  {item.teachingMethod}
                </p>
              </div>
              <p className="font-poppins text-xs text-gray-500 p-1 flex justify-center items-center gap-2">
                <CiCalendar className="text-gray-500 font-sm" />
                {item.date}
              </p>
              <div className="w-full justify-center items-center flex gap-4">
                <button className="w-[40%] h-6 rounded-sm font-poppins text-[10px] text-white bg-green-600">
                  I'm Available
                </button>
                <button className="w-[40%] h-6 rounded-sm font-poppins text-[10px] text-white bg-blue-600">
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard_StudentRequest;
