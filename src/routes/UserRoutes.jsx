import React from 'react'
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from '../pages/student/Login';
import Homepage from '../pages/student/HomePage';
import Signup from '../components/User/Signup';
import StudentHomepage from '../pages/student/StudentHomepage';

const UserRoutes = () => {

    const user = useSelector((state) => state.token.user)
    console.log(user)

  return (
    <Routes>

    <Route path="/" element={ <Homepage />} />
    <Route path="/student/*" element={ <StudentHomepage />} />
    <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
    <Route path="/Signup" element={user ? <Navigate to="/home" /> : <Signup />} />
    {/* <Route path="/home/*" element={user ? <Homepage /> : <Navigate to="/admin" />} /> */}


</Routes>
  )
}

export default UserRoutes