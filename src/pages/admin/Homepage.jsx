import React, { useState, useRef,useEffect } from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import Sidebar from '../../components/admin/Sidebar'
import { Route, Routes } from "react-router-dom";
import ErrorPage from '../ErrorPage';
import CourseStructure from '../../components/admin/CourseStructure';
import TutorListing from '../../components/admin/TutorListing';
import TutorForm from '../../components/admin/TutorDetails';
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
import Dashboard from '../../components/admin/Dashboard';


const Homepage = () => {
    const divRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const [Ref, SetRef] = useState()

 

    return (
        <>
            <div className='flex w-full relative '>


                <Sidebar isOpen={isSidebarOpen} />

                <div className='w-full px-2 '>
                    <div className='h-auto sticky top-0 '>

                        <AdminNavbar  toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                    </div>

                    <Routes>

                        <Route path="/*" element={<Dashboard/>} />
                        <Route path="/courses/addcourse" element={<AddCourse />} />
                        <Route path="/courses" element={<CourseList />} />
                        <Route path="/courses/:courseId" element={<Coursedetails height={Ref} />} />
                        <Route path="/coursestructure" element={<CourseStructure />} />
                        <Route path="/students/:studentId" element={<StudentDetail />} />
                        <Route path="/students" element={<StudentList />} />
                        <Route path="/tutors/addtutor" element={<AddTutor />} />
                        <Route path="/diagnosistest/addiagnosistest" element={<Addiagnosistest />} />
                        <Route path="/diagnosistest" element={<DiagnosisTest />} />
                        <Route path="/tutors/:tutorId" element={<TutorDetails />} />
                        {/* <Route path="/tutors/tutorform/" element={<TutorForm />} /> */}
                        <Route path="/tutors" element={<TutorListing />} />
                        <Route path="/library" element={<Library />} />
                        <Route path="*" element={<ErrorPage />} />

                    </Routes>

                </div>
            </div>
        </>
    )
}

export default Homepage