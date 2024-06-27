import React, { useState, useEffect } from "react";
import coursephoto from "/coursephoto.jpeg";
import axios from "axios";
import { BiSpreadsheet } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { RotatingLines } from "react-loader-spinner";

const Coursedetails = ({ height }) => {
  const baseURL = process.env.REACT_APP_API_URL;
  const { courseId } = useParams();
  const [course, setCourse] = useState();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}api/course/get-course/${courseId}`);
        console.log(response.data);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course:", error);
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const [activeTab, setActiveTab] = useState("about");
  const [slideDirection, setSlideDirection] = useState("left");

  const handleTabClick = (tab) => {
    setSlideDirection(activeTab === "about" && tab === "module" ? "left" : "right");
    setActiveTab(tab);
  };

  return (
    <div className="relative">
       {Loading && <FullscreenLoader />}
      <div className={`px-2 font-poppins flex ${Loading ? 'opacity-50' : ''}`}>
        <div className="w-[70%] scroll overflow-y-scroll  p-4 flex flex-col ">
          <div className="w-full h-[300px] bg-gray-800 flex items-center justify-center text-white font-semibold  text-3xl">
            {course?.courseName}
          </div>
          <div className="w-full">
            <div className="mt-4">
              <div className="mb-4">
                <h1 className="font-bold text-xl">{course?.courseName}</h1>
                <div className="flex items-center gap-x-6 mt-2">
                  <span className="flex items-center gap-x-1 text-sm">
                    <BiSpreadsheet className="text-gray-400" /> {course?.modules.length} Modules
                  </span>
                  <span className="flex items-center gap-x-1 text-sm">
                    <LuTimer className="text-gray-400" /> {course?.trainingDuration}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full bg-blue-400 mt-4 relative">
              <div className="flex w-full gap-x-6 px-2">
                {["about", "modules", "tests", "review"].map((tab, index) => (
                  <button
                    key={index}
                    className={`relative py-2 ${activeTab === tab ? "border-b-4 border-amber-500" : ""}`}
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
        </div>

        <AsideBAr CourseId={courseId} />
      </div>
    </div>
  );
};

export default Coursedetails;

const FullscreenLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-100 z-50">
    <RotatingLines
      visible={true}
      height="96"
      width="96"
      strokeColor="#01729c"
      strokeWidth="2"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  </div>
);

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

const AsideBAr = ({ CourseId }) => {
  const [modules, setModules] = useState([]);
  const baseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}api/course/get-course/${CourseId}`);
        setModules(response.data.modules);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [CourseId]);

  return (
    <div className="sticky overflow-y-scroll top-[10vh] bg-slate-200 w-[30%] h-[90vh] flex flex-col">
      <div className="p-6">
        <div className="flex justify-left py-4">
          <Link
            replace
            to={`/tutor/home/content/${CourseId}/newassignment`}
            className="bg-[#F5F1F1]"
          >
            <button
              className="flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-1 rounded-lg border-slate-600 px-2 font-plusjakartasans text-sm sm:font-semibold"
            >
              <FaCirclePlus className="text-slate-600" />
              Assignments
            </button>
          </Link>
        </div>

        <div className="flex justify-left py-4">
          <Link replace to={`/tutor/home/content/${CourseId}/material`} className="bg-[#F5F1F1]">
            <button
              className="flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-1 rounded-lg border-slate-600 px-2 font-plusjakartasans text-sm sm:font-semibold"
            >
              <FaCirclePlus className="text-slate-600" />
              Materials
            </button>
          </Link>
        </div>

        <div className="flex justify-left py-4">
          <Link replace to={`/tutor/home/content/${CourseId}/addtest`} className="bg-[#F5F1F1]">
            <button
              className="flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-1 rounded-lg border-slate-600 px-2 font-plusjakartasans text-sm sm:font-semibold"
            >
              <FaCirclePlus className="text-slate-600" />
              Add Tests
            </button>
          </Link>
        </div>

        <h1 className="font-plusjakartasans font-bold">Modules List</h1>
        <div className="bg-white rounded-lg flex flex-col mt-5 p-5 items-center">
          <h1 className="font-plusjakartasans font-bold line-clamp-2">Course Modules</h1>
          {modules.length > 0 ? (
            modules.map((module, moduleIndex) => (
              <div key={module._id} className="flex flex-col w-full">
                <div className="flex justify-between items-center py-5">
                  <div className="flex gap-x-3 items-center w-[65%]">
                    <div className="w-6 h-6 bg-[#C75625] text-white rounded-[5px] text-sm flex justify-center items-center">
                      {moduleIndex + 1}
                    </div>
                    <h1 className="text-orange-600 text-[14px] line-clamp-1">{module.moduleName}</h1>
                  </div>
                  <h1 className="w-[35%] text-right text-xs text-gray-400">
                    {module.sessions.length} {module.sessions.length === 1 ? 'Session' : 'Sessions'}
                  </h1>
                </div>
                <div className="flex flex-col ml-10">
                  {module.sessions.map((session, sessionIndex) => (
                    <div key={session._id} className="flex justify-between items-center py-2">
                      <div className="flex gap-x-3 items-center w-[65%]">
                        <div className="w-6 h-6 bg-[#FFBB54] text-white rounded-[5px] text-sm flex justify-center items-center">
                          {sessionIndex + 1}
                        </div>
                        <h1 className="text-gray-600 text-[12px] line-clamp-1">{session.sessionName}</h1>
                      </div>
                      <h1 className="w-[35%] text-right text-xs text-gray-400">
                        {session.sessionDateTime ? session.sessionDateTime : 'No date'}
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
  );
};
