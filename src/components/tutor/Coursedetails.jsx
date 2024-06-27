import React, { useState, useEffect } from "react";
import coursephoto from "/coursephoto.jpeg";
import axios from "axios";
import { BiSpreadsheet } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import { FaCirclePlus, FaPenRuler } from "react-icons/fa6";
import { RotatingLines } from "react-loader-spinner";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { MdAssignmentAdd } from "react-icons/md";
import { IoDocuments } from "react-icons/io5";

const Coursedetails = ({ height }) => {
  const baseURL = process.env.REACT_APP_API_URL;
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${baseURL}api/course/get-course/${courseId}`
        );
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course:", error);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const [activeTab, setActiveTab] = useState("about");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="px-2 font-poppins flex">
      {loading ? (
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          strokeColor="#01729c"
          strokeWidth="2"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <div className="w-[70%] scroll overflow-y-scrol h-max p-4 flex flex-col">
          <div className="w-full h-[300px] bg-gray-800 flex items-center justify-center text-white font-semibold text-3xl">
            {course?.courseName}
          </div>

          <div className="w-full mt-4">
            <div className="mb-4">
              <h1 className="font-bold text-xl">{course?.courseName}</h1>
              <div className="flex items-center gap-x-6 mt-2">
                <span className="flex items-center gap-x-1 text-sm">
                  <BiSpreadsheet className="text-gray-400" />
                  {course?.modules?.length} Modules
                </span>
                <span className="flex items-center gap-x-1 text-sm">
                  <LuTimer className="text-gray-400" />
                  {course?.trainingDuration}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full bg-blue-400 mt-4 relative">
            <div className="flex w-full gap-x-6 px-2">
              {["about", "modules", "tests", "review"].map((tab, index) => (
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
          </div>

          <div className="relative mt-4 overflow-hidden h-64">
            {activeTab === "about" && <AboutContent about={course?.description} />}
            {activeTab === "modules" && <ModuleContent modules={course?.modules} />}
            {activeTab === "tests" && <TestsContent tests={course?.tests} />}
            {activeTab === "review" && <ReviewContent review={course?.review} />}
          </div>
        </div>
      )}

      <AsideBAr courseId={courseId} course={course?.modules} />
    </div>
  );
};

export default Coursedetails;

const AboutContent = ({ about }) => {
  return <div className="font-poppins">{about}</div>;
};

const ModuleContent = ({ modules }) => {
  return (
    <div>
      {modules?.map((module, index) => (
        <div key={index} className="font-poppins w-full">
          <p className="font-semibold">{module.moduleName}</p>
          <h6 className="ml-[2%]">{module.moduleDescription}</h6>
        </div>
      ))}
    </div>
  );
};

const TestsContent = () => <div className="bg-blue-300">Tests Content</div>;

const ReviewContent = () => <div className="bg-yellow-300">Review Content</div>;

const AsideBAr = ({ courseId, course }) => {
  return (
    <div className="sticky overflow-y-scrol top-[10vh] bg-slate-200 w-[30%] z-[1] h- flex flex-col">
      <div className="p-6 ">
      
      <div className="flex justify-between">

        <div className="flex justify-left py-">
          <Link
            replace
            to={`/tutor/home/content/${courseId}/newassignment`}
            className=""
          >
            <button
             data-tooltip-id="Assignment"
             data-tooltip-content="Create Assignment"
             data-tooltip-delay-show={700} 
            className="flex bg-white items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5 text-3xl hover:text-gray-800 hover:scale-105 rounded-full border-slate-600  font-plusjakartasans  sm:font-semibold">
              <MdAssignmentAdd />
            </button>
          </Link>
            <Tooltip     id="Assignment"  place="bottom" type="dark" effect="solid" 
                         style={{backgroundColor: "#595741",color: "#FFFFFF",fontSize: "11px",}} />
        </div>

        <div className="flex justify-left py-1">
          <Link
            replace
            to={`/tutor/home/content/${courseId}/material`}
            className=""
          >
            <button 
             data-tooltip-id="library"
             data-tooltip-content="Create Assignment"
             data-tooltip-delay-show={700} 
            className="flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5 text-3xl hover:text-gray-800 hover:scale-105 rounded-full bg-white border-slate-600  font-plusjakartasans  sm:font-semibold">
            <IoDocuments />

              
            </button>
          </Link>
          <Tooltip     id="library"  place="bottom" type="dark" effect="solid" 
                         style={{backgroundColor: "#595741",color: "#FFFFFF",fontSize: "11px",}} />
        </div>

        <div className="flex justify-left py-1">
          <Link
            replace
            to={`/tutor/home/content/${courseId}/addtest`}
            
            >
            <button 
              data-tooltip-id="library"
              data-tooltip-content="Add Test"
              data-tooltip-delay-show={700} 
            className="flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5 text-3xl hover:text-gray-800 hover:scale-105 rounded-full bg-white border-slate-600  font-plusjakartasans  sm:font-semibold">
              <FaPenRuler />

              
            </button>
          </Link>

          <Tooltip     id="library"  place="bottom" type="dark" effect="solid" 
                         style={{backgroundColor: "#595741",color: "#FFFFFF",fontSize: "11px",}} />
        </div>
        </div>

        <h1 className="font-plusjakartasans font-bold">Modules List</h1>
      
        <div className="rounded-lg flex flex-col items-center">
          <div className="w-full h-max border-b-2 border-gray-300 p-3 text-center bg-white">
            <h1 className="font-plusjakartasans font-bold line-clamp-2">
              Course Modules
            </h1>
          </div>

          <div className="flex flex-col w-full mt-3 gap-y-2">
            {course?.length > 0 ? (
              course.map((module, moduleIndex) => (
                <div
                  key={module._id}
                  className="w-full px-4 py-2 flex flex-col rounded-lg bg-white shadow-[0px_6px_12px_0px_#00000024]"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-x-3 items-center w-[65%]">
                      <div className="px-2  bg-[#C75625] text-white rounded-[4px] text-x flex font justify-center items-center">
                        {moduleIndex + 1}
                      </div>
                      <h1
                        className="text-orange-600 text-[14px] line-clamp-1 cursor-default"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={module.moduleName}
                        data-tooltip-delay-show={300}
                      >
                        {module.moduleName}
                      </h1>
                      <Tooltip
                        id="my-tooltip"
                        place="top"
                        type="dark"
                        effect="solid"
                        style={{ backgroundColor: "#89877c", color: "#FFFFFF" }}
                      />
                    </div>
                    <h1 className="w-[35%] text-right text-xs text-gray-400">
                      {module.sessions.length}{" "}
                      {module.sessions.length === 1 ? "Session" : "Sessions"}
                    </h1>
                  </div>

                  <div className="flex flex-col ml-4">
                    {module.sessions.map((session, sessionIndex) => (
                      <div
                        key={session._id}
                        className="flex justify-between items-center py-2"
                      >
                        <div className="flex gap-x-3 items-center w-[65%]">
                          <div className="w-5 h-5 bg-[#FFBB54] text-white rounded-full text-sm flex justify-center items-center">
                            {sessionIndex + 1}
                          </div>
                          <h1
                            className="text-gray-600 text-[12px] line-clamp-1 cursor-default"
                            data-tooltip-id="Sessiontooltip"
                            data-tooltip-content={session.sessionName}
                            data-tooltip-delay-show={700}
                          >
                            {session.sessionName}
                          </h1>
                          <Tooltip
                            id="Sessiontooltip"
                            place="bottom"
                            type="dark"
                            effect="solid"
                            style={{
                              backgroundColor: "#CCCCCC",
                              color: "#141414",
                              fontSize: "10px",
                            }}
                          />
                        </div>
                        <h1 className="w-[35%] text-right text-xs text-gray-400">
                          {session.sessionDateTime || "No date"}
                        </h1>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No modules available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
