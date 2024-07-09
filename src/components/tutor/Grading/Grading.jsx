import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { FaBookOpen } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import "./Grading.css";
import { Link } from "react-router-dom";

const Grading = () => {
  const [showAllAssignments, setShowAllAssignments] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    // Read pagination data from URL on component mount
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
    // Function to fetch category data based on current state
    // This should include API calls or data fetching logic
    console.log("Fetching data with:", { currentPage, pageSize, searchQuery });
  };

  const assignments = [
    {
      id: 1,
      title: "User Experience Research",
      assignment: "Usability Testing Report",
      dueDate: "April 15, 2024",
    },
    {
      id: 2,
      title: "User Experience Research",
      assignment: "Usability Testing Report",
      dueDate: "April 15, 2024",
    },
    {
      id: 3,
      title: "User Experience Research",
      assignment: "Usability Testing Report",
      dueDate: "April 15, 2024",
    },
    {
      id: 4,
      title: "User Experience Research",
      assignment: "Usability Testing Report",
      dueDate: "April 15, 2024",
    },
    {
      id: 5,
      title: "User Experience Research",
      assignment: "Usability Testing Report",
      dueDate: "April 15, 2024",
    },
    {
      id: 6,
      title: "User Experience Research",
      assignment: "Usability Testing Report",
      dueDate: "April 15, 2024",
    },
    {
      id: 7,
      title: "User Experience Research",
      assignment: "Usability Testing Report",
      dueDate: "April 15, 2024",
    },
    {
      id: 8,
      title: "User Experience Research",
      assignment: "Usability Testing Report",
      dueDate: "April 15, 2024",
    },
    {
      id: 9,
      title: "User Experience Research",
      assignment: "Usability Testing Report",
      dueDate: "April 15, 2024",
    },
    {
      id: 10,
      title: "User Experience Research",
      assignment: "Usability Testing Report",
      dueDate: "April 15, 2024",
    },
    // Add more assignments as needed
  ];

  const data = [
    { name: "John Doe", email: "john.doe@example.com", marks: "25/25" },
    { name: "Jane Smith", email: "jane.smith@example.com", marks: "25/25" },
    { name: "Jane Smith", email: "jane.smith@example.com", marks: "25/25" },
    { name: "Jane Smith", email: "jane.smith@example.com", marks: "25/25" },
    { name: "Jane Smith", email: "jane.smith@example.com", marks: "25/25" },
    { name: "Jane Smith", email: "jane.smith@example.com", marks: "25/25" },
    { name: "Jane Smith", email: "jane.smith@example.com", marks: "25/25" },
    { name: "Jane Smith", email: "jane.smith@example.com", marks: "25/25" },
    { name: "Jane Smith", email: "jane.smith@example.com", marks: "25/25" },
    { name: "Jane Smith", email: "jane.smith@example.com", marks: "25/25" },
    { name: "Jane Smith", email: "jane.smith@example.com", marks: "25/25" },
    { name: "Jane Smith", email: "jane.smith@example.com", marks: "25/25" },
    { name: "Jane Smith", email: "jane.smith@example.com", marks: "25/25" },
    // ... more items
  ];

  return (
    <div className="px-9 w-full">
      <div className="main-container">
        <div>
          <div className="heading-column-toggle-container py-2">
            <h1 className="font-poppins text-xl font-semibold">
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
        <p
          className="flex text-[#2F80ED]"
          onClick={() => setShowAllAssignments(!showAllAssignments)}
          style={{ cursor: "pointer" }}
        >
          View all
          <IoIosArrowForward className="text-2xl pr-2" />
        </p>
      </div>
      <div className="assignment-detail-line"></div>
      <div className="flex gap-16 ">
        <div className="assignment-detail-cards w-full lg:w-[60%] grid grid-flow-row grid-cols-1 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3">
          {assignments
            .slice(0, showAllAssignments ? assignments.length : 3)
            .map((assignment, index) => (
              <AssignmentCard
                key={index}
                id={assignment.id}
                title={assignment.title}
                assignment={assignment.assignment}
                dueDate={assignment.dueDate}
              />
            ))}
        </div>
        <div className=" hidden lg:block md:w-[45%] lg:w-[35%]  h-[450px] overflow-y-scroll">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-[100%] h-max flex justify-start items-start p-2"
            >
              <div className="w-80 flex flex-row items-center border-[1px] border-black p-2 rounded ">
                <div className="w-10 h-10 rounded-full border-[1px] border-black"></div>
                <div className="flex flex-col ml-2 justify-start items-start text-xs">
                  <p className="font-bold">{item.name}</p>
                  <p className="flex gap-16">
                    <p className="text-gray-500">{item.email}</p>
                    <p className="font-bold">{item.marks}</p>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
  
    </div>
  );
};

const AssignmentCard = ({ id, title, assignment, dueDate }) => {
  return (
    <Link to={`assignment/${id}`} className="">
      <div className="assignment-card-grading max-w-[full] md:max-w-[200px] ">
        <div className="assignment-title-grading">{title}</div>
        <hr className="assignment-divider-grading" />
        <div className="assignment-details-grading">
          <div className="detail-text-grading">Assignment: {assignment}</div>
        </div>
        <div className="assignment-details-grading">
          <div className="detail-text-grading">Due Date: {dueDate}</div>
        </div>
      </div>
    </Link>
  );
};

export default Grading;
