import React, { useState, useRef, useEffect } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Sidebar from "../../components/admin/Sidebar";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import CourseStructure from "../../components/admin/CourseStructure/CourseStructure";
import TutorListing from "../../components/admin/TutorListing";
import TutorForm from "../../components/admin/TutorDetails";
import AddTutor from "../../components/admin/AddTutor";
import StudentList from "../../components/admin/StudentList";
import TutorDetails from "../../components/admin/TutorDetails";
import DiagnosisTest from "../../components/admin/DiagnosisTest";
import Addiagnosistest from "../../components/admin/Addiagnosistest";
import Coursedetails from "../../components/admin/CourseDetails/Coursedetails";
import CourseList from "../../components/admin/CourseList/CourseList";
import Library from "../../components/admin/Library";
import AddCourse from "../../components/admin/AddCourse";
import Dashboard from "../../components/admin/Dashboard/Dashboard";
import StudentDetail from "../../components/admin/StudentDetail/StudentDetail";
import CourseStructureList from "../../components/admin/CourseStructure/CourseStructureList";
import CourseStructureDetails from "../../components/admin/CourseStructure/CourseStructureDetails";
import Admin_Material from "../../components/admin/UploadMaterial/Admin_Material";
import AddCourseStructure from "../../components/admin/AddCourseStructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminSidebar from "../../components/admin/AdminSidebar";
import DiagnosisiTestDetailsPage from "../../components/admin/DiagnosisiTestDetailsPage";
import Settings from "../../components/admin/Settings/Settings";
import Package from "../../components/admin/Package";
import Report from "../../components/admin/Report/Report";
import EditDiagnosistest from "../../components/admin/EditDiagnosistest";

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
          <AdminNavbar
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
        </div>

        <div className=" fixed  flex  w-full h-[90dvh] overflow-hidden ">
          {/* <Sidebar isOpen={isSidebarOpen} /> */}

          <div className=" h-full ">
            <AdminSidebar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>

          <div className="flex-1   w-full  overflow-auto  ">
            <div className="w-full   ">
              <Routes>
                <Route path="/*"                                                element={<Dashboard />} />
                <Route path="/courses/addcourse"                                element={<AddCourse edit={false} />} />
                <Route path="/courses/editcourse/:courseId"                     element={<AddCourse edit={true} />} />
                <Route path="/courses"                                          element={<CourseList />} />
                <Route path="/courses/:courseId/:courseType/:enrolled/:role"    element={<Coursedetails edit={false}  />} />
                <Route path="/courses/:courseId/:courseType/:enrolled/:role"    element={<Coursedetails edit={true} />} />
                
                <Route path="/coursestructure"                                  element={<CourseStructureList />} />
                <Route path="/courseStructure/addcoursestructure"               element={<AddCourseStructure view={false} />} />
                <Route path="/courseStructure/viewcoursestructure/:structureId" element={<AddCourseStructure view={true} />} />
                <Route path="/coursestructure/:structureId"                     element={<CourseStructureDetails />} />
                <Route path="/coursestructure/editcoursestructure/:structureId" element={<AddCourseStructure view={false} />} />
               
                <Route path="/package"                                          element={< Package/>} />
                <Route path="/students/:studentId"                              element={<StudentDetail />} />
                <Route path="/students"                                         element={<StudentList />} />
                <Route path="/tutors/addtutor"                                  element={<AddTutor />} />
                <Route path="/diagnosistest/addiagnosistest"                    element={<Addiagnosistest />} />
                <Route path="/diagnosistest/:diagnosisiTestDetailsPage"         element={<DiagnosisiTestDetailsPage />} />
                <Route path="/diagnosistest"                                    element={<DiagnosisTest />} />
                <Route path="/report"                                           element={<Report />} />
                <Route path="/tutors/:tutorId"                                  element={<TutorDetails />} />
                <Route path="/tutors"                                           element={<TutorListing />} />
                <Route path="/library"                                          element={<Library />} />
                <Route path="/library/uploadmaterial"                           element={<Admin_Material />} />
                <Route path="/settings/*"                                       element={<Settings />} />
                <Route path="*"                                                 element={<ErrorPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </QueryClientProvider>
    </>
  );
};

export default Homepage;
