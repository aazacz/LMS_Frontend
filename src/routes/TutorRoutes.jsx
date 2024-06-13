import React from 'react'
import {
    Route,
    Routes,
    Navigate,
    BrowserRouter as Router,
  } from "react-router-dom";
import ErrorPage from '../pages/ErrorPage';
import Homepage from '../pages/tutor/Homepage';
import { useSelector } from 'react-redux';
import AdminLogin from '../pages/admin/Login';


const TutorRoutes = () => {
  const user = useSelector((state) => state.token.user)
  return (

        <Routes>
          
            <Route path="/" element={true ? <Navigate to="/tutor/home" /> : <AdminLogin />} />

            {/* <Route path='/' element={<Homepage/>}/> */}
            <Route path="/home/*" element={true ? <Homepage/> : <Navigate to="/tutor" />}/>








        <Route path='*' element={<div className='w-screen h-screen'> <ErrorPage /> </div>}/>

        </Routes>
      

  )
}

export default TutorRoutes
