import React, { useState } from "react";
import "./Dashboard.css";
import SearchIcon from "@mui/icons-material/Search";
import classroomimage from "../../../assets/ClassesToday/classestoday.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import importantimage from "../../../assets/ClassesToday/important.png";
import continuetests from "../../../assets/ClassesToday/continuetests.png";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import Swal from "sweetalert2";
import { FaCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { PiNotepadBold } from "react-icons/pi";
import Loader from "../../reusable/Loader";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const Stats = [
    {
      heading: "Classes",
      module: "05",
    },
    {
      heading: "Tests",
      module: "04/05",
    },
    {
      heading: "Quiz Won",
      module: "03/05",
    },
    {
      heading: "Assignments",
      module: "00/03",
    },
  ];

  const assignments1 = [
    { id: 1, name: "SAT Assignment 1", feedbackLink: "#", score: "25/35" },
    { id: 2, name: "SAT Assignment 2", feedbackLink: "#", score: "30/35" },
    { id: 3, name: "SAT Assignment 3", feedbackLink: "#", score: "28/35" },
    { id: 4, name: "SAT Assignment 4", feedbackLink: "#", score: "27/35" },
    { id: 5, name: "SAT Assignment 5", feedbackLink: "#", score: "26/35" },
  ];

  const ConstData = ({ heading, module }) => {
    return (
      <div className="stats-member">
        <div className="stats-member-box">
          <h1>{heading}</h1>
          <p>{module}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full pl-[8px] font-poppins">
      <h1 className="p-2 font-bold text-base md:text-base lg:text-lg ">
        Dashboard
      </h1>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-100 z-50">
          <Loader />
        </div>
      )}
      <div className="font-poppins font-semibold h-max text-sm md:text-base p-2 flex gap-2 items-center">
        Classes Today
        <span className="border border-black p-2 rounded-lg">
          <FaCalendarAlt className="text-[#0066DE]" />
        </span>
      </div>
      <div className="content-container flex">
        <div className="w-full  pt-3 pr-2 pl-2 gap-5 flex flex-wrap h-max justify-evenly">
          <div className="left-sub-content1 mr-1 bg-[#f4f5fb] w-full lg:w-[40%] p-2  ">
            <div className="font-poppins font-bold p-2 flex-wrap gap-2 flex justify-between text-sm md:text-base">
              <p className="">
                Introduction to basic <br /> DSAT & MAT
              </p>
              <p className="">
                David
                <br /> Beckham
              </p>
            </div>
            <div className="w-full gap-[20px] flex flex-col p-2 justify-around  text-xs md:text-sm">
              <p className="p-2 font-poppins font-semibold text-sm bg-white  ">
                1st Module
              </p>
              <p className="flex gap-2 font-poppins font-semibold p-2 items-center bg-white">
                {" "}
                <FaClock className="text-lg" />
                1Hr 30Min
              </p>
              <p className="flex gap-2 p-2 font-poppins font-semibold items-center bg-white text-semibold">
                View course
                <FaArrowRightLong className="text-black" />{" "}
              </p>
            </div>
            <div className="pt-3 font-poppins font-light text-sm md:text-base mb-2">
              <p>
                Training Dates <span className="text-red-900">*</span>
              </p>
              <input
                type="date"
                className="training-date-box w-full p-2 mt-2 border border-gray-500 text-sm"
                placeholder="Select Training Dates"
              />
            </div>
          </div>
          <div className="left-sub-content2 mr-1 pt-2 flex flex-col bg-[#f4f5fb] rounded-xl p-2  w-full  lg:w-[55%]">
            <img
              src={classroomimage}
              alt="classroom"
              className="w-full h-[40%] rounded-xl p-1"
            />
            <div className="left-sub-content-box2 justify-evenly flex flex-wrap gap-[10px] p-2 ">
              <p className="flex gap-[10px] rounded-xl p-2 text-sm font-poppins font-semibold bg-white ">
                Module 2
              </p>
              <p className="flex justify-center items-center gap-[10px] rounded-xl p-2 text-sm font-poppins font-semibold bg-white">
                <FaClock />
                1Hr 30Min
              </p>
              <p className="flex justify-center items-center gap-[10px] rounded-xl p-2 text-sm font-poppins font-semibold bg-white">
                View course <FaArrowRightLong />
              </p>
            </div>
            <div>
              <h1 className="font-poppins p-2 text-left font-bold">
                David Beckham
              </h1>
              <p className="font-poppins text-xs leading-6 text-left pl-2 ">
                The community's need for applications that can facilitate dailty
                activities is increasing as technology advaces.Currently,The
                community's need for applications that can facilitate daily
                activities is increasing as technology advances,Currently.
              </p>
            </div>
            <div className="flex font-poppins text-sm p-3 rounded-lg ">
              <button
                type="button"
                className="bg-[#13bf78] text-white font-medium rounded-lg p-1 w-[45%] border border-black"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
        <div className="pr-5 pl-5 pb-5 pt-3 flex flex-col right-content md:flex">
          <div className="rounded-lg bg-white p-5 right-stats">
            <p className="font-poppins font-bold text-2xl pb-2">Stats</p>
            <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-4 justify-center items-center">
              {Stats.map((member, index) => (
                <ConstData
                  className="flex flex-col justify-center items-center "
                  key={index}
                  {...member}
                />
              ))}
            </div>
          </div>
          <div className="pt-3 flex flex-col gap-4">
            <p className="font-poppins text-2xl font-bold flex justify-center items-center">
              Importants
            </p>
            <div className="flex flex-col gap-2 bg-gray-100">
              <div className="p-4 flex flex-col gap-4">
                {" "}
                <img src={importantimage} alt="important" />
                <div className="flex gap-4 ">
                  <p className="text-lg font-bold font-poppins">Course </p>
                  <p className="text-sm mt-1 font-semibold font-poppins">
                    Module 1{" "}
                  </p>
                </div>
                <p className="font-poppins text-sm text-left font-medium">
                  Complete The Test 1 before proceeding for the next module.
                </p>
                <button className="font-poppins text-sm text-bold py-2 px-4 rounded-lg bg-[#f99406] w-fit">
                  Complete Test Now
                </button>
              </div>
            </div>
            <div className="mb-2">
              <h1 className="font-poppins font-semibold text-xl pt-3 pb-3">
                Assignment Grading
              </h1>
              <div className="overflow-y-scroll no-scrollbar flex flex-col gap-4">
                {assignments1.map((assignment1) => (
                  <div
                    key={assignment1.id}
                    className="bg-white justify-between h-max shadow-md rounded-lg p-2 flex mb-1  "
                  >
                    <div className="flex ">
                      <PiNotepadBold className="w-8 h-10" />
                      <div className="p-1 flex flex-col">
                        <h2 className="text-blue-gray-600 text-xs font-bold">
                          {assignment1.name}
                        </h2>
                        <p className="text-gray-700 text-xs underline">
                          <a href={assignment1.feedbackLink}>View Feedback</a>
                        </p>
                      </div>
                    </div>
                    <button className="ml-5 bg-[#6C51D9] text-white p-1 rounded-lg text-xs">
                      {assignment1.score}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
