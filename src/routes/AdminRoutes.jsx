import React from 'react'
import Homepage from '../pages/admin/Homepage';
import AdminLogin from '../pages/admin/Login';
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import { useSelector } from 'react-redux';
import ErrorPage from '../pages/ErrorPage';



const HomeRoutes = () => {
    const user = useSelector((state) => state.AdminDetails.token)

    return (


        <Routes>

            <Route path="/" element={user ? <Navigate to="/admin/home" /> : <AdminLogin />} />
            {/* <Route path="/" element={ <Navigate to="/admin/home" />     } /> */}
            <Route path="/home/*" element={user ?<Homepage />:<Navigate to="/admin" />} />
            <Route path="/*" element={<ErrorPage/>} />


        </Routes>






    )
}

export default HomeRoutes