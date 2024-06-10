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
import Signup from "../components/User/Signup";


import SignupPersonalDetails from '../components/User/SignupPersonalDetails/SignupPersonalDetails';
import SignupOtp from '../components/User/SignupOtp/SignupOtp';
import SignupSat from '../components/User/SignupSat/SignupSat';
import SignupEducation from '../components/User/SignupEducation/SignupEducation';
import StudentHomepage from '../pages/student/StudentHomepage';
import HomePageContact from "../components/User/HomePageContact/HomePageContact";
import ErrorPage from "../pages/ErrorPage";
import SignupRoute from "./SignupRoute";
import Student_Diagnostic from "../components/User/Student_Diagnostic/Student_Diagnostic";
import Background from "../components/reusable/Background";
import Student_Diagnostic_Test from "../components/User/Student_Diagnostic_Test/Student_Diagnostic_Test";
import DiagnosisTest from "../pages/student/DiagnosisTest";
import UserEditProfile from "../components/User/UserEditProfile";
import ClassesToday from "../components/User/ClassesToday/ClassesToday";

const UserRoutes = () => {
  const user = useSelector((state) => state.token.user);
  console.log(user);

  return (
    <Routes>
      <Route path="/"            element={<Homepage />} />
      <Route path="/login"       element={user ? <Navigate to="/home" /> : <Login />} />
      
      <Route path="/student/*"   element={<StudentHomepage />}  />
      <Route path="/signup/*"      element={user ? <Navigate to="/home" /> : <SignupRoute />} />
        <Route path='/HomePageContact' element={<HomePageContact />}/>
        <Route path='/diagnosistest' element={<Student_Diagnostic />}/>
        <Route path='/diagnosistest/intructions' element={<Student_Diagnostic_Test/>}/>
        <Route path='/diagnosistest/test1' element={<DiagnosisTest/>}/>
       
      <Route path='*' element={<div className='w-screen h-screen'> <ErrorPage /> </div>}/>
    </Routes>
  );
};

  
export default UserRoutes


