import React, { useState, useRef, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import TutorNavbar from "../../components/tutor/TutorNavbar";
import Sidebar from "../../components/tutor/Sidebar";
import Dashboard from "../../components/tutor/Dashboard/Dashboard";
import Content from "../../components/tutor/Content";
import QuestionBank from "../../components/tutor/QuestionBank/QuestionBank";
import Insights from "../../components/tutor/Insights";
import Settings from "../../components/tutor/Settings/Settings";
import ErrorPage from "../ErrorPage";
import Coursedetails from "../../components/tutor/Coursedetails";
import Assignments from "../../components/tutor/Assignment/Assignments";
import NewCourse from "../../components/tutor/NewCourse/NewCourse";
import Material from "../../components/tutor/Material/Material";
import AddTest from "../../components/tutor/AddTest";
import Students from "../../components/tutor/Students";
import StudentDetail from "../../components/tutor/StudentDetail/StudentDetail";
import Grading from "../../components/tutor/Grading/Grading";
import Library from "../../components/tutor/Library";
import GradingAssignment from "../../components/tutor/GradingAssignment";
import MarksGrading from "../../components/tutor/MarksGrading";

const Homepage = () => {
  const divRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [Ref, SetRef] = useState();

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
            <Route
              path="/courses/:courseId"
              element={<Coursedetails height={Ref} />}
            />
            <Route path="/content/newcourse" element={<NewCourse />} />
            <Route
              path="/content/:courseId/newassignment"
              element={<Assignments />}
            />
            <Route path="/content/:courseId/addtest" element={<AddTest />} />
            <Route path="/content/:courseId/material" element={<Material />} />
            <Route path="/questionbank" element={<QuestionBank />} />
            <Route path="/library" element={<Library />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/:studentId" element={<StudentDetail />} />
            <Route path="/grading" element={<Grading />} />
            <Route
              path="/grading/assignment/:assignmentId"
              element={<GradingAssignment />}
            />
            <Route
              path="/grading/assignment/:assignmentId/marks"
              element={<MarksGrading />}
            />
            <Route path="/insights" element={<Insights />} />
            <Route path="/settings/*" element={<Settings />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Homepage;
