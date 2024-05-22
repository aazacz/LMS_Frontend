import React from 'react'
import { Router } from 'react-router-dom'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Homepage from '../pages/admin/Homepage';



const HomeRoutes = () => {
    return (
        <>
            <Router>
                <Routes>

                    <Route path="/*" element={<Homepage />} />

                </Routes>
            </Router>




        </>
    )
}

export default HomeRoutes