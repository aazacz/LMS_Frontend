import React from "react";
import CourseTest from "../pages/student/CourseTest";
import { Route, Routes } from "react-router-dom";
import CourseTestResult from "../pages/student/CourseTestResult";

const CourseTestRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/start/:courseId/:testid" element={<CourseTest />} />
        <Route
          path="/CourseTestResult/:resultId"
          element={<CourseTestResult />}
        />
      </Routes>
    </>
  );
};

export default CourseTestRoute;
