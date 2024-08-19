import React, { useState, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import UserNavbar from "../../components/User/UserNavbar";
import AnimationScreen from "../../components/User/AnimationScreen";
import ErrorPage from "../ErrorPage";

const Homepage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const coursesRef = useRef(null);
  const tutorRef = useRef(null);
  const teamRef = useRef(null);
  const plansRef = useRef(null);
  const diagnosisRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <div className="w-full">
      <UserNavbar
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        coursesRef={coursesRef}
        tutorRef={tutorRef}
        teamRef={teamRef}
        plansRef={plansRef}
        diagnosisRef={diagnosisRef}
        contactRef={contactRef}
      />
      <div className="maincontainer h-screen w-full flex flex-col justify-center items-center animationapart overflow-x-hidden">
        <div className="flex flex-col flex-grow w-full overflow-y-auto Test">
          <div className="w-full">
            <Routes>
              <Route
                path="/*"
                element={
                  <AnimationScreen
                    coursesRef={coursesRef}
                    tutorRef={tutorRef}
                    teamRef={teamRef}
                    plansRef={plansRef}
                    diagnosisRef={diagnosisRef}
                    contactRef={contactRef}
                  />
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
