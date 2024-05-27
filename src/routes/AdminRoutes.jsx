import React from 'react'
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import Homepage from '../pages/admin/Homepage';
import AdminLogin from '../pages/Login';
import { useSelector } from 'react-redux';



const HomeRoutes = () => {
    const user = useSelector((state) => state.token.user)

    return (


        <Routes>

            <Route path="/" element={user ? <Navigate to="/admin/home" /> : <AdminLogin />} />
            <Route path="/home/*" element={user ? <Homepage /> : <Navigate to="/admin" />} />


        </Routes>






    )
}

export default HomeRoutes