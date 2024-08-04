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
import axios from "axios";
import DiagnosisTestRoute from "./DiagnosisTestRoute";
import { AnimatePresence, motion } from "framer-motion";
import ViewAllCourses from "../components/User/ViewAllCourses";

let token;
const baseURL = process.env.REACT_APP_API_URL;

export const axiosInstanceStudent = axios.create();

axiosInstanceStudent.interceptors.request.use(
  function (config) {
    config.baseURL = baseURL;

    // console.log(`authorization-key ${token}`);

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    console.log("error in the interceptor request");
    return Promise.reject(error);
  }
);

axiosInstanceStudent.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const UserRoutes = () => {
  const user = useSelector((state) => state.StudentDetails);

  token = useSelector((state) => state.StudentDetails.token);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/student" /> : <Login />}
        />
        <Route
          path="/student/*"
          element={
            user ? (
              user.isDiagnosisTestTaken ? (
                <StudentHomepage User={true} />
              ) : (
                <Navigate to="/diagnosistest" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/signup/*" element={<SignupRoute />} />
        <Route path="/diagnosistest" element={<Student_Diagnostic />} />
        <Route path="/diagnosistest/*" element={<DiagnosisTestRoute />} />

        {/* <Route path="*"
        element={
          <div className="w-screen h-screen">
            {" "}
            <ErrorPage />{" "}
          </div>
        }
      /> */}
      </Routes>
    </AnimatePresence>
  );
};

export default UserRoutes;
