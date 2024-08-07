import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import { FaChevronDown } from "react-icons/fa";
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

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await AdminAxiosInstance.get(
        `api/students/getAll-students?page=${currentPage}&pageSize=${pageSize}&search=${searchQuery}`
      );
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
  }, []);

  useEffect(() => {
    refetch();
  }, [currentPage, pageSize, searchQuery]);

  const updateUrl = ({ page, pageSize }) => {
    const newUrl = `?page=${page}&pageSize=${pageSize}`;
    window.history.pushState({}, "", newUrl);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
    updateUrl({ page: 1, pageSize });
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
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
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
            ".swal2-timer-progress-bar"
          );
          if (progressBar) {
            progressBar.style.backgroundColor = "#3085d6";
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          AdminAxiosInstance.delete(
            `api/students/delete-students/${Studentid}`
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
        `api/students/block-students/${blockId}`
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
        `api/students/unblock-students/${blockId}`
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
    { field: "name", headerName: "Name" },
    { field: "grade", headerName: "Grade" },
    { field: "number", headerName: "Phone" },
    { field: "parentNumber", headerName: "Parent Number" },
    { field: "createdAt", headerName: "Created Date" },
    { field: "comingSatExamDate", headerName: "Next Exam Date" },
    { field: "status", headerName: "Status" },
    { field: "actions", headerName: "Actions" },
  ];

  return (
    <div className="font-poppins w-full flex flex-col col relative ">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-100 z-50">
          <Loader /> {/* Your Loader component */}
        </div>
      )}
      <div className="main-container p-2 font-poppins w-full">
        <div>
          <div className="heading-column-toggle-container py-2">
            <h1 className="font-poppins text-xl font-semibold ">
              Students List
            </h1>
          </div>
          <div className=" h-10   flex flex-wrap ">
            <div className=" w-full flex h-full gap-x-4 ">
              <div className=" w-full md:w-[50%] h-full   border border-[#4348DB] rounded-md p-1 flex  ">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="w-full outline-none px-2 h-full bg-gray-100 rounded-lg"
                />
                <button className="text-sm w-[200px] h-full  bg-[#4348DB] flex items-center text-white rounded-lg p-2">
                  {" "}
                  <SearchIcon className="text-white h-full" />
                  Show Results
                </button>
              </div>
              <div className="w-32 h-full border-[1px] border-gray-300 flex justify-center items-center rounded-lg">
                <select name="Filter" className="w-full  outline-none">
                  <option value="w-full">Newest</option>
                  <option value="w-full">Oldest</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="table-container font-poppins mt-2 ">
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
                <div className="absolute w-full h-[150px]  top-[50%] translate-y-[50%] flex justify-center  ">
                  <Loader />
                </div>
              ) : (
                data?.data.map((row) => (
                  <tr key={row._id}>
                    {columns.map((column, index) => (
                      <td key={index}>
                        {column.field === "actions" ? (
                          <div className="action-container flex items-center justify-center gap-x-2">
                            <AiTwotoneDelete
                              onClick={() => handleSoftDelete(row._id)}
                              className="hover:text-gray-600 text-red-700 text-xl duration-300 transition-all cursor-pointer"
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                        {column.field === "name" ? (
                          <Link to={`/admin/home/students/${row._id}`}>
                            <span className="action-container text-blue-600 capitalize text-sm font-semibold ">
                              {row[column.field]}
                            </span>
                          </Link>
                        ) : (
                          <></>
                        )}
                        {column.field === "grade" ? (
                          <span className="action-container text-sm font-semibold">
                            {row[column.field]}{" "}
                          </span>
                        ) : (
                          <></>
                        )}
                        {column.field === "number" ? (
                          <span className="action-container text-sm font-semibold">
                            {row[column.field]}{" "}
                          </span>
                        ) : (
                          <></>
                        )}
                        {column.field === "parentNumber" ? (
                          <span className="action-container text-sm font-semibold">
                            {row[column.field]}{" "}
                          </span>
                        ) : (
                          <></>
                        )}
                        {column.field === "createdAt" ? (
                          <span className="action-container text-sm font-semibold">
                            {formatDate(row[column.field])}{" "}
                          </span>
                        ) : (
                          <></>
                        )}
                        {column.field === "comingSatExamDate" ? (
                          <span className="action-container text-sm font-semibold">
                            {formatDate(row[column.field])}{" "}
                          </span>
                        ) : (
                          <></>
                        )}
                        {column.field === "button" ? (
                          <div className="action-container">
                            <div className="font-poppins text-sm  border-[1px] border-gray-500 cursor-pointer hover:bg-slate-200   flex justify-center items-center">
                              {" "}
                              Review
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                        {column.field === "status" ? (
                          <div className="action-container ">
                            {row.status === "active" ? (
                              <div
                                onClick={() =>
                                  handleStudentBlocking("active", row._id)
                                }
                                className="font-poppins text-sm  border-[1px] px-2 text-[10px] border-blue-700 bg-blue-700 text-white cursor-pointer flex justify-center items-center"
                              >
                                {" "}
                                Active
                              </div>
                            ) : (
                              <div
                                onClick={() =>
                                  handleStudentBlocking("inactive", row._id)
                                }
                                className="font-poppins text-sm  border-[1px] border-blue-700  cursor-pointer text-blue-700  flex justify-center items-center"
                              >
                                {" "}
                                Inactive
                              </div>
                            )}
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
        <div className="bulk-upload-container flex justify-between items-end gap-x-2 ">
          <div>
            <div className="select-container ">
              <div>
                <select value={pageSize} onChange={handlePageSizeSelectChange}>
                  <option value="2">2</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="100">100</option>
                </select>
              </div>
              <div>Total Items : {data?.totalRows}</div>
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
          <div className="">
            <h3 className="mr-4">Bulk upload Student Details</h3>
            <div className="flex gap-x-2 ">
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="fileInput"
                className="file-label bg-gray-300 text-blue-700 px-4 py-2 rounded cursor-pointer"
              >
                {file ? file.name : "Select"}
              </label>
              <button
                onClick={handleFileUpload}
                className="upload-button bg-green-500 text-white px-4 py-2 rounded"
              >
                Upload
              </button>
              <button
                onClick={handleDownloadTemplate}
                className="download-button bg-blue-500 text-white px-4 py-2 rounded"
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
