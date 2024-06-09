import React from "react";
import { Route, Routes, Navigate, BrowserRouter as Router, } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/student/Login";
import Homepage from "../pages/student/HomePage";
import Signup from "../components/User/Signup";
import Animation_ReviewPage from "../components/User/Animation_ReviewPage/Animation_ReviewPage";
import Animation_Courses from "../components/User/Animation_Courses/Animation_Courses";
import Animation_Tutor from "../components/User/Animation_Tutor/Animation_Tutor";
import Animation_Methodolgy from "../components/User/Animation_Methodology/Animation_Methodolgy";

import SignupPersonalDetails from '../components/User/SignupPersonalDetails/SignupPersonalDetails';
import SignupOtp from '../components/User/SignupOtp/SignupOtp';
import SignupSat from '../components/User/SignupSat/SignupSat';
import SignupEducation from '../components/User/SignupEducation/SignupEducation';
import StudentHomepage from '../pages/student/StudentHomepage';
import HomePageContact from "../components/User/HomePageContact/HomePageContact";
import ErrorPage from "../pages/ErrorPage";
import SignupRoute from "./SignupRoute";


  const UserRoutes = () => {
  const user = useSelector((state) => state.token.user)
  console.log(user)


  return (
    
    <Routes>
      <Route path="/"            element={<Homepage />} />
      <Route path="/login"       element={user ? <Navigate to="/home" /> : <Login />} />
      
      <Route path="/student/*"   element={<StudentHomepage />}  />
      <Route path="/signup/*"      element={user ? <Navigate to="/home" /> : <SignupRoute />} />
        <Route path='/HomePageContact' element={<HomePageContact />}/>
      <Route path='*' element={<div className='w-screen h-screen'> <ErrorPage /> </div>}/>
    </Routes>

  )
}

export default UserRoutes


