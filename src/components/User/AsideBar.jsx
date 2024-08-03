import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstanceStudent } from "../../routes/UserRoutes";
import TutorListingHomePage from "./TutorListingHomePage";

const Asidebar = ({ course, setTutorModal, setStudentModal }) => {
  const { courseId } = useParams();
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = useSelector((state) => state.AdminDetails.token);
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);

  useEffect(() => {
    if (course && course.modules) {
      setModules(course.modules);
    }
  }, [course]);

  const handleEnrollCourse = (event) => {
    event.preventDefault();
    navigate("/signup/*");
  };

  return (
    <>
      <div className="relative bg-slate-200 lg:w-[30%] w-full flex flex-col ">
        <h1 className="font-Roboto text-2xl font-bold line-clamp-2 py-2 px-5">
          {course ? course.courseName : ""}
        </h1>
        <div className="px-6 ">
          <h1 className="font-poppins font-semibold text-lg">Modules List</h1>
          <div className="bg-white rounded-lg flex flex-col mt-5 p-5 items-center">
            <h1 className="font-plusjakartasans font-bold line-clamp-2">
              {course ? course.courseName : ""}
            </h1>
            {modules.map((value, index) => (
              <div
                key={index}
                className="flex w-full justify-between items-center py-5"
              >
                <div className="flex gap-x-3 items-center w-[65%]">
                  <div>
                    <div className="w-6 h-6 bg-[#C75625] text-white rounded-[5px] text-sm flex justify-center items-center">
                      {index + 1}
                    </div>
                  </div>
                  <h1 className="text-orange-600 text-[12px] line-clamp-1">
                    {value.moduleName}
                  </h1>
                </div>
                <h1 className="w-[35%] text-right text-xs text-gray-400">
                  {value.sessions ? value.sessions.length : "0"} Sessions
                </h1>
              </div>
            ))}
            <div className="w-[90%] flex justify-center items-center bg-[#FFBB54] text-black rounded-md py-2">
              <button type="button" onClick={handleEnrollCourse}>
                Enroll Now
              </button>
            </div>
          </div>
          <TutorListingHomePage />
        </div>
      </div>
    </>
  );
};

export default Asidebar;
