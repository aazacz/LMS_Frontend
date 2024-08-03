import React from "react";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import Student_Diagnostic_Test from "../components/User/Student_Diagnostic_Test/Student_Diagnostic_Test";
import DiagnosisTest from "../pages/student/DiagnosisTest";
import DiagnosisTestResult from "../pages/student/DiagnosisTestResult";
import ErrorPage from "../pages/ErrorPage";
import PaymentForTest from "../pages/student/PaymentForTest";

const DiagnosisTestRoute = () => {
  return (
    <Routes>
      <Route path="/instructions" element={<Student_Diagnostic_Test />} />
      <Route path="/test" element={<DiagnosisTest />} />
      <Route path="/result" element={<DiagnosisTestResult />} />
      <Route path="/payment" element={<PaymentForTest />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default DiagnosisTestRoute;
