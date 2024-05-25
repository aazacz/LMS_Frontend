import React from 'react'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Homepage from '../pages/admin/Homepage';
import AdminLogin from '../pages/Login';



const HomeRoutes = () => {
    return (


        <Routes>

            {/* <Route path="/*" element={<AdminLogin />} /> */}
            <Route path="/*" element={<Homepage />} />

        </Routes>






    )
}

export default HomeRoutes