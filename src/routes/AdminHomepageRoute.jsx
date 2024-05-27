import React from 'react'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Homepage from '../pages/admin/Homepage';
import AdminLogin from '../pages/Login';
import { useSelector } from 'react-redux';



const AdminHomepageRoute = () => {
    const user = useSelector((state)=>state.token.user)

    return (


        <Routes>

            <Route path="/home/*" element={<Homepage/>}/>
            
        </Routes>






    )
}

export default AdminHomepageRoute