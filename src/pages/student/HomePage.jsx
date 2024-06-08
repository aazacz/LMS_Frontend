<<<<<<< HEAD
import React, { useState } from 'react';
import AdminNavbar from '../../components/admin/AdminNavbar';
// import Sidebar from '../../components/admin/Sidebar';
import { Route, Routes } from "react-router-dom";
import ErrorPage from '../ErrorPage';
import CourseStructure from '../../components/admin/CourseStructure';
import TutorListing from '../../components/admin/TutorListing';
import AddTutor from '../../components/admin/AddTutor';
import StudentList from '../../components/admin/StudentList';
import TutorDetails from '../../components/admin/TutorDetails';
import DiagnosisTest from '../../components/admin/DiagnosisTest';
import Addiagnosistest from '../../components/admin/Addiagnosistest';
import Coursedetails from '../../components/admin/Coursedetails';
import CourseList from '../../components/admin/CourseList';
import Library from '../../components/admin/Library';
import AddCourse from '../../components/admin/AddCourse';
import StudentDetail from '../../components/admin/StudentDetail';
import UserNavbar from '../../components/User/UserNavbar';
import AnimationScreen from '../../components/User/AnimationScreen';

const Homepage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className=" h-screen overflow-hidden">
       
                <div className="sticky top-0 z-10">
                    <UserNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                </div>

            <div className="flex flex-col flex-grow">
             

=======
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
        <div className="flex-grow overflow-auto ">
          <Routes>
            <Route path="/*" element={<AnimationScreen />} />
            {/* <Route path="/courses/addcourse" element={<AddCourse />} />
                        <Route path="/courses" element={<CourseList />} />
=======
<<<<<<< HEAD
>>>>>>> 8251c27ef896e88df8bf84a309df15eb94dc44bf
                {/* Main Content */}

                <div className="flex-grow overflow-auto ">
                    <Routes>
                        <Route path="/*" element={<AnimationScreen/>} />
<<<<<<< HEAD
                        {/* <Route path="/courses/addcourse" element={<AddCourse />} />
                        <Route path="/courses" element={<CourseList />} />
=======
                        {/* <Route path="/sdiagnosistest" element={<DiagnosisTest />} /> */}
                        {/* <Route path="/courses/addcourse" element={<AddCourse />} />
>>>>>>> 92dd149404d1db359c1cc2825a382ca61612e5f1
>>>>>>> 8251c27ef896e88df8bf84a309df15eb94dc44bf
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
<<<<<<< HEAD
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
=======
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
>>>>>>> 8251c27ef896e88df8bf84a309df15eb94dc44bf
};

export default Homepage;
