import { useState } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { useSelector } from 'react-redux';
import AdminRoutes from './routes/AdminRoutes';
import { setUserDetails } from './store/reducers/loginSlice';
import { setToken } from './store/reducers/tokenSlice'; 
import ErrorPage from './pages/ErrorPage';

function App() {
  const token = useSelector((state)=>state.token)
  console.log(token);


  return (
    <>
      <Router>
        <Routes>
          <Route path='/admin/*' element={<AdminRoutes/>} />
          <Route path="*" element={  <div className='w-screen h-screen'> 
                                      <ErrorPage /> 
                                     </div>} />
        </Routes>

      </Router>
    </>
  )
}

export default App
