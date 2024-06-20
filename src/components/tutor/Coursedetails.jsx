import React, { useState } from "react";
import coursephoto from "/coursephoto.jpeg";
import { BiSpreadsheet } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import { Link } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";

const Coursedetails = ({ height }) => {
  const [activeTab, setActiveTab] = useState("about");

  const [slideDirection, setSlideDirection] = useState("left");

  const handleTabClick = (tab) => {
    setSlideDirection(
      activeTab === "about" && tab === "module" ? "left" : "right"
    );
    setActiveTab(tab);
  };

  return (
    <div className="px-2   flex">
      <div className="w-[70%] scroll overflow-y-scroll  p-4 flex flex-col ">
        <div className="w-full h-[300px] bg-gray-800 flex items-center justify-center text-white font-semibold font-plusjakartasans text-3xl">
          {" "}
          Introduction to SAT & DSAT
        </div>

        <div className="w-full  ">
          {/* heading and Module line */}
          <div className="mt-4">
            <h1 className="font-bold text-xl font-plusjakartasans ">
              Introduction to Basic SAT & DSAT
            </h1>
            <div className="flex items-center gap-x-6 mt-2">
              <span className="flex items-center gap-x-1 text-sm font-plusjakartasans">
                <BiSpreadsheet className="text-gray-400" /> 5 Modules
              </span>
              <span className="flex items-center gap-x-1 text-sm font-plusjakartasans">
                <LuTimer className="text-gray-400" /> 60Hrs
              </span>
            </div>
          </div>

          <div className="w-full bg-blue-400 mt-4 relative">
            <div className="flex w-full gap-x-4">
              {["about", "module", "tests", "review"].map((tab, index) => (
                <button
                  key={index}
                  className={`relative py-2 ${
                    activeTab === tab ? "border-b-4 border-amber-500" : ""
                  }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* <div className={`underline absolute bottom-0 h-1 bg-amber-500 transition-all duration-300 ${activeTab}`} /> */}
          </div>

          <div className="relative mt-4 overflow-hidden h-64">
            <div className={`slide-content ${slideDirection}`}>
              {activeTab === "about" && <AboutContent />}
              {activeTab === "module" && <ModuleContent />}
              {activeTab === "tests" && <TestsContent />}
              {activeTab === "review" && <ReviewContent />}
            </div>
          </div>
        </div>
      </div>
      <AsideBAr Height={height} />
    </div>
  );
};

export default Coursedetails;

const AboutContent = () => <div className="bg-red-300">About Content</div>;
const ModuleContent = () => <div className="bg-green-300">Module Content</div>;
const TestsContent = () => <div className="bg-blue-300">Tests Content</div>;
const ReviewContent = () => <div className="bg-yellow-300">Review Content</div>;

const AsideBAr = ({ Height }) => {
  const modules = [
    "Introduction",
    "What is UX Design",
    "Usability testing",
    "Create Usability Test",
    "How to implement",
  ];

  return (
    <>
      <div className="sticky overflow-y-scroll  top-[10vh] bg-slate-200 w-[30%] h-[90vh] flex flex-col ">
        <div className="p-6 ">
          <div className="flex justify-left py-4">
            <Link
              replace
              to={`/tutor/home/content/${1}/newassignment`}
              className="bg-[#F5F1F1]"
            >
              <button
                className="flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
                                    p-1 rounded-lg border-slate-600 px-2 font-plusjakartasans text-sm sm:font-semibold"
              >
                <FaCirclePlus className="text-slate-600 " />
                Assignments
              </button>
            </Link>
          </div>

          <div className="flex justify-left py-4">
            <Link
              replace
              to={`/tutor/home/content/material`}
              className="bg-[#F5F1F1]"
            >
              <button
                className="flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
                                    p-1 rounded-lg border-slate-600 px-2 font-plusjakartasans text-sm sm:font-semibold"
              >
                <FaCirclePlus className="text-slate-600 " />
                Materials
              </button>
            </Link>
          </div>

          <div className="flex justify-left py-4">
            <Link
              replace
              to={`/tutor/home/content/addtest`}
              className="bg-[#F5F1F1]"
            >
              <button
                className="flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
                                    p-1 rounded-lg border-slate-600 px-2 font-plusjakartasans text-sm sm:font-semibold"
              >
                <FaCirclePlus className="text-slate-600 " />
                Add Tests
              </button>
            </Link>
          </div>

          <h1 className="font-plusjakartasans font-bold ">Modules List</h1>
          <div className="bg-white rounded-lg flex flex-col mt-5 p-5 items-center ">
            <h1 className="font-plusjakartasans font-bold line-clamp-2">
              Introduction Basic SAT & DSAT
            </h1>

            {modules.map((value, index) => {
              return (
                <div
                  key={index}
                  className="flex w-full justify-between  items-center py-5"
                >
                  <div className="flex  gap-x-3 items-center w-[65%]  ">
                    <div>
                      <div className="w-6 h-6 bg-[#C75625] text-white rounded-[5px] text-sm flex justify-center items-center">
                        {index + 1}
                      </div>
                    </div>

                    <h1 className=" text-orange-600 text-[12px] line-clamp-1">
                      {value}
                    </h1>
                  </div>

                  <h1 className="w-[35%] text-right text-xs text-gray-400">
                    {" "}
                    2 Sessions
                  </h1>
                </div>
              );
            })}

            <div className="w-[90%] flex justify-center items-center bg-[#FFBB54] text-black rounded-md py-2">
              Edit
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
