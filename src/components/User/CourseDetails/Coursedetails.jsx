import React, { useEffect, useState } from "react";
import { BiSpreadsheet } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import { useParams, useNavigate } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { axiosInstanceStudent } from "../../../routes/UserRoutes";
import "./Coursedetails.css";
import TestsContent from "./TestsContent";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Coursedetails = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [slideDirection, setSlideDirection] = useState("left");
  const [course, setCourse] = useState(null);

  const navigate = useNavigate();
  const { courseId, courseType, enrolled } = useParams();

  const getCourseDetails = async () => {
    try {
      const response =
        courseType === "individual"
          ? await axiosInstanceStudent.get(`api/structure/get/${courseId}`)
          : await axiosInstanceStudent.get(`api/course/get-course/${courseId}`);
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  useEffect(() => {
    getCourseDetails();
  }, [courseId, courseType]);

  const handleTabClick = (tab) => {
    setSlideDirection(
      activeTab === "about" && tab === "module" ? "left" : "right"
    );
    setActiveTab(tab);
  };

  return (
    <div className="w-full flex flex-wrap">
      <div className="w-full md:w-[70%] lg:w-[70%] no-scrollbar overflow-y-scroll p-4 flex flex-col">
        <div className="w-full h-[300px] bg-gray-800 flex items-center justify-center text-white font-semibold font-poppins text-3xl">
          {course?.courseName || "Course Title"}
        </div>
        <div className="w-full">
          <div className="mt-4">
            <h1 className="font-bold text-xl font-poppins">
              {course?.courseName || "Course Name"}
            </h1>
            <div className="flex items-center gap-x-6 mt-2">
              <span className="flex items-center gap-x-1 text-sm font-poppins">
                <BiSpreadsheet className="text-gray-400" />{" "}
                {course?.modules?.length || 0} Modules
              </span>
              <span className="flex items-center gap-x-1 text-sm font-poppins">
                <LuTimer className="text-gray-400" />{" "}
                {course?.trainingDuration || "N/A"} Hrs
              </span>
              <span className="flex items-center gap-x-1 text-sm font-poppins">
                <PiChalkboardTeacherBold className="text-gray-400" /> Tutors:{" "}
                {course?.tutors?.length > 0
                  ? course.tutors.map((tutor, index) => (
                      <span key={index} className="text-sm font-poppins">
                        {tutor.id.name}
                        {index < course.tutors.length - 1 && ", "}{" "}
                        {/* Add a comma between names except after the last one */}
                      </span>
                    ))
                  : "Not Assigned"}
              </span>
            </div>
          </div>
          <div className="w-full mt-4 relative">
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
          </div>
          <div className="relative mt-4 overflow-hidden h-64">
            <div
              className={`slide-content ${
                slideDirection === "left"
                  ? "slide-left-enter"
                  : "slide-right-enter"
              }`}
            >
              {activeTab === "about" && (
                <AboutContent description={course?.description} />
              )}
              {activeTab === "module" && (
                <ModuleContent modules={course?.modules} />
              )}
              {activeTab === "tests" && <TestsContent enrolled={enrolled} />}
              {activeTab === "review" && (
                <ReviewContent reviews={course?.reviews} />
              )}
            </div>
          </div>
        </div>
      </div>
      <AsideBAr
        data={course}
        courseType={courseType}
        navigate={navigate}
        enrolled={enrolled}
      />
    </div>
  );
};

export default Coursedetails;

const AboutContent = ({ description }) => (
  <div className="w-full h-full border-t-2 p-4 overflow-y-auto">
    <h2 className="text-lg font-bold mb-2">About the Course</h2>
    <p>{description || "No description available"}</p>
  </div>
);

const ModuleContent = ({ modules }) => (
  <div className="w-full h-full border-t-2 p-4 overflow-y-auto">
    <h2 className="text-lg font-bold mb-2">Course Modules</h2>
    <ol className="list-decimal ml-5">
      {modules && modules.length > 0 ? (
        modules.map((module, index) => <li key={index}>{module.moduleName}</li>)
      ) : (
        <li>No modules available</li>
      )}
    </ol>
  </div>
);

const ReviewContent = ({ reviews }) => (
  <div className="w-full h-full px-4 overflow-y-auto">
    <h2 className="text-lg font-bold mb-2">Student Reviews</h2>
    <div className="space-y-4">
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="p-3 bg-orange-200 rounded-md shadow-md">
            <h3 className="font-bold">{review.studentName}</h3>
            <p className="text-sm">{review.feedback}</p>
          </div>
        ))
      ) : (
        <div className="p-3 bg-orange-200 rounded-md shadow-md">
          <p className="text-sm">No reviews available</p>
        </div>
      )}
    </div>
  </div>
);

