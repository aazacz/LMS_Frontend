import React, { useState, useRef, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import TutorNavbar from "../../components/tutor/TutorNavbar";
import Sidebar from "../../components/tutor/Sidebar";
import Dashboard from "../../components/tutor/Dashboard";
import Content from "../../components/tutor/Content";
import QuestionBank from "../../components/tutor/QuestionBank";
import Students from "../../components/tutor/Students";
import Grading from "../../components/tutor/Grading";
import Insights from "../../components/tutor/Insights";
import Settings from "../../components/tutor/Settings";
import ErrorPage from "../ErrorPage";

const Homepage = () => {
  // const divRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // const [Ref, SetRef] = useState()

  return (
    <>
      <div className="flex w-full relative ">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="w-full px-2 ">
          <div className="h-auto sticky top-0 ">
            <TutorNavbar
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
            />
          </div>
          <Routes>
            <Route path="/*" element={<Dashboard />} />
            <Route path="/content" element={<Content />} />
            <Route path="/questionbank" element={<QuestionBank />} />
            <Route path="/students" element={<Students />} />
            <Route path="/grading" element={<Grading />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Homepage;
