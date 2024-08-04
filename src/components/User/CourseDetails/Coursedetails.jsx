import React, { useEffect, useState } from "react";
import { BiSpreadsheet } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import { useParams, useNavigate } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { axiosInstanceStudent } from "../../../routes/UserRoutes";
import "./Coursedetails.css";
import TestsContent from "./TestsContent";

const Coursedetails = ({ role }) => {
  const [activeTab, setActiveTab] = useState("about");
  const [slideDirection, setSlideDirection] = useState("left");
  const [Course, setCourse] = useState(null);

  const navigate = useNavigate();
  const { courseId, courseType, enrolled } = useParams();

  const getCourseDetails = async () => {
    if (courseType === "individual") {
      const response = await axiosInstanceStudent.get(
        `api/structure/get/${courseId}`
      );
      setCourse(response.data);
      return response.data;
    } else {
      const response = await axiosInstanceStudent.get(
        `api/course/get-course/${courseId}`
      );
      setCourse(response.data);
      return response.data;
    }
  };
  // useQuery function to get the course details
  // const { data, isLoading, isError, refetch } = useQuery({
  //     queryKey: ['CourseDetails'],
  //     queryFn: getCourseDetails,
  //     staleTime: 8000,
  //     refreshInterval: 60000,
  // });

  useEffect(() => {
    // refetch()
    console.log("coursedetails");
    console.log(courseId);

    const fetchCourseDetails = async () => {
      try {
        if (courseType === "individual") {
          let response = await axiosInstanceStudent.get(
            `api/structure/get/${courseId}`
          );
          setCourse(response.data);
        } else {
          let response = await axiosInstanceStudent.get(
            `api/course/get-course/${courseId}`
          );
          setCourse(response.data);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, []);

  const handleTabClick = (tab) => {
    setSlideDirection(
      activeTab === "about" && tab === "module" ? "left" : "right"
    );
    setActiveTab(tab);
  };

  return (
    <div className="w-full flex flex-wrap ">
      <div className="w-full md:w-[70%] lg:w-[70%] no-scrollbar overflow-y-scroll p-4 flex flex-col">
        <div className="w-full h-[300px] bg-gray-800 flex items-center justify-center text-white font-semibold font-poppins text-3xl">
          Introduction to SAT & DSAT
        </div>
        <div className="w-full">
          <div className="mt-4">
            <h1 className="font-bold text-xl font-poppins">
              Introduction to Basic SAT & DSAT
            </h1>
            <div className="flex items-center gap-x-6 mt-2">
              <span className="flex items-center gap-x-1 text-sm font-poppins">
                <BiSpreadsheet className="text-gray-400" /> 5 Modules
              </span>
              <span className="flex items-center gap-x-1 text-sm font-poppins">
                <LuTimer className="text-gray-400" /> 60Hrs
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
              {activeTab === "about" && <AboutContent />}
              {activeTab === "module" && <ModuleContent />}
              {activeTab === "tests" && <TestsContent enrolled={enrolled} />}
              {activeTab === "review" && <ReviewContent />}
            </div>
          </div>
        </div>
      </div>
      <AsideBAr
        data={Course}
        courseType={courseType}
        navigate={navigate}
        enrolled={enrolled}
      />
    </div>
  );
};

export default Coursedetails;

const AboutContent = () => (
  <div className="w-full h-full border-t-2 p-4 overflow-y-auto">
    <h2 className="text-lg font-bold mb-2">About the Course</h2>
    <p>
      This course offers a comprehensive introduction to the basics of SAT &
      DSAT. The curriculum is designed to help students grasp fundamental
      concepts and build a strong foundation in the subject. Key topics covered
      include:
    </p>
    <ul className="list-disc ml-5">
      <li>Overview of SAT & DSAT</li>
      <li>Core principles and methodologies</li>
      <li>Application of theories in real-world scenarios</li>
    </ul>
  </div>
);

const ModuleContent = () => (
  <div className="w-full h-full border-t-2 p-4 overflow-y-auto">
    <h2 className="text-lg font-bold mb-2">Course Modules</h2>
    <ol className="list-decimal ml-5">
      <li>Introduction to SAT & DSAT</li>
      <li>Key Concepts and Techniques</li>
      <li>Advanced Topics and Applications</li>
      <li>Case Studies and Practical Examples</li>
      <li>Final Review and Assessment</li>
    </ol>
  </div>
);

const ReviewContent = () => (
  <div className="w-full h-full px-4 overflow-y-auto">
    <h2 className="text-lg font-bold mb-2">Student Reviews</h2>
    <div className="space-y-4">
      <div className="p-3 bg-orange-200 rounded-md shadow-md">
        <h3 className="font-bold">John Doe</h3>
        <p className="text-sm">
          This course was extremely helpful. The content was well-structured and
          easy to follow. Highly recommend it!
        </p>
      </div>
      <div className="p-3 bg-orange-200 rounded-md shadow-md">
        <h3 className="font-bold">Jane Smith</h3>
        <p className="text-sm">
          I learned a lot from this course. The practical examples and case
          studies were particularly useful.
        </p>
      </div>
      <div className="p-3 bg-orange-200 rounded-md shadow-md">
        <h3 className="font-bold">Sam Wilson</h3>
        <p className="text-sm">
          A great introduction to SAT & DSAT. The assessments helped me to
          understand my progress throughout the course.
        </p>
      </div>
    </div>
  </div>
);

const AsideBAr = ({ data, courseType, navigate, enrolled }) => {
  console.log(enrolled);
  const modules = [
    "Introduction",
    "What is UX Design",
    "Usability testing",
    "Create Usability Test",
    "How to implement",
  ];

  const handleEnrollCourse = (event) => {
    event.preventDefault();
    navigate(`/student/courses/checkout/${courseType}/${data?._id}`, {
      // state: {
      //   courseId: data?._id,
      //   courseType: courseType,
      // },
    });
  };

  return (
    <div className="bg-slate-200 pb-5 w-full md:w-[30%] h-[1005] flex flex-col">
      <div className="p-6">
        <h1 className="font-poppins font-bold">Modules List</h1>
        <div className="bg-white rounded-lg flex flex-col mt-5 p-5 items-center">
          <h1 className="font-poppins font-bold line-clamp-2">
            Introduction Basic SAT & DSAT
          </h1>

          {modules.map((value, index) => (
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
                <h1 className="text-orange-600 text-[12px] line-clamp-1 ">
                  {value}
                </h1>
              </div>
              <h1 className="w-[35%] text-right text-xs text-gray-400 ">
                2 Sessions
              </h1>
            </div>
          ))}

          {enrolled === "true" ? null : (
            <div className="w-[90%] flex justify-center items-center bg-[#FFBB54] text-black rounded-md py-2">
              <button type="button" onClick={handleEnrollCourse}>
                Enroll Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
