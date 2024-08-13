//

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Assignment.css";
import { axiosInstanceStudent } from "../../routes/UserRoutes";
import Modal from "./Modal";
import Loader from "../../components/reusable/Loader";
import { useQuery } from "@tanstack/react-query";
import { PiNotepadBold } from "react-icons/pi";

const Assignments = () => {
  const dateformat = (value) => {
    const date = new Date(value);
    const formattedDate = date.toISOString().split("T")[0];
    console.log(formattedDate); // Output: "2024-08-22"
    return formattedDate;
  };
  const baseURL = process.env.REACT_APP_API_URL;
  const [assignments, setAssignments] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const assignmentsPerPage = 6;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [calendarAssignments, setCalendarAssignments] = useState([]);
  const [gradings, setGradings] = useState([]);
  const [visibleTooltipIndex, setVisibleTooltipIndex] = useState(null);

  const handleFeedbackClick = (index) => {
    setVisibleTooltipIndex(index === visibleTooltipIndex ? null : index);
  };

  useEffect(() => {
    // Fetch the assignment gradings
    axiosInstanceStudent
      .get("api/assignments/assignment-gradings")
      .then((response) => {
        if (response.data.success) {
          setGradings(response.data.data.gradings);
        }
      })
      .catch((error) => {
        console.error("Error fetching assignment gradings:", error);
      });
  }, []);

  const fetchAssignments = async (type) => {
    setLoading(true);
    try {
      const { data } = await axiosInstanceStudent.get(
        `api/assignments/student-all-assignments`,
        {}
      );

      let filteredAssignments = data?.data?.assignments;

      if (type === "pending") {
        filteredAssignments = filteredAssignments.filter(
          (assignment) => assignment.studentSubmissionStatus === "pending"
        );
      } else if (type === "completed") {
        filteredAssignments = filteredAssignments.filter(
          (assignment) => assignment.studentSubmissionStatus === "submitted"
        );
      }

      setAssignments(filteredAssignments);

      // Fetch assignments by date for calendar
      const assignmentsForCalendar = filteredAssignments.map((assignment) => ({
        assignmentName: assignment.assignmentName,
        dueDate: assignment.dueDate,
      }));
      setCalendarAssignments(assignmentsForCalendar);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  const { data, isPending, refetch } = useQuery({
    queryKey: ["fetchAssignment", activeTab],
    queryFn: () => fetchAssignments(activeTab),
    staleTime: 120000,
    refetchInterval: 60000,
  });

  const handleTabChange = (type) => {
    setActiveTab(type);
    setCurrentPage(1);
    refetch();
  };

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

  const handleDayMouseEnter = (date) => {
    setHoveredDate(date);
  };

  const handleDayMouseLeave = () => {
    setHoveredDate(null);
  };

  const getAssignmentName = (date) => {
    const assignmentsOnDate = calendarAssignments.filter(
      (assignment) =>
        new Date(assignment.dueDate).toDateString() === date.toDateString()
    );
  
    return assignmentsOnDate.length
      ? assignmentsOnDate.map((assignment) => assignment.assignmentName).join(", ")
      : null;
  };
  

  const openModal = (assignment) => {
    setSelectedAssignment(assignment._id); // Ensure only the ID is being passed
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
  };

  const handleSubmit = () => {
    // Refresh the assignments list
    fetchAssignments(activeTab);
    closeModal();
  };

  return (
    <>
      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-100 z-50">
          <Loader />
        </div>
      )}
      <div className="assignment-main-container px-1 py-1 rounded-lg flex md:flex-row relative">
        <div className="w-full lg:w-[70%] md:p-4">
          <h1 className="text-2xl font-bold mb-4">Assignments</h1>
          <div className="w-full flex md:flex-row flex-col gap-x-4 items-center gap-y-4 mb-4">
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

          <div className="w-full rounded-2xl md:px-4 pb-4 bg-[#F5F1F1]">
            <h2 className="text-xl p-2 font-semibold py-2">Assignments</h2>
            <div className="overflow-x-auto">
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
                    <th className="text-xs md:text-base border-none md:px-4 text-left pb-5">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentAssignments.map((assignment) => (
                    <tr
                      key={assignment?._id}
                      className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text:xs md:text-base rounded-xl cursor-pointer"
                    >
                      <td className="border-none text-left md:px-4 py-4 text:xs md:text-base font-semibold capitalize text-black">
                        {assignment?.assignmentName}
                      </td>
                      <td className="border-none text-left md:px-4 py-4 line-clamp-1 text:xs md:text-base font-semibold text-black">
                        {assignment?.courseId?.courseName}
                      </td>
                      <td className="border-none text-left md:px-4 py-4 text:xs md:text-base font-semibold text-black">
                        {dateformat(assignment?.dueDate)}
                      </td>
                      <td
                        className={`border-none text-left md:px-4 py-4 text:xs md:text-base font-semibold ${
                          assignment?.studentSubmissionStatus === "pending"
                            ? "text-[#FE9519]"
                            : "text-green-600"
                        } `}
                      >
                        {assignment?.studentSubmissionStatus || "pending"}
                      </td>
                      <td className="border-none text-left md:px-4 py-4 text:xs md:text-base font-semibold text-black">
                        <button
                          onClick={() => openModal(assignment)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
              <span className="px-3 py-1">{currentPage}</span>
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

        <div className="assignment-main-calender md:w-[30%] flex flex-col w-full">
          <h1 className="text-2xl font-bold mb-4">Calendar</h1>
          <div className="assignment-calender">
            <Calendar
              className="assignment-main-calender"
              tileContent={({ date }) => {
                const assignmentName = getAssignmentName(date);
                return assignmentName ? (
                  <div className="assignment-name-tooltip">
                    {assignmentName}
                  </div>
                ) : null;
              }}
              tileClassName={({ date }) => {
                return calendarAssignments.some(
                  (assignment) =>
                    new Date(assignment.dueDate).toDateString() ===
                    date.toDateString()
                )
                  ? "highlight"
                  : null;
              }}
            />
          </div>

          <div className="assignment-right-section2">
            <h1 className="font-poppins font-semibold text-xl px-2 py-2">
              Assignment Grading
            </h1>
            <div className="no-scrollbar flex flex-col gap-4 px-4 pb-2 overflow-y-auto max-h-[400px]">
              {gradings.map((grading, index) => (
                <div
                  key={index}
                  className="bg-white justify-between h-max shadow-md rounded-lg p-2 flex flex-col"
                >
                  <div className="flex justify-between">
                    <div className="flex">
                      <PiNotepadBold className="w-8 h-10" />
                      <div className="p-1 flex flex-col">
                        <h2 className="text-blue-gray-600 text-xs font-bold">
                          {grading.assignmentName}
                        </h2>
                      </div>
                    </div>
                    {grading.allotedMarks !== undefined && (
                      <button className="ml-5 bg-[#6C51D9] text-white p-1 rounded-lg text-xs">
                        {grading.allotedMarks}/100
                      </button>
                    )}
                  </div>
                  {grading.remarks && (
                    <div className="relative mt-2 text-gray-600 text-xs">
                      <button
                        onClick={() => handleFeedbackClick(index)}
                        className="underline text-blue-500 hover:text-blue-700"
                      >
                        View Feedback
                      </button>
                      {visibleTooltipIndex === index && (
                        <div className="absolute left-0 mt-1 bg-gray-800 text-white text-xs p-2 rounded-lg shadow-lg z-10">
                          {grading.remarks}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          assignmentId={selectedAssignment}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Assignments;
