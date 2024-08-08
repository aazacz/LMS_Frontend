import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiSpreadsheet } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import { useParams } from "react-router-dom";
import Loader from "../../reusable/Loader";
// import Modal from './Modal';
import AsideBar from "./AsideBar";
import AboutContent from "./AboutContent";
import ModuleContent from "./ModuleContent";
import TestsContent from "./TestsContent";
import Assignments from "./Assignments";
import ReviewContent from "./ReviewContent"; // Import ReviewContent if not imported
import TutorAssignment from "../../tutor/Assignment/Assignments";
import { data } from "autoprefixer";

const Coursedetails = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${baseURL}api/course/get-course/${courseId}`
        );
        setCourse(response.data);
        console.log(data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching course:", error);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, baseURL]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="px-2  font-poppins flex flex-col lg:flex-row">
      {loading ? (
        <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full  lg:w-[70%] scroll overflow-y-scroll h-max p-4 flex flex-col">
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

            <div className="w-full mt-4 relative">
              <div className="flex w-full gap-x-6 px-2">
                {["about", "modules", "tests", "review", "assignments"].map(
                  (tab, index) => (
                    <button
                      key={index}
                      className={`relative py-2 ${
                        activeTab === tab ? "border-b-4 border-amber-500" : ""
                      }`}
                      onClick={() => handleTabClick(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="relative mt-4 overflow-hidden h-max">
              {activeTab === "about" && (
                <AboutContent about={course?.description} />
              )}
              {activeTab === "modules" && (
                <ModuleContent modules={course?.modules} />
              )}
              {activeTab === "tests" && <TestsContent tests={course?.tests} />}
              {activeTab === "review" && (
                <ReviewContent review={course?.review} />
              )}
              {activeTab === "assignments" && (
                <Assignments courseId={courseId} review={course?.review} />
              )}
            </div>
          </div>

          <AsideBar
            className="hidden lg:block"
            courseId={courseId}
            course={course?.modules}
          />
        </>
      )}
    </div>
  );
};

export default Coursedetails;
