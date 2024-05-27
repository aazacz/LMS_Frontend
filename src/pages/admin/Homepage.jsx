import React, { useState } from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import Sidebar from '../../components/admin/Sidebar'
import { Route, Routes } from "react-router-dom";
import ErrorPage from '../ErrorPage';
import CourseStructure from '../../components/admin/CourseStructure';
import TutorListing from '../../components/admin/TutorListing';
import TutorForm from '../../components/admin/TutorForm';
import AddTutor from '../../components/admin/AddTutor';
import StudentList from '../../components/admin/StudentList';

const Homepage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    return (
        <>
          <div className='flex w-full relative '>
            <Sidebar isOpen={isSidebarOpen} />
                <div className='w-full px-2 '>
                <AdminNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

                    <Routes>
                    <Route path="/*" element={<div className='w-full h-10 bg-red-400'>Welcome to the Admin Dashboard</div>} />
                    <Route path="/coursestructure" element={<CourseStructure />} />
                    <Route path="/students" element={<StudentList />} />
                    <Route path="/tutors/addtutor" element={<AddTutor />} />
                    <Route path="/tutors/tutorform" element={<TutorForm />} />
                    <Route path="/tutors" element={<TutorListing />} />
                    <Route path="*" element={<ErrorPage />} />
                    </Routes>

                </div>
            </div>
        </>
    )
}

export default Homepage