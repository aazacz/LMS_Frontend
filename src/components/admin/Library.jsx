import React, { useState, useEffect } from "react";
import axios from "axios";
import Pdflogo from "./Pdflogo";
import { MdFileDownload, MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert
import ReusablePagination from "../reusable/ReusablePagination";
import { Link } from "react-router-dom";
import { BsFillFileEarmarkPdfFill, BsTrash2 } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";
import { AdminAxiosInstance } from "../../routes/AdminRoutes";
import { Delete } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";

const baseURL = process.env.REACT_APP_API_URL;

const Library = () => {
  // const token = useSelector((state) => state.AdminDetails.token);

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [totalRows, setTotalRows] = useState(0); // Total rows for pagination
  const [Modal, setModal] = useState(false);

  // Fetch all courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await AdminAxiosInstance.get(
          `api/course/get-all-course?page=1&pageSize=&search`
        );
        setCourses(response.data.data);
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Fetch materials initially and when selectedCourse or pagination changes
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        let response;
        if (selectedCourse !== "") {
          //   response = await AdminAxiosInstance.get(
          //     `api/library/get-course/${selectedCourse}?page=${currentPage}&pageSize=${pageSize}`
          //   );
          response = await AdminAxiosInstance.get(`api/library/all-books`);
        } else {
          response = await AdminAxiosInstance.get(`api/library/all-books`);
          //   response = await AdminAxiosInstance.get(
          //     `api/library/get-all-assignment?page=${currentPage}&pageSize=${pageSize}`
          //   );
        }
        setMaterials(response.data.books);
        setFilteredMaterials(response.data.books);
        setTotalRows(response.data.books.length);
      } catch (error) {
        console.log("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, []);
  //   }, [selectedCourse, currentPage, pageSize]);

  // Function to handle course selection
  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
    let filteredData = materials?.filter(
      ({ courseId }) => courseId === event.target.value
    );
    console.log("ee ", event.target.value);

    console.log("filteredData", filteredData);
    if (event.target.value) {
      setFilteredMaterials(filteredData);
    } else {
      setFilteredMaterials(materials);
    }
    setCurrentPage(1);
  };

  // Deleting a Material
  const handleDeleteMaterial = async (materialId) => {
    try {
      const confirmDelete = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmDelete.isConfirmed) {
        const response = await AdminAxiosInstance.delete(
          `api/library/delete-book/${materialId}`
        );
        console.log("File deleted successfully:", response.data);

        setMaterials(response?.data?.data);

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      Swal.fire("Error!", "Failed to delete file.", "error");
    }
  };

  //Download Material
  const handleDownloadMaterial = async (materialId, bookId) => {
    try {
      const data = await AdminAxiosInstance.get(
        `api/library/download-book/${materialId}/${bookId}`,
        {
          responseType: "blob",
          headers: {
            Accept: "application/pdf",
          },
        }
      ).then((res) => {
        console.log({ res });
        console.log("res.data in then block");
        console.log(res.data);
      });

      // // Create a blob URL for the file and trigger download
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", `${materialId}.pdf`); // Adjust file name as needed
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
      Swal.fire("Error!", "Failed to download file.", "error");
    }
  };

  //   const handleDownload = async (materialId, bookId) => {
  //     try {
  //       const response = await AdminAxiosInstance.get(
  //         `api/library/download-book/${materialId}/${bookId}`,
  //         {
  //           responseType: "blob", // Important: This tells axios to treat the response as binary data
  //         }
  //       );

  //       // Create a blob from the response data
  //       const blob = new Blob([response.data], {
  //         type: response.headers["content-type"],
  //       });

  //       // Create a temporary URL for the blob
  //       const url = window.URL.createObjectURL(blob);

  //       // Create a temporary anchor element and trigger the download
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", fileName || "download"); // Use provided fileName or default to 'download'
  //       document.body.appendChild(link);
  //       link.click();

  //       // Clean up
  //       link.parentNode.removeChild(link);
  //       window.URL.revokeObjectURL(url);
  //     } catch (error) {
  //       console.error("Error downloading file:", error);
  //       // Handle error (e.g., show an error message to the user)
  //     }
  //   };

  // Function to handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Function to handle page size change
  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const [Material, setMaterial] = useState(null);
  // Function to open and close a modal
  const openModal = (material) => {
    console.log("https://mindsat.onrender.com/" + material.filePath);
    setMaterial("https://mindsat.onrender.com/" + material.filePath);
    setModal(true);
  };

  return (
    <div
      onClick={() => setModal(false)}
      className={`w-full h-[100dvh]  relative flex flex-col font-poppins items-center ${
        Modal ? " bg-gray-200" : " "
      }`}
    >
      {Modal && (
        <div className="w-[90%] z-[99] h-full flex justify-center items-center absolute  left-0 top-0  ">
          <div className="w-full h-full   ">
            <object
              data={Material}
              type="application/pdf"
              width="100%"
              height="100%"
            >
              <img src="/broken.png" alt="PDF not found" />
            </object>
          </div>
        </div>
      )}

      <div className="w-full px-5 flex flex-col md:flex-row justify-between flex-wrap items-center p-2 pb-5">
        <div className="w-full lg:w-auto flex flex-col lg:flex-row justify-center flex-wrap gap-5 items-center">
          <div className="text-lg font-poppins mt-6 font-bold">
            Choose Course
          </div>
          <select
            className="text-base font-medium mt-5 px-1 py-2 bg-[#f5f1f1] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-black rounded-md"
            onChange={handleCourseChange}
            value={selectedCourse}
          >
            <option value="">All Courses</option>
            {courses?.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full lg:w-auto flex justify-center mt-5 lg:mt-5 pr-2">
          <Link to="uploadMaterial">
            <button className="text-base font-medium px-3 py-2 bg-[#f5f1f1] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-black rounded-md flex gap-x-2 items-center">
              <FaCirclePlus /> Upload Material
            </button>
          </Link>
        </div>
      </div>

      <div className="w-full pr-2">
        <div className="w-full px-2 md:px-0 justify-center spac grid  grid-flow-row place-content-center xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  md:gap-x-4">
          {filteredMaterials && filteredMaterials.length ? (
            filteredMaterials?.map((material) => (
              <React.Fragment key={material._id}>
                {material?.books?.map((book) => (
                  <div
                    key={book._id} // It's better to use a unique key for the inner elements.
                    onClick={(e) => {
                      e.stopPropagation();
                      // openModal(book);
                    }}
                    className="md:w-[180px] bg-gray-300 flex flex-col justify-center items-center px-2 py-2 m-4 rounded-md"
                  >
                    <div className="flex justify-end w-full">
                      <Delete
                        className="text-xl cursor-pointer text-red-500"
                        onClick={() => handleDeleteMaterial(book._id)}
                      />
                    </div>
                    <div>
                      {/* <Pdflogo /> */}
                      <BsFillFileEarmarkPdfFill className="text-6xl text-red-700" />
                    </div>

                    {/* <div className="flex-shrink-0">
                      <img
                       className=" rounded-lg object-contain w-full h-full"
                        src={
                          book.thumbnailPath ||
                          <BsFillFileEarmarkPdfFill className="text-6xl text-red-700" />
                        }
                      />
                    </div> */}

                    <div className="flex justify-between mt-4 gap-5 px-2 items-center w-full relative">
                      <h1
                        data-tooltip-id="PdfName"
                        data-tooltip-content={book?.fileName?.split(".pdf")[0]}
                        className="w-[90%] line-clamp-1 text-center font-poppins font-semibold text-xs line-clamp-1d uppercase"
                      >
                        {book?.fileName?.split(".pdf")[0]}
                      </h1>
                      <Tooltip
                        id="PdfName"
                        place="top"
                        type="dark"
                        effect="solid"
                      />
                      <div className="w-[10%]">
                        <Link to={book.filePath} target="_blank">
                          <MdFileDownload
                            // onClick={() => handleDownload(material._id, book._id)}
                            className="text-2xl cursor-pointer"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))
          ) : (
            <div className="w-full text-center mt-4">
              <h1 className=" text-center w-full">No materials found!</h1>
            </div>
          )}
        </div>
        {/* <ReusablePagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalRows={totalRows}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        /> */}
      </div>
    </div>
  );
};

export default Library;