const AsideBAr = ({ data, courseType, navigate, enrolled }) => {
  const modules = data?.modules?.map((module) => module.moduleName) || [];
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [totalTutors, setTotalTutors] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const handleEnrollCourse = (event) => {
    event.preventDefault();
    navigate(
      `/student/courses/checkout/${courseType}/${data?._id}/${selectedTutor}`
    );
  };
  console.log({ tutors });
  const fetchTutors = async () => {
    try {
      const response = await axiosInstanceStudent.get(
        `api/tutor/tutors?pageSize=7&page=${currentPage}`
      );
      const shuffledTutors = response.data?.data.sort(
        () => Math.random() - 0.5
      );
      setTotalTutors(Number(response.data?.totalRows));
      setTutors(shuffledTutors);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };
  useEffect(() => {
    fetchTutors();
  }, [currentPage]);

  return (
    <div className="bg-slate-200 pb-5 w-full md:w-[30%] h-[1005] flex flex-col">
      <div className="p-6">
        <h1 className="font-poppins font-bold">Modules List</h1>
        <div className="bg-white rounded-lg flex flex-col mt-5 p-5 items-center">
          <h1 className="font-poppins font-bold line-clamp-2">
            {data?.courseName || "Course Name"}
          </h1>

          {modules.length > 0 ? (
            modules.map((value, index) => (
              <div
                key={index}
                className="flex w-full justify-between items-center py-5"
              >
                <div className="flex gap-x-3 items-center w-[65%]">
                  <div>
                    <div className="w-6 h-6 bg-[#C75625] text-white rounded-[5px] text-sm flex justify-center items-center">
                      {index + 1}
                    </div>
                  </div>
                  <h1 className="text-orange-600 text-[12px] line-clamp-1">
                    {value}
                  </h1>
                </div>
                <h1 className="w-[35%] text-right text-xs text-gray-400">
                  {data?.modules[index]?.sessions?.length || 0} Sessions
                </h1>
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-600">No modules available</div>
          )}

          {enrolled === "true" ? null : (
            <div className="flex flex-col gap-2">
              <button
                disabled={!selectedTutor}
                className="disabled:bg-slate-400 disabled:cursor-not-allowed bg-[#FFBB54] py-2 px-4 disabled:text-white rounded-md w-full"
                type="button"
                onClick={handleEnrollCourse}
              >
                Enroll Now
              </button>
              {!selectedTutor && (
                <p className="text-red-600">Select a tutor!</p>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-poppins font-bold mt-5">Select a tutor</h1>
          {tutors.length > 0 ? (
            tutors.map((tutor, i) => (
              <div
                onClick={() => setSelectedTutor(tutor._id)}
                key={tutor._id}
                className={`p-4 flex items-center gap-4 rounded-md bg-white w-full ${selectedTutor === tutor._id ? "bg-sky-100 border-sky-500 border-2" : ""}`}
              >
                <img
                  src={tutor.tutorImg}
                  className="w-10 h-10 rounded-full object-cover"
                  alt=""
                />
                <h1 className="w-full text-wrap">{tutor.name}</h1>
              </div>
            ))
          ) : (
            <div className="p-3 mt-16 text-gray-600">No tutors available</div>
          )}
          <div className="flex gap-8 items-center">
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="bg-slate-400 rounded-full px-2 py-1 text-white"
              >
                <ChevronLeft />
              </button>
            )}
            {totalTutors > currentPage * 7 && (
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="bg-slate-400 rounded-full px-2 py-1 text-white"
              >
                <ChevronRight />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
