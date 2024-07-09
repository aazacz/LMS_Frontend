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
import DiagnosisTestRoute from "./DiagnosisTestRoute";


const UserRoutes = () => {
  const user = useSelector((state) => state.StudentDetails.token);
  // console.log(user);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login"   element={user ? <Navigate to="/student" /> : <Login />}   />
      <Route path="/student/*" element={user?<StudentHomepage User={true} /> : <Navigate to="/login" />} />
      <Route path="/signup/*" element={<SignupRoute />} />
   
      <Route path="/diagnosistest/*" element={<DiagnosisTestRoute/>} />
      

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
