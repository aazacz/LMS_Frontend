import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import UserNavbar from "../../components/User/UserNavbar";
import AnimationScreen from "../../components/User/AnimationScreen";

const Homepage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className="sticky top-0 z-10 w-full">
        <UserNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>


<<<<<<< HEAD
                {/* Main Content */}

                <div className="flex-grow overflow-auto ">
                    <Routes>
                        <Route path="/*" element={<AnimationScreen/>} />
                        {/* <Route path="/sdiagnosistest" element={<DiagnosisTest />} /> */}
                        {/* <Route path="/courses/addcourse" element={<AddCourse />} />
                        <Route path="/courses/:courseId" element={<Coursedetails />} />
                        <Route path="/coursestructure" element={<CourseStructure />} />
                        <Route path="/students/:studentId" element={<StudentDetail />} />
                        <Route path="/students" element={<StudentList />} />
                        <Route path="/tutors/addtutor" element={<AddTutor />} />
                        <Route path="/diagnosistest/addiagnosistest" element={<Addiagnosistest />} />
                        <Route path="/diagnosistest" element={<DiagnosisTest />} />
                        <Route path="/tutors/:tutorId" element={<TutorDetails />} />
                        <Route path="/tutors" element={<TutorListing />} />
                        <Route path="/library" element={<Library />} /> */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
=======

      <div className="maincontainer h-screen w-full flex flex-col justify-center items-center animationapart overflow-x-hidden">
        <div className="flex flex-col flex-grow w-full overflow-y-auto Test">
          {/* Main Content */}
          <div className="w-full">
            <Routes>
              <Route path="/*" element={<AnimationScreen />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
>>>>>>> e0ef2f7a3015fdb93c26ddb02e1b28d8339114b7
        </div>
      </div>
    </div>
  );
};

export default Homepage;
