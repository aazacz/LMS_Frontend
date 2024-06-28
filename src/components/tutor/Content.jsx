import React, { useState, useEffect } from "react";
import coursephoto from "/coursephoto.jpeg";
import { BiSpreadsheet } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaCirclePlus } from "react-icons/fa6";
import { RotatingLines } from "react-loader-spinner";

const Content = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const [courses, setCourses] = useState([]);
  const [Loading, setLoading] = useState(true);

  //fetch all the courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${baseURL}api/course/get-all-course?page=1&pageSize=&search=`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTAyYWE4YTE0ZTdiNTM1N2UwNjhlYyIsInJvbGUiOiJ0dXRvciIsImlhdCI6MTcxNzEzMDgxOH0.yQ2kisu7irJUvntqfjK-e95yys_VCbMzriFZEcv2Dks",
            },
          }
        );
        if (!response.status == 200) {
          throw new Error("Failed to fetch courses");
        }
        setLoading(false);
        const data = response.data;
        setCourses(data.data);
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
  ];

  return (
    <div className="w-full flex">
      {Loading && <FullscreenLoader />}
      <div className="w-[100%]">
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {courses &&
              courses.map((val, index) => (
                <Link key={index} to={`/tutor/home/courses/${val._id}`}>
                  <CourseCard course={val} index={index} />
                </Link>
              ))}
          </div>

          <table className=" w-full overflow-x-auto no-scrollbar border border-gray-200 mt-10">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">SL No</th>
                <th className="px-4 py-2 border-b text-left">Assignment Name</th>
                <th className="px-4 py-2 border-b text-left">Status</th>
                <th className="px-4 py-2 border-b text-left">Course</th>
                <th className="px-4 py-2 border-b hidden lg:table-cell text-left">Students</th>
                <th className="px-4 py-2 border-b hidden lg:table-cell text-left">Submission</th>
                <th className="px-4 py-2 border-b text-left">Reports</th>
                <th className="px-4 py-2 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={assignment.id}>
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{assignment.name}</td>
                  <td className="px-4 py-2 border-b">{assignment.status}</td>
                  <td className="px-4 py-2 border-b">{assignment.course}</td>
                  <td className="px-4 py-2 border-b hidden lg:table-cell">
                    {assignment.students}
                  </td>
                  <td className="px-4 py-2 border-b hidden lg:table-cell">
                    {assignment.submission}
                  </td>
                  <td className="px-4 py-2 border-b">{assignment.reports}</td>
                  <td className="px-4 py-2 border-b">{assignment.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="w-[30%] border-l-2">
        <div className="pl-5">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-[90%] h-max flex justify-start items-start p-2"
            >
              <div className="w-80 flex flex-row items-center border-[1px] border-black p-2 rounded">
                <div className="w-10 h-10 rounded-full border-[1px] border-black"></div>
                <div className="flex flex-col ml-2 justify-start items-start text-xs">
                  <p>{item.name}</p>
                  <p className="text-gray-500">{item.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
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
