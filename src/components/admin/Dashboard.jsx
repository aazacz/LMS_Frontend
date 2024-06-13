import React from "react";
import MonaLisa from "../../assets/Settings1.jpg/";
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
    <div className="w-full  h-max mx-auto my-0">
      <Bar data={data} options={options} />
    </div>
  );
};
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

const Dashboard = () => {
  return (
    <div className="w-full h-max flex-wrap  flex justify-center items-center">
      <div className="w-full h-full flex flex-wrap  justify-between items-center gap-6 m-2">
        <div className=" w-full lg:w-3/5 h-max flex flex-col bg-[#E0EDFB] p-2 rounded-md shadow-md  ">
          <div className="w-full h-1/5 flex justify-between items-center ">
            <div className="w-1/2 h-full flex justify-start items-center font-semibold text-xs md:text-sm lg:text-lg font-poppins">
              Income Overview
            </div>
            <div className="w-1/2 h-full bg-gray-200"> Toggle Button</div>
          </div>
          <div className="w-full h-4/5 flex ">
            <div className="w-1/5 h-max  flex flex-col justify-center items-stretch">
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
            <div className="w-4/5 h-max">
              <Histogram />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/6 h-max flex-wrap flex justify-between items-center m-4  gap-4">
          {[
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
          ].map((item, index) => (
            <div
              key={index}
              className="w-45percent h-max bg-[#E0EDFB] flex flex-col p-4 rounded-md shadow-md "
            >
              <div className="flex justify-between items-center">
                <p className="font-poppins text-sm font-semibold">
                  {item.value}
                </p>
                <div>{item.icon}</div>
              </div>
              <h6 className="text-xs font-poppins">{item.label}</h6>
            </div>
          ))}
        </div>
        <div className="w-full h-max flex flex-wrap justify-start items-center  gap-4 ">
          <div className="w-full lg:w-5/12 h-64 flex flex-col justify-center items-center bg-[#E0EDFB] shadow-md rounded-lg p-2  ">
            <div className="w-full h-8 flex justify-between items-center mb-2">
              <p className="text-xs md:text-sm font-poppins">
                Upcoming Training on{" "}
                <span className="font-semibold">13 Jan 2022</span>
              </p>
              <button className="text-xs font-semibold p-2 text-blue-600 hover:text-blue-800">
                View All Trainings
              </button>
            </div>
            <div className="w-90percent h-full bg-white  max-h-200 overflow-y-scroll no-scrollbar p-2">
              <div>
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="w-full flex flex-col justify-start items-start border-b-2 p-2  border-gray-500"
                  >
                    <p className="text-xs text-gray-500 font-poppins">
                      {item.id} | {item.title}
                    </p>
                    <p className="text-xs md:text-sm font-semibold font-poppins">
                      {item.project}
                    </p>
                    <p className="font-poppins text-xs md:text-sm text-gray-500">
                      {item.instructor}
                    </p>
                    <div className="w-90percent p-1 flex justify-between items-center">
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
          <div className="w-full  lg:w-1/2 h-max bg-blue-100 rounded-lg flex flex-col justify-start items-start gap-3 shadow-md p-2">
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
        </div>
        <div className="w-full h-max shadow-md bg-blue-100 rounded-lg p-2 flex justify-start items-start flex-wrap">
          <div className="w-full lg:w-3/12  h-max flex flex-col justify-start items-stretch gap-2 m-2 p-2">
            <p className="text-md  font-semibold font-poppins">
              Top Selling Courses and Employees
            </p>
            <p className="text-xs text-gray-500 font-poppins">
              The top selles are calculated based on the sales of a product and
              undergoes hourly updations.
            </p>
            <div className="flex flex-col justify-center items-start ">
              <p className="font-poppins text-sm text-gray-500">Sales Growth</p>
              <div className="flex justify-center item-center gap-2">
                <FaRegArrowAltCircleUp className="text-lg text-green-400" />
                <p className="font-poppins text-sm font-semibold">22,225.22</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-70percent h-max flex justify-start items-start p-2 gap-4 overflow-x-scroll no-scrollbar ">
            <div className="w-full h-max rounded-md p-4 flex flex-row gap-4">
              {tutors.map((tutor, index) => (
                <div
                  key={index}
                  className="w-max bg-white h-max rounded-md p-4 flex flex-col gap-2"
                >
                  <div className="w-full h-max flex justify-start items-center">
                    <div className="w-12 h-12 overflow-hidden">
                      <img src={MonaLisa} />
                    </div>
                    <div className="w-max h-max p-2 flex flex-col justify-start items-start">
                      <p className="text-xs md:text-sm font-poppins">
                        {tutor.name}
                      </p>
                      <p className="text-xs text-gray-500 font-poppins">
                        {tutor.role}
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-max flex justify-around items-center gap-4">
                    <div className="w-max h-max flex flex-col justify-center items-center">
                      <p className="text-xs text-gray-500 font-poppins">
                        Students
                      </p>
                      <p className="text-xs md:text-sm font-poppins font-semibold">
                        {tutor.students}
                      </p>
                    </div>
                    <div className="w-max h-max flex flex-col justify-center items-center">
                      <p className="text-xs text-gray-500 font-poppins">
                        Subject
                      </p>
                      <p className="text-xs md:text-sm font-poppins font-semibold">
                        {tutor.subject}
                      </p>
                    </div>
                    <div className="w-max h-max flex flex-col justify-center items-center">
                      <p className="text-xs text-gray-500 font-poppins">
                        Modules
                      </p>
                      <p className="text-xs md:text-sm font-poppins font-semibold">
                        {tutor.modules}
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-lg bg-red-400"></div>
                  <div className="w-full text-xs md:text-sm h-max flex flex-col gap-2">
                    {tutor.progress.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex font-poppins text-xs font-medium gap-1"
                      >
                        <p className="flex gap-1 justify-center items-center">
                          <FaCircle className={`text-[${item.color}]`} />
                          {item.label}
                        </p>
                        <p className="text-gray-500">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 w-full h-max flex justify-between items-center">
                    <div className="flex gap-1">
                      <FaMedal className="text-yellow-400" />
                      <FaTrophy className="text-yellow-400" />{" "}
                      <FaCrown className="text-yellow-400" />
                    </div>
                    <div>
                      <CiSettings className="text-xl cursor-pointer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full h-max shadow-md bg-blue-100 rounded-lg p-2 flex flex-col justify-start items-start">
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
      </div>
    </div>
  );
};

export default Dashboard;
