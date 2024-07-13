import React from 'react'
import {  Route,  Routes,  Navigate,   BrowserRouter as Router, } from "react-router-dom";
import ErrorPage from '../pages/ErrorPage';
import Homepage from '../pages/tutor/Homepage';
import { useSelector } from 'react-redux';
import TutorLogin from '../pages/tutor/Login';
import  axios  from "axios";



const baseURL = process.env.REACT_APP_API_URL;
let token

export const TutorAxiosInstance = axios.create()


TutorAxiosInstance.interceptors.request.use(function(config){

    config.baseURL = baseURL
    console.log("Interceptor req Send");
    // const Role = "User";

    console.log(`authorization-key ${token}`);
   
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
    return config;
},function (error) {
    return Promise.reject(error)
}
)




TutorAxiosInstance.interceptors.response.use(function (response) {
    
  
    console.log ( "response received"  + response.data.message);
    
    if(response.data.message === "TimedOut"){


    }
   return response;

},function (error) {
    return Promise.reject(error);
  })




const TutorRoutes = () => {
  const user = useSelector((state) => state.TutorDetails.token)
       token = useSelector((state) => state.TutorDetails.token)

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
