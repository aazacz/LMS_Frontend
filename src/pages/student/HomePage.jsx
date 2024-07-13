
import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import ErrorPage from '../ErrorPage';
import UserNavbar from '../../components/User/UserNavbar';
import AnimationScreen from '../../components/User/AnimationScreen';


const Homepage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className="sticky top-0 z-10 w-full">
        <UserNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>

      <div className="maincontainer h-screen w-full flex flex-col justify-center items-center animationapart overflow-x-hidden">
        <div className="flex flex-col flex-grow w-full overflow-y-auto Test">
          {/* Main Content */}
          <div className="w-full">
            <Routes>
              <Route path="/*" element={<AnimationScreen />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Homepage
