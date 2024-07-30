import React, { useState } from "react";
import {  Route,  Routes,  Navigate,  BrowserRouter as Router} from "react-router-dom";
import { useSelector } from "react-redux";
import StudentNavbar from "../../components/User/StudentNavbar";
import ErrorPage from "../ErrorPage";
import DiagnosisTestResult from "./DiagnosisTestResult";
import CourseList from "../../components/User/CourseList";
import Coursedetails from "../../components/User/CourseDetails/Coursedetails";
import Assignments from "./Assignments";
import Library from "../../components/User/Library/Library";
import ClassesToday from "../../components/User/ClassesToday/ClassesToday";
import Dashboard from "../../components/User/Dashboard/Dashboard";
import ShoppingCart from "../../components/User/ShoppingCart";
import Checkout from "../../components/User/Checkout";
import UserSidebar from "../../components/User/UserSidebar";
import StudentTests from "../../components/User/StudentTests";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PaymentSuccess from "../../components/User/PaymentSuccess";
import Settings from "../../components/reusable/Settings/Settings";
import DiagnosisTestRoute from "../../routes/DiagnosisTestRoute";

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
  <div className="sticky top-0 z-10 w-full">
      <StudentNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
  </div>
      
      
  <div className=" fixed  flex  w-full h-[90dvh] overflow-hidden ">

   {/* Side Bar component  */}
   <div className="">
          <UserSidebar  isSidebarOpen={isSidebarOpen}      setIsSidebarOpen={setIsSidebarOpen}   />
   </div>


{/* Body components  */}
      <div className="flex-1   w-full  overflow-auto  ">
      <div className="w-full   ">
              <Routes>
                <Route path="/*" element={<Dashboard />} />
                <Route path="/diagnosistestresult"   element={<DiagnosisTestResult />}  />
                <Route path="/a" element={<PaymentSuccess />} />
                <Route path="/courses" element={<CourseList />} />
                <Route path="/tests" element={<StudentTests />} />
                <Route path="/courses/:courseId/:courseType/:enrolled/:role"    element={<Coursedetails />}   />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/tutors" element={<ClassesToday />} />
                <Route path="/library" element={<Library />} />
                <Route path="/classestoday" element={<ClassesToday />} />
                <Route path="/settings/*" element={<Settings />} />
                <Route path="/courses/cart" element={<ShoppingCart />} />
                <Route path="/courses/checkout" element={<Checkout />} />
                <Route path="/courses/test/:testId/*" element={<DiagnosisTestRoute />} />
                {/* <Route path="/courses/test/:testId" element={<DiagnosisTestRoute />} /> */}
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
