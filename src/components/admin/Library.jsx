import React, { useState, useEffect } from "react";
import axios from "axios";
import Pdflogo from "./Pdflogo"; 
import { MdFileDownload } from "react-icons/md";

const baseURL = process.env.REACT_APP_API_URL; 
const Library = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [materials, setMaterials] = useState([]);

  // Fetch all courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${baseURL}api/course/get-all-course?page=1&pageSize=&search`);
        setCourses(response.data.data); 
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Fetch all materials initially
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`${baseURL}api/library/get-all-assignment`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkRldmljZSI6IkR1bW15IERldmljZSAyMDI0LTA1LTI4VDEyOjI5OjQ5Ljg2N1oiLCJpZCI6IjY2NTQwOGM2MmIyYTNlNDk5YWYxZjU0OCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNjg5OTM5MH0.KA2sf-c9BLggwA4YlaA1FC8DzV2XVwWx0f7pJ75iT6A`,
          },
        });
        console.log(response.data.data)
        setMaterials(response.data.data); 
      } catch (error) {
        console.log("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, []);

  // Fetch materials when selectedCourse changes
  useEffect(() => {
    const fetchMaterialsByCourse = async () => {
      try {
        if (selectedCourse) {
          const response = await axios.get(`${baseURL}api/library/get-course/${selectedCourse}`, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkRldmljZSI6IkR1bW15IERldmljZSAyMDI0LTA1LTI4VDEyOjI5OjQ5Ljg2N1oiLCJpZCI6IjY2NTQwOGM2MmIyYTNlNDk5YWYxZjU0OCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNjg5OTM5MH0.KA2sf-c9BLggwA4YlaA1FC8DzV2XVwWx0f7pJ75iT6A`,
            },
          });
          setMaterials(response.data.data); 
        } else {
          const response = await axios.get(`${baseURL}api/library/get-all-assignment`, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkRldmljZSI6IkR1bW15IERldmljZSAyMDI0LTA1LTI4VDEyOjI5OjQ5Ljg2N1oiLCJpZCI6IjY2NTQwOGM2MmIyYTNlNDk5YWYxZjU0OCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNjg5OTM5MH0.KA2sf-c9BLggwA4YlaA1FC8DzV2XVwWx0f7pJ75iT6A`,
            },
          });
       
          setMaterials(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching materials by course:", error);
      }
    };

    fetchMaterialsByCourse();
  }, [selectedCourse]);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  return (
    <div className="w-full flex flex-col font-poppins">
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
        <button className="text-sm px-6 py-2 bg-[#BFDBFE] text-black rounded-md">
          Upload material
        </button>
      </div>
      <div className="p-2 m-4">
        <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-6">
          {materials.map((material) => (
            <div
              key={material._id}
              className="w-full bg-gray-300 flex flex-col justify-center items-center px-1 py-4 m-4 rounded-md"
            >
              <div>
                <Pdflogo />
              </div>
              <div className="flex justify-between mt-4 gap-5 items-center">
                <h1 className="font-poppins font-semibold text-xs line-clamp-1">
                  {material.fileName}
                </h1>
                <a
                  href={material.filePath}
                  target="_blank"
                  download
                  className="flex items-center"
                >
                  <MdFileDownload className="text-xl" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
