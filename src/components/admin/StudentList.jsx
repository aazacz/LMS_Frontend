import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../reusable/Loader";
import { AiTwotoneDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { AdminAxiosInstance } from "../../routes/AdminRoutes";

const StudentList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest");

  const handleSortChange = (sort) => {
    setSortOrder(sort);
    updateUrl({ page: 1, pageSize, sort });
    setCurrentPage(1);
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await AdminAxiosInstance.get(
        `api/students/getAll-students?page=${currentPage}&pageSize=${pageSize}&search=${searchQuery}&sort=${sortOrder}`,
      );
      setTotalRows(response.data.totalRows);
      setLoading(false);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      setLoading(false);
    }
  };

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["studentList"],
    queryFn: fetchStudents,
    staleTime: 1000,
    refetchInterval: 600000,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCurrentPage(parseInt(params.get("page"), 10) || 1);
    setPageSize(parseInt(params.get("pageSize"), 10) || 10);
    setSortOrder(params.get("sort") || "newest");
  }, []);

  useEffect(() => {
    refetch();
  }, [currentPage, pageSize, searchQuery, sortOrder]);

  const updateUrl = ({ page, pageSize, sort }) => {
    const newUrl = `?page=${page}&pageSize=${pageSize}&sort=${
      sort || sortOrder
    }`;
    window.history.pushState({}, "", newUrl);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    updateUrl({ page: 1, pageSize, sort: sortOrder });
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    updateUrl({ page: newPage, pageSize });
  };

  const handlePageSizeSelectChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    setCurrentPage(1);
    updateUrl({ page: 1, pageSize: newPageSize });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile &&
      selectedFile.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      toast.error("Please select an .xlsx file");
      return;
    }
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      await AdminAxiosInstance.post(`api/students/bulk-upload`, formData);
      toast.success("File uploaded successfully");
      refetch();
    } catch {
      toast.error("File upload failed");
    }
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = `api/students/download-template`;
    link.setAttribute("download", "StudentDetails.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      // timeZone: "Asia/Kolkata",
      // hour12: true,
      // hour: "numeric",
      // minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleSoftDelete = (Studentid) => {
    console.log(Studentid);
    try {
      Swal.fire({
        title: "Are you sure delete the student permanently ?",
        text: "You won't be able to revert this!",
        icon: "warning",
        timer: 1500,
        timerProgressBar: true,
        timerProgressBarColor: "#3085d6",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
        didOpen: () => {
          const progressBar = Swal.getHtmlContainer().querySelector(
            ".swal2-timer-progress-bar",
          );
          if (progressBar) {
            progressBar.style.backgroundColor = "#3085d6";
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          AdminAxiosInstance.delete(
            `api/students/delete-students/${Studentid}`,
          ).then((res) => {
            console.log(res);
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleStudentBlocking = (Status, blockId) => {
    if (Status === "active") {
      handleBlock(blockId);
    } else {
      handleUnBlock(blockId);
    }
  };

  const handleBlock = async (blockId) => {
    console.log("block function hitted");
    console.log(blockId);
    try {
      await AdminAxiosInstance.patch(
        `api/students/block-students/${blockId}`,
      ).then((response) => {
        console.log(response);
        if (response.data.status === "blocked") {
          toast.success("Student Blocked Successfully");
          refetch();
        }
      });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleUnBlock = async (blockId) => {
    console.log("block function hitted");
    console.log(blockId);
    try {
      await AdminAxiosInstance.patch(
        `api/students/unblock-students/${blockId}`,
      ).then((response) => {
        console.log(response);
        if (response.data.status === "active") {
          toast.success("Student Unblocked Successfully");
          refetch();
        }
      });
    } catch (error) {
      console.table(error);
      toast.error(error.response.data);
    }
  };

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
    { field: "recentTestResult", headerName: "Test Result" },
    { field: "createdAt", headerName: "Joined Date" },
    { field: "comingSatExamDate", headerName: "Exam Date" },
    { field: "status", headerName: "Status" },
    { field: "analysis", headerName: "Analysis" },
    { field: "actions", headerName: "Actions" },
  ];

  return (
    <div className="font-poppins w-full flex flex-col col relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-100 z-50">
          <Loader /> {/* Your Loader component */}
        </div>
      )}

      {/* Heading Section */}
      <div className="pl-3 font-poppins w-full">
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

        {/* Table Section */}
        {/* Refer index.css */}
        <div className="table-container w-full">
          <table className="responsive-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.field}>{column.headerName}</th>
                ))}
              </tr>
            </thead>
            <tbody className="relative">
              {isPending || isError ? (
                <div className="absolute w-full h-[150px] top-[50%] translate-y-[50%] flex justify-center">
                  <Loader />
                </div>
              ) : (
                data?.data.map((row) => (
                  <tr key={row._id}>
                    {columns.map((column, index) => (
                      <td key={index}>
                        {column.field === "serialNumber" ? (
                          <Link to={`/admin/home/students/${row._id}`}>
                            <span>{row[column.field]}</span>
                          </Link>
                        ) : (
                          <></>
                        )}

                        {column.field === "name" ? (
                          <Link to={`/admin/home/students/${row._id}`}>
                            <span className="text-[#407BFF] underline">
                              {row[column.field]}
                            </span>
                          </Link>
                        ) : (
                          <></>
                        )}

                        {column.field === "grade" ? (
                          <span>{row[column.field]} </span>
                        ) : (
                          <></>
                        )}

                        {column.field === "courseName" ? (
                          <Link to={`/admin/home/students/${row._id}`}>
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
                          <Link to={`/admin/home/students/${row._id}`}>
                            <span>{row[column.field]}</span>
                          </Link>
                        ) : (
                          <></>
                        )}

                        {column.field === "modulesCompleted" ? (
                          <Link to={`/admin/home/students/${row._id}`}>
                            <span>{row[column.field]}</span>
                          </Link>
                        ) : (
                          <></>
                        )}

                        {column.field === "assignmentsCompleted" ? (
                          <Link to={`/admin/home/students/${row._id}`}>
                            <span>{row[column.field]}</span>
                          </Link>
                        ) : (
                          <></>
                        )}

                        {column.field === "recentTestResults" ? (
                          <Link to={`/admin/home/students/${row._id}`}>
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

                        {column.field === "status" ? (
                          <div>
                            {row.status === "active" ? (
                              <div
                                onClick={() =>
                                  handleStudentBlocking("active", row._id)
                                }
                                className="border-[1px] px-2 bg-[#0066DE] text-white cursor-pointer flex justify-center items-center"
                              >
                                {" "}
                                Active
                              </div>
                            ) : (
                              <div
                                onClick={() =>
                                  handleStudentBlocking("inactive", row._id)
                                }
                                className="px-2 border-[1px] border-blue-700 cursor-pointer text-[#0066DE] flex justify-center items-center"
                              >
                                {" "}
                                Inactive
                              </div>
                            )}
                          </div>
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

                        {column.field === "actions" ? (
                          <div className="flex justify-center items-center">
                            <AiTwotoneDelete
                              onClick={() => handleSoftDelete(row._id)}
                              className="text-red-700 bg-none text-xl duration-300 transition-all cursor-pointer"
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="w-full flex flex-col mg:flex-row justify-between items-start  gap-3 md:gap-x-4 py-3">
          <div className="w-full md:w-auto">
            <div className="select-container flex flex-col gap-y-2">
              <div className="pr-5">
                <select
                  value={pageSize}
                  onChange={handlePageSizeSelectChange}
                  className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="100">100</option>
                </select>
              </div>
              <div>Total Items: {data?.totalRows}</div>
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

          {/* Upload Section */}
          <div className="w-full xl:w-[520px] pr-5 mt-10">
            <h3 className="text-base md:text-lg mb-2 md:mr-4">
              Bulk upload Student Details
            </h3>
            <div className="flex flex-col justify-evenly sm:flex-row sm:items-center gap-y-2 sm:gap-x-2">
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
              />

              <label
                htmlFor="fileInput"
                className="w-full file-label bg-gray-300 text-blue-700 px-4 py-2 rounded cursor-pointer flex items-center justify-center"
              >
                {file ? file.name : "Select"}
              </label>

              <button
                onClick={handleFileUpload}
                className="w-full upload-button bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center"
              >
                Upload
              </button>

              <button
                onClick={handleDownloadTemplate}
                className="w-full  download-button bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center"
              >
                Download Excel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
