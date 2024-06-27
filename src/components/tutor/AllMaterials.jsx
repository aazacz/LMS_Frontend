import React, { useState, useEffect } from "react";
import axios from "axios";

const AllMaterials = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [materials, setMaterials] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}api/course/get-all-course?page=1&pageSize=&search=`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTAyYWE4YTE0ZTdiNTM1N2UwNjhlYyIsInJvbGUiOiJ0dXRvciIsImlhdCI6MTcxNzEzMDgxOH0.yQ2kisu7irJUvntqfjK-e95yys_VCbMzriFZEcv2Dks",
            },
          }
        );
        console.log("API Response:", response.data); 
        if (response.data && Array.isArray(response.data.data)) {
          setCourses(response.data.data); 
        } else {
          console.error("Invalid API response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, [baseURL]);

  const handleSelectChange = (event) => {
    const courseId = event.target.value; 
    setSelectedCourse(courseId); 
    fetchMaterials(courseId); 
  };
  const fetchMaterials = async (courseId) => {
    try {
        const response = await axios.get(
            `${baseURL}api/library/get-all-assignment?courseId=${courseId}`,
            {
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTAyYWE4YTE0ZTdiNTM1N2UwNjhlYyIsInJvbGUiOiJ0dXRvciIsImlhdCI6MTcxNzEzMDgxOH0.yQ2kisu7irJUvntqfjK-e95yys_VCbMzriFZEcv2Dks",
              },
            }
          );
      if (response.data && Array.isArray(response.data.data)) {
        setMaterials(response.data.data);
      } else {
        console.error("Invalid materials API response format:", response.data);
        setMaterials([]);
      }
    } catch (error) {
      console.error("Error fetching materials:", error);
      setMaterials([]);
    }
  };

  return (
    <div className="w-full flex flex-col font-poppins">
      <div className="w-full p-2">
        <label htmlFor="course-select" className="text-sm mr-2">
          Choose a course:
        </label>
        <select
          id="course-select"
          className="text-sm"
          value={selectedCourse}
          onChange={handleSelectChange}
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseName}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-2 rounded">
      {materials.map((material) => (
          <div key={material._id} className="w-full h-max p-2">
            <div className="flex flex-col justify-center items-center gap-4 border-[1px] h-40 border-black p-2 rounded ">
              <div className="w-10 h-10 rounded-full border-[1px] border-black bg-white"></div>
              <div className="flex flex-col bg-red-400 justify-center items-center text-xs col-span-2">
                <p className="text-black text-xs">{material.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMaterials;
