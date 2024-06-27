import React,{ useState } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { useSelector } from 'react-redux';
import AdminRoutes from './routes/AdminRoutes';
import ErrorPage from './pages/ErrorPage';
import UserRoutes from './routes/UserRoutes';
import TutorRoutes from './routes/TutorRoutes';

function App() {
  const token = useSelector((state) => state.token)
  console.log(token);


  return (
    <>
       <Router> 
        <Routes>
          <Route path='/admin/*' element={<AdminRoutes />} />
          <Route path='/tutor/*' element={<TutorRoutes />} />
          <Route path='/*' element={<UserRoutes />} />
          <Route path="*" element={<div className='w-screen h-screen'>  <ErrorPage />   </div>} />
        </Routes>

      </Router>
    </>
  )
}

export default App
