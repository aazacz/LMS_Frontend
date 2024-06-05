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
    <div className=" h-screen w-full Test overflow-x-hidden">
     
      <div className="sticky top-0 z-10">
        <UserNavbar   toggleSidebar={toggleSidebar}    isSidebarOpen={isSidebarOpen}  />
      </div>

      <div className="flex flex-col w-full h-full flex-grow Test">
        {/* Main Content */}

        <div className="flex-grow ">
          <Routes>
            <Route path="/*" element={<AnimationScreen />} />
            {/* <Route path="/courses/addcourse" element={<AddCourse />} />
                        <Route path="/courses" element={<CourseList />} />
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
        </div>
      </div>
    </div>
  );
};

export default Homepage;
