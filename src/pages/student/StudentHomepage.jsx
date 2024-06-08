import React, { useState } from 'react'
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import { useSelector } from 'react-redux';
import DiagnosisTest from './DiagnosisTest';
import UserNavbar from '../../components/User/UserNavbar';
import ErrorPage from '../ErrorPage';
import DiagnosisTestResult from './DiagnosisTestResult';
import CourseList from '../../components/User/CourseList';
import Coursedetails from '../../components/User/Coursedetails';
import TutorListing from '../../components/User/TutorListing';
import Assignments from './Assignments';

const StudentHomepage = () => {

    const user = useSelector((state) => state.token.user)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className=" h-screen w-screen overflow-y-scroll flex flex-col  items-center Test">

            <div className="sticky top-0 z-10">
                    <UserNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            </div>

            <div className="flex flex-col   ">


                {/* Main Content */}

                <div className="flex-grow overflow-auto ">
                    <Routes>
                        <Route path="/*" element={<DiagnosisTest />} />
                        <Route path="/diagnosistestresult" element={<DiagnosisTestResult />} />
                        <Route path="/courses" element={<CourseList />} />
                        <Route path="/courses/:coursedetails" element={<Coursedetails />} />
                        <Route path="/assignments" element={<Assignments />} />
                        {/* <Route path="/coursedetails" element={<Coursedetails />} /> */}
                        <Route path="/tutors" element={<TutorListing />} />

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
                </div>
            </div>
        </div>
    )
}

export default StudentHomepage