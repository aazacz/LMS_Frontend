import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import TutorNavbar from "../../components/tutor/TutorNavbar";
import TutorSidebar from "../../components/tutor/TutorSidebar";
import Dashboard from "../../components/tutor/Dashboard/Dashboard";
import Content from "../../components/tutor/Content";
import QuestionBank from "../../components/tutor/QuestionBank/QuestionBank";
import Insights from "../../components/tutor/Insights";
import Settings from "../../components/tutor/Settings/Settings";
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

const Homepage = () => {
  const queryClient = new QueryClient();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      x: "-5vw",
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: "5vw",
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <QueryClientProvider client={queryClient}>
      {/* Navbar Component */}
      <div className="sticky top-0 z-10 w-full">
        <TutorNavbar
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
      </div>

      <div className="fixed flex w-full h-[90dvh] overflow-hidden">
        {/* Sidebar component */}
        <div className="">
          <TutorSidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        {/* Body components */}
        <div className="flex-1 w-full overflow-auto">
          <div className="w-full">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/*" element={<Dashboard />} />
                <Route path="/content" element={<Content />} />
                <Route
                  path="/courses/:courseId/:courseType/:enrolled/:role"
                  element={<Coursedetails />}
                />
                <Route path="/content/newcourse" element={<NewCourse />} />
                <Route
                  path="/content/:courseId/newassignment"
                  element={<Assignments />}
                />
                <Route
                  path="/content/:courseId/addtest"
                  element={<AddTest />}
                />
                <Route
                  path="/content/:courseId/material"
                  element={<Material />}
                />
                <Route path="/questionbank" element={<QuestionBank />} />
                <Route path="/library" element={<Library />} />
                <Route path="/students" element={<Students />} />
                <Route
                  path="/students/:studentId"
                  element={<StudentDetail />}
                />
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
                <Route path="/allmaterials" element={<AllMaterials />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Homepage;
