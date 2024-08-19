import React, { useState } from "react";
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
import CourseTestRoute from "./CourseTestRoute";
import InfoModal from "./InfoModal";

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
  
  const [showModal, setShowModal] = useState(true);
  
  const handleClose = () => {
    setShowModal(false);
  };


  const user = useSelector((state) => state.StudentDetails);

  token = useSelector((state) => state.StudentDetails.token);
  const studentNavigate = () => {
    if (!user.token) return <Navigate to="/login" />;
    if (!user.isDiagnosisTestTaken) return <Navigate to="/diagnosistest" />;
    return <StudentHomepage User={true} />;
  };

  return (
    <>
       {/* {showModal && (
        <InfoModal
          Line1="I added a text editor to the course structure and course, "
          Line2="Therefore you may face error with old course and courseSturuture datas"
          Line3="If error occurs create new COURSE AND COURSE STURUCTURE," 
          onClose={handleClose}
        />
      )} */}
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/login"
          element={user.token ? <Navigate to="/student" /> : <Login />}
        />
        <Route path="/student/*" element={studentNavigate()} />
        <Route path="/coursetest/*" element={<CourseTestRoute />} />
        <Route path="/signup/*" element={<SignupRoute />} />

        <Route
          path="/diagnosistest/*"
          element={
            user.token && user.isDiagnosticTestTaken ? (
              <Navigate to="/student" />
            ) : (
              <DiagnosisTestRoute />
            )
          }
        />

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
    </>
  );
};

export default UserRoutes;
