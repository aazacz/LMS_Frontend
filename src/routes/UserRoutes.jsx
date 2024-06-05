import React from 'react'
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from '../pages/student/Login';
import Homepage from '../pages/student/HomePage';
import Signup from '../components/User/Signup';
import SignupPersonalDetails from '../components/User/SignupPersonalDetails/SignupPersonalDetails';
import SignupOtp from '../components/User/SignupOtp/SignupOtp';
import SignupSat from '../components/User/SignupSat/SignupSat';
import SignupEducation from '../components/User/SignupEducation/SignupEducation';

const UserRoutes = () => {
    const user = useSelector((state) => state.token.user)
console.log(user)
  return (
    <Routes>

    <Route path="/" element={ <Homepage />} />
    <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
    <Route path="/Signup" element={user ? <Navigate to="/home" /> : <Signup />} />
    {/* <Route path="/home/*" element={user ? <Homepage /> : <Navigate to="/admin" />} /> */}
    <Route path='/SignupPersonalDetails' element={<SignupPersonalDetails />}></Route>
    <Route path='/SignupOtp' element={<SignupOtp />}></Route>
    <Route path='/SignupSat' element={<SignupSat />}></Route>
    <Route path='/SignupEducation' element={<SignupEducation />}></Route>

</Routes>
  )
}

export default UserRoutes