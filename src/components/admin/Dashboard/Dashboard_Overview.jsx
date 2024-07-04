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
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Dashboard_Overview = () => {
  const Histogram = () => {
    const data = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Frequency",
          data: [1, 3, 5, 8, 12, 15, 8, 5, 3, 1, 7, 5],
          backgroundColor: "rgba(98,102,234)",
          borderColor: "rgba(98,102,234)",
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          position: "top",
        },
      },
    };
    return (
      <div className="w-full h-max">
        <Bar data={data} options={options} />
      </div>
    );
  };
  return (
    <div className=" w-full  h-max flex flex-col bg-[#E0EDFB] p-2 rounded-md shadow-md  ">
      <div className="w-full h-1/5 flex justify-between items-center ">
        <div className="w-1/2 h-full flex justify-start items-center font-semibold text-xs md:text-sm lg:text-lg font-poppins">
          Income Overview
        </div>
        <div className="w-1/2 h-full bg-gray-200"> Toggle Button</div>
      </div>
      <div className="w-full  h-4/5 flex flex-wrap ">
        <div className="w-[30%] h-max  flex flex-col justify-center items-stretch">
          <div>
            <AiOutlinePieChart className="w-12 md:w-16 lg:w-20 text-[#0EA5E9] h-16" />
          </div>
          <p className="w-full text-xs md:text-sm lg:text-xl color-black font-semibold font-poppins">
            &#8377;66,556.55
          </p>
          <p className="w-full text-xs text-gray-500 font-poppins">
            this month
          </p>
          <button className="w-max font-poppins h-max rounded-lg border-2 border-gray-400 text-xs my-2 p-2 flex gap-2">
            <PiDownloadSimpleFill />
            Download now
          </button>
        </div>
        <div className="w-full md:w-[65%] h-max "><Histogram  /></div>
      </div>
    </div>
  );
};

export default Dashboard_Overview;
