// export default Library;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdFileDownload } from "react-icons/md";
import Swal from "sweetalert2";
import ReusablePagination from "../../reusable/ReusablePagination";
import { Link } from "react-router-dom";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { axiosInstanceStudent } from "../../../routes/UserRoutes";

const Library = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [modal, setModal] = useState(false);
  const [materialURL, setMaterialURL] = useState(null);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstanceStudent.get(
          `api/course/student-enroll-courses`
        );
        console.log("Courses Data:", response.data.data); // Check the structure of the courses data
        setCourses(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Fetch materials based on currentPage and pageSize
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axiosInstanceStudent.get(
          `api/library/all-books`
        );
        console.log("Fetched materials:", response.data.books); // Debug: Check fetched materials
        setMaterials(response.data.books);
        setTotalRows(response.data.totalCount); // Ensure totalCount is accurate
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, [currentPage, pageSize]);

  useEffect(() => {
    console.log("Selected Course ID:", selectedCourse); // Debug: Check selectedCourse
    if (selectedCourse) {
      const filtered = materials.filter((material) => {
        const materialCourseId = String(material.courseId); // Convert to string
        console.log(`Comparing ${materialCourseId} with ${selectedCourse}`); // Debug: Check the comparison
        return materialCourseId === selectedCourse;
      });
      console.log("Filtered Materials:", filtered); // Debug: Check filtered materials
      setFilteredMaterials(filtered);
    } else {
      setFilteredMaterials(materials);
    }
  }, [materials, selectedCourse]);

  // Handle course selection
  const handleCourseChange = (event) => {
    const selectedCourseId = event.target.value;
    setSelectedCourse(selectedCourseId);
    setCurrentPage(1); // Reset to the first page on course change
    console.log("Selected Course ID:", selectedCourseId); // This should log the course ID
  };

  // Download Material
  const handleDownloadMaterial = async (materialId, bookId) => {
    try {
      const response = await axiosInstanceStudent.get(
        `api/library/download-book/${materialId}/${bookId}`,
        {
          responseType: "blob",
          headers: {
            Accept: "application/pdf",
          },
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${bookId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
      Swal.fire("Error!", "Failed to download file.", "error");
    }
  };

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page on page size change
  };

  // Open PDF modal
  const openModal = (material) => {
    setMaterialURL(`https://mindsat.onrender.com/${material.filePath}`);
    setModal(true);
  };

  return (
    <div
      onClick={() => setModal(false)}
      className={`w-full h-[100dvh] relative flex flex-col font-poppins items-center ${modal ? "bg-gray-200" : ""}`}
    >
      {modal && (
        <div className="w-[90%] z-[99] h-full flex justify-center items-center absolute left-0 top-0">
          <div className="w-full h-full">
            <object
              data={materialURL}
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
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full pr-2">
        <div className="w-full px-2 md:px-0 justify-center grid grid-flow-row place-content-center xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 md:gap-x-4">
          {filteredMaterials.length ? (
            filteredMaterials.map((material) => (
              <React.Fragment key={material._id}>
                {material.books.map((book) => (
                  <div
                    key={book._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(book);
                    }}
                    className="md:w-[180px] bg-[#F5F1F1] flex flex-col justify-center items-center px-2 py-3 m-4 rounded-md"
                  >
                    <div>
                      <BsFillFileEarmarkPdfFill className="text-6xl text-red-700" />
                    </div>
                    <div className="flex justify-between mt-4 gap-5 px-2 items-center w-full relative">
                      <h1
                        data-tooltip-id="PdfName"
                        data-tooltip-content={book.fileName.split(".pdf")[0]}
                        className="w-[90%] line-clamp-1 text-center font-poppins font-semibold text-xs line-clamp-1d uppercase"
                      >
                        {book.fileName.split(".pdf")[0]}
                      </h1>
                      <Tooltip
                        id="PdfName"
                        place="top"
                        type="dark"
                        effect="solid"
                      />
                      <div className="w-[10%]">
                        <Link
                          to={book.filePath}
                          target="_blank"
                          className="cursor-pointer"
                        >
                          <MdFileDownload
                            onClick={(e) => e.stopPropagation()}
                            className="text-lg text-blue-700"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))
          ) : (
            <div>No materials found for the selected course</div>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center mt-5">
        <ReusablePagination
          count={Math.ceil(totalRows / pageSize)}
          page={currentPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
};

export default Library;
