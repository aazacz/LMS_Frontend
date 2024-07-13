import React from "react";
import {  Route,  Routes,  Navigate,  BrowserRouter as Router,} from "react-router-dom";
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
import  axios  from "axios";
import DiagnosisTestRoute from "./DiagnosisTestRoute";

let token
const baseURL = process.env.REACT_APP_API_URL;


export const axiosInstanceStudent = axios.create()

axiosInstanceStudent.interceptors.request.use(function(config){

    config.baseURL = baseURL
    console.log("Interceptor req Send");

    console.log(`authorization-key ${token}`);
   
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
    return config;
},function (error) {
    return Promise.reject(error)
}
)



axiosInstanceStudent.interceptors.response.use(function (response) {
      
    console.log ( "response received"  + response.data.message);
    
    if(response.data.message === "TimedOut"){

        }
   return response;

},function (error) {
    return Promise.reject(error);
  })



const UserRoutes = () => {
  const user = useSelector((state) => state.StudentDetails.token);
       token = useSelector((state) => state.StudentDetails.token);
       
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login"   element={user ? <Navigate to="/student" /> : <Login />}   />
      <Route path="/student/*" element={user?<StudentHomepage User={true} /> : <Navigate to="/login" />} />
      <Route path="/signup/*" element={<SignupRoute />} />
      <Route path="/diagnosistest" element={<Student_Diagnostic />} />
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
