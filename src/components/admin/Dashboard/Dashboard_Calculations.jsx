import React from "react";
import { PiMoney } from "react-icons/pi";
import { FaBook } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { FaUserGraduate } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUsersRectangle } from "react-icons/fa6";

const values = [
  {
    value: "67.6k",
    icon: <PiMoney className="text-2xl text-blue-800" />,
    label: "Income",
  },
  {
    value: "12.6k",
    icon: <FaUserGraduate className=" text-2xl text-pink-700" />,
    label: "Students",
  },
  {
    value: "143",
    icon: <FaBookBookmark className=" text-2xl text-orange-600" />,
    label: "Active Classes",
  },
  {
    value: "651",
    icon: <FaChalkboardTeacher className="text-2xl text-black" />,
    label: "Tutors",
  },
  {
    value: "46k",
    icon: <FaBook className="text-2xl text-red-800" />,
    label: "Active Courses",
  },
  {
    value: "8.8k",
    icon: <FaUsersRectangle className="text-2xl text-blue-400" />,
    label: "Registered Accounts",
  },
  // Add more objects for additional items
];

const Dashboard_Calculations = () => {
  return (
    <div className=" h-max flex flex-wrap  p-0 md:p-2  justify-around gap-y-8">
      {values.map((item, index) => (
        <div
          key={index}
          className="w-[120px] lg:w-[200px]  h-max bg-[#E0EDFB] flex flex-col p-4 md:p-3   rounded-md shadow-md "
        >
          <div className="flex justify-between items-center">
            <p className="font-poppins text-sm font-semibold flex gap-2">
              {item.value}
            </p>
            <div>{item.icon}</div>
          </div>
          <h6 className="text-xs font-poppins line-clamp-1">{item.label}</h6>
        </div>
      ))}
    </div>
  );
};

export default Dashboard_Calculations;
