import React from "react";
import Dashboard_Overview from "./Dashboard_Overview";
import Dashboard_UpcomingClasses from "./Dashboard_UpcomingClasses";
import Dashboard_Calculations from "./Dashboard_Calculations";
import Dashboard_StudentReview from "./Dashboard_StudentReview";
import Dashboard_TopSellingCourses from "./Dashboard_TopSellingCourses";
import Dashboard_TopStudents from "./Dashboard_TopStudents";

const Dashboard = () => {
  return (
    <div className="w-full  justify-center items-center h-screen overflow-y-scroll no-scrollbar pt-4 p-2  ">
      <div className="w-full flex flex-wrap gap-2">
        {/* Dashboard_Overview takes up the remaining space on larger screens, full width on smaller screens */}
        <div className="flex-grow  p-2 w-full md:w-auto">
          <Dashboard_Overview />
        </div>
        {/* Dashboard_Calculations has a fixed width on larger screens, full width on smaller screens */}
        <div className="w-full md:w-[500px] flex h-max items-center p-2">
          <Dashboard_Calculations />
        </div>
      </div>

      <div className="w-full justify-start items-start flex flex-wrap h-max gap-4 mt-4">
        <div className="w-full lg:w-[55%] h-max ">
          <Dashboard_UpcomingClasses />
        </div>
        <div className="w-full lg:w-[43%] h-max">
          <Dashboard_StudentReview />
        </div>
      </div>
      <div className="w-full mt-4">
        <Dashboard_TopSellingCourses />
      </div>
      <div className="w-full my-4">
        <Dashboard_TopStudents />
      </div>
    </div>
  );
};

export default Dashboard;
