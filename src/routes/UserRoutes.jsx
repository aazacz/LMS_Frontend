import React from "react";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/student/Login";
import Homepage from "../pages/student/HomePage";
import StudentHomepage from "../pages/student/StudentHomepage";
import ErrorPage from "../pages/ErrorPage";
import SignupRoute from "./SignupRoute";
import Student_Diagnostic from "../components/User/Student_Diagnostic/Student_Diagnostic";
import Student_Diagnostic_Test from "../components/User/Student_Diagnostic_Test/Student_Diagnostic_Test";
import DiagnosisTest from "../pages/student/DiagnosisTest";
import DiagnosisTestResult from "../pages/student/DiagnosisTestResult";

const UserRoutes = () => {
  const user = useSelector((state) => state.StudentDetails.token);
  // console.log(user);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login"   element={user ? <Navigate to="/student" /> : <Login />}   />
      <Route path="/student/*" element={user?<StudentHomepage User={true} /> : <Navigate to="/login" />} />
      <Route path="/signup/*" element={<SignupRoute />} />
      <Route path="/diagnosistest" element={<Student_Diagnostic />} />
      <Route path="/diagnosistest/intructions"   element={<Student_Diagnostic_Test />}     />
      <Route path="/diagnosistest/test1" element={<DiagnosisTest />} />
      <Route path="/diagnosistest/result" element={<DiagnosisTestResult />} />

      <Route
        path="*"
        element={
          <div className="w-screen h-screen">
            {" "}
            <ErrorPage />{" "}
          </div>
        }
      />
    </Routes>
  );
};

export default UserRoutes;
