import React from "react";
import coursephoto from "/coursephoto.jpeg";
import { BiSpreadsheet } from "react-icons/bi";
import { LuTimer } from "react-icons/lu";
import { Link } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";

const Content = () => {

  const courses = [
    { title: "Introduction Basic SAT & DSAT" },
    { title: "Introduction Basic SAT & DSAT" },
  ];

  const data = [
    { name: "John Doe", email: "john.doe@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    // ... more items
  ];

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
      <div className="w-[750px] ">
        <div className="p-4">
          {/* Add Button */}

          {/* <div className="flex justify-left py-4">
            <Link
              replace
              to={`/tutor/home/content/newcourse`}
              className="bg-[#F5F1F1]"
            >
              <button
                className="flex items-center gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
                                    p-1 rounded-lg border-slate-600 px-2 font-plusjakartasans text-sm sm:font-semibold"
              >
                <FaCirclePlus className="text-slate-600 " />
                My Courses
              </button>
            </Link>
          </div> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {courses.map((course, index) => (
              <Link key={index} to={`/tutor/home/courses/1`}>
                
                <CourseCard title={course.title} />
              </Link>
            ))}
          </div>

          {/* <div className="flex justify-left py-4">
            <Link
              replace
              to={`/tutor/home/content/newassignment`}
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
          </div> */}

          <table className=" bg-white border border-gray-200 mt-10">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">SL No</th>
                <th className="px-4 py-2 border-b">Assignment Name</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Course</th>
                <th className="px-4 py-2 border-b">Students</th>
                <th className="px-4 py-2 border-b">Submission</th>
                <th className="px-4 py-2 border-b">Reports</th>
                <th className="px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={assignment.id}>
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{assignment.name}</td>
                  <td className="px-4 py-2 border-b">{assignment.status}</td>
                  <td className="px-4 py-2 border-b">{assignment.course}</td>
                  <td className="px-4 py-2 border-b">{assignment.students}</td>
                  <td className="px-4 py-2 border-b">
                    {assignment.submission}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <Link
                      to={`/reports/${assignment.id}`}
                      className="text-blue-500"
                    >
                      {assignment.reports}
                    </Link>
                  </td>
                  <td className="px-4 py-2 border-b">{assignment.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-[350px]  border-l-2">
        {/* <div className="flex justify-left py-4">
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
              Assignment Materials
            </button>
          </Link>
        </div> */}

        <div className="pl-5">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-[90%] h-max flex justify-start items-start p-2"
            >
              <div className="w-80 flex flex-row items-center border-[1px] border-black p-2 rounded ">
                <div className="w-10 h-10 rounded-full border-[1px] border-black"></div>
                <div className="flex flex-col ml-2 justify-start items-start text-xs">
                  <p>{item.name}</p>
                  <p className="text-gray-500">{item.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;

const CourseCard = ({ title }) => {
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
            {title}
          </h1>
        </div>
        <div className="flex items-center gap-x-6 mt-2">
          <span className="flex items-center gap-x-1 text-sm font-plusjakartasans">
            <BiSpreadsheet className="text-gray-400" /> 5 Modules
          </span>
          <span className="flex items-center gap-x-1 text-sm font-plusjakartasans">
            <LuTimer className="text-gray-400" /> 60Hrs
          </span>
        </div>
      </div>
    </div>
  );
};
