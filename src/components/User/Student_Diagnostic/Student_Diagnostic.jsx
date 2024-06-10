import React from 'react'
import "./Student_Diagnostic.css"
import ImageStudent1 from "../../../assets/Animation_Tutor/MainImage1.png"

const Student_Diagnostic = () => {
  return (
    <div className='w-screen h-[100vh] px-10'>

    <div className='student-diagnostic-main-container'>
      <div className='student-diagnostic-sub-container1'>
        <div className='student-diagnostic-sub-title'>&#x275D;Get Your Diagnostic Test Report With Detailed Analysis.You Will Get A Customized Sudy Plan Based On Your Assesment&#x275E;</div>
        <div className='student-diagnostic-sub-button'>Get Diagnosis Test Results</div>
      </div>
      <div className='student-diagnostic-sub-container2'><img src={ImageStudent1}></img></div>
    </div>
    </div>
  )
}

export default Student_Diagnostic
