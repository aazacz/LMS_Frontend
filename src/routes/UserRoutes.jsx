<<<<<<< HEAD
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
import Animation_ReviewPage from "../components/User/Animation_ReviewPage/Animation_ReviewPage";
import Animation_Courses from "../components/User/Animation_Courses/Animation_Courses";
import Animation_Tutor from "../components/User/Animation_Tutor/Animation_Tutor";
import Animation_Methodolgy from "../components/User/Animation_Methodology/Animation_Methodolgy";

const UserRoutes = () => {
  const user = useSelector((state) => state.token.user);
  console.log(user);
=======
import React from 'react'
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from '../pages/student/Login';
import Homepage from '../pages/student/HomePage';
import Signup from '../components/User/Signup';
<<<<<<< HEAD
import SignupPersonalDetails from '../components/User/SignupPersonalDetails/SignupPersonalDetails';
import SignupOtp from '../components/User/SignupOtp/SignupOtp';
import SignupSat from '../components/User/SignupSat/SignupSat';
import SignupEducation from '../components/User/SignupEducation/SignupEducation';
=======
import StudentHomepage from '../pages/student/StudentHomepage';
>>>>>>> fd2eee2427fc4ad38156d23b0ce77539469cd421

const UserRoutes = () => {

    const user = useSelector((state) => state.token.user)
    console.log(user)

>>>>>>> c47d8d5d0a8990cd8b71e1bb3b527dc11be15b34
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/home" /> : <Login />}
      />
      <Route
        path="/Signup"
        element={user ? <Navigate to="/home" /> : <Signup />}
      />
      <Route
        path="/review"
        element={user ? <Navigate to="/home" /> : <Animation_ReviewPage />}
      />
      <Route
        path="/courses"
        element={user ? <Navigate to="/home" /> : <Animation_Courses />}
      />
      <Route
        path="/tutor"
        element={user ? <Navigate to="/home " /> : <Animation_Tutor />}
      />
      <Route
        path="/methodology"
        element={user ? <Navigate to="/home " /> : <Animation_Methodolgy />}
      />

<<<<<<< HEAD
      {/* <Route path="/home/*" element={user ? <Homepage /> : <Navigate to="/admin" />} /> */}
    </Routes>
  );
};
=======
    <Route path="/" element={ <Homepage />} />
    <Route path="/student/*" element={ <StudentHomepage />} />
    <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
    <Route path="/Signup" element={user ? <Navigate to="/home" /> : <Signup />} />
    {/* <Route path="/home/*" element={user ? <Homepage /> : <Navigate to="/admin" />} /> */}
<<<<<<< HEAD
    <Route path='/SignupPersonalDetails' element={<SignupPersonalDetails />}></Route>
    <Route path='/SignupOtp' element={<SignupOtp />}></Route>
    <Route path='/SignupSat' element={<SignupSat />}></Route>
    <Route path='/SignupEducation' element={<SignupEducation />}></Route>

</Routes>
  )
}

export default UserRoutes
=======
>>>>>>> c47d8d5d0a8990cd8b71e1bb3b527dc11be15b34

export default UserRoutes;
>>>>>>> fd2eee2427fc4ad38156d23b0ce77539469cd421
