import React, { useState, useEffect } from "react";
import coursephoto from "../../assets/Tutor/coursephoto.jpeg";
import { BiSpreadsheet } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import { Link } from "react-router-dom";
import axios from "axios";
import { TutorAxiosInstance } from "../../routes/TutorRoutes";
import { FaCirclePlus } from "react-icons/fa6";
import { RotatingLines } from "react-loader-spinner";

const Content = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const [courses, setCourses] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all the courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await TutorAxiosInstance.get(
          `api/course/get-all-course?page=1&pageSize=&search=`
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch courses");
        }
        setLoading(false);
        setCourses(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCourses();
  }, []);

  const assignments = [
    {
      id: 1,
      name: "Eng SAT",
      status: "Grading",
      course: "Math-SAT",
      students: 40,
      submission: 40,
      reports: "view",
      action: "Mark as completed",
    },
    {
      id: 2,
      name: "Eng DSAT",
      status: "Completed",
      course: "Math-DSAT",
      students: 35,
      submission: 35,
      reports: "view",
      action: "View details",
    },
    {
      id: 3,
      name: "Eng PSAT",
      status: "Pending",
      course: "Math-PSAT",
      students: 30,
      submission: 30,
      reports: "view",
      action: "Start grading",
    },
    {
      id: 4,
      name: "Eng PSAT",
      status: "Pending",
      course: "Math-PSAT",
      students: 30,
      submission: 30,
      reports: "view",
      action: "Start grading",
    },
    {
      id: 5,
      name: "Eng PSAT",
      status: "Pending",
      course: "Math-PSAT",
      students: 30,
      submission: 30,
      reports: "view",
      action: "Start grading",
    },
  ];

  return (
    <div className="w-full flex flex-col">
      {Loading && <FullscreenLoader />}
      <div className="w-full overflow-x-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {courses &&
            courses.map((val, index) => (
              <Link
                key={index}
                to={`/tutor/home/courses/${val._id}/${val.courseType}/true/t`}
              >
                <CourseCard course={val} index={index} />
              </Link>
            ))}
        </div>
        <div className="mt-6 overflow-x-auto">
  <table className="min-w-full bg-white border border-gray-300">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-4 py-2 border-b text-left text-xs font-semibold text-gray-600">SL No</th>
        <th className="px-4 py-2 border-b text-left text-xs font-semibold text-gray-600">Assignment Name</th>
        <th className="px-4 py-2 border-b text-left text-xs font-semibold text-gray-600">Status</th>
        <th className="px-4 py-2 border-b text-left text-xs font-semibold text-gray-600">Course</th>
        <th className="px-4 py-2 border-b text-left text-xs font-semibold text-gray-600 hidden sm:table-cell">Students</th>
        <th className="px-4 py-2 border-b text-left text-xs font-semibold text-gray-600 hidden md:table-cell">Submission</th>
        <th className="px-4 py-2 border-b text-left text-xs font-semibold text-gray-600">Reports</th>
      </tr>
    </thead>
    <tbody className="text-sm font-medium text-gray-700">
      {assignments.map((assignment, index) => (
        <tr key={assignment.id} className="hover:bg-gray-100">
          <td className="px-4 py-2 border-b">{index + 1}</td>
          <td className="px-4 py-2 border-b">{assignment.name}</td>
          <td className="px-4 py-2 border-b">{assignment.status}</td>
          <td className="px-4 py-2 border-b">{assignment.course}</td>
          <td className="px-4 py-2 border-b hidden sm:table-cell">{assignment.students}</td>
          <td className="px-4 py-2 border-b hidden md:table-cell">{assignment.submission}</td>
          <td className="px-4 py-2 border-b">{assignment.reports}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      </div>
    </div>
  );
};

export default Content;

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

const CourseCard = ({ course, index }) => {
  return (
    <div className="bg-[#F4F5FB] p-4 rounded-2xl min-h-[16rem] h-auto">
      <div className="w-full rounded-lg">
        <img
          src={coursephoto}
          className="rounded-lg w-full object-contain"
          alt="Course"
        />
      </div>
      <div className="w-full mt-4">
        <div className="min-h-[3rem]">
          <h1 className="font-plusjakartasans font-semibold text-base line-clamp-2">
            {course.courseName}
          </h1>
        </div>
        <div className="flex items-center gap-x-6 mt-2">
          <span className="flex items-center gap-x-1 text-sm font-plusjakartasans">
            <BiSpreadsheet className="text-gray-400" /> {course.modules.length}{" "}
            Modules
          </span>
          <span className="flex items-center gap-x-1 text-sm font-plusjakartasans">
            <LuTimer className="text-gray-400" />
            {course.trainingDuration}
          </span>
        </div>
      </div>
    </div>
  );
};
