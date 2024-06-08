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
import Library from '../../components/User/Library';

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

                <div className="flex-grow overflow-auto  shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                    <Routes>
                        <Route path="/*" element={<DiagnosisTest />} />
                        <Route path="/diagnosistestresult" element={<DiagnosisTestResult />} />
                        <Route path="/courses" element={<CourseList />} />
                        <Route path="/courses/:coursedetails" element={<Coursedetails />} />
                        <Route path="/assignments" element={<Assignments />} />
                        <Route path="/tutors" element={<TutorListing />} />
                        <Route path="/library" element={<Library />} />

                        {/* <Route path="/diagnosistest" element={<DiagnosisTest />} /> */}
                       

                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default StudentHomepage