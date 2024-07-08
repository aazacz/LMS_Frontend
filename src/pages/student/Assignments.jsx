import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { PiNotepadBold } from "react-icons/pi";
import "./Assignment.css";

const Assignments = () => {
  const assignments1 = [
    { id: 1, name: "SAT Assignment 1", feedbackLink: "#", score: "25/35" },
    { id: 2, name: "SAT Assignment 2", feedbackLink: "#", score: "30/35" },
    { id: 3, name: "SAT Assignment 3", feedbackLink: "#", score: "28/35" },
    { id: 4, name: "SAT Assignment 4", feedbackLink: "#", score: "27/35" },
    { id: 5, name: "SAT Assignment 5", feedbackLink: "#", score: "26/35" },
  ];

  const baseURL = process.env.REACT_APP_API_URL;
  const [assignments, setAssignments] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const assignmentsPerPage = 6;

  const fetchAssignments = async (type) => {
    try {
      let url = `${baseURL}api/studentAssignments/all-assignments`;
      if (type === "pending") {
        url = `${baseURL}api/studentAssignments/pendingAssignments`;
      } else if (type === "completed") {
        url = `${baseURL}api/studentAssignments/submitted-Assignments`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTE2OTE3N2I3MDRiMDQ0NTJlMWYxYSIsImlhdCI6MTcyMDA3NDc3MH0.5KwVd66W33pnPy9G78baYo5LHaXdTvrmxfH2wVkAllw`,
        },
      });

      // Extract assignments from nested courses
      const courses = response.data;
      let allAssignments = [];
      courses.forEach((course) => {
        course.assignments.forEach((assignment) => {
          allAssignments.push({
            ...assignment,
            courseName: course.courseName, // Add course name to each assignment
          });
        });
      });

      setAssignments(allAssignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments("all");
  }, []);

  const handleTabChange = (type) => {
    setActiveTab(type);
    setCurrentPage(1); // Reset to first page when changing tabs
    fetchAssignments(type);
  };

  // Get current assignments based on pagination
  const indexOfLastAssignment = currentPage * assignmentsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
  const currentAssignments = assignments.slice(
    indexOfFirstAssignment,
    indexOfLastAssignment
  );

  const totalPages = Math.ceil(assignments.length / assignmentsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="w-full px-1 py-1 rounded-lg flex flex-col md:flex-row ">
        <div className="w-full lg:w-[70%]  md:p-4">
          <h1 className="text-2xl font-bold mb-4">Assignments</h1>
          <div className=" w-full  flex md:flex-row flex-col gap-x-4 items-center  gap-y-4 mb-4">
            <button
              className={`px-4 w-full h-10 py-2 rounded ${
                activeTab === "all"
                  ? "bg-[#FF9898] text-black font-semibold border-2 border-[#0057FF]"
                  : "bg-[#FF9898] text-black"
              }`}
              onClick={() => handleTabChange("all")}
            >
              All
            </button>

            <button
              className={`px-4 w-full py-2 h-10 rounded ${
                activeTab === "pending"
                  ? "bg-[#7986FC] text-black font-semibold border-2 border-[#0057FF]"
                  : "bg-[#7986FC] text-black"
              }`}
              onClick={() => handleTabChange("pending")}
            >
              Pending
            </button>

            <button
              className={`px-4 w-full py-2 h-10 rounded ${
                activeTab === "completed"
                  ? "bg-[#C8FFB5] text-black font-semibold border-2 border-[#0057FF]"
                  : "bg-[#C8FFB5] text-black"
              }`}
              onClick={() => handleTabChange("completed")}
            >
              Completed
            </button>
          </div>

          <div className=" w-[100%]  rounded-2xl md:px-4 pb-4 bg-[#F5F1F1]">
            <h2 className="text-xl p-2 font-semibold py-2">Assignments</h2>

            <table className="w-full p-3 border-spacing-y-5 border-separate">
              <thead>
                <tr>
                  <th className="text-xs md:text-base border-none md:px-4 text-left pb-5">
                    Assignment
                  </th>
                  <th className="text-xs md:text-base border-none md:px-4 text-left pb-5">
                    Course
                  </th>
                  <th className="text-xs md:text-base border-none md:px-4 text-left pb-5">
                    Due date
                  </th>
                  <th className="text-xs md:text-base border-none md:px-4 text-left pb-5">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentAssignments.map((assignment) => (
                  <tr
                    key={assignment._id}
                    className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  text:xs md:text-base rounded-xl cursor-pointer"
                  >
                    <td className="border-none  text-left md:px-4 py-4  text:xs md:text-base font-semibold text-black">
                      {assignment.assignmentName}
                    </td>
                    <td className="border-none text-left md:px-4 py-4  text:xs md:text-base font-semibold text-black">
                      {assignment.courseName}
                    </td>
                    <td className="border-none text-left md:px-4 py-4  text:xs md:text-base font-semibold text-black">
                      {assignment.dueDate}
                    </td>
                    <td className="border-none text-left md:px-4 py-4  text:xs md:text-base font-semibold text-[#FE9519]">
                      {assignment.student.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end items-center mt-4 pr-3">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500"
                    : "bg-blue-500 text-white"
                }`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="px-3  py-1">{currentPage}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500"
                    : "bg-blue-500 text-white"
                }`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="assignment-right-section bg-[#F3F3F3] mt-8 lg:mt-0">
          <div className="assignment-main-class w-full">
            <h1 className="font-poppins font-semibold text-xl px-2 py-2">
              Assignment Calendar
            </h1>

            <div className="w-full ">
              <div className="assignment-calender">
                <Calendar className="assignment-main-calender text-xs" />
              </div>
            </div>
          </div>

          <div className="assignment-right-section2 ">
            <h1 className="font-poppins font-semibold text-xl  px-2 py-2">
              Assignment Grading
            </h1>
            <div className=" no-scrollbar flex flex-col gap-4 px-4">
              {assignments1.map((assignment1) => (
                <div
                  key={assignment1.id}
                  className="bg-white justify-between h-max shadow-md rounded-lg p-2 flex"
                >
                  <div className="flex">
                    <PiNotepadBold className="w-8 h-10" />
                    <div className="p-1 flex flex-col">
                      <h2 className="text-blue-gray-600 text-xs font-bold">
                        {assignment1.name}
                      </h2>
                      <p className="text-gray-700 text-xs underline">
                        <a href={assignment1.feedbackLink}>View Feedback</a>
                      </p>
                    </div>
                  </div>
                  <button className="ml-5 bg-[#6C51D9] text-white p-1 rounded-lg text-xs">
                    {assignment1.score}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Assignments;
