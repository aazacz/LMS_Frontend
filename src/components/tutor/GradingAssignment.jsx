import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { FaBookOpen } from "react-icons/fa";

const GradingAssignment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page"), 10) || 1;
    const size = parseInt(params.get("pageSize"), 10) || 10;

    setCurrentPage(page);
    setPageSize(size);
  }, []);

  useEffect(() => {
    getCategoryData();
  }, [currentPage, pageSize, searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getCategoryData = () => {
    console.log("Fetching data with:", { currentPage, pageSize, searchQuery });
  };

  const assignments = [
    {
      id: 1,
      name: "Eng SAT",
      course: "Math-SAT",
      duedate: 40,
      submission: 40,
      status: "Mark as completed",
      action: "View",
    },
    {
      id: 2,
      name: "Eng SAT",
      course: "Math-SAT",
      duedate: 40,
      submission: 40,
      status: "Mark as completed",
      action: "View",
    },
    {
      id: 3,
      name: "Eng SAT",
      course: "Math-SAT",
      duedate: 40,
      submission: 40,
      status: "Mark as completed",
      action: "View",
    },
  ];

  return (
    <div className="px-9">
      <div className="main-container">
        <div>
          <div className="heading-column-toggle-container py-2">
            <h1 className="font-plusjakartasans text-xl font-semibold">
              Grading
            </h1>
          </div>
          <div className="header-container">
            <div className="search-container border-2 border-[#03729b] p-1 flex rounded-md">
              <SearchIcon className="text-[#03729b]" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full outline-none px-2"
              />
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="assignment-detail-courses ">
        <p className="flex">
          <FaBookOpen className="text-2xl pr-2" />
          Assignments
        </p>
      </div>
      <div className="assignment-detail-line"></div>
      <table className=" bg-white border border-gray-200 mt-10">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Student</th>
            <th className="px-4 py-2 border-b">Course</th>
            <th className="px-4 py-2 border-b">Due Date</th>
            <th className="px-4 py-2 border-b">Submission Date</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={assignment.id}>
              <td className="px-4 py-2 border-b">{index + 1}</td>
              <td className="px-4 py-2 border-b">{assignment.course}</td>
              <td className="px-4 py-2 border-b">{assignment.duedate}</td>
              <td className="px-4 py-2 border-b">{assignment.submission}</td>
              <td className="px-4 py-2 border-b">{assignment.status}</td>
              <td className="px-4 py-2 border-b">
                <Link
                  to={`/grading/assignment/${assignment.id}/marks`}
                  className="text-blue-500"
                >
                  {assignment.action}
                  
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradingAssignment;
