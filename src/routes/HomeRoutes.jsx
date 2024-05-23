import React from 'react'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Homepage from '../pages/admin/Homepage';



const HomeRoutes = () => {
    return (


        <Routes>

            <Route path="/*" element={<Homepage />} />

        </Routes>






    )
}

export default HomeRoutes