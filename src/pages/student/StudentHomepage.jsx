import React, { useState } from "react";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import { useSelector } from "react-redux";
import DiagnosisTest from "./DiagnosisTest";
import StudentNavbar from "../../components/User/StudentNavbar"
import ErrorPage from "../ErrorPage";
import DiagnosisTestResult from "./DiagnosisTestResult";
import CourseList from "../../components/User/CourseList";
import Coursedetails from "../../components/User/Coursedetails";
import TutorListing from "../../components/User/TutorListing";
import Assignments from "./Assignments";
import Library from "../../components/User/Library";
import ClassesToday from "../../components/User/ClassesToday/ClassesToday";
import Dashboard from "../../components/User/Dashboard/Dashboard";
import ShoppingCart from "../../components/User/ShoppingCart";
import Checkout from "../../components/User/Checkout";
import UserSidebar from "../../components/User/UserSidebar";
import Settings from "../../components/User/Settings/Settings";

const StudentHomepage = ({ User }) => {
  const user = useSelector((state) => state.StudentDetails.token);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex h-screen w-full relative ">
        <UserSidebar className="h-screen z-30"  isOpen={isSidebarOpen} />
    <>
    <div className="w-screen flex">
      <div className="w-max">

    <UserSidebar isOpen={isSidebarOpen} />
      </div>
    <div className="flex-1  w-full ">
        
        <div className="w-full px-2 ">
          <div className="h-auto z-30 sticky top-0 ">
           <StudentNavbar className="w-screen sticky"toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          </div>
          
         
          
          <Routes>
             <Route path="/*" element={<Dashboard />} />
             <Route
              path="/diagnosistestresult"
              element={<DiagnosisTestResult />}
            />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/:coursedetails" element={<Coursedetails />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/tutors" element={<ClassesToday />} />
            <Route path="/library" element={<Library />} />
            <Route path="/classestoday" element={<ClassesToday />} />
            <Route path="/settings/*" element={<Settings />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/cart/checkout" element={<Checkout />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
      </div>
      </>
  );
};

export default StudentHomepage;
