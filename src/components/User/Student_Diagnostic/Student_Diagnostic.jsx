import React from 'react'
import "./Student_Diagnostic.css"
import ImageStudent1 from "../../../assets/Animation_Tutor/MainImage1.png"
import { Link } from 'react-router-dom'
import Background from '../../reusable/Background'

const Student_Diagnostic = () => {
  return (
    <div className='w-screen h-[100vh] relative px-10'>
   <div className="absolute top-0 left-0 -z-10">
        <Background/>
      </div> 
    <div className='student-diagnostic-main-container'>
      <div className='student-diagnostic-sub-container1'>
        <div className='student-diagnostic-sub-title '>&#x275D;Get Your Diagnostic Test Report With Detailed Analysis.You Will Get A Customized Study Plan Based On Your Assessment&#x275E;</div>
        <Link to={'/diagnosistest/intructions'} >
        <div className='student-diagnostic-sub-button'>Get Diagnosis Test Results</div>
        </Link>
      </div>
      <div className='student-diagnostic-sub-container2'><img src={ImageStudent1}></img></div>
    </div>
    </div>
  )
}

export default Student_Diagnostic
