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
    <div className="w-full  flex">
      <div className="w-full ">
        <div className="p-4">
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Loading ? (
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
              courses &&
              courses.map((val, index) => {
                return (
                  <Link key={index} to={`/tutor/home/courses/${val._id}`}>
                    <CourseCard course={val} index={index} />
                  </Link>
                );
              })
            )}

            
          </div>

          {/* <div className="flex justify-left py-4">
            <Link
              replace
              to={/tutor/home/content/newassignment}
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

          <table class="bg-blue-400 w-full overflow-x-auto no-scrollbar border border-gray-200 mt-10">
  <thead>
    <tr>
      <th class="px-4 py-2 border-b text-left">SL No</th>
      <th class="px-4 py-2 border-b text-left">Assignment Name</th>
      <th class="px-4 py-2 border-b text-left">Status</th>
      <th class="px-4 py-2 border-b text-left">Course</th>
      <th class="px-4 py-2 border-b hidden lg:table-cell text-left">Students</th>  <th class="px-4 py-2 border-b hidden lg:table-cell text-left">Submission</th>  <th class="px-4 py-2 border-b text-left">Reports</th>
      <th class="px-4 py-2 border-b text-left">Action</th>
    </tr>
  </thead>
  <tbody>
    {assignments.map((assignment, index) => (
      <tr key={assignment.id}>
        <td class="px-4 py-2 border-b">{index + 1}</td>
        <td class="px-4 py-2 border-b">{assignment.name}</td>
        <td class="px-4 py-2 border-b">{assignment.status}</td>
        <td class="px-4 py-2 border-b">{assignment.course}</td>
        <td class="px-4 py-2 border-b hidden lg:table-cell">{assignment.students}</td>  <td class="px-4 py-2 border-b hidden lg:table-cell">{assignment.submission}</td>  <td class="px-4 py-2 border-b">{assignment.reports}</td>
        <td class="px-4 py-2 border-b">{assignment.action}</td>
      </tr>
    ))}
  </tbody>
</table>
        </div>
      </div>


        {/* <div className="flex justify-left py-4">
          <Link
            replace
            to={/tutor/home/content/material}
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
   
    </div>
  );
};

export default Content;

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