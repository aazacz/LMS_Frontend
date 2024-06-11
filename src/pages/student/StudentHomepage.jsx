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
import Dashboard from '../../components/User/Dashboard/Dashboard';
import ClassesToday from '../../components/User/ClassesToday/ClassesToday';
import UserEditProfile from '../../components/User/UserEditProfile';
import ShoppingCart from '../../components/User/ShoppingCart';
import Checkout from '../../components/User/Checkout';

const StudentHomepage = ({User}) => {

    const user = useSelector((state) => state.token.user)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className=" h-screen w-screen overflow-y-scroll flex flex-col  items-center Test">

            <div className="sticky top-0 z-10">
                    <UserNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} User={User} />
            </div>

            <div className="flex flex-col   ">


                {/* Main Content */}

                <div className="flex-grow overflow-auto  shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                    <Routes>
                        <Route path="/*"                    element={<Dashboard />} />
                        <Route path="/diagnosistestresult"  element={<DiagnosisTestResult />} />
                        <Route path="/courses"              element={<CourseList />} />
                        <Route path="/courses/:coursedetails" element={<Coursedetails />} />
                        <Route path="/assignments"          element={<Assignments />} />
                        <Route path="/tutors"               element={<TutorListing />} />
                        <Route path="/library"              element={<Library />} />
                        <Route path='/classestoday'         element={<ClassesToday/>}/>
                        <Route path='/settings'             element={<UserEditProfile/>}/>
                        <Route path='/cart' element={<ShoppingCart/>}/>
                        <Route path='/cart/checkout' element={<Checkout/>}/>

                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default StudentHomepage