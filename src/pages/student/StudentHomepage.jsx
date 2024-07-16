import React, { useState } from "react";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import { useSelector } from "react-redux";
// import DiagnosisTest from "./DiagnosisTest";
import StudentNavbar from "../../components/User/StudentNavbar";
import ErrorPage from "../ErrorPage";
import DiagnosisTestResult from "./DiagnosisTestResult";
import CourseList from "../../components/User/CourseList";
import Coursedetails from "../../components/User/Coursedetails";
// import TutorListing from "../../components/User/TutorListing";
import Assignments from "./Assignments";
import Library from "../../components/User/Library";
import ClassesToday from "../../components/User/ClassesToday/ClassesToday";
import Dashboard from "../../components/User/Dashboard/Dashboard";
import ShoppingCart from "../../components/User/ShoppingCart";
import Checkout from "../../components/User/Checkout";
import UserSidebar from "../../components/User/UserSidebar";
import Settings from "../../components/User/Settings/Settings";
import StudentTests from "../../components/User/StudentTests";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const StudentHomepage = () => {

  const user = useSelector((state) => state.StudentDetails.token);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const cartItem =  sessionStorage.getItem("PersonalCart")


  
  const queryClient = new QueryClient();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
        <QueryClientProvider client={queryClient}>


  {/* Navbar component */}
      <StudentNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      
        <div className="flex  w-full relative  ">

   {/* Side Bar component  */}
          <UserSidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            />


{/* Body components  */}
          <div className="flex-1    ">
            <div className="w-full h-auto">
              <Routes>
                <Route path="/*" element={<Dashboard />} />
                <Route
                  path="/diagnosistestresult"
                  element={<DiagnosisTestResult />}
                />
                <Route path="/courses" element={<CourseList />} />
                <Route path="/tests" element={<StudentTests />} />
                <Route path="/courses/:coursedetails/:courseType"    element={<Coursedetails />}   />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/tutors" element={<ClassesToday />} />
                <Route path="/library" element={<Library />} />
                <Route path="/classestoday" element={<ClassesToday />} />
                <Route path="/settings/*" element={<Settings />} />
                <Route path="/courses/cart" element={<ShoppingCart />} />
                <Route path="/courses/checkout" element={<Checkout />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </div>
          </div>
        </div>
        </QueryClientProvider>
    </>
  );
};

export default StudentHomepage;
