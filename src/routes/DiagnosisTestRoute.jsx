import React from "react";
import {  Route,  Routes,  Navigate,  BrowserRouter as Router,} from "react-router-dom";
import Student_Diagnostic_Test from "../components/User/Student_Diagnostic_Test/Student_Diagnostic_Test";
import DiagnosisTest from "../pages/student/DiagnosisTest";
import DiagnosisTestResult from "../pages/student/DiagnosisTestResult";
import ErrorPage from "../pages/ErrorPage";

const DiagnosisTestRoute = () => {
  return (
    <Routes>
      <Route path="/instructions" element={<Student_Diagnostic_Test />} />
      <Route path="/test1" element={<DiagnosisTest />} />
      <Route path="/result" element={<DiagnosisTestResult />} />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default DiagnosisTestRoute;
