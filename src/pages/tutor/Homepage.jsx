import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import TutorNavbar from "../../components/tutor/TutorNavbar";
import TutorSidebar from "../../components/tutor/TutorSidebar";
import Dashboard from "../../components/tutor/Dashboard/Dashboard";
import Content from "../../components/tutor/Content";
import QuestionBank from "../../components/tutor/QuestionBank/QuestionBank";
import Insights from "../../components/tutor/Insights";
import Settings from "../../components/reusable/Settings/Settings";
import ErrorPage from "../ErrorPage";
import Coursedetails from "../../components/tutor/CourseDetails/Coursedetails";
import Assignments from "../../components/tutor/Assignment/Assignments";
import NewCourse from "../../components/tutor/NewCourse/NewCourse";
import Material from "../../components/tutor/Material/Material";
import AddTest from "../../components/tutor/AddTest";
import Students from "../../components/tutor/Students/Students";
import StudentDetail from "../../components/tutor/StudentDetail/StudentDetail";
import Grading from "../../components/tutor/Grading/Grading";
import Library from "../../components/tutor/Library";
import GradingAssignment from "../../components/tutor/GradingAssignment";
import MarksGrading from "../../components/tutor/MarksGrading";
import AllMaterials from "../../components/tutor/AllMaterials";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Homepage = () => {
  const queryClient = new QueryClient();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="fixed top-0 w-full z-50">
        <TutorNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>
      <div className="flex mt-16">
        <div className="sticky top-16 h-max">
          <TutorSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </div>
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/*" element={<Dashboard />} />
            <Route path="/content" element={<Content />} />
            <Route path="/courses/:courseId/:courseType/:enrolled/:role" element={<Coursedetails />} />
            <Route path="/content/newcourse" element={<NewCourse />} />
            <Route path="/content/:courseId/newassignment" element={<Assignments />} />
            <Route path="/content/:courseId/addtest" element={<AddTest />} />
            <Route path="/content/:courseId/material" element={<Material />} />
            <Route path="/questionbank" element={<QuestionBank />} />
            <Route path="/library" element={<Library />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/:studentId" element={<StudentDetail />} />
            <Route path="/grading" element={<Grading />} />
            <Route path="/grading/assignment/:assignmentId" element={<GradingAssignment />} />
            <Route path="/grading/assignment/:assignmentId/marks" element={<MarksGrading />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/settings/*" element={<Settings />} />
            <Route path="/allmaterials" element={<AllMaterials />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Homepage;
