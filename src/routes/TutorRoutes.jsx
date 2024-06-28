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
import TutorLogin from '../pages/tutor/Login';


const TutorRoutes = () => {
  const user = useSelector((state) => state.TutorDetails.token)
  return (

        <Routes>
          
            <Route path="/" element={user ? <Navigate to="/tutor/home" /> : <TutorLogin />} />

            {/* <Route path='/' element={<Homepage/>}/> */}
            <Route path="/home/*" element={user ? <Homepage/> : <Navigate to="/tutor" />}/>



        <Route path='*' element={<div className='w-screen h-screen'> <ErrorPage /> </div>}/>

        </Routes>
      

  )
}

export default TutorRoutes
