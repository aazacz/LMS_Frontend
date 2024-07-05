import React, { useState, useEffect } from "react";
import Pdflogo from "./Pdflogo.jsx";
import { MdFileDownload } from "react-icons/md";
import sample from "/sample.pdf";
import axios from "axios";
import PropTypes from 'prop-types';
import ReusablePagination from "../reusable/ReusablePagination.jsx";

const Library = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const [Modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); 
  const [totalRows, setTotalRows] = useState(0); 

  const openModal = () => {
    setModal(true);
  };

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    // Fetch the courses from the API
    axios
      .get(`${baseURL}api/student-course/enrolled-courses`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTE2OTE3N2I3MDRiMDQ0NTJlMWYxYSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzE3NTg2OTYyfQ.aAFsbNw992yirRcMC5j25HHz9TsdzWF01gj2Xg-l2pQ`,
        },
      })
      .then((response) => {
        // console.log("Fetched courses:", response.data); 
        setCourses(response.data);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  useEffect(() => {
    // Fetch materials when selectedCourse or pagination changes
    fetchMaterials();
  }, [selectedCourse, currentPage, pageSize]);

  const fetchMaterials = () => {
    let url = `${baseURL}api/studentMaterial/enrolled-courses-materials`;
    if (selectedCourse) {
      url += `?courseId=${selectedCourse}`;
    }
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTE2OTE3N2I3MDRiMDQ0NTJlMWYxYSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzE3NTg2OTYyfQ.aAFsbNw992yirRcMC5j25HHz9TsdzWF01gj2Xg-l2pQ`,
        },
      })
      .then((response) => {
        // console.log("Fetched materials:", response.data);
        setMaterials(response.data);
        // Set total rows/items for pagination
        setTotalRows(response.data.length); 
      })
      .catch((error) => {
        console.error("Error fetching materials:", error);
      });
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCourse(selectedValue);
    setCurrentPage(1); 
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="w-full h-screen overflow-y-scroll no-scrollbar ">
      <div
        onClick={() => setModal(false)}
        className={`w-full flex  ${Modal ? " bg-gray-200" : " "}`}
      >
        <div
          className={` px-6 w-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] h-screen overflow-y-scroll no-scrollbar flex flex-col relative `}
        >
          {Modal && (
            <div className=" w-full max-w-[80vw] h-[88vh]  absolute left-1/2 -translate-x-1/2">
              <object
                data={sample}
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <img src="broken.png" alt="PDF not found" />
              </object>
            </div>
          )}

          <h1 className="font-poppins text-3xl py-4 font-semibold text-black">
            Library
          </h1>
          <div className="flex items-center gap-2 py-4 font-poppins text-sm ">
            {" "}
            <label htmlFor="courses">Choose a course:</label>
            <select
              id="courses"
              value={selectedCourse}
              onChange={handleChange}
            >
              <option className="text-sm" value="">
                All Courses
              </option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>

          {materials.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">No materials found.</p>
            </div>
          ) : (
            <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4  ">
              {materials
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((material, index) => (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal();
                    }}
                  >
                    <PdfCard material={material} />
                  </div>
                ))}
            </div>
          )}

          <ReusablePagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalRows={totalRows}
            handlePageChange={handlePageChange}
            handlePageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Library;

const PdfCard = ({ material }) => {
  return (
    <div className="w-full bg-gray-300 h-full flex flex-col justify-center items-center px-1 py-4 rounded-md">
      <div>
        <Pdflogo />
      </div>

      <div className="flex justify-between mt-4 gap-x-5 items-center">
        <h1 className="font-plusjakartasans font-semibold text-xs line-clamp-1">
          <h3>{material.courseName}</h3>
        </h1>

        <a
          href={sample}
          target="_blank"
          download
          className="flex items-center"
        >
          <MdFileDownload className="text-xl" />
        </a>
      </div>
    </div>
  );
};

PdfCard.propTypes = {
  material: PropTypes.shape({
    courseName: PropTypes.string,
  }).isRequired,
};

export { PdfCard };
