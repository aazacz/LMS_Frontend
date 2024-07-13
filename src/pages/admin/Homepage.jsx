import React, { useState, useRef, useEffect } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Sidebar from "../../components/admin/Sidebar";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import CourseStructure from "../../components/admin/CourseStructure";
import TutorListing from "../../components/admin/TutorListing";
import TutorForm from "../../components/admin/TutorDetails";
import AddTutor from "../../components/admin/AddTutor";
import StudentList from "../../components/admin/StudentList";
import TutorDetails from "../../components/admin/TutorDetails";
import DiagnosisTest from "../../components/admin/DiagnosisTest";
import Addiagnosistest from "../../components/admin/Addiagnosistest";
import Coursedetails from "../../components/admin/Coursedetails";
import CourseList from "../../components/admin/CourseList";
import Library from "../../components/admin/Library";
import AddCourse from "../../components/admin/AddCourse";
import Dashboard from "../../components/admin/Dashboard/Dashboard";
import StudentDetail from "../../components/admin/StudentDetail/StudentDetail";
import CourseStructureList from "../../components/admin/CourseStructureList";
import CourseStructureDetails from "../../components/admin/CourseStructureDetails";
import Admin_Material from "../../components/admin/UploadMaterial/Admin_Material";
import AddCourseStructure from "../../components/admin/AddCourseStructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminSidebar from "../../components/admin/AdminSidebar";
import DiagnosisiTestDetailsPage from "../../components/admin/DiagnosisiTestDetailsPage";

const Homepage = () => {
  const queryClient = new QueryClient();

  const divRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [Ref, SetRef] = useState();

  return (
    <>
      <QueryClientProvider client={queryClient}>
      
        <div className="">
        <AdminNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        </div>
       
        <div className="flex  w-full     ">
          {/* <Sidebar isOpen={isSidebarOpen} /> */} 

          <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <div className="flex-1   w-full h-full  overflow-y-auto ">

            <div className="w-full h-auto  ">
              <Routes>
                <Route path="/*" element={<Dashboard />} />
                <Route path="/courses/addcourse" element={<AddCourse />} />
                <Route path="/courses" element={<CourseList />} />
                <Route
                  path="/courses/:courseId"
                  element={<Coursedetails height={Ref} />}
                />
                <Route
                  path="/coursestructure"
                  element={<CourseStructureList />}
                />
                <Route
                  path="/courseStructure/addcoursestructure"
                  element={<AddCourseStructure />}
                />
                <Route
                  path="/coursestructure/:structureId"
                  element={<CourseStructureDetails />}
                />
                {/* <Route path="/coursestructure" element={<CourseStructure />} /> */}
                <Route
                  path="/students/:studentId"
                  element={<StudentDetail />}
                />
                <Route path="/students" element={<StudentList />} />
                <Route path="/tutors/addtutor" element={<AddTutor />} />
                <Route
                  path="/diagnosistest/addiagnosistest"
                  element={<Addiagnosistest />}
                />
                <Route
                  path="/diagnosistest/:diagnosisiTestDetailsPage"
                  element={<DiagnosisiTestDetailsPage />}
                />
                <Route path="/diagnosistest" element={<DiagnosisTest />} />
                <Route path="/tutors/:tutorId" element={<TutorDetails />} />
                {/* <Route path="/tutors/tutorform/" element={<TutorForm />} /> */}
                <Route path="/tutors" element={<TutorListing />} />
                <Route path="/library" element={<Library />} />
                <Route
                  path="/library/uploadmaterial"
                  element={<Admin_Material />}
                />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </QueryClientProvider>
    </>
  );
};

export default Homepage;
