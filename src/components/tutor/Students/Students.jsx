import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import CloseIcon from "@mui/icons-material/Close";
import Check from "@mui/icons-material/Check";
import { Link } from "react-router-dom";
import { TutorAxiosInstance } from "../../../routes/TutorRoutes";

const Students = () => {
  const params = new URLSearchParams(window.location.search);
  const initialPage = parseInt(params.get("page"), 10) || 1;
  const initialSize = parseInt(params.get("pageSize"), 10) || 10;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialSize);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const updateUrl = ({ page, pageSize }) => {
    const newUrl = `?page=${page}&pageSize=${pageSize}`;
    window.history.pushState({}, "", newUrl);
  };

  const handleSortChange = (sort) => {
    setSortOrder(sort);
    updateUrl({ page: 1, pageSize, sort });
    setCurrentPage(1);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    updateUrl({ page: 1, pageSize }); // Update the URL with new search query
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    updateUrl({ page: newPage, pageSize });
  };

  const handlePageSizeSelectChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to page 1 when changing page size
    updateUrl({ page: 1, pageSize: newPageSize });
  };

  const formatDate = (date) => {
    const options = {
      // timeZone: "Asia/Kolkata",
      // hour12: true,
      // hour: "numeric",
      // minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
  };

  const [Active, SetActive] = useState(false);

  const columns = [
    { field: "serialNumber", headerName: "SL.No." },
    { field: "name", headerName: "Name" },
    { field: "grade", headerName: "Grade" },
    { field: "courseName", headerName: "Course" },
    { field: "number", headerName: "Phone" },
    { field: "parentNumber", headerName: "Parent Number" },
    { field: "classesAttended", headerName: "Classes Attended" },
    { field: "modulesCompleted", headerName: "Modules Completed" },
    { field: "assignmentsCompleted", headerName: "Assignments Completed" },
    { field: "recentTestResult", headerName: "Recent Test Result" },
    { field: "createdAt", headerName: "Joined Date" },
    { field: "comingSatExamDate", headerName: "Exam Date" },
    { field: "analysis", headerName: "Analysis" },
  ];
  const getCategoryData = async () => {
    try {
      const response = await TutorAxiosInstance.get(
        `api/courseTutor/all-enrolled-students`,
        {
          params: {
            page: currentPage,
            limit: pageSize,
            studentName: searchQuery, // pass search query to the backend
          },
        }
      );

      const students = response.data.data.flatMap((course) => course.students);
      setData(students);
      setTotalRows(response.data.totalRows);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

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

  return (
    <div className="px-9 ">
      <div className="main-container">
        <div className="w-full">
          <div className="py-2">
            <h1 className="font-poppins text-xl font-semibold ">
              Students List
            </h1>
          </div>
          <div className="w-full flex pr-3 flex-col h-fit gap-x-4 mg:flex-row">
            <div className="w-full md:w-[100%] h-fit border border-[#4348DB] rounded-md p-2">
              <div className="w-full flex items-center bg-gray-100 rounded-lg">
                <input
                  type="text"
                  placeholder="Search For Student"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="w-full outline-none px-2 h-12 bg-transparent placeholder:text-black text-sm font-normal"
                />
                <button className="text-sm w-[185px] p-2 h-10 bg-[#4348DB] flex items-center justify-center text-white rounded-lg mr-1">
                  {" "}
                  <SearchIcon className="text-white h-full" />
                  Show Results
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col gap-5 sm:flex-row ">
              <div className="mt-2 w-full mg:w-[150px] h-12 border-[1.5px] border-[#ECECEC] flex justify-center items-center rounded-lg relative">
                <select
                  name="selection"
                  className="w-full h-full px-3 appearance-none outline-none bg-transparent"
                >
                  <option value="individual">Individual</option>
                  <option value="group">Group</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center p-2 mt-[5px] h-8 mr-1 pointer-events-none rounded-lg text-gray-700 bg-[#ECECEC]">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="mt-2 w-full mg:w-[150px] h-12 border-[1.5px] border-[#ECECEC] flex justify-center items-center rounded-lg relative">
                <select
                  name="sorting"
                  className="w-full h-full px-3 appearance-none outline-none bg-transparent"
                  onChange={(e) => handleSortChange(e.target.value)}
                  value={sortOrder}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center p-2 mt-[5px] h-8 mr-1 pointer-events-none rounded-lg text-gray-700 bg-[#ECECEC]">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="mt-2 w-full mg:w-[150px] h-12 border-[1.5px] border-[#ECECEC] flex justify-center items-center rounded-lg relative">
                <select
                  name="marks"
                  className="w-full h-full px-3 appearance-none outline-none bg-transparent"
                  onChange={(e) => handleSortChange(e.target.value)}
                  value={sortOrder}
                >
                  <option value="newest">Highest</option>
                  <option value="oldest">Lowest</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center p-2 mt-[5px] h-8 mr-1 pointer-events-none rounded-lg text-gray-700 bg-[#ECECEC]">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-auto responsive-table">
          <table className="table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.field}>{column.headerName}</th>
                ))}
              </tr>
            </thead>
            <tbody className="relative">
              {data.map((row) => (
                <tr key={row._id}>
                  {columns.map((column) => (
                    <td key={column.field}>
                      {column.field === "actions" ? (
                        <div className="action-container">
                          <Check />
                          <CloseIcon
                            onClick={() => console.log("Action clicked")}
                          />
                        </div>
                      ) : (
                        <>
                          {column.field === "serialNumber" ? (
                            <Link to={`/tutor/home/students/${row._id}`}>
                              <span>{row[column.field]}</span>
                            </Link>
                          ) : (
                            <></>
                          )}

                          {column.field === "name" ? (
                            <Link to={`/tutor/home/students/${row._id}`}>
                              <span className="action-container text-blue-600 capitalize text-sm font-semibold ">
                                {row[column.field]}
                              </span>
                            </Link>
                          ) : (
                            <span className="action-container text-sm font-semibold">
                              {row[column.field]}
                            </span>
                          )}

                          {column.field === "grade" ? (
                            <span>{row[column.field]} </span>
                          ) : (
                            <></>
                          )}

                          {column.field === "courseName" ? (
                            <Link to={`/tutor/home/students/${row._id}`}>
                              <span>{row[column.field]}</span>
                            </Link>
                          ) : (
                            <></>
                          )}

                          {column.field === "number" ? (
                            <span>{row[column.field]} </span>
                          ) : (
                            <></>
                          )}

                          {column.field === "parentNumber" ? (
                            <span>{row[column.field]} </span>
                          ) : (
                            <></>
                          )}

                          {column.field === "classesAttended" ? (
                            <Link to={`/tutor/home/students/${row._id}`}>
                              <span>{row[column.field]}</span>
                            </Link>
                          ) : (
                            <></>
                          )}

                          {column.field === "modulesCompleted" ? (
                            <Link to={`/tutor/home/students/${row._id}`}>
                              <span>{row[column.field]}</span>
                            </Link>
                          ) : (
                            <></>
                          )}

                          {column.field === "assignmentsCompleted" ? (
                            <Link to={`/tutor/home/students/${row._id}`}>
                              <span>{row[column.field]}</span>
                            </Link>
                          ) : (
                            <></>
                          )}

                          {column.field === "recentTestResults" ? (
                            <Link to={`/tutor/home/students/${row._id}`}>
                              <span>{row[column.field]}</span>
                            </Link>
                          ) : (
                            <></>
                          )}

                          {column.field === "createdAt" ? (
                            <span>{formatDate(row[column.field])} </span>
                          ) : (
                            <></>
                          )}

                          {column.field === "comingSatExamDate" ? (
                            <span>{formatDate(row[column.field])} </span>
                          ) : (
                            <></>
                          )}

                          {column.field === "analysis" ? (
                            <button className="border-[1px] w-full px-2 bg-[#0066DE] text-white cursor-pointer flex justify-center items-center">
                              <p>View</p>
                            </button>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="select-container">
          <div>
            <select value={pageSize} onChange={handlePageSizeSelectChange}>
              <option value="2">2</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="100">100</option>
            </select>
          </div>
          <div>Total Items : {totalRows}</div>
        </div>

        <Pagination
          count={Math.ceil(totalRows / pageSize)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
          sx={{
            display: "block",
            width: "100%",
            height: "max-content",
            marginTop: "10px",
            backgroundColor: "transparent",
            zIndex: "0",
          }}
        />
      </div>
    </div>
  );
};

export default Students;
