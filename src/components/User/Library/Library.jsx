import React, { useState, useEffect } from "react";
import axios from "axios";
import Pdflogo from "./Pdflogo";
import { MdFileDownload, MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert
import ReusablePagination from "../../reusable/ReusablePagination";
import { Link } from "react-router-dom";
import { BsFillFileEarmarkPdfFill, BsTrash2 } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";
import { Delete } from "@mui/icons-material";
import { axiosInstanceStudent } from "../../../routes/UserRoutes";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Library = () => {
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
        const response = await axiosInstanceStudent.get(
          `api/course/get-all-course?page=1&pageSize=&search`,
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
          response = await axiosInstanceStudent.get(`api/library/all-books`);
        } else {
          response = await axiosInstanceStudent.get(`api/library/all-books`);
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
      ({ courseId }) => courseId === event.target.value,
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

  //Download Material
  const handleDownloadMaterial = async (materialId, bookId) => {
    try {
      const data = await axiosInstanceStudent
        .get(`api/library/download-book/${materialId}/${bookId}`, {
          responseType: "blob",
          headers: {
            Accept: "application/pdf",
          },
        })
        .then((res) => {
          console.log({ res });
          console.log("res.data in then block");
          console.log(res.data);
        });
    } catch (error) {
      console.error("Error downloading file:", error);
      Swal.fire("Error!", "Failed to download file.", "error");
    }
  };

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

      <div className="w-full px-5 flex lg:flex-row justify-between flex-wrap items-center p-2 pb-5">
        <div className="w-full lg:w-auto flex lg:flex-row justify-center flex-wrap gap-5 items-center">
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
      </div>

      <div className="w-full pr-2">
        <div className="w-full px-2  md:px-0 justify-center spac grid  grid-flow-row place-content-center xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  md:gap-x-4">
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
                    className="md:w-[180px]  bg-[#F5F1F1] flex flex-col justify-center items-center px-2 py-3 m-4 rounded-md"
                  >
                    <div>
                      {/* <Pdflogo /> */}
                      <BsFillFileEarmarkPdfFill className="text-6xl text-red-700" />
                    </div>
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
