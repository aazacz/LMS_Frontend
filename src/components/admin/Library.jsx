import React, { useState, useEffect } from "react";
import axios from "axios";
import Pdflogo from "./Pdflogo";
import { MdFileDownload, MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert
import ReusablePagination from "../reusable/ReusablePagination";
import { Link } from "react-router-dom";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { IoIosCloseCircleOutline, IoMdRemoveCircle } from "react-icons/io";


const baseURL = process.env.REACT_APP_API_URL;

const Library = () => {
  const token = useSelector((state) => state.AdminDetails.token)


  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [materials, setMaterials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [totalRows, setTotalRows] = useState(0); // Total rows for pagination
  const [Modal, setModal] = useState(false)


  // Fetch all courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${baseURL}api/course/get-all-course?page=1&pageSize=&search`
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
          response = await axios.get(
            `${baseURL}api/library/get-course/${selectedCourse}?page=${currentPage}&pageSize=${pageSize}`,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkRldmljZSI6IkR1bW15IERldmljZSAyMDI0LTA1LTI4VDEyOjI5OjQ5Ljg2N1oiLCJpZCI6IjY2NTQwOGM2MmIyYTNlNDk5YWYxZjU0OCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNjg5OTM5MH0.KA2sf-c9BLggwA4YlaA1FC8DzV2XVwWx0f7pJ75iT6A`,
              },
            }
          );
        } else {
          response = await axios.get(
            `${baseURL}api/library/get-all-assignment?page=${currentPage}&pageSize=${pageSize}`,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkRldmljZSI6IkR1bW15IERldmljZSAyMDI0LTA1LTI4VDEyOjI5OjQ5Ljg2N1oiLCJpZCI6IjY2NTQwOGM2MmIyYTNlNDk5YWYxZjU0OCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNjg5OTM5MH0.KA2sf-c9BLggwA4YlaA1FC8DzV2XVwWx0f7pJ75iT6A`,
              },
            }
          );
        }
        setMaterials(response.data.data);
        setTotalRows(response.data.total);
      } catch (error) {
        console.log("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, [selectedCourse, currentPage, pageSize]);

  // Function to handle course selection
  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
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
        const response = await axios.delete(
          `${baseURL}api/library/delete-material/${materialId}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkRldmljZSI6IkR1bW15IERldmljZSAyMDI0LTA1LTI4VDEyOjI5OjQ5Ljg2N1oiLCJpZCI6IjY2NTQwOGM2MmIyYTNlNDk5YWYxZjU0OCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNjg5OTM5MH0.KA2sf-c9BLggwA4YlaA1FC8DzV2XVwWx0f7pJ75iT6A`,
            },
          }
        );
        console.log("File deleted successfully:", response.data);

        // Update materials after deleting
        const updatedMaterials = materials.filter(
          (material) => material._id !== materialId
        );
        setMaterials(updatedMaterials);

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      Swal.fire("Error!", "Failed to delete file.", "error");
    }
  };

  //Download Material
  const handleDownloadMaterial = async (materialId) => {
    try {
      await axios.get(
        `${baseURL}api/library/download-file//${materialId}`,
        {
          responseType: "blob",
          headers: {
            Accept: "application/pdf",
            authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkRldmljZSI6IkR1bW15IERldmljZSAyMDI0LTA1LTI4VDEyOjI5OjQ5Ljg2N1oiLCJpZCI6IjY2NTQwOGM2MmIyYTNlNDk5YWYxZjU0OCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNjg5OTM5MH0.KA2sf-c9BLggwA4YlaA1FC8DzV2XVwWx0f7pJ75iT6A`,
          },
        }
      ).then((res) => {
        console.log("res.data in then block")
        console.log(res.data)
      })

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

  // Function to handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Function to handle page size change
  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const [Material, setMaterial] = useState(null)
  // Function to open and close a modal
  const openModal = (material) => {
    console.log("https://mindsat.onrender.com/" + material.filePath)
    setMaterial("https://mindsat.onrender.com/" + material.filePath)
    setModal(true)
  }

  return (
    <div onClick={() => setModal(false)} className={`w-full flex flex-col font-poppins ${Modal ? " bg-gray-200" : " "}`}>
      {Modal && (
        <div className="w-full max-w-[80vw] h-[88vh] flex justify-center items-center absolute left-1/2 -translate-x-1/2">
          <object data={Material} type="application/pdf" width="100%" height="100%">
            <img src="/broken.png" alt="PDF not found" />
          </object>
        </div>
      )}
      <div className="w-full flex justify-between items-start p-2">
        <div className="flex">
          <div className="text-sm md:text-base">Choose Course</div>
          <select
            className="ml-2 text-sm p-1 h-max rounded"
            onChange={handleCourseChange}
            value={selectedCourse}
          >
            <option value="">All courses</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>
        <Link to="uploadMaterial">
          <button className="text-sm px-6 py-2 bg-[#BFDBFE] text-black rounded-md">
            Upload Material
          </button>
        </Link>
      </div>
      <div className="p-2 m-4">
        <div className="grid grid-flow-row  grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-x-6">
          {materials.map((material, index) => (
            <div
              onClick={(e) => { e.stopPropagation(); openModal(material); }}
              key={material._id}
              className="w-[180px] bg-gray-300 flex flex-col justify-center items-center px-2 py-2 m-4 rounded-md"
            >
              <div className="flex justify-end w-full  ">
                <IoIosCloseCircleOutline  
                  className="text-xl cursor-pointer"
                  onClick={() => handleDeleteMaterial(material._id)}
                />
              </div>
              <div className="">
                {/* <Pdflogo  /> */}
                <BsFillFileEarmarkPdfFill className="text-6xl text-red-700" />

              </div>
              <div className="flex justify-between mt-4 gap-5 px-2  items-center w-full relative">

                <h1 className="w-[90%] text-center font-poppins font-semibold text-xs line-clamp-1 uppercase">
                  {material.fileName.split(".pdf")}
                </h1>
                <div className="w-[10%]">

                  <MdFileDownload
                    className="text-2xl cursor-pointer  "
                    onClick={() => handleDownloadMaterial(material._id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <ReusablePagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalRows={totalRows}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
};

export default Library;
